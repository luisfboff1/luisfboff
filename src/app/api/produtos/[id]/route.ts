import { NextRequest, NextResponse } from 'next/server'
import { LocalDatabase } from '@/lib/database-server'
import { Produto } from '@/lib/database-client'

const db = new LocalDatabase<Produto>('produtos')

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const produto = await db.getById(params.id)
    if (!produto) {
      return NextResponse.json({ error: 'Produto não encontrado' }, { status: 404 })
    }
    return NextResponse.json(produto)
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar produto' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json()
    const produto = await db.update(params.id, data)
    return NextResponse.json(produto)
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao atualizar produto' }, { status: 500 })
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
    return NextResponse.json({ error: 'Erro ao deletar produto' }, { status: 500 })
  }
}
