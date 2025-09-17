import { NextRequest, NextResponse } from 'next/server'
import { LocalDatabase } from '@/lib/database-server'
import { FluxoCaixa } from '@/lib/database-client'

const db = new LocalDatabase<FluxoCaixa>('fluxo-caixa')

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const item = await db.getById(params.id)
    if (!item) {
      return NextResponse.json({ error: 'FluxoCaixa não encontrado' }, { status: 404 })
    }
    return NextResponse.json(item)
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar fluxo-caixa' }, { status: 500 })
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
    return NextResponse.json({ error: 'Erro ao atualizar fluxo-caixa' }, { status: 500 })
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
    return NextResponse.json({ error: 'Erro ao deletar fluxo-caixa' }, { status: 500 })
  }
}