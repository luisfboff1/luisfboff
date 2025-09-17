'use client'

import { useState } from 'react'

export default function DataManager() {
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleExportCSV = async () => {
    setIsLoading(true)
    setMessage('')
    
    try {
      const response = await fetch('/api/migrate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'export-csv' })
      })

      if (!response.ok) {
        throw new Error('Erro ao exportar dados')
      }

      const result = await response.json()
      setMessage(`✅ ${result.message}`)
    } catch (error) {
      console.error('Erro ao exportar CSV:', error)
      setMessage('❌ Erro ao exportar dados para CSV')
    } finally {
      setIsLoading(false)
    }
  }

  const handleMigrateToSupabase = async () => {
    setIsLoading(true)
    setMessage('')
    
    try {
      const response = await fetch('/api/migrate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'migrate-supabase' })
      })

      if (!response.ok) {
        throw new Error('Erro na migração')
      }

      const result = await response.json()
      setMessage(`✅ ${result.message}`)
    } catch (error) {
      console.error('Erro na migração:', error)
      setMessage('❌ Erro na migração para Supabase')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="card">
      <h3>Gerenciador de Dados</h3>
      <p className="muted">
        Ferramentas para gerenciar dados locais e migração para Supabase
      </p>
      
      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <button 
          className="btn btn-outline" 
          onClick={handleExportCSV}
          disabled={isLoading}
        >
          {isLoading ? 'Exportando...' : 'Exportar para CSV'}
        </button>
        
        <button 
          className="btn" 
          onClick={handleMigrateToSupabase}
          disabled={isLoading}
        >
          {isLoading ? 'Migrando...' : 'Migrar para Supabase'}
        </button>
      </div>
      
      {message && (
        <div 
          className="card" 
          style={{ 
            marginTop: '1rem', 
            backgroundColor: message.includes('Erro') ? '#fee' : '#efe',
            border: `1px solid ${message.includes('Erro') ? '#fcc' : '#cfc'}`
          }}
        >
          {message}
        </div>
      )}
      
      <div className="card" style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
        <h4>Instruções:</h4>
        <ul>
          <li><strong>Exportar para CSV:</strong> Cria arquivos CSV na pasta data/export/</li>
          <li><strong>Migrar para Supabase:</strong> Move todos os dados locais para o Supabase</li>
          <li>Certifique-se de configurar as variáveis de ambiente do Supabase antes da migração</li>
        </ul>
      </div>
    </div>
  )
}
