import { NextRequest, NextResponse } from 'next/server'
import { LocalDatabase } from '@/lib/database-server'
import { MovimentoEstoque } from '@/lib/database-client'

const db = new LocalDatabase<MovimentoEstoque>('movimentos-estoque')

export async function GET() {
  try {
    const data = await db.getAll()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar movimentos-estoque' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const item = await db.create(data)
    return NextResponse.json(item, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao criar movimentos-estoque' }, { status: 500 })
  }
}