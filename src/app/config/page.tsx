import DataManager from '@/components/DataManager'

export default function ConfigPage() {
  return (
    <main className="container">
      <section className="section">
        <h1>Configurações</h1>
        <p>Personalize o sistema e gerencie configurações gerais.</p>
      </section>

      <section className="section">
        <h2>Configurações da Loja</h2>
        <div className="card">
          <div style={{display: 'grid', gap: '1rem', maxWidth: '500px'}}>
            <div>
              <label style={{display: 'block', marginBottom: '.5rem', fontWeight: '600'}}>
                Nome da Loja
              </label>
              <input type="text" className="input" defaultValue="Megui's Pet" />
            </div>
            <div>
              <label style={{display: 'block', marginBottom: '.5rem', fontWeight: '600'}}>
                CNPJ
              </label>
              <input type="text" className="input" placeholder="00.000.000/0000-00" />
            </div>
            <div>
              <label style={{display: 'block', marginBottom: '.5rem', fontWeight: '600'}}>
                Endereço
              </label>
              <input type="text" className="input" placeholder="Rua, número, bairro, cidade" />
            </div>
            <div>
              <label style={{display: 'block', marginBottom: '.5rem', fontWeight: '600'}}>
                Telefone
              </label>
              <input type="text" className="input" placeholder="(11) 99999-9999" />
            </div>
            <button className="btn">Salvar Configurações</button>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>Personalização Visual</h2>
        <div className="card">
          <h3>Paleta de Cores</h3>
          <p className="muted">Ajuste as cores do sistema editando as variáveis CSS em globals.css</p>
          
          <div style={{display: 'grid', gap: '1rem', marginTop: '1rem'}}>
            <div style={{display: 'flex', gap: '1rem', alignItems: 'center'}}>
              <div style={{
                width: '40px', 
                height: '40px', 
                background: 'linear-gradient(135deg, rgba(252,185,0,1) 0%, rgba(255,105,0,1) 100%)',
                borderRadius: '8px',
                border: '1px solid #ccc'
              }}></div>
              <div>
                <div style={{fontWeight: '600'}}>Gradiente Header</div>
                <div className="muted">--wp--preset--gradient--luminous-vivid-amber-to-luminous-vivid-orange</div>
              </div>
            </div>
            <div style={{display: 'flex', gap: '1rem', alignItems: 'center'}}>
              <div style={{
                width: '40px', 
                height: '40px', 
                backgroundColor: '#ffba00', 
                borderRadius: '8px',
                border: '1px solid #ccc'
              }}></div>
              <div>
                <div style={{fontWeight: '600'}}>Laranja Principal</div>
                <div className="muted">--wc-orange: #ffba00</div>
              </div>
            </div>
            <div style={{display: 'flex', gap: '1rem', alignItems: 'center'}}>
              <div style={{
                width: '40px', 
                height: '40px', 
                backgroundColor: '#fcb900', 
                borderRadius: '8px',
                border: '1px solid #ccc'
              }}></div>
              <div>
                <div style={{fontWeight: '600'}}>Amarelo Vibrante</div>
                <div className="muted">--wp--preset--color--luminous-vivid-amber: #fcb900</div>
              </div>
            </div>
            <div style={{display: 'flex', gap: '1rem', alignItems: 'center'}}>
              <div style={{
                width: '40px', 
                height: '40px', 
                backgroundColor: '#ff8c00', 
                borderRadius: '8px',
                border: '1px solid #ccc'
              }}></div>
              <div>
                <div style={{fontWeight: '600'}}>Laranja Acento (Hover)</div>
                <div className="muted">--wc-accent: #ff8c00</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>Gerenciamento de Dados</h2>
        <DataManager />
      </section>

      <section className="section">
        <h2>Backup e Segurança</h2>
        <div className="grid">
          <div className="card">
            <h3>Backup Automático</h3>
            <p className="muted">Último backup: 08/09/2025 02:00</p>
            <button className="btn" style={{marginTop: '.5rem'}}>Fazer Backup Agora</button>
          </div>
          <div className="card">
            <h3>Logs do Sistema</h3>
            <p className="muted">Registros de atividades e erros</p>
            <button className="btn btn-outline" style={{marginTop: '.5rem'}}>Ver Logs</button>
          </div>
        </div>
      </section>
    </main>
  )
}
