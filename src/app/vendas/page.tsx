'use client'

import { useState } from 'react'
import RelatorioVendasModal from '@/components/RelatorioVendasModal'

export default function VendasPage() {
  const [showRelatorioModal, setShowRelatorioModal] = useState(false)

  return (
    <main className="container">
      <section className="section">
        <h1>Gestão de Vendas</h1>
        <p>Sistema de PDV e histórico de vendas.</p>
        
        <div style={{marginTop: '1rem', display: 'flex', gap: '.75rem', flexWrap: 'wrap'}}>
          <button className="btn">Nova Venda</button>
          <button className="btn btn-outline" onClick={() => setShowRelatorioModal(true)}>Relatório de Vendas</button>
          <button className="btn btn-outline">Vendas do Dia</button>
        </div>
      </section>

      <section className="section">
        <h2>Resumo do Dia</h2>
        <div className="grid">
          <div className="card">
            <h3>Vendas Hoje</h3>
            <div className="kpi">R$ 2.847,50</div>
            <div className="muted">23 transações</div>
          </div>
          <div className="card">
            <h3>Ticket Médio</h3>
            <div className="kpi">R$ 123,80</div>
            <div className="muted">por venda</div>
          </div>
          <div className="card">
            <h3>Vendedor Destaque</h3>
            <div className="kpi">Carla</div>
            <div className="muted">R$ 1.456,20</div>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>Vendas Recentes</h2>
        <div className="card">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Data/Hora</th>
                <th>Cliente</th>
                <th>Itens</th>
                <th>Total</th>
                <th>Vendedor</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>#1023</td>
                <td>08/09/2025 14:30</td>
                <td>Ana Souza</td>
                <td>3</td>
                <td>R$ 189,90</td>
                <td>Carla</td>
                <td><span style={{color: '#10b981', fontWeight: '600'}}>Finalizada</span></td>
              </tr>
              <tr>
                <td>#1022</td>
                <td>08/09/2025 13:15</td>
                <td>João Paulo</td>
                <td>1</td>
                <td>R$ 59,90</td>
                <td>Diego</td>
                <td><span style={{color: '#10b981', fontWeight: '600'}}>Finalizada</span></td>
              </tr>
              <tr>
                <td>#1021</td>
                <td>08/09/2025 11:45</td>
                <td>Marcos Lima</td>
                <td>5</td>
                <td>R$ 329,00</td>
                <td>Carla</td>
                <td><span style={{color: '#10b981', fontWeight: '600'}}>Finalizada</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <RelatorioVendasModal
        isOpen={showRelatorioModal}
        onClose={() => setShowRelatorioModal(false)}
      />
    </main>
  )
}
