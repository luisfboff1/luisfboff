'use client'

import { useState, useEffect } from 'react'
import { vendedoresDB, Vendedor } from '@/lib/database-client'

export default function VendedoresPage() {
  const [vendedores, setVendedores] = useState<Vendedor[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingVendedor, setEditingVendedor] = useState<Vendedor | undefined>()

  useEffect(() => {
    loadVendedores()
  }, [])

  const loadVendedores = async () => {
    try {
      setLoading(true)
      const data = await vendedoresDB.getAll()
      setVendedores(data)
    } catch (error) {
      console.error('Erro ao carregar vendedores:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredVendedores = vendedores.filter(vendedor =>
    vendedor.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vendedor.cpf.includes(searchTerm) ||
    (vendedor.email && vendedor.email.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  const handleNewVendedor = () => {
    setEditingVendedor(undefined)
    setShowForm(true)
  }

  const handleEditVendedor = (vendedor: Vendedor) => {
    setEditingVendedor(vendedor)
    setShowForm(true)
  }

  const handleFormSave = () => {
    setShowForm(false)
    setEditingVendedor(undefined)
    loadVendedores()
  }

  const handleFormCancel = () => {
    setShowForm(false)
    setEditingVendedor(undefined)
  }

  return (
    <main className="container">
      <section className="section">
        <h1>Gestão de Vendedores</h1>
        <p>Cadastre e gerencie sua equipe de vendas.</p>
        
        <div style={{marginTop: '1rem', display: 'flex', gap: '.75rem', flexWrap: 'wrap'}}>
          <button className="btn" onClick={handleNewVendedor}>Novo Vendedor</button>
          <button className="btn btn-outline" onClick={loadVendedores}>
            Atualizar
          </button>
        </div>
      </section>

      <section className="section">
        <h2>Vendedores Cadastrados ({filteredVendedores.length})</h2>
        <div className="card">
          <div style={{display: 'flex', gap: '1rem', marginBottom: '1rem'}}>
            <input 
              type="text" 
              className="input" 
              placeholder="Buscar vendedor..." 
              style={{flex: 1}}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {loading ? (
            <div style={{textAlign: 'center', padding: '2rem'}}>
              Carregando vendedores...
            </div>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>CPF</th>
                  <th>Nome</th>
                  <th>Email</th>
                  <th>Telefone</th>
                  <th>Comissão</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredVendedores.map(vendedor => (
                  <tr key={vendedor.id}>
                    <td><code>{vendedor.cpf}</code></td>
                    <td style={{fontWeight: '600'}}>{vendedor.nome}</td>
                    <td>{vendedor.email || '-'}</td>
                    <td>{vendedor.telefone || '-'}</td>
                    <td style={{fontWeight: '600', color: 'var(--wc-orange)'}}>
                      {vendedor.comissao_percentual}%
                    </td>
                    <td>
                      <span className={vendedor.ativo ? 'text-green' : 'text-red'} style={{fontSize: '0.9rem'}}>
                        {vendedor.ativo ? 'Ativo' : 'Inativo'}
                      </span>
                    </td>
                    <td>
                      <button 
                        className="btn" 
                        style={{padding: '.25rem .5rem', fontSize: '12px'}}
                        onClick={() => handleEditVendedor(vendedor)}
                      >
                        Editar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {!loading && filteredVendedores.length === 0 && (
            <div style={{textAlign: 'center', padding: '2rem', color: '#666'}}>
              {searchTerm 
                ? 'Nenhum vendedor encontrado com os filtros aplicados.' 
                : 'Nenhum vendedor cadastrado.'}
            </div>
          )}
        </div>
      </section>

      <section className="section">
        <h2>Resumo da Equipe</h2>
        <div className="grid">
          <div className="card">
            <h3>Total de Vendedores</h3>
            <div style={{fontSize: '2rem', fontWeight: 'bold', color: 'var(--wc-orange)'}}>
              {vendedores.length}
            </div>
          </div>
          <div className="card">
            <h3>Vendedores Ativos</h3>
            <div style={{fontSize: '2rem', fontWeight: 'bold', color: '#28a745'}}>
              {vendedores.filter(v => v.ativo).length}
            </div>
          </div>
          <div className="card">
            <h3>Comissão Média</h3>
            <div style={{fontSize: '2rem', fontWeight: 'bold', color: '#ff6b35'}}>
              {vendedores.length > 0 
                ? (vendedores.reduce((sum, v) => sum + v.comissao_percentual, 0) / vendedores.length).toFixed(1) + '%'
                : '0%'
              }
            </div>
          </div>
          <div className="card">
            <h3>Maior Comissão</h3>
            <div style={{fontSize: '2rem', fontWeight: 'bold', color: '#dc3545'}}>
              {vendedores.length > 0 
                ? Math.max(...vendedores.map(v => v.comissao_percentual)) + '%'
                : '0%'
              }
            </div>
          </div>
        </div>
      </section>

      {showForm && (
        <section className="section">
          <VendedorForm
            vendedor={editingVendedor}
            onSave={handleFormSave}
            onCancel={handleFormCancel}
          />
        </section>
      )}
    </main>
  )
}

// Componente de formulário para vendedores
function VendedorForm({ vendedor, onSave, onCancel }: {
  vendedor?: Vendedor
  onSave: () => void
  onCancel: () => void
}) {
  const [formData, setFormData] = useState({
    cpf: vendedor?.cpf || '',
    nome: vendedor?.nome || '',
    email: vendedor?.email || '',
    telefone: vendedor?.telefone || '',
    comissao_percentual: vendedor?.comissao_percentual || 0,
    ativo: vendedor?.ativo ?? true
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      if (vendedor) {
        await vendedoresDB.update(vendedor.id, formData)
      } else {
        await vendedoresDB.create(formData)
      }
      onSave()
    } catch (err) {
      setError('Erro ao salvar vendedor')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : 
              type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  return (
    <div className="card">
      <h3>{vendedor ? 'Editar Vendedor' : 'Novo Vendedor'}</h3>
      
      {error && (
        <div style={{ 
          padding: '1rem', 
          backgroundColor: '#fee', 
          border: '1px solid #fcc',
          borderRadius: '0.5rem',
          marginBottom: '1rem',
          color: '#c33'
        }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
              CPF *
            </label>
            <input
              type="text"
              name="cpf"
              value={formData.cpf}
              onChange={handleChange}
              className="input"
              required
              placeholder="000.000.000-00"
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
              Nome *
            </label>
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              className="input"
              required
              placeholder="Nome completo"
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input"
              placeholder="email@exemplo.com"
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
              Telefone
            </label>
            <input
              type="text"
              name="telefone"
              value={formData.telefone}
              onChange={handleChange}
              className="input"
              placeholder="(11) 99999-9999"
            />
          </div>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
            Comissão (%) *
          </label>
          <input
            type="number"
            name="comissao_percentual"
            value={formData.comissao_percentual}
            onChange={handleChange}
            className="input"
            step="0.1"
            min="0"
            max="100"
            required
            placeholder="5.0"
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <input
            type="checkbox"
            name="ativo"
            checked={formData.ativo}
            onChange={handleChange}
            id="ativo"
          />
          <label htmlFor="ativo" style={{ fontWeight: '600' }}>
            Vendedor ativo
          </label>
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <button 
            type="submit" 
            className="btn"
            disabled={loading}
          >
            {loading ? 'Salvando...' : (vendedor ? 'Atualizar' : 'Criar')}
          </button>
          <button 
            type="button" 
            className="btn btn-outline"
            onClick={onCancel}
            disabled={loading}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  )
}