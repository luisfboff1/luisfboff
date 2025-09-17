// Camada de abstração para banco de dados
// Facilita migração entre dados locais e Supabase

export interface DatabaseConfig {
  type: 'local' | 'supabase'
  connectionString?: string
}

// Configuração atual - pode ser alterada facilmente
export const dbConfig: DatabaseConfig = {
  type: 'local' // Mude para 'supabase' quando quiser migrar
}

// Tipos de dados (compatíveis com Supabase)
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

// Interface para operações de banco
export interface DatabaseOperations<T> {
  getAll(): Promise<T[]>
  getById(id: string): Promise<T | null>
  create(data: Omit<T, 'id' | 'created_at' | 'updated_at'>): Promise<T>
  update(id: string, data: Partial<T>): Promise<T>
  delete(id: string): Promise<boolean>
  search(filters: Partial<T>): Promise<T[]>
}

// Factory para criar instâncias de banco
export class DatabaseFactory {
  static createDatabase<T>(tableName: string): DatabaseOperations<T> {
    if (dbConfig.type === 'local') {
      return new LocalDatabase<T>(tableName)
    } else {
      return new SupabaseDatabase<T>(tableName)
    }
  }
}

// Implementação para dados locais (JSON/CSV)
class LocalDatabase<T> implements DatabaseOperations<T> {
  private tableName: string
  private data: T[] = []

  constructor(tableName: string) {
    this.tableName = tableName
    this.loadData()
  }

  private loadData() {
    try {
      // Carrega dados do arquivo JSON local
      const fs = require('fs')
      const path = require('path')
      const dataPath = path.join(process.cwd(), 'data', `${this.tableName}.json`)
      
      if (fs.existsSync(dataPath)) {
        const fileData = fs.readFileSync(dataPath, 'utf8')
        this.data = JSON.parse(fileData)
      }
    } catch (error) {
      console.log(`Arquivo ${this.tableName}.json não encontrado, iniciando com dados vazios`)
      this.data = []
    }
  }

  private saveData() {
    try {
      const fs = require('fs')
      const path = require('path')
      const dataDir = path.join(process.cwd(), 'data')
      
      // Cria diretório se não existir
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true })
      }
      
      const dataPath = path.join(dataDir, `${this.tableName}.json`)
      fs.writeFileSync(dataPath, JSON.stringify(this.data, null, 2))
    } catch (error) {
      console.error('Erro ao salvar dados:', error)
    }
  }

  async getAll(): Promise<T[]> {
    return [...this.data]
  }

  async getById(id: string): Promise<T | null> {
    return this.data.find((item: any) => item.id === id) || null
  }

  async create(data: Omit<T, 'id' | 'created_at' | 'updated_at'>): Promise<T> {
    const now = new Date().toISOString()
    const newItem = {
      ...data,
      id: this.generateId(),
      created_at: now,
      updated_at: now
    } as T

    this.data.push(newItem)
    this.saveData()
    return newItem
  }

  async update(id: string, data: Partial<T>): Promise<T> {
    const index = this.data.findIndex((item: any) => item.id === id)
    if (index === -1) {
      throw new Error('Item não encontrado')
    }

    const updatedItem = {
      ...this.data[index],
      ...data,
      updated_at: new Date().toISOString()
    } as T

    this.data[index] = updatedItem
    this.saveData()
    return updatedItem
  }

  async delete(id: string): Promise<boolean> {
    const index = this.data.findIndex((item: any) => item.id === id)
    if (index === -1) {
      return false
    }

    this.data.splice(index, 1)
    this.saveData()
    return true
  }

  async search(filters: Partial<T>): Promise<T[]> {
    return this.data.filter((item: any) => {
      return Object.keys(filters).every(key => {
        const filterValue = (filters as any)[key]
        const itemValue = item[key]
        
        if (typeof filterValue === 'string' && typeof itemValue === 'string') {
          return itemValue.toLowerCase().includes(filterValue.toLowerCase())
        }
        
        return itemValue === filterValue
      })
    })
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9) + Date.now().toString(36)
  }
}

// Implementação para Supabase (placeholder)
class SupabaseDatabase<T> implements DatabaseOperations<T> {
  private tableName: string

  constructor(tableName: string) {
    this.tableName = tableName
  }

  async getAll(): Promise<T[]> {
    // Implementação Supabase será adicionada posteriormente
    throw new Error('Supabase não implementado ainda')
  }

  async getById(id: string): Promise<T | null> {
    throw new Error('Supabase não implementado ainda')
  }

  async create(data: Omit<T, 'id' | 'created_at' | 'updated_at'>): Promise<T> {
    throw new Error('Supabase não implementado ainda')
  }

  async update(id: string, data: Partial<T>): Promise<T> {
    throw new Error('Supabase não implementado ainda')
  }

  async delete(id: string): Promise<boolean> {
    throw new Error('Supabase não implementado ainda')
  }

  async search(filters: Partial<T>): Promise<T[]> {
    throw new Error('Supabase não implementado ainda')
  }
}

// Instâncias de banco para cada tabela
export const usuariosDB = DatabaseFactory.createDatabase<Usuario>('usuarios')
export const produtosDB = DatabaseFactory.createDatabase<Produto>('produtos')
export const vendedoresDB = DatabaseFactory.createDatabase<Vendedor>('vendedores')
export const clientesFornecedoresDB = DatabaseFactory.createDatabase<ClienteFornecedor>('clientes_fornecedores')
export const tiposMovimentosDB = DatabaseFactory.createDatabase<TipoMovimento>('tipos_movimentos')
export const contasDB = DatabaseFactory.createDatabase<Conta>('contas')
export const movimentosEstoqueDB = DatabaseFactory.createDatabase<MovimentoEstoque>('movimentos_estoque')
export const fluxoCaixaDB = DatabaseFactory.createDatabase<FluxoCaixa>('fluxo_caixa')
export const vendasDB = DatabaseFactory.createDatabase<Venda>('vendas')
export const itensVendaDB = DatabaseFactory.createDatabase<ItemVenda>('itens_venda')
