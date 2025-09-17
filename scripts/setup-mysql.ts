#!/usr/bin/env tsx

/**
 * Script para configurar banco de dados MySQL
 * Execute: npm run db:setup
 */

import mysql from 'mysql2/promise'
import { config } from 'dotenv'
import fs from 'fs'
import path from 'path'

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
    return null
  }

  try {
    const url = new URL(databaseUrl)
    return {
      host: url.hostname,
      user: url.username,
      password: url.password,
      database: url.pathname.substring(1),
      port: parseInt(url.port) || 3306
    }
  } catch (error) {
    console.error('❌ Erro ao parsear DATABASE_URL:', error)
    return null
  }
}

async function setupDatabase() {
  console.log('🚀 Configurando banco de dados MySQL...\n')
  
  const config = parseDatabaseUrl()
  if (!config) {
    process.exit(1)
  }

  let connection: mysql.Connection | null = null

  try {
    // Conectar ao banco
    console.log('🔌 Conectando ao banco de dados...')
    connection = await mysql.createConnection(config)
    console.log('✅ Conectado com sucesso!\n')

    // Ler e executar schema SQL
    const schemaPath = path.join(process.cwd(), 'database-schema.sql')
    
    if (!fs.existsSync(schemaPath)) {
      console.error('❌ Arquivo database-schema.sql não encontrado')
      process.exit(1)
    }

    console.log('📖 Lendo schema do banco de dados...')
    const schema = fs.readFileSync(schemaPath, 'utf8')
    
    // Dividir em comandos individuais
    const commands = schema
      .split(';')
      .map(cmd => cmd.trim())
      .filter(cmd => cmd.length > 0 && !cmd.startsWith('--'))

    console.log(`📝 Executando ${commands.length} comandos SQL...\n`)

    for (let i = 0; i < commands.length; i++) {
      const command = commands[i]
      
      try {
        await connection.execute(command)
        console.log(`✅ Comando ${i + 1}/${commands.length} executado`)
      } catch (error: any) {
        // Ignorar erros de tabela já existente
        if (error.code === 'ER_TABLE_EXISTS_ERROR') {
          console.log(`⚠️  Tabela já existe (comando ${i + 1})`)
        } else {
          console.error(`❌ Erro no comando ${i + 1}:`, error.message)
          console.log(`   SQL: ${command.substring(0, 100)}...`)
        }
      }
    }

    // Verificar tabelas criadas
    console.log('\n📊 Verificando tabelas criadas...')
    const [tables] = await connection.execute(`
      SELECT TABLE_NAME 
      FROM INFORMATION_SCHEMA.TABLES 
      WHERE TABLE_SCHEMA = ? 
      ORDER BY TABLE_NAME
    `, [config.database])

    const tableNames = (tables as any[]).map(row => row.TABLE_NAME)
    console.log(`✅ ${tableNames.length} tabelas encontradas:`)
    tableNames.forEach(table => console.log(`   - ${table}`))

    // Inserir dados iniciais se necessário
    console.log('\n🌱 Verificando dados iniciais...')
    
    const [userCount] = await connection.execute('SELECT COUNT(*) as total FROM usuarios')
    const totalUsers = (userCount as any[])[0].total

    if (totalUsers === 0) {
      console.log('📝 Inserindo usuário administrador padrão...')
      
      await connection.execute(`
        INSERT INTO usuarios (id, nome, email, permissoes, ativo, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, NOW(), NOW())
      `, [
        'admin-001',
        'Administrador',
        'admin@meguispet.com',
        JSON.stringify(['admin', 'vendas', 'estoque', 'financeiro']),
        true
      ])
      
      console.log('✅ Usuário administrador criado')
    } else {
      console.log(`✅ ${totalUsers} usuários já existem no banco`)
    }

    // Inserir tipos de movimento padrão
    const [movementCount] = await connection.execute('SELECT COUNT(*) as total FROM tipos_movimentos')
    const totalMovements = (movementCount as any[])[0].total

    if (totalMovements === 0) {
      console.log('📝 Inserindo tipos de movimento padrão...')
      
      const defaultMovements = [
        { id: 'mov-001', descricao: 'Compra de Mercadorias', tipo: 'entrada' },
        { id: 'mov-002', descricao: 'Venda de Produtos', tipo: 'saida' },
        { id: 'mov-003', descricao: 'Ajuste de Estoque', tipo: 'entrada' },
        { id: 'mov-004', descricao: 'Perda/Quebra', tipo: 'saida' },
        { id: 'mov-005', descricao: 'Transferência entre Filiais', tipo: 'entrada' }
      ]

      for (const movement of defaultMovements) {
        await connection.execute(`
          INSERT INTO tipos_movimentos (id, descricao, tipo, ativo, created_at, updated_at)
          VALUES (?, ?, ?, ?, NOW(), NOW())
        `, [movement.id, movement.descricao, movement.tipo, true])
      }
      
      console.log('✅ Tipos de movimento criados')
    } else {
      console.log(`✅ ${totalMovements} tipos de movimento já existem`)
    }

    // Inserir contas padrão
    const [accountCount] = await connection.execute('SELECT COUNT(*) as total FROM contas')
    const totalAccounts = (accountCount as any[])[0].total

    if (totalAccounts === 0) {
      console.log('📝 Inserindo contas padrão...')
      
      const defaultAccounts = [
        { id: 'acc-001', descricao: 'Vendas de Produtos', tipo: 'credito', categoria: 'vendas' },
        { id: 'acc-002', descricao: 'Compras de Mercadorias', tipo: 'debito', categoria: 'despesas' },
        { id: 'acc-003', descricao: 'Despesas Operacionais', tipo: 'debito', categoria: 'despesas' },
        { id: 'acc-004', descricao: 'Investimentos', tipo: 'debito', categoria: 'investimentos' },
        { id: 'acc-005', descricao: 'Outras Receitas', tipo: 'credito', categoria: 'outras_receitas' }
      ]

      for (const account of defaultAccounts) {
        await connection.execute(`
          INSERT INTO contas (id, descricao, tipo, categoria, ativo, created_at, updated_at)
          VALUES (?, ?, ?, ?, ?, NOW(), NOW())
        `, [account.id, account.descricao, account.tipo, account.categoria, true])
      }
      
      console.log('✅ Contas padrão criadas')
    } else {
      console.log(`✅ ${totalAccounts} contas já existem`)
    }

    console.log('\n🎉 Configuração do banco concluída com sucesso!')
    console.log('💡 Execute "npm run db:check" para testar a conexão')

  } catch (error: any) {
    console.error('❌ Erro na configuração:', error.message)
    process.exit(1)
  } finally {
    if (connection) {
      await connection.end()
      console.log('\n🔌 Conexão encerrada.')
    }
  }
}

// Executar setup
setupDatabase().catch(error => {
  console.error('❌ Erro inesperado:', error)
  process.exit(1)
})

