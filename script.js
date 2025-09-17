
(function () {
  const $ = (sel) => document.querySelector(sel);
  const now = new Date();
  const y = $('.footer #year') || $('#year');
  if (y) y.textContent = String(new Date().getFullYear());

  // Mock data (trocar por chamadas de API/DB)
  const kpis = {
    faturamento30d: 54230.75,
    pedidos: 312,
    produtos: 428,
    vendedoresAtivos: 7,
    trendFaturamento: '+12% vs 30d anteriores',
    trendPedidos: '+5% vs 30d anteriores',
  };

  const lowStock = [
    { sku: 'MEG-001', nome: 'Ração Premium 10kg', q: 4, min: 5 },
    { sku: 'MEG-014', nome: 'Areia Sanitária 4kg', q: 9, min: 12 },
    { sku: 'MEG-033', nome: 'Coleira Ajustável M', q: 2, min: 6 },
  ];

  const vendasRecentes = [
    { id: 1023, data: '2025-09-08', cliente: 'Ana Souza', total: 189.90, vendedor: 'Carla' },
    { id: 1022, data: '2025-09-08', cliente: 'João Paulo', total: 59.90, vendedor: 'Diego' },
    { id: 1021, data: '2025-09-07', cliente: 'Marcos Lima', total: 329.00, vendedor: 'Carla' },
  ];

  // Dashboard population
  const fmt = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
  const onDash = location.pathname.endsWith('dashboard.html');
  if (onDash) {
    const set = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
    set('kpi-fat', fmt.format(kpis.faturamento30d));
    set('kpi-pedidos', kpis.pedidos);
    set('kpi-produtos', kpis.produtos);
    set('kpi-vendedores', kpis.vendedoresAtivos);
    set('kpi-trend-fat', kpis.trendFaturamento);
    set('kpi-trend-ped', kpis.trendPedidos);

    const tbodyLow = document.querySelector('#tbl-estoque-baixo tbody');
    if (tbodyLow) {
      tbodyLow.innerHTML = lowStock.map(i => `<tr><td>${i.sku}</td><td>${i.nome}</td><td>${i.q}</td><td>${i.min}</td></tr>`).join('');
    }

    const tbodyVend = document.querySelector('#tbl-vendas-recentes tbody');
    if (tbodyVend) {
      tbodyVend.innerHTML = vendasRecentes.map(v => `<tr><td>${v.id}</td><td>${v.data}</td><td>${v.cliente}</td><td>${fmt.format(v.total)}</td><td>${v.vendedor}</td></tr>`).join('');
    }
  }
})();
