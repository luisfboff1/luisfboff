import { NextRequest, NextResponse } from 'next/server'
import { LocalDatabase } from '@/lib/database-server'
import { ClienteFornecedor } from '@/lib/database-client'

const db = new LocalDatabase<ClienteFornecedor>('clientes-fornecedores')

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const item = await db.getById(params.id)
    if (!item) {
      return NextResponse.json({ error: 'ClienteFornecedor não encontrado' }, { status: 404 })
    }
    return NextResponse.json(item)
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar clientes-fornecedores' }, { status: 500 })
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
    return NextResponse.json({ error: 'Erro ao atualizar clientes-fornecedores' }, { status: 500 })
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
    return NextResponse.json({ error: 'Erro ao deletar clientes-fornecedores' }, { status: 500 })
  }
}