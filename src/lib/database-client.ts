// Cliente para operações de banco de dados (lado do cliente)
// Usa API routes para comunicação com o servidor

export interface DatabaseOperations<T> {
  getAll(): Promise<T[]>
  getById(id: string): Promise<T | null>
  create(data: Omit<T, 'id' | 'created_at' | 'updated_at'>): Promise<T>
  update(id: string, data: Partial<T>): Promise<T>
  delete(id: string): Promise<boolean>
  search(filters: Partial<T>): Promise<T[]>
}

class ApiDatabase<T> implements DatabaseOperations<T> {
  private tableName: string

  constructor(tableName: string) {
    this.tableName = tableName
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const response = await fetch(`/api/${this.tableName}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    })

    if (!response.ok) {
      throw new Error(`Erro na API: ${response.statusText}`)
    }

    return response.json()
  }

  async getAll(): Promise<T[]> {
    return this.request('')
  }

  async getById(id: string): Promise<T | null> {
    return this.request(`/${id}`)
  }

  async create(data: Omit<T, 'id' | 'created_at' | 'updated_at'>): Promise<T> {
    return this.request('', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async update(id: string, data: Partial<T>): Promise<T> {
    return this.request(`/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  async delete(id: string): Promise<boolean> {
    await this.request(`/${id}`, {
      method: 'DELETE',
    })
    return true
  }

  async search(filters: Partial<T>): Promise<T[]> {
    const params = new URLSearchParams()
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, String(value))
      }
    })
    
    return this.request(`/search?${params.toString()}`)
  }
}

// Instâncias de banco para cada tabela
export const usuariosDB = new ApiDatabase('usuarios')
export const produtosDB = new ApiDatabase('produtos')
export const vendedoresDB = new ApiDatabase('vendedores')
export const clientesFornecedoresDB = new ApiDatabase('clientes-fornecedores')
export const tiposMovimentosDB = new ApiDatabase('tipos-movimentos')
export const contasDB = new ApiDatabase('contas')
export const movimentosEstoqueDB = new ApiDatabase('movimentos-estoque')
export const fluxoCaixaDB = new ApiDatabase('fluxo-caixa')
export const vendasDB = new ApiDatabase('vendas')
export const itensVendaDB = new ApiDatabase('itens-venda')

// Tipos de dados
export interface Usuario {
  id: string
  nome: string
  email: string
  permissoes: string[]
  ativo: boolean
  created_at: string
  updated_at: string
}

export interface Produto {
  id: string
  codigo: string
  nome: string
  descricao?: string
  preco_custo: number
  preco_venda: number
  estoque_minimo: number
  estoque_atual: number
  unidade: string
  categoria?: string
  ativo: boolean
  imagem?: string
  created_at: string
  updated_at: string
}

export interface Vendedor {
  id: string
  cpf: string
  nome: string
  email?: string
  telefone?: string
  comissao_percentual: number
  ativo: boolean
  created_at: string
  updated_at: string
}

export interface ClienteFornecedor {
  id: string
  tipo: 'fisica' | 'juridica'
  cpf_cnpj: string
  nome_razao_social: string
  nome_fantasia?: string
  email?: string
  telefone?: string
  endereco?: string
  cidade?: string
  estado?: string
  cep?: string
  vendedor_id?: string
  ativo: boolean
  created_at: string
  updated_at: string
}

export interface TipoMovimento {
  id: string
  descricao: string
  tipo: 'entrada' | 'saida'
  ativo: boolean
  created_at: string
  updated_at: string
}

export interface Conta {
  id: string
  descricao: string
  tipo: 'debito' | 'credito'
  categoria: 'despesas' | 'investimentos' | 'vendas' | 'outras_receitas'
  ativo: boolean
  created_at: string
  updated_at: string
}

export interface MovimentoEstoque {
  id: string
  documento: string
  cliente_fornecedor_id: string
  data: string
  quantidade: number
  valor_unitario: number
  valor_total: number
  tipo_movimento_id: string
  produto_id: string
  estoque_local: 'RS' | 'SP'
  observacoes?: string
  created_at: string
  updated_at: string
}

export interface FluxoCaixa {
  id: string
  data: string
  conta_id: string
  historico: string
  valor: number
  tipo: 'entrada' | 'saida'
  observacoes?: string
  created_at: string
  updated_at: string
}

export interface Venda {
  id: string
  numero_venda: string
  cliente_id: string
  vendedor_id: string
  data: string
  valor_total: number
  desconto?: number
  valor_final: number
  status: 'pendente' | 'confirmada' | 'cancelada'
  observacoes?: string
  created_at: string
  updated_at: string
}

export interface ItemVenda {
  id: string
  venda_id: string
  produto_id: string
  quantidade: number
  valor_unitario: number
  valor_total: number
  created_at: string
}
