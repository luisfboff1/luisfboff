#!/usr/bin/env tsx

/**
 * Script para testar conexão com MySQL Hostinger
 * Execute: npm run db:check
 */

import mysql from 'mysql2/promise'
import { config } from 'dotenv'

// Carrega variáveis de ambiente
config({ path: '.env.local' })

interface ConnectionConfig {
  host: string
  user: string
  password: string
  database: string
  port: number
}

function parseDatabaseUrl(): ConnectionConfig | null {
  const databaseUrl = process.env.DATABASE_URL
  
  if (!databaseUrl) {
    console.error('❌ DATABASE_URL não encontrada no .env.local')
    console.log('💡 Configure a variável DATABASE_URL no arquivo .env.local')
    return null
  }

  try {
    // Parse da URL: mysql://user:pass@host:port/database
    const url = new URL(databaseUrl)
    
    return {
      host: url.hostname,
      user: url.username,
      password: url.password,
      database: url.pathname.substring(1), // Remove a barra inicial
      port: parseInt(url.port) || 3306
    }
  } catch (error) {
    console.error('❌ Erro ao parsear DATABASE_URL:', error)
    console.log('💡 Formato esperado: mysql://usuario:senha@host:porta/banco')
    return null
  }
}

async function testConnection() {
  console.log('🔍 Testando conexão com MySQL Hostinger...\n')
  
  const config = parseDatabaseUrl()
  if (!config) {
    process.exit(1)
  }

  console.log('📋 Configuração:')
  console.log(`   Host: ${config.host}`)
  console.log(`   Porta: ${config.port}`)
  console.log(`   Usuário: ${config.user}`)
  console.log(`   Banco: ${config.database}`)
  console.log('')

  let connection: mysql.Connection | null = null

  try {
    // Tentar conectar
    console.log('🔌 Conectando ao banco de dados...')
    connection = await mysql.createConnection(config)
    console.log('✅ Conexão estabelecida com sucesso!\n')

    // Testar query básica
    console.log('🧪 Testando query básica...')
    const [rows] = await connection.execute('SELECT 1 as test')
    console.log('✅ Query executada com sucesso!')
    console.log(`   Resultado: ${JSON.stringify(rows)}\n`)

    // Verificar tabelas existentes
    console.log('📊 Verificando tabelas do sistema...')
    const [tables] = await connection.execute(`
      SELECT TABLE_NAME 
      FROM INFORMATION_SCHEMA.TABLES 
      WHERE TABLE_SCHEMA = ? 
      ORDER BY TABLE_NAME
    `, [config.database])

    const tableNames = (tables as any[]).map(row => row.TABLE_NAME)
    
    if (tableNames.length === 0) {
      console.log('⚠️  Nenhuma tabela encontrada no banco')
      console.log('💡 Execute o script de setup: npm run db:setup')
    } else {
      console.log(`✅ ${tableNames.length} tabelas encontradas:`)
      tableNames.forEach(table => console.log(`   - ${table}`))
    }

    // Testar contagem de registros em tabelas principais
    const mainTables = ['usuarios', 'produtos', 'vendedores', 'clientes_fornecedores']
    console.log('\n📈 Contagem de registros:')
    
    for (const table of mainTables) {
      if (tableNames.includes(table)) {
        try {
          const [count] = await connection.execute(`SELECT COUNT(*) as total FROM ${table}`)
          const total = (count as any[])[0].total
          console.log(`   ${table}: ${total} registros`)
        } catch (error) {
          console.log(`   ${table}: erro ao contar registros`)
        }
      }
    }

    console.log('\n🎉 Teste de conexão concluído com sucesso!')
    console.log('💡 Seu banco está pronto para uso com o sistema Megui\'s Pet Admin')

  } catch (error: any) {
    console.error('❌ Erro na conexão:', error.message)
    
    // Sugestões baseadas no tipo de erro
    if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.log('\n💡 Possíveis soluções:')
      console.log('   - Verifique usuário e senha')
      console.log('   - Confirme se o usuário tem permissões no banco')
      console.log('   - Verifique se o acesso remoto está habilitado')
    } else if (error.code === 'ECONNREFUSED') {
      console.log('\n💡 Possíveis soluções:')
      console.log('   - Verifique o host e porta')
      console.log('   - Confirme se o firewall permite conexão')
      console.log('   - Teste com IP específico em vez de "qualquer IP"')
    } else if (error.code === 'ER_BAD_DB_ERROR') {
      console.log('\n💡 Possíveis soluções:')
      console.log('   - Verifique se o banco foi criado')
      console.log('   - Confirme o nome do banco na DATABASE_URL')
    }
    
    process.exit(1)
  } finally {
    if (connection) {
      await connection.end()
      console.log('\n🔌 Conexão encerrada.')
    }
  }
}

// Executar teste
testConnection().catch(error => {
  console.error('❌ Erro inesperado:', error)
  process.exit(1)
})

