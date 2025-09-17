import { NextRequest, NextResponse } from 'next/server'
import { LocalDatabase } from '@/lib/database-server'
import { Produto } from '@/lib/database-client'

const db = new LocalDatabase<Produto>('produtos')

export async function GET() {
  try {
    const produtos = await db.getAll()
    return NextResponse.json(produtos)
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar produtos' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const produto = await db.create(data)
    return NextResponse.json(produto, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao criar produto' }, { status: 500 })
  }
}
