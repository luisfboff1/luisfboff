'use client'

import { useState, useEffect } from 'react'
import { 
  movimentosEstoqueDB, 
  produtosDB, 
  clientesFornecedoresDB, 
  tiposMovimentosDB,
  MovimentoEstoque, 
  Produto, 
  ClienteFornecedor, 
  TipoMovimento 
} from '@/lib/database-client'

export default function EstoquePage() {
  const [movimentos, setMovimentos] = useState<MovimentoEstoque[]>([])
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [clientes, setClientes] = useState<ClienteFornecedor[]>([])
  const [tiposMovimentos, setTiposMovimentos] = useState<TipoMovimento[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTipo, setSelectedTipo] = useState('')
  const [selectedLocal, setSelectedLocal] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingMovimento, setEditingMovimento] = useState<MovimentoEstoque | undefined>()

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      const [movimentosData, produtosData, clientesData, tiposData] = await Promise.all([
        movimentosEstoqueDB.getAll(),
        produtosDB.getAll(),
        clientesFornecedoresDB.getAll(),
        tiposMovimentosDB.getAll()
      ])
      setMovimentos(movimentosData)
      setProdutos(produtosData)
      setClientes(clientesData)
      setTiposMovimentos(tiposData)
    } catch (error) {
      console.error('Erro ao carregar dados:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredMovimentos = movimentos.filter(movimento => {
    const produto = produtos.find(p => p.id === movimento.produto_id)
    const cliente = clientes.find(c => c.id === movimento.cliente_fornecedor_id)
    const tipo = tiposMovimentos.find(t => t.id === movimento.tipo_movimento_id)
    
    const matchesSearch = movimento.documento.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (produto && produto.nome.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         (cliente && cliente.nome_razao_social.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesTipo = !selectedTipo || (tipo && tipo.tipo === selectedTipo)
    const matchesLocal = !selectedLocal || movimento.estoque_local === selectedLocal
    
    return matchesSearch && matchesTipo && matchesLocal
  })

  const getProdutoName = (produtoId: string) => {
    const produto = produtos.find(p => p.id === produtoId)
    return produto ? produto.nome : 'Produto não encontrado'
  }

  const getClienteName = (clienteId: string) => {
    const cliente = clientes.find(c => c.id === clienteId)
    return cliente ? cliente.nome_razao_social : 'Cliente não encontrado'
  }

  const getTipoMovimento = (tipoId: string) => {
    const tipo = tiposMovimentos.find(t => t.id === tipoId)
    return tipo ? tipo.descricao : 'Tipo não encontrado'
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR')
  }

  const handleNewMovimento = () => {
    setEditingMovimento(undefined)
    setShowForm(true)
  }

  const handleEditMovimento = (movimento: MovimentoEstoque) => {
    setEditingMovimento(movimento)
    setShowForm(true)
  }

  const handleFormSave = () => {
    setShowForm(false)
    setEditingMovimento(undefined)
    loadData()
  }

  const handleFormCancel = () => {
    setShowForm(false)
    setEditingMovimento(undefined)
  }

  // Calcular totais
  const totalEntradas = movimentos
    .filter(m => tiposMovimentos.find(t => t.id === m.tipo_movimento_id)?.tipo === 'entrada')
    .reduce((sum, m) => sum + m.quantidade, 0)

  const totalSaidas = movimentos
    .filter(m => tiposMovimentos.find(t => t.id === m.tipo_movimento_id)?.tipo === 'saida')
    .reduce((sum, m) => sum + m.quantidade, 0)

  const valorTotalEntradas = movimentos
    .filter(m => tiposMovimentos.find(t => t.id === m.tipo_movimento_id)?.tipo === 'entrada')
    .reduce((sum, m) => sum + m.valor_total, 0)

  const valorTotalSaidas = movimentos
    .filter(m => tiposMovimentos.find(t => t.id === m.tipo_movimento_id)?.tipo === 'saida')
    .reduce((sum, m) => sum + m.valor_total, 0)

  return (
    <main className="container">
      <section className="section">
        <h1>Movimentação de Estoque</h1>
        <p>Controle entradas e saídas de produtos no estoque.</p>
        
        <div style={{marginTop: '1rem', display: 'flex', gap: '.75rem', flexWrap: 'wrap'}}>
          <button className="btn" onClick={handleNewMovimento}>Nova Movimentação</button>
          <button className="btn btn-outline" onClick={loadData}>
            Atualizar
          </button>
        </div>
      </section>

      <section className="section">
        <h2>Resumo de Movimentações</h2>
        <div className="grid">
          <div className="card">
            <h3>Total de Entradas</h3>
            <div style={{fontSize: '2rem', fontWeight: 'bold', color: '#28a745'}}>
              {totalEntradas}
            </div>
            <div className="muted">
              Valor: {formatCurrency(valorTotalEntradas)}
            </div>
          </div>
          <div className="card">
            <h3>Total de Saídas</h3>
            <div style={{fontSize: '2rem', fontWeight: 'bold', color: '#dc3545'}}>
              {totalSaidas}
            </div>
            <div className="muted">
              Valor: {formatCurrency(valorTotalSaidas)}
            </div>
          </div>
          <div className="card">
            <h3>Saldo Líquido</h3>
            <div style={{fontSize: '2rem', fontWeight: 'bold', color: 'var(--wc-orange)'}}>
              {totalEntradas - totalSaidas}
            </div>
            <div className="muted">
              Valor: {formatCurrency(valorTotalEntradas - valorTotalSaidas)}
            </div>
          </div>
          <div className="card">
            <h3>Total de Movimentos</h3>
            <div style={{fontSize: '2rem', fontWeight: 'bold', color: '#6c757d'}}>
              {movimentos.length}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>Histórico de Movimentações ({filteredMovimentos.length})</h2>
        <div className="card">
          <div style={{display: 'flex', gap: '1rem', marginBottom: '1rem'}}>
            <input 
              type="text" 
              className="input" 
              placeholder="Buscar por documento, produto ou cliente..." 
              style={{flex: 1}}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select 
              className="select" 
              style={{width: '150px'}}
              value={selectedTipo}
              onChange={(e) => setSelectedTipo(e.target.value)}
            >
              <option value="">Todos os tipos</option>
              <option value="entrada">Entrada</option>
              <option value="saida">Saída</option>
            </select>
            <select 
              className="select" 
              style={{width: '120px'}}
              value={selectedLocal}
              onChange={(e) => setSelectedLocal(e.target.value)}
            >
              <option value="">Todos os locais</option>
              <option value="RS">RS</option>
              <option value="SP">SP</option>
            </select>
          </div>
          
          {loading ? (
            <div style={{textAlign: 'center', padding: '2rem'}}>
              Carregando movimentações...
            </div>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Documento</th>
                  <th>Tipo</th>
                  <th>Produto</th>
                  <th>Cliente/Fornecedor</th>
                  <th>Quantidade</th>
                  <th>Valor Unit.</th>
                  <th>Valor Total</th>
                  <th>Local</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredMovimentos.map(movimento => {
                  const tipo = tiposMovimentos.find(t => t.id === movimento.tipo_movimento_id)
                  return (
                    <tr key={movimento.id}>
                      <td>{formatDate(movimento.data)}</td>
                      <td><code>{movimento.documento}</code></td>
                      <td>
                        <span style={{
                          padding: '0.25rem 0.5rem',
                          borderRadius: '0.25rem',
                          fontSize: '0.8rem',
                          backgroundColor: tipo?.tipo === 'entrada' ? '#d4edda' : '#f8d7da',
                          color: tipo?.tipo === 'entrada' ? '#155724' : '#721c24'
                        }}>
                          {getTipoMovimento(movimento.tipo_movimento_id)}
                        </span>
                      </td>
                      <td>{getProdutoName(movimento.produto_id)}</td>
                      <td>{getClienteName(movimento.cliente_fornecedor_id)}</td>
                      <td style={{fontWeight: '600'}}>{movimento.quantidade}</td>
                      <td>{formatCurrency(movimento.valor_unitario)}</td>
                      <td style={{fontWeight: '600'}}>{formatCurrency(movimento.valor_total)}</td>
                      <td>
                        <span style={{
                          padding: '0.25rem 0.5rem',
                          borderRadius: '0.25rem',
                          fontSize: '0.8rem',
                          backgroundColor: movimento.estoque_local === 'RS' ? '#e3f2fd' : '#f3e5f5',
                          color: movimento.estoque_local === 'RS' ? '#1976d2' : '#7b1fa2'
                        }}>
                          {movimento.estoque_local}
                        </span>
                      </td>
                      <td>
                        <button 
                          className="btn" 
                          style={{padding: '.25rem .5rem', fontSize: '12px'}}
                          onClick={() => handleEditMovimento(movimento)}
                        >
                          Editar
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}

          {!loading && filteredMovimentos.length === 0 && (
            <div style={{textAlign: 'center', padding: '2rem', color: '#666'}}>
              {searchTerm || selectedTipo || selectedLocal
                ? 'Nenhuma movimentação encontrada com os filtros aplicados.' 
                : 'Nenhuma movimentação registrada.'}
            </div>
          )}
        </div>
      </section>

      {showForm && (
        <section className="section">
          <MovimentoForm
            movimento={editingMovimento}
            produtos={produtos}
            clientes={clientes}
            tiposMovimentos={tiposMovimentos}
            onSave={handleFormSave}
            onCancel={handleFormCancel}
          />
        </section>
      )}
    </main>
  )
}

// Componente de formulário para movimentações
function MovimentoForm({ movimento, produtos, clientes, tiposMovimentos, onSave, onCancel }: {
  movimento?: MovimentoEstoque
  produtos: Produto[]
  clientes: ClienteFornecedor[]
  tiposMovimentos: TipoMovimento[]
  onSave: () => void
  onCancel: () => void
}) {
  const [formData, setFormData] = useState({
    documento: movimento?.documento || '',
    cliente_fornecedor_id: movimento?.cliente_fornecedor_id || '',
    data: movimento?.data || new Date().toISOString().split('T')[0],
    quantidade: movimento?.quantidade || 0,
    valor_unitario: movimento?.valor_unitario || 0,
    valor_total: movimento?.valor_total || 0,
    tipo_movimento_id: movimento?.tipo_movimento_id || '',
    produto_id: movimento?.produto_id || '',
    estoque_local: movimento?.estoque_local || 'SP' as 'RS' | 'SP',
    observacoes: movimento?.observacoes || ''
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Calcular valor total automaticamente
      const valorTotal = formData.quantidade * formData.valor_unitario
      const dataToSave = {
        ...formData,
        valor_total: valorTotal
      }
      
      if (movimento) {
        await movimentosEstoqueDB.update(movimento.id, dataToSave)
      } else {
        await movimentosEstoqueDB.create(dataToSave)
      }
      onSave()
    } catch (err) {
      setError('Erro ao salvar movimentação')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value
    }))
  }

  return (
    <div className="card">
      <h3>{movimento ? 'Editar Movimentação' : 'Nova Movimentação'}</h3>
      
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
              Documento *
            </label>
            <input
              type="text"
              name="documento"
              value={formData.documento}
              onChange={handleChange}
              className="input"
              required
              placeholder="Ex: NF-001, AJ-001"
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
              Data *
            </label>
            <input
              type="date"
              name="data"
              value={formData.data}
              onChange={handleChange}
              className="input"
              required
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
              Produto *
            </label>
            <select
              name="produto_id"
              value={formData.produto_id}
              onChange={handleChange}
              className="select"
              required
            >
              <option value="">Selecione um produto</option>
              {produtos.filter(p => p.ativo).map(produto => (
                <option key={produto.id} value={produto.id}>
                  {produto.codigo} - {produto.nome}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
              Cliente/Fornecedor *
            </label>
            <select
              name="cliente_fornecedor_id"
              value={formData.cliente_fornecedor_id}
              onChange={handleChange}
              className="select"
              required
            >
              <option value="">Selecione um cliente/fornecedor</option>
              {clientes.filter(c => c.ativo).map(cliente => (
                <option key={cliente.id} value={cliente.id}>
                  {cliente.nome_razao_social}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
              Tipo de Movimento *
            </label>
            <select
              name="tipo_movimento_id"
              value={formData.tipo_movimento_id}
              onChange={handleChange}
              className="select"
              required
            >
              <option value="">Selecione o tipo</option>
              {tiposMovimentos.filter(t => t.ativo).map(tipo => (
                <option key={tipo.id} value={tipo.id}>
                  {tipo.descricao} ({tipo.tipo})
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
              Local do Estoque *
            </label>
            <select
              name="estoque_local"
              value={formData.estoque_local}
              onChange={handleChange}
              className="select"
              required
            >
              <option value="SP">São Paulo (SP)</option>
              <option value="RS">Rio Grande do Sul (RS)</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
              Quantidade *
            </label>
            <input
              type="number"
              name="quantidade"
              value={formData.quantidade}
              onChange={handleChange}
              className="input"
              min="0"
              step="0.01"
              required
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
              Valor Unitário *
            </label>
            <input
              type="number"
              name="valor_unitario"
              value={formData.valor_unitario}
              onChange={handleChange}
              className="input"
              min="0"
              step="0.01"
              required
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
              Valor Total
            </label>
            <input
              type="number"
              value={formData.quantidade * formData.valor_unitario}
              className="input"
              disabled
              style={{ backgroundColor: '#f8f9fa' }}
            />
          </div>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
            Observações
          </label>
          <textarea
            name="observacoes"
            value={formData.observacoes}
            onChange={handleChange}
            className="input"
            rows={3}
            placeholder="Observações adicionais sobre a movimentação"
          />
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <button 
            type="submit" 
            className="btn"
            disabled={loading}
          >
            {loading ? 'Salvando...' : (movimento ? 'Atualizar' : 'Criar')}
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