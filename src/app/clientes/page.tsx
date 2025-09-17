'use client'

import { useState, useEffect } from 'react'
import { clientesFornecedoresDB, vendedoresDB, ClienteFornecedor, Vendedor } from '@/lib/database-client'

export default function ClientesPage() {
  const [clientes, setClientes] = useState<ClienteFornecedor[]>([])
  const [vendedores, setVendedores] = useState<Vendedor[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingCliente, setEditingCliente] = useState<ClienteFornecedor | undefined>()

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      const [clientesData, vendedoresData] = await Promise.all([
        clientesFornecedoresDB.getAll(),
        vendedoresDB.getAll()
      ])
      setClientes(clientesData)
      setVendedores(vendedoresData)
    } catch (error) {
      console.error('Erro ao carregar dados:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredClientes = clientes.filter(cliente => {
    const matchesSearch = cliente.nome_razao_social.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cliente.cpf_cnpj.includes(searchTerm) ||
                         (cliente.email && cliente.email.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesType = !selectedType || cliente.tipo === selectedType
    return matchesSearch && matchesType
  })

  const getVendedorName = (vendedorId?: string) => {
    if (!vendedorId) return '-'
    const vendedor = vendedores.find(v => v.id === vendedorId)
    return vendedor ? vendedor.nome : '-'
  }

  const handleNewCliente = () => {
    setEditingCliente(undefined)
    setShowForm(true)
  }

  const handleEditCliente = (cliente: ClienteFornecedor) => {
    setEditingCliente(cliente)
    setShowForm(true)
  }

  const handleFormSave = () => {
    setShowForm(false)
    setEditingCliente(undefined)
    loadData()
  }

  const handleFormCancel = () => {
    setShowForm(false)
    setEditingCliente(undefined)
  }

  return (
    <main className="container">
      <section className="section">
        <h1>Gestão de Clientes e Fornecedores</h1>
        <p>Cadastre e gerencie clientes e fornecedores.</p>
        
        <div style={{marginTop: '1rem', display: 'flex', gap: '.75rem', flexWrap: 'wrap'}}>
          <button className="btn" onClick={handleNewCliente}>Novo Cliente/Fornecedor</button>
          <button className="btn btn-outline" onClick={loadData}>
            Atualizar
          </button>
        </div>
      </section>

      <section className="section">
        <h2>Clientes e Fornecedores ({filteredClientes.length})</h2>
        <div className="card">
          <div style={{display: 'flex', gap: '1rem', marginBottom: '1rem'}}>
            <input 
              type="text" 
              className="input" 
              placeholder="Buscar por nome, CPF/CNPJ ou email..." 
              style={{flex: 1}}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select 
              className="select" 
              style={{width: '200px'}}
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="">Todos os tipos</option>
              <option value="fisica">Pessoa Física</option>
              <option value="juridica">Pessoa Jurídica</option>
            </select>
          </div>
          
          {loading ? (
            <div style={{textAlign: 'center', padding: '2rem'}}>
              Carregando dados...
            </div>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Tipo</th>
                  <th>CPF/CNPJ</th>
                  <th>Nome/Razão Social</th>
                  <th>Email</th>
                  <th>Telefone</th>
                  <th>Vendedor</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredClientes.map(cliente => (
                  <tr key={cliente.id}>
                    <td>
                      <span style={{
                        padding: '0.25rem 0.5rem',
                        borderRadius: '0.25rem',
                        fontSize: '0.8rem',
                        backgroundColor: cliente.tipo === 'fisica' ? '#e3f2fd' : '#f3e5f5',
                        color: cliente.tipo === 'fisica' ? '#1976d2' : '#7b1fa2'
                      }}>
                        {cliente.tipo === 'fisica' ? 'PF' : 'PJ'}
                      </span>
                    </td>
                    <td><code>{cliente.cpf_cnpj}</code></td>
                    <td>
                      <div>
                        <div style={{fontWeight: '600'}}>{cliente.nome_razao_social}</div>
                        {cliente.nome_fantasia && (
                          <div className="muted" style={{fontSize: '0.9rem'}}>
                            {cliente.nome_fantasia}
                          </div>
                        )}
                      </div>
                    </td>
                    <td>{cliente.email || '-'}</td>
                    <td>{cliente.telefone || '-'}</td>
                    <td>{getVendedorName(cliente.vendedor_id)}</td>
                    <td>
                      <span className={cliente.ativo ? 'text-green' : 'text-red'} style={{fontSize: '0.9rem'}}>
                        {cliente.ativo ? 'Ativo' : 'Inativo'}
                      </span>
                    </td>
                    <td>
                      <button 
                        className="btn" 
                        style={{padding: '.25rem .5rem', fontSize: '12px'}}
                        onClick={() => handleEditCliente(cliente)}
                      >
                        Editar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {!loading && filteredClientes.length === 0 && (
            <div style={{textAlign: 'center', padding: '2rem', color: '#666'}}>
              {searchTerm || selectedType
                ? 'Nenhum cliente/fornecedor encontrado com os filtros aplicados.' 
                : 'Nenhum cliente/fornecedor cadastrado.'}
            </div>
          )}
        </div>
      </section>

      <section className="section">
        <h2>Resumo</h2>
        <div className="grid">
          <div className="card">
            <h3>Total</h3>
            <div style={{fontSize: '2rem', fontWeight: 'bold', color: 'var(--wc-orange)'}}>
              {clientes.length}
            </div>
          </div>
          <div className="card">
            <h3>Pessoas Físicas</h3>
            <div style={{fontSize: '2rem', fontWeight: 'bold', color: '#1976d2'}}>
              {clientes.filter(c => c.tipo === 'fisica').length}
            </div>
          </div>
          <div className="card">
            <h3>Pessoas Jurídicas</h3>
            <div style={{fontSize: '2rem', fontWeight: 'bold', color: '#7b1fa2'}}>
              {clientes.filter(c => c.tipo === 'juridica').length}
            </div>
          </div>
          <div className="card">
            <h3>Ativos</h3>
            <div style={{fontSize: '2rem', fontWeight: 'bold', color: '#28a745'}}>
              {clientes.filter(c => c.ativo).length}
            </div>
          </div>
        </div>
      </section>

      {showForm && (
        <section className="section">
          <ClienteForm
            cliente={editingCliente}
            vendedores={vendedores}
            onSave={handleFormSave}
            onCancel={handleFormCancel}
          />
        </section>
      )}
    </main>
  )
}

// Componente de formulário para clientes/fornecedores
function ClienteForm({ cliente, vendedores, onSave, onCancel }: {
  cliente?: ClienteFornecedor
  vendedores: Vendedor[]
  onSave: () => void
  onCancel: () => void
}) {
  const [formData, setFormData] = useState({
    tipo: cliente?.tipo || 'fisica' as 'fisica' | 'juridica',
    cpf_cnpj: cliente?.cpf_cnpj || '',
    nome_razao_social: cliente?.nome_razao_social || '',
    nome_fantasia: cliente?.nome_fantasia || '',
    email: cliente?.email || '',
    telefone: cliente?.telefone || '',
    endereco: cliente?.endereco || '',
    cidade: cliente?.cidade || '',
    estado: cliente?.estado || '',
    cep: cliente?.cep || '',
    vendedor_id: cliente?.vendedor_id || '',
    ativo: cliente?.ativo ?? true
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const dataToSave = {
        ...formData,
        vendedor_id: formData.vendedor_id || undefined
      }
      
      if (cliente) {
        await clientesFornecedoresDB.update(cliente.id, dataToSave)
      } else {
        await clientesFornecedoresDB.create(dataToSave)
      }
      onSave()
    } catch (err) {
      setError('Erro ao salvar cliente/fornecedor')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  return (
    <div className="card">
      <h3>{cliente ? 'Editar Cliente/Fornecedor' : 'Novo Cliente/Fornecedor'}</h3>
      
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
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
            Tipo *
          </label>
          <select
            name="tipo"
            value={formData.tipo}
            onChange={handleChange}
            className="select"
            required
          >
            <option value="fisica">Pessoa Física</option>
            <option value="juridica">Pessoa Jurídica</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
            {formData.tipo === 'fisica' ? 'CPF' : 'CNPJ'} *
          </label>
          <input
            type="text"
            name="cpf_cnpj"
            value={formData.cpf_cnpj}
            onChange={handleChange}
            className="input"
            required
            placeholder={formData.tipo === 'fisica' ? '000.000.000-00' : '00.000.000/0000-00'}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
            {formData.tipo === 'fisica' ? 'Nome Completo' : 'Razão Social'} *
          </label>
          <input
            type="text"
            name="nome_razao_social"
            value={formData.nome_razao_social}
            onChange={handleChange}
            className="input"
            required
            placeholder={formData.tipo === 'fisica' ? 'Nome completo' : 'Razão social'}
          />
        </div>

        {formData.tipo === 'juridica' && (
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
              Nome Fantasia
            </label>
            <input
              type="text"
              name="nome_fantasia"
              value={formData.nome_fantasia}
              onChange={handleChange}
              className="input"
              placeholder="Nome fantasia"
            />
          </div>
        )}

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
            Endereço
          </label>
          <input
            type="text"
            name="endereco"
            value={formData.endereco}
            onChange={handleChange}
            className="input"
            placeholder="Rua, número, bairro"
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
              Cidade
            </label>
            <input
              type="text"
              name="cidade"
              value={formData.cidade}
              onChange={handleChange}
              className="input"
              placeholder="Cidade"
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
              Estado
            </label>
            <input
              type="text"
              name="estado"
              value={formData.estado}
              onChange={handleChange}
              className="input"
              placeholder="SP"
              maxLength={2}
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
              CEP
            </label>
            <input
              type="text"
              name="cep"
              value={formData.cep}
              onChange={handleChange}
              className="input"
              placeholder="00000-000"
            />
          </div>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
            Vendedor Responsável
          </label>
          <select
            name="vendedor_id"
            value={formData.vendedor_id}
            onChange={handleChange}
            className="select"
          >
            <option value="">Selecione um vendedor</option>
            {vendedores.filter(v => v.ativo).map(vendedor => (
              <option key={vendedor.id} value={vendedor.id}>
                {vendedor.nome}
              </option>
            ))}
          </select>
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
            Cliente/Fornecedor ativo
          </label>
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <button 
            type="submit" 
            className="btn"
            disabled={loading}
          >
            {loading ? 'Salvando...' : (cliente ? 'Atualizar' : 'Criar')}
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
