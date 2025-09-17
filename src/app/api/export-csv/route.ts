import { NextRequest, NextResponse } from 'next/server'
import { LocalDatabase } from '@/lib/database-server'
import fs from 'fs'
import path from 'path'

// Tipos de dados
interface Usuario {
  id: string
  nome: string
  email: string
  permissoes: string[]
  ativo: boolean
  created_at: string
  updated_at: string
}

interface Produto {
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

interface Vendedor {
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

interface ClienteFornecedor {
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

interface TipoMovimento {
  id: string
  descricao: string
  tipo: 'entrada' | 'saida'
  ativo: boolean
  created_at: string
  updated_at: string
}

interface Conta {
  id: string
  descricao: string
  tipo: 'debito' | 'credito'
  categoria: 'despesas' | 'investimentos' | 'vendas' | 'outras_receitas'
  ativo: boolean
  created_at: string
  updated_at: string
}

interface MovimentoEstoque {
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

interface FluxoCaixa {
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

interface Venda {
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

interface ItemVenda {
  id: string
  venda_id: string
  produto_id: string
  quantidade: number
  valor_unitario: number
  valor_total: number
  created_at: string
}

export async function POST(request: NextRequest) {
  try {
    const { tableName } = await request.json()
    
    if (!tableName) {
      return NextResponse.json({ error: 'Nome da tabela é obrigatório' }, { status: 400 })
    }

    // Mapear nomes das tabelas para tipos
    const tableMap: { [key: string]: any } = {
      'usuarios': { db: new LocalDatabase<Usuario>('usuarios'), type: 'Usuario' },
      'produtos': { db: new LocalDatabase<Produto>('produtos'), type: 'Produto' },
      'vendedores': { db: new LocalDatabase<Vendedor>('vendedores'), type: 'Vendedor' },
      'clientes-fornecedores': { db: new LocalDatabase<ClienteFornecedor>('clientes-fornecedores'), type: 'ClienteFornecedor' },
      'tipos-movimentos': { db: new LocalDatabase<TipoMovimento>('tipos-movimentos'), type: 'TipoMovimento' },
      'contas': { db: new LocalDatabase<Conta>('contas'), type: 'Conta' },
      'movimentos-estoque': { db: new LocalDatabase<MovimentoEstoque>('movimentos-estoque'), type: 'MovimentoEstoque' },
      'fluxo-caixa': { db: new LocalDatabase<FluxoCaixa>('fluxo-caixa'), type: 'FluxoCaixa' },
      'vendas': { db: new LocalDatabase<Venda>('vendas'), type: 'Venda' },
      'itens-venda': { db: new LocalDatabase<ItemVenda>('itens-venda'), type: 'ItemVenda' }
    }

    const tableConfig = tableMap[tableName]
    if (!tableConfig) {
      return NextResponse.json({ error: 'Tabela não encontrada' }, { status: 404 })
    }

    const data = await tableConfig.db.getAll()
    const csvContent = convertToCSV(data)
    
    // Criar diretório de exportação se não existir
    const exportDir = path.join(process.cwd(), 'exports')
    if (!fs.existsSync(exportDir)) {
      fs.mkdirSync(exportDir, { recursive: true })
    }

    // Salvar arquivo CSV
    const filename = `${tableName}_${new Date().toISOString().split('T')[0]}.csv`
    const filepath = path.join(exportDir, filename)
    fs.writeFileSync(filepath, csvContent, 'utf8')

    return NextResponse.json({ 
      success: true, 
      filename,
      filepath,
      recordCount: data.length 
    })

  } catch (error) {
    console.error('Erro ao exportar CSV:', error)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}

export async function GET() {
  try {
    // Exportar todas as tabelas
    const tables = [
      'usuarios', 'produtos', 'vendedores', 'clientes-fornecedores',
      'tipos-movimentos', 'contas', 'movimentos-estoque', 'fluxo-caixa',
      'vendas', 'itens-venda'
    ]

    const results = []
    
    for (const tableName of tables) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/export-csv`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ tableName })
        })
        
        if (response.ok) {
          const result = await response.json()
          results.push(result)
        }
      } catch (error) {
        console.error(`Erro ao exportar ${tableName}:`, error)
      }
    }

    return NextResponse.json({ 
      success: true, 
      exports: results,
      totalTables: tables.length,
      successfulExports: results.length
    })

  } catch (error) {
    console.error('Erro ao exportar todos os CSVs:', error)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}

function convertToCSV(data: any[]): string {
  if (data.length === 0) return ''

  const headers = Object.keys(data[0])
  const csvRows = []

  // Adicionar cabeçalhos
  csvRows.push(headers.join(','))

  // Adicionar dados
  for (const row of data) {
    const values = headers.map(header => {
      const value = row[header]
      // Escapar valores que contêm vírgulas ou aspas
      if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
        return `"${value.replace(/"/g, '""')}"`
      }
      return value
    })
    csvRows.push(values.join(','))
  }

  return csvRows.join('\n')
}

