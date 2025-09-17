const fs = require('fs')
const path = require('path')

const tables = [
  'usuarios',
  'vendedores', 
  'clientes-fornecedores',
  'tipos-movimentos',
  'contas',
  'movimentos-estoque',
  'fluxo-caixa',
  'vendas',
  'itens-venda'
]

const routeTemplate = `import { NextRequest, NextResponse } from 'next/server'
import { LocalDatabase } from '@/lib/database-server'
import { {{TypeName}} } from '@/lib/database-client'

const db = new LocalDatabase<{{TypeName}}>('{{tableName}}')

export async function GET() {
  try {
    const data = await db.getAll()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar {{tableName}}' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const item = await db.create(data)
    return NextResponse.json(item, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao criar {{tableName}}' }, { status: 500 })
  }
}`

const idRouteTemplate = `import { NextRequest, NextResponse } from 'next/server'
import { LocalDatabase } from '@/lib/database-server'
import { {{TypeName}} } from '@/lib/database-client'

const db = new LocalDatabase<{{TypeName}}>('{{tableName}}')

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const item = await db.getById(params.id)
    if (!item) {
      return NextResponse.json({ error: '{{TypeName}} não encontrado' }, { status: 404 })
    }
    return NextResponse.json(item)
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar {{tableName}}' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json()
    const item = await db.update(params.id, data)
    return NextResponse.json(item)
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao atualizar {{tableName}}' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await db.delete(params.id)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao deletar {{tableName}}' }, { status: 500 })
  }
}`

function getTypeName(tableName) {
  const typeMap = {
    'usuarios': 'Usuario',
    'vendedores': 'Vendedor',
    'clientes-fornecedores': 'ClienteFornecedor',
    'tipos-movimentos': 'TipoMovimento',
    'contas': 'Conta',
    'movimentos-estoque': 'MovimentoEstoque',
    'fluxo-caixa': 'FluxoCaixa',
    'vendas': 'Venda',
    'itens-venda': 'ItemVenda'
  }
  return typeMap[tableName] || tableName
}

tables.forEach(tableName => {
  const typeName = getTypeName(tableName)
  
  // Criar diretório da API
  const apiDir = path.join(process.cwd(), 'src', 'app', 'api', tableName)
  if (!fs.existsSync(apiDir)) {
    fs.mkdirSync(apiDir, { recursive: true })
  }
  
  // Criar route.ts
  const routeContent = routeTemplate
    .replace(/{{TypeName}}/g, typeName)
    .replace(/{{tableName}}/g, tableName)
  
  fs.writeFileSync(path.join(apiDir, 'route.ts'), routeContent)
  
  // Criar diretório [id]
  const idDir = path.join(apiDir, '[id]')
  if (!fs.existsSync(idDir)) {
    fs.mkdirSync(idDir, { recursive: true })
  }
  
  // Criar [id]/route.ts
  const idRouteContent = idRouteTemplate
    .replace(/{{TypeName}}/g, typeName)
    .replace(/{{tableName}}/g, tableName)
  
  fs.writeFileSync(path.join(idDir, 'route.ts'), idRouteContent)
  
  console.log(`Criadas rotas para ${tableName}`)
})

console.log('Todas as rotas de API foram criadas!')
