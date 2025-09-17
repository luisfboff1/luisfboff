// Cliente HTTP para comunicação com API PHP
// Funciona tanto em desenvolvimento (Next.js API Routes) quanto em produção (PHP)

import { 
  Usuario, 
  Produto, 
  Vendedor, 
  ClienteFornecedor, 
  TipoMovimento, 
  Conta, 
  MovimentoEstoque, 
  FluxoCaixa, 
  Venda, 
  ItemVenda 
} from './database'

// Configuração da API
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '/api'

// Tipos para respostas da API
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  success: boolean
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
  error?: string
}

// Cliente HTTP base
class ApiClient {
  private baseURL: string

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL
  }

  private async request<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseURL}${endpoint}`
      
      const defaultHeaders = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }

      const response = await fetch(url, {
        ...options,
        headers: {
          ...defaultHeaders,
          ...options.headers,
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('API Request Error:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      }
    }
  }

  // Métodos HTTP
  async get<T>(endpoint: string, params?: Record<string, any>): Promise<ApiResponse<T>> {
    const url = params ? `${endpoint}?${new URLSearchParams(params)}` : endpoint
    return this.request<T>(url, { method: 'GET' })
  }

  async post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' })
  }
}

// Instância global do cliente
export const apiClient = new ApiClient()

// ===========================================
// CLIENTES DE API POR ENTIDADE
// ===========================================

// Cliente base para operações CRUD
class EntityApiClient<T> {
  constructor(private endpoint: string) {}

  async getAll(params?: { page?: number; limit?: number; search?: string }): Promise<PaginatedResponse<T>> {
    const response = await apiClient.get<PaginatedResponse<T>>(this.endpoint, params)
    return response.data || { success: false, data: [], pagination: { page: 1, limit: 10, total: 0, totalPages: 0 } }
  }

  async getById(id: string): Promise<ApiResponse<T>> {
    return apiClient.get<T>(`${this.endpoint}/${id}`)
  }

  async create(data: Omit<T, 'id' | 'created_at' | 'updated_at'>): Promise<ApiResponse<T>> {
    return apiClient.post<T>(this.endpoint, data)
  }

  async update(id: string, data: Partial<T>): Promise<ApiResponse<T>> {
    return apiClient.put<T>(`${this.endpoint}/${id}`, data)
  }

  async delete(id: string): Promise<ApiResponse<boolean>> {
    return apiClient.delete<boolean>(`${this.endpoint}/${id}`)
  }

  async search(filters: Partial<T>): Promise<ApiResponse<T[]>> {
    return apiClient.get<T[]>(`${this.endpoint}/search`, filters)
  }
}

// ===========================================
// INSTÂNCIAS DOS CLIENTES
// ===========================================

export const usuariosApi = new EntityApiClient<Usuario>('/usuarios')
export const produtosApi = new EntityApiClient<Produto>('/produtos')
export const vendedoresApi = new EntityApiClient<Vendedor>('/vendedores')
export const clientesFornecedoresApi = new EntityApiClient<ClienteFornecedor>('/clientes-fornecedores')
export const tiposMovimentosApi = new EntityApiClient<TipoMovimento>('/tipos-movimentos')
export const contasApi = new EntityApiClient<Conta>('/contas')
export const movimentosEstoqueApi = new EntityApiClient<MovimentoEstoque>('/movimentos-estoque')
export const fluxoCaixaApi = new EntityApiClient<FluxoCaixa>('/fluxo-caixa')
export const vendasApi = new EntityApiClient<Venda>('/vendas')
export const itensVendaApi = new EntityApiClient<ItemVenda>('/itens-venda')

// ===========================================
// FUNÇÕES UTILITÁRIAS
// ===========================================

// Função para testar conexão com a API
export async function testApiConnection(): Promise<boolean> {
  try {
    const response = await apiClient.get('/health')
    return response.success
  } catch (error) {
    console.error('Erro ao testar conexão com API:', error)
    return false
  }
}

// Função para formatar erros da API
export function formatApiError(error: any): string {
  if (typeof error === 'string') return error
  if (error?.message) return error.message
  if (error?.error) return error.error
  return 'Erro desconhecido na API'
}

// Função para lidar com respostas da API
export function handleApiResponse<T>(response: ApiResponse<T>): T | null {
  if (response.success && response.data) {
    return response.data
  }
  
  if (response.error) {
    throw new Error(response.error)
  }
  
  return null
}

// ===========================================
// HOOKS PERSONALIZADOS (para uso em componentes)
// ===========================================

import { useState, useEffect } from 'react'

// Hook para buscar dados com loading e error states
export function useApiData<T>(
  apiCall: () => Promise<ApiResponse<T>>,
  dependencies: any[] = []
) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await apiCall()
        
        if (response.success && response.data) {
          setData(response.data)
        } else {
          setError(response.error || 'Erro ao carregar dados')
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, dependencies)

  return { data, loading, error, refetch: () => fetchData() }
}

// Hook para operações CRUD
export function useApiCrud<T>(
  apiClient: EntityApiClient<T>,
  initialData: T[] = []
) {
  const [data, setData] = useState<T[]>(initialData)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadData = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await apiClient.getAll()
      
      if (response.success) {
        setData(response.data)
      } else {
        setError(response.error || 'Erro ao carregar dados')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido')
    } finally {
      setLoading(false)
    }
  }

  const create = async (item: Omit<T, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const response = await apiClient.create(item)
      if (response.success && response.data) {
        setData(prev => [...prev, response.data!])
        return response.data
      } else {
        throw new Error(response.error || 'Erro ao criar item')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao criar item')
      throw err
    }
  }

  const update = async (id: string, item: Partial<T>) => {
    try {
      const response = await apiClient.update(id, item)
      if (response.success && response.data) {
        setData(prev => prev.map(i => (i as any).id === id ? response.data! : i))
        return response.data
      } else {
        throw new Error(response.error || 'Erro ao atualizar item')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao atualizar item')
      throw err
    }
  }

  const remove = async (id: string) => {
    try {
      const response = await apiClient.delete(id)
      if (response.success) {
        setData(prev => prev.filter(i => (i as any).id !== id))
        return true
      } else {
        throw new Error(response.error || 'Erro ao excluir item')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao excluir item')
      throw err
    }
  }

  return {
    data,
    loading,
    error,
    loadData,
    create,
    update,
    remove,
  }
}

