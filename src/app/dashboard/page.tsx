'use client'

import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts'

// Mock data - em produção viria de API/Supabase
const vendasPorProduto = [
  { nome: 'Sachê Frango Gato', categoria: 'Sachê', sabor: 'Frango', animal: 'Gato', vendas: 245, valor: 3675 },
  { nome: 'Sachê Salmão Gato', categoria: 'Sachê', sabor: 'Salmão', animal: 'Gato', vendas: 189, valor: 2835 },
  { nome: 'Sachê Frango Cachorro', categoria: 'Sachê', sabor: 'Frango', animal: 'Cachorro', vendas: 312, valor: 4680 },
  { nome: 'Sachê Carne Cachorro', categoria: 'Sachê', sabor: 'Carne', animal: 'Cachorro', vendas: 278, valor: 4170 },
  { nome: 'Ração Premium Gato', categoria: 'Ração', sabor: 'Frango', animal: 'Gato', vendas: 156, valor: 7800 },
  { nome: 'Ração Premium Cachorro', categoria: 'Ração', sabor: 'Carne', animal: 'Cachorro', vendas: 203, valor: 10150 },
  { nome: 'Brinquedo Bolinha', categoria: 'Brinquedo', sabor: '-', animal: 'Ambos', vendas: 89, valor: 890 },
  { nome: 'Coleira Ajustável', categoria: 'Acessório', sabor: '-', animal: 'Cachorro', vendas: 67, valor: 1340 },
]

const vendasPorVendedor = [
  { nome: 'Carla Silva', vendas: 45, valor: 8750, comissao: 875 },
  { nome: 'Diego Santos', vendas: 38, valor: 7420, comissao: 742 },
  { nome: 'Marina Costa', vendas: 32, valor: 6230, comissao: 623 },
  { nome: 'Pedro Lima', vendas: 28, valor: 5460, comissao: 546 },
  { nome: 'Ana Oliveira', vendas: 25, valor: 4875, comissao: 487 },
]

const estoqueAtual = [
  { produto: 'Sachê Frango Gato', categoria: 'Sachê', sabor: 'Frango', animal: 'Gato', estoque: 45, minimo: 20, status: 'OK' },
  { produto: 'Sachê Salmão Gato', categoria: 'Sachê', sabor: 'Salmão', animal: 'Gato', estoque: 12, minimo: 20, status: 'BAIXO' },
  { produto: 'Sachê Frango Cachorro', categoria: 'Sachê', sabor: 'Frango', animal: 'Cachorro', estoque: 67, minimo: 30, status: 'OK' },
  { produto: 'Sachê Carne Cachorro', categoria: 'Sachê', sabor: 'Carne', animal: 'Cachorro', estoque: 23, minimo: 30, status: 'BAIXO' },
  { produto: 'Ração Premium Gato', categoria: 'Ração', sabor: 'Frango', animal: 'Gato', estoque: 89, minimo: 50, status: 'OK' },
  { produto: 'Ração Premium Cachorro', categoria: 'Ração', sabor: 'Carne', animal: 'Cachorro', estoque: 124, minimo: 50, status: 'OK' },
]

const vendasPorMes = [
  { mes: 'Jan', vendas: 120, valor: 24000 },
  { mes: 'Fev', vendas: 135, valor: 27000 },
  { mes: 'Mar', vendas: 148, valor: 29600 },
  { mes: 'Abr', vendas: 162, valor: 32400 },
  { mes: 'Mai', vendas: 175, valor: 35000 },
  { mes: 'Jun', vendas: 189, valor: 37800 },
  { mes: 'Jul', vendas: 203, valor: 40600 },
  { mes: 'Ago', vendas: 218, valor: 43600 },
  { mes: 'Set', vendas: 235, valor: 47000 },
]

const cores = ['#ffba00', '#fcb900', '#ff8c00', '#ff6b35', '#ffa726', '#ff9800', '#ff5722', '#f44336']

