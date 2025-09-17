'use client'

import { useState, useEffect } from 'react'

interface RelatorioVendasModalProps {
  isOpen: boolean
  onClose: () => void
}

interface VendaData {
  id: string
  data: string
  cliente: string
  vendedor: string
  total: number
  itens: number
  status: string
}

export default function RelatorioVendasModal({ isOpen, onClose }: RelatorioVendasModalProps) {
  const [filtros, setFiltros] = useState({
    dataInicio: '',
    dataFim: '',
    vendedor: '',
    status: 'todos'
  })
  
  const [vendas, setVendas] = useState<VendaData[]>([])
  const [loading, setLoading] = useState(false)
  const [resumo, setResumo] = useState({
    totalVendas: 0,
    totalValor: 0,
    ticketMedio: 0,
    vendedorDestaque: ''
  })

  // Dados mockados para demonstração
  const vendasMock: VendaData[] = [
    {
      id: '1023',
      data: '2025-01-08',
      cliente: 'Ana Souza',
      vendedor: 'Carla',
      total: 189.90,
      itens: 3,
      status: 'Finalizada'
    },
    {
      id: '1022',
      data: '2025-01-08',
      cliente: 'João Paulo',
      vendedor: 'Diego',
      total: 59.90,
      itens: 1,
      status: 'Finalizada'
    },
    {
      id: '1021',
      data: '2025-01-08',
      cliente: 'Marcos Lima',
      vendedor: 'Carla',
      total: 329.00,
      itens: 5,
      status: 'Finalizada'
    },
    {
      id: '1020',
      data: '2025-01-07',
      cliente: 'Maria Silva',
      vendedor: 'Diego',
      total: 145.50,
      itens: 2,
      status: 'Finalizada'
    },
    {
      id: '1019',
      data: '2025-01-07',
      cliente: 'Pedro Costa',
      vendedor: 'Carla',
      total: 78.30,
      itens: 1,
      status: 'Finalizada'
    }
  ]

  useEffect(() => {
    if (isOpen) {
      carregarRelatorio()
    }
  }, [isOpen])

  const carregarRelatorio = async () => {
    setLoading(true)
    
    // Simular carregamento de dados
    setTimeout(() => {
      setVendas(vendasMock)
      
      // Calcular resumo
      const totalVendas = vendasMock.length
      const totalValor = vendasMock.reduce((acc, venda) => acc + venda.total, 0)
      const ticketMedio = totalValor / totalVendas
      
      // Vendedor destaque (maior valor vendido)
      const vendedores = vendasMock.reduce((acc, venda) => {
        acc[venda.vendedor] = (acc[venda.vendedor] || 0) + venda.total
        return acc
      }, {} as Record<string, number>)
      
      const vendedorDestaque = Object.entries(vendedores)
        .sort(([,a], [,b]) => b - a)[0]?.[0] || ''
      
      setResumo({
        totalVendas,
        totalValor,
        ticketMedio,
        vendedorDestaque
      })
      
      setLoading(false)
    }, 1000)
  }

  const aplicarFiltros = () => {
    let vendasFiltradas = vendasMock

    if (filtros.dataInicio) {
      vendasFiltradas = vendasFiltradas.filter(venda => venda.data >= filtros.dataInicio)
    }
    
    if (filtros.dataFim) {
      vendasFiltradas = vendasFiltradas.filter(venda => venda.data <= filtros.dataFim)
    }
    
    if (filtros.vendedor) {
      vendasFiltradas = vendasFiltradas.filter(venda => 
        venda.vendedor.toLowerCase().includes(filtros.vendedor.toLowerCase())
      )
    }
    
    if (filtros.status !== 'todos') {
      vendasFiltradas = vendasFiltradas.filter(venda => venda.status === filtros.status)
    }

    setVendas(vendasFiltradas)
  }

  const exportarCSV = () => {
    const headers = ['ID', 'Data', 'Cliente', 'Vendedor', 'Itens', 'Total', 'Status']
    const csvContent = [
      headers.join(','),
      ...vendas.map(venda => [
        venda.id,
        venda.data,
        venda.cliente,
        venda.vendedor,
        venda.itens,
        venda.total.toFixed(2),
        venda.status
      ].join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `relatorio_vendas_${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor)
  }

  const formatarData = (data: string) => {
    return new Date(data).toLocaleDateString('pt-BR')
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content relatorio-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Relatório de Vendas</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        <div className="relatorio-content">
          {/* Filtros */}
          <div className="filtros-section">
            <h3>Filtros</h3>
            <div className="filtros-grid">
              <div className="form-group">
                <label>Data Início</label>
                <input
                  type="date"
                  value={filtros.dataInicio}
                  onChange={(e) => setFiltros(prev => ({ ...prev, dataInicio: e.target.value }))}
                  className="input"
                />
              </div>
              
              <div className="form-group">
                <label>Data Fim</label>
                <input
                  type="date"
                  value={filtros.dataFim}
                  onChange={(e) => setFiltros(prev => ({ ...prev, dataFim: e.target.value }))}
                  className="input"
                />
              </div>
              
              <div className="form-group">
                <label>Vendedor</label>
                <input
                  type="text"
                  value={filtros.vendedor}
                  onChange={(e) => setFiltros(prev => ({ ...prev, vendedor: e.target.value }))}
                  className="input"
                  placeholder="Nome do vendedor"
                />
              </div>
              
              <div className="form-group">
                <label>Status</label>
                <select
                  value={filtros.status}
                  onChange={(e) => setFiltros(prev => ({ ...prev, status: e.target.value }))}
                  className="select"
                >
                  <option value="todos">Todos</option>
                  <option value="Finalizada">Finalizada</option>
                  <option value="Pendente">Pendente</option>
                  <option value="Cancelada">Cancelada</option>
                </select>
              </div>
            </div>
            
            <div className="filtros-actions">
              <button className="btn" onClick={aplicarFiltros}>
                Aplicar Filtros
              </button>
              <button className="btn btn-outline" onClick={carregarRelatorio}>
                Atualizar
              </button>
            </div>
          </div>

          {/* Resumo */}
          <div className="resumo-section">
            <h3>Resumo do Período</h3>
            <div className="resumo-grid">
              <div className="resumo-card">
                <div className="resumo-label">Total de Vendas</div>
                <div className="resumo-value">{resumo.totalVendas}</div>
              </div>
              <div className="resumo-card">
                <div className="resumo-label">Valor Total</div>
                <div className="resumo-value">{formatarMoeda(resumo.totalValor)}</div>
              </div>
              <div className="resumo-card">
                <div className="resumo-label">Ticket Médio</div>
                <div className="resumo-value">{formatarMoeda(resumo.ticketMedio)}</div>
              </div>
              <div className="resumo-card">
                <div className="resumo-label">Vendedor Destaque</div>
                <div className="resumo-value">{resumo.vendedorDestaque}</div>
              </div>
            </div>
          </div>

          {/* Tabela de Vendas */}
          <div className="vendas-section">
            <div className="section-header">
              <h3>Vendas ({vendas.length})</h3>
              <button className="btn btn-outline" onClick={exportarCSV}>
                Exportar CSV
              </button>
            </div>
            
            {loading ? (
              <div className="loading">Carregando relatório...</div>
            ) : (
              <div className="table-container">
                <table className="table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Data</th>
                      <th>Cliente</th>
                      <th>Vendedor</th>
                      <th>Itens</th>
                      <th>Total</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vendas.map((venda) => (
                      <tr key={venda.id}>
                        <td>#{venda.id}</td>
                        <td>{formatarData(venda.data)}</td>
                        <td>{venda.cliente}</td>
                        <td>{venda.vendedor}</td>
                        <td>{venda.itens}</td>
                        <td>{formatarMoeda(venda.total)}</td>
                        <td>
                          <span className={`status-badge status-${venda.status.toLowerCase()}`}>
                            {venda.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        <div className="modal-actions">
          <button className="btn btn-outline" onClick={onClose}>
            Fechar
          </button>
        </div>
      </div>
    </div>
  )
}

