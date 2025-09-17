import { NextRequest, NextResponse } from 'next/server'
import { MigrationTool } from '@/lib/migration-server'

export async function POST(request: NextRequest) {
  try {
    const { action } = await request.json()
    
    if (action === 'export-csv') {
      await MigrationTool.exportToCSV()
      return NextResponse.json({ 
        success: true, 
        message: 'Dados exportados para CSV com sucesso!' 
      })
    }
    
    if (action === 'migrate-supabase') {
      await MigrationTool.migrateToSupabase()
      return NextResponse.json({ 
        success: true, 
        message: 'Migração para Supabase concluída com sucesso!' 
      })
    }
    
    return NextResponse.json({ error: 'Ação não reconhecida' }, { status: 400 })
    
  } catch (error) {
    console.error('Erro na migração:', error)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}