export default function DashboardPage() {
  const [configGraficos, setConfigGraficos] = useState({
    mostrarGraficos: true,
    tipoGrafico: 'barra',
    periodo: '30dias'
  })

  const fmt = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })

  // Dados para gráfico de pizza - vendas por categoria
  const dadosPizza = vendasPorProduto.reduce((acc: {categoria: string, vendas: number}[], item) => {
    const existing = acc.find(cat => cat.categoria === item.categoria)
    if (existing) {
      existing.vendas += item.vendas
    } else {
      acc.push({ categoria: item.categoria, vendas: item.vendas })
    }
    return acc
  }, [])

  return (
    <main className="container">
      <section className="section">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h1>Dashboard Megui's Pet</h1>
          <button 
            className="btn"
            onClick={() => setConfigGraficos(prev => ({ ...prev, mostrarGraficos: !prev.mostrarGraficos }))}
          >
            {configGraficos.mostrarGraficos ? 'Ocultar Gráficos' : 'Mostrar Gráficos'}
          </button>
        </div>
        
        <div className="grid">
          <div className="card">
            <h3>Faturamento (30 dias)</h3>
            <div className="kpi">{fmt.format(47000)}</div>
            <div className="muted">+12% vs mês anterior</div>
          </div>
          <div className="card">
            <h3>Total de Vendas</h3>
            <div className="kpi">235</div>
            <div className="muted">vendas realizadas</div>
          </div>
          <div className="card">
            <h3>Produtos em Estoque</h3>
            <div className="kpi">6</div>
            <div className="muted">categorias ativas</div>
          </div>
          <div className="card">
            <h3>Vendedores Ativos</h3>
            <div className="kpi">5</div>
            <div className="muted">últimos 7 dias</div>
          </div>
        </div>
      </section>

      {configGraficos.mostrarGraficos && (
        <section className="section">
          <h2>Análise Visual</h2>
          <div className="dashboard-grid">
            <div className="card">
              <h3>Vendas por Mês</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={vendasPorMes}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mes" />
                  <YAxis />
                  <Tooltip formatter={(value: number) => fmt.format(value)} />
                  <Line type="monotone" dataKey="valor" stroke="#ffba00" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="card">
              <h3>Vendas por Categoria</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={dadosPizza}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={(props: any) => `${props.categoria} ${(props.percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="vendas"
                  >
                    {dadosPizza.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={cores[index % cores.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="card">
              <h3>Top 5 Produtos Mais Vendidos</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={vendasPorProduto.slice(0, 5)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="nome" angle={-45} textAnchor="end" height={100} />
                  <YAxis />
                  <Tooltip formatter={(value) => value} />
                  <Bar dataKey="vendas" fill="#ffba00" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="card">
              <h3>Performance dos Vendedores</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={vendasPorVendedor}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="nome" />
                  <YAxis />
                  <Tooltip formatter={(value: number) => fmt.format(value)} />
                  <Bar dataKey="valor" fill="#fcb900" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>
      )}

      <section className="section">
        <h2>Análise Detalhada por Produto</h2>
        <div className="card">
          <table className="table">
            <thead>
              <tr>
                <th>Produto</th>
                <th>Categoria</th>
                <th>Sabor</th>
                <th>Animal</th>
                <th>Vendas</th>
                <th>Valor Total</th>
                <th>Ticket Médio</th>
                <th>Estoque</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {vendasPorProduto.map((produto, index) => {
                const estoque = estoqueAtual.find(e => e.produto === produto.nome)
                return (
                  <tr key={index}>
                    <td>{produto.nome}</td>
                    <td>{produto.categoria}</td>
                    <td>{produto.sabor}</td>
                    <td>{produto.animal}</td>
                    <td>{produto.vendas}</td>
                    <td>{fmt.format(produto.valor)}</td>
                    <td>{fmt.format(produto.valor / produto.vendas)}</td>
                    <td>{estoque?.estoque || 'N/A'}</td>
                    <td>
                      <span style={{
                        color: estoque?.status === 'OK' ? '#10b981' : '#ef4444',
                        fontWeight: '600'
                      }}>
                        {estoque?.status || 'N/A'}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section className="section">
        <h2>Análise por Vendedor</h2>
        <div className="card">
          <table className="table">
            <thead>
              <tr>
                <th>Vendedor</th>
                <th>Total de Vendas</th>
                <th>Valor Total</th>
                <th>Comissão</th>
                <th>Ticket Médio</th>
              </tr>
            </thead>
            <tbody>
              {vendasPorVendedor.map((vendedor, index) => (
                <tr key={index}>
                  <td>{vendedor.nome}</td>
                  <td>{vendedor.vendas}</td>
                  <td>{fmt.format(vendedor.valor)}</td>
                  <td>{fmt.format(vendedor.comissao)}</td>
                  <td>{fmt.format(vendedor.valor / vendedor.vendas)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="section">
        <h2>Controle de Estoque Detalhado</h2>
        <div className="card">
          <table className="table">
            <thead>
              <tr>
                <th>Produto</th>
                <th>Categoria</th>
                <th>Sabor</th>
                <th>Animal</th>
                <th>Estoque Atual</th>
                <th>Estoque Mínimo</th>
                <th>Diferença</th>
                <th>Status</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
              {estoqueAtual.map((item, index) => (
                <tr key={index}>
                  <td>{item.produto}</td>
                  <td>{item.categoria}</td>
                  <td>{item.sabor}</td>
                  <td>{item.animal}</td>
                  <td>{item.estoque}</td>
                  <td>{item.minimo}</td>
                  <td>{item.estoque - item.minimo}</td>
                  <td>
                    <span style={{
                      color: item.status === 'OK' ? '#10b981' : '#ef4444',
                      fontWeight: '600'
                    }}>
                      {item.status}
                    </span>
                  </td>
                  <td>
                    <button 
                      className="btn" 
                      style={{padding: '.25rem .5rem', fontSize: '12px'}}
                      disabled={item.status === 'OK'}
                    >
                      {item.status === 'OK' ? 'OK' : 'Repor'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="section">
        <h2>Configurações do Dashboard</h2>
        <div className="card">
          <div className="config-grid">
            <div className="config-item">
              <label className="config-label">
                Mostrar Gráficos
              </label>
              <input 
                type="checkbox" 
                className="config-checkbox"
                checked={configGraficos.mostrarGraficos}
                onChange={(e) => setConfigGraficos(prev => ({ ...prev, mostrarGraficos: e.target.checked }))}
              />
            </div>
            <div className="config-item">
              <label className="config-label">
                Tipo de Gráfico Principal
              </label>
              <select 
                className="config-input"
                value={configGraficos.tipoGrafico}
                onChange={(e) => setConfigGraficos(prev => ({ ...prev, tipoGrafico: e.target.value }))}
              >
                <option value="barra">Barras</option>
                <option value="linha">Linha</option>
                <option value="pizza">Pizza</option>
              </select>
            </div>
            <div className="config-item">
              <label className="config-label">
                Período de Análise
              </label>
              <select 
                className="config-input"
                value={configGraficos.periodo}
                onChange={(e) => setConfigGraficos(prev => ({ ...prev, periodo: e.target.value }))}
              >
                <option value="7dias">Últimos 7 dias</option>
                <option value="30dias">Últimos 30 dias</option>
                <option value="90dias">Últimos 90 dias</option>
                <option value="1ano">Último ano</option>
              </select>
            </div>
            <button className="btn">Salvar Configurações</button>
            <button className="btn btn-outline">Exportar Relatório</button>
          </div>
        </div>
      </section>
    </main>
  )
}