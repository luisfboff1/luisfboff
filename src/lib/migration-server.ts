// Sistema de migração do servidor (lado do servidor)
// Usa fs para ler/escrever arquivos JSON

import fs from 'fs'
import path from 'path'
import { LocalDatabase } from './database-server'

export class MigrationTool {
  private static readonly dataDir = path.join(process.cwd(), 'data')
  private static readonly exportDir = path.join(process.cwd(), 'exports')

  static async exportToCSV(): Promise<void> {
    const tables = [
      'usuarios', 'produtos', 'vendedores', 'clientes-fornecedores',
      'tipos-movimentos', 'contas', 'movimentos-estoque', 'fluxo-caixa',
      'vendas', 'itens-venda'
    ]

    // Criar diretório de exportação se não existir
    if (!fs.existsSync(this.exportDir)) {
      fs.mkdirSync(this.exportDir, { recursive: true })
    }

    for (const tableName of tables) {
      try {
        const db = new LocalDatabase(tableName)
        const data = await db.getAll()
        
        if (data.length > 0) {
          const csvContent = this.convertToCSV(data)
          const filename = `${tableName}_${new Date().toISOString().split('T')[0]}.csv`
          const filepath = path.join(this.exportDir, filename)
          
          fs.writeFileSync(filepath, csvContent, 'utf8')
          console.log(`✅ ${tableName}: ${data.length} registros exportados`)
        } else {
          console.log(`⚠️ ${tableName}: Nenhum dado para exportar`)
        }
      } catch (error) {
        console.error(`❌ Erro ao exportar ${tableName}:`, error)
      }
    }
  }

  static async migrateToSupabase(): Promise<void> {
    // TODO: Implementar migração para Supabase
    // Por enquanto, apenas exporta para CSV
    await this.exportToCSV()
    console.log('Migração para Supabase ainda não implementada')
  }

  private static convertToCSV(data: any[]): string {
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
}

