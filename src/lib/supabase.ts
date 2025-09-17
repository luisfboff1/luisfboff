import { createClient } from '@supabase/supabase-js'

// Configuração do Supabase (apenas quando necessário)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// Tipos para o banco de dados
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
