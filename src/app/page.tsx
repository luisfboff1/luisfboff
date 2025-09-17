import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="container">
      <section className="section">
        <h1>Admin • Megui's Pet</h1>
        <p>
          Esqueleto inicial para o <strong>App de Gestão</strong>: estoque, vendas, vendedores e produtos. 
          Navegue pelo topo para ver as páginas base. Este layout usa header fixo, cards em grid e paleta configurável em <code>:root</code>.
        </p>
        <div style={{marginTop: '1rem', display: 'flex', gap: '.75rem', flexWrap: 'wrap'}}>
          <Link className="btn" href="/dashboard">Ir ao Dashboard</Link>
          <Link className="btn btn-outline" href="/config">Ajustar Cores & Layout</Link>
        </div>
      </section>

      <section className="section">
        <h2>Atalhos rápidos</h2>
        <div className="grid">
          <div className="card">
            <h3>Cadastro de Produto</h3>
            <p className="muted">Inclua novo produto com SKU, preço e estoque mínimo.</p>
            <Link className="btn" href="/produtos">Abrir</Link>
          </div>
          <div className="card">
            <h3>Entrada de Estoque</h3>
            <p className="muted">Lance compras/ajustes de inventário.</p>
            <Link className="btn" href="/estoque">Abrir</Link>
          </div>
          <div className="card">
            <h3>Nova Venda</h3>
            <p className="muted">Registre uma venda rápida no PDV.</p>
            <Link className="btn" href="/vendas">Abrir</Link>
          </div>
          <div className="card">
            <h3>Equipe/Vendedores</h3>
            <p className="muted">Gerencie metas e comissões.</p>
            <Link className="btn" href="/vendedores">Abrir</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>Como editar</h2>
        <div className="card">
          <p>
            • Ajuste a paleta em <code>globals.css</code> (variáveis <code>--wc-*</code>).<br />
            • Adicione APIs/Persistência nos componentes (hoje está com mocks).<br />
            • Os módulos estão em <code>/app</code> para facilitar a iteração no Cursor.
          </p>
        </div>
      </section>
    </main>
  )
}