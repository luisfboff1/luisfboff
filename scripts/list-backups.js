#!/usr/bin/env node

/**
 * Script para listar backups disponíveis na Hostinger
 * Execute: node scripts/list-backups.js
 */

const ftp = require('basic-ftp')

async function listBackups() {
  console.log('🔍 Listando backups disponíveis na Hostinger...\n')
  
  const client = new ftp.Client()
  
  try {
    // Conectar ao FTP
    await client.access({
      host: process.env.FTP_SERVER || 'ftp.hostinger.com',
      user: process.env.FTP_USERNAME,
      password: process.env.FTP_PASSWORD,
      secure: false
    })
    
    // Navegar para pasta de backups
    await client.cd('/public_html/admin/backup/')
    
    // Listar diretórios de backup
    const files = await client.list()
    const backups = files
      .filter(file => file.isDirectory)
      .map(file => ({
        name: file.name,
        date: file.date,
        size: file.size
      }))
      .sort((a, b) => new Date(b.date) - new Date(a.date))
    
    if (backups.length === 0) {
      console.log('❌ Nenhum backup encontrado')
      console.log('💡 Faça um deploy primeiro para criar backups automáticos')
      return
    }
    
    console.log(`📦 ${backups.length} backups encontrados:\n`)
    
    backups.forEach((backup, index) => {
      const date = new Date(backup.date).toLocaleString('pt-BR')
      console.log(`${index + 1}. ${backup.name}`)
      console.log(`   📅 Data: ${date}`)
      console.log(`   📁 Tamanho: ${backup.size} bytes`)
      console.log('')
    })
    
    console.log('🔄 Para fazer rollback, use:')
    console.log('   GitHub Actions → Rollback to Previous Version')
    console.log(`   Backup Version: ${backups[0].name}`)
    
  } catch (error) {
    console.error('❌ Erro ao listar backups:', error.message)
    console.log('\n💡 Verifique se:')
    console.log('   - As credenciais FTP estão corretas')
    console.log('   - O servidor FTP está acessível')
    console.log('   - A pasta de backup existe')
  } finally {
    client.close()
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  listBackups().catch(console.error)
}

module.exports = { listBackups }
