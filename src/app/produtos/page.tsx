'use client'

import { useState, useEffect } from 'react'
import { produtosDB, Produto } from '@/lib/database-client'
import ProdutoModal from '@/components/ProdutoModal'
import ImportCSVModal from '@/components/ImportCSVModal'

export default function ProdutosPage() {
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editingProduto, setEditingProduto] = useState<Produto | undefined>()
  const [showImportModal, setShowImportModal] = useState(false)

  useEffect(() => {
    loadProdutos()
  }, [])

  const loadProdutos = async () => {
    try {
      setLoading(true)
      const data = await produtosDB.getAll() as Produto[]
      setProdutos(data)
    } catch (error) {
      console.error('Erro ao carregar produtos:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredProdutos = produtos.filter(produto => {
    const matchesSearch = produto.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         produto.codigo.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = !selectedCategory || produto.categoria === selectedCategory
    return matchesSearch && matchesCategory
  })

  const categorias = [...new Set(produtos.map(p => p.categoria).filter(Boolean))]

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  const getEstoqueStatus = (produto: Produto) => {
    if (produto.estoque_atual <= 0) return { text: 'Sem estoque', class: 'text-red' }
    if (produto.estoque_atual <= produto.estoque_minimo) return { text: 'Estoque baixo', class: 'text-orange' }
    return { text: 'Em estoque', class: 'text-green' }
  }

  const handleNewProduto = () => {
    setEditingProduto(undefined)
    setShowModal(true)
  }

  const handleEditProduto = (produto: Produto) => {
    setEditingProduto(produto)
    setShowModal(true)
  }

  const handleModalSave = () => {
    setShowModal(false)
    setEditingProduto(undefined)
    loadProdutos()
  }

  const handleModalClose = () => {
    setShowModal(false)
    setEditingProduto(undefined)
  }

  const handleDeleteProduto = () => {
    setShowModal(false)
    setEditingProduto(undefined)
    loadProdutos()
  }

  const handleImportCSV = async (file: File) => {
    try {
      const text = await file.text()
      const lines = text.split('\n')
      const headers = lines[0].split(',').map(h => h.trim())
      
      const produtosImportados: Partial<Produto>[] = []
      
      for (let i = 1; i < lines.length; i++) {
        if (lines[i].trim()) {
          const values = lines[i].split(',').map(v => v.trim())
          const produto: Partial<Produto> = {}
          
          headers.forEach((header, index) => {
            const value = values[index] || ''
            switch (header) {
              case 'codigo':
                produto.codigo = value
                break
              case 'nome':
                produto.nome = value
                break
              case 'descricao':
                produto.descricao = value
                break
              case 'preco_custo':
                produto.preco_custo = parseFloat(value) || 0
                break
              case 'preco_venda':
                produto.preco_venda = parseFloat(value) || 0
                break
              case 'estoque_minimo':
                produto.estoque_minimo = parseInt(value) || 0
                break
              case 'estoque_atual':
                produto.estoque_atual = parseInt(value) || 0
                break
              case 'unidade':
                produto.unidade = value
                break
              case 'categoria':
                produto.categoria = value
                break
              case 'ativo':
                produto.ativo = value.toLowerCase() === 'true'
                break
            }
          })
          
          if (produto.codigo && produto.nome) {
            produtosImportados.push(produto)
          }
        }
      }
      
      // Adicionar produtos importados
      for (const produto of produtosImportados) {
        const produtoCompleto: Produto = {
          id: `prod_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          codigo: produto.codigo || '',
          nome: produto.nome || '',
          descricao: produto.descricao || '',
          preco_custo: produto.preco_custo || 0,
          preco_venda: produto.preco_venda || 0,
          estoque_minimo: produto.estoque_minimo || 0,
          estoque_atual: produto.estoque_atual || 0,
          unidade: produto.unidade || 'UN',
          categoria: produto.categoria || '',
          ativo: produto.ativo ?? true,
          imagem: produto.imagem || '',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
        
        await fetch('/api/produtos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(produtoCompleto),
        })
      }
      
      // Recarregar lista
      loadProdutos()
      
    } catch (error) {
      console.error('Erro ao importar CSV:', error)
      throw error
    }
  }

  return (
    <main className="container">
      <section className="section">
        <h1>Gestão de Produtos</h1>
        <p>Cadastre e gerencie seu catálogo de produtos.</p>
        
        <div style={{marginTop: '1rem', display: 'flex', gap: '.75rem', flexWrap: 'wrap'}}>
          <button className="btn" onClick={handleNewProduto}>Novo Produto</button>
          <button className="btn btn-outline" onClick={() => setShowImportModal(true)}>Importar CSV</button>
          <button className="btn btn-outline" onClick={loadProdutos}>
            Atualizar
          </button>
        </div>
      </section>

      <section className="section">
        <h2>Produtos Cadastrados ({filteredProdutos.length})</h2>
        <div className="card">
          <div style={{display: 'flex', gap: '1rem', marginBottom: '1rem'}}>
            <input 
              type="text" 
              className="input" 
              placeholder="Buscar produto..." 
              style={{flex: 1}}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select 
              className="select" 
              style={{width: '200px'}}
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">Todas as categorias</option>
              {categorias.map(categoria => (
                <option key={categoria} value={categoria}>{categoria}</option>
              ))}
            </select>
          </div>
          
          {loading ? (
            <div style={{textAlign: 'center', padding: '2rem'}}>
              Carregando produtos...
            </div>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Nome</th>
                  <th>Categoria</th>
                  <th>Preço Custo</th>
                  <th>Preço Venda</th>
                  <th>Estoque</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredProdutos.map(produto => {
                  const estoqueStatus = getEstoqueStatus(produto)
                  return (
                    <tr key={produto.id}>
                      <td><code>{produto.codigo}</code></td>
                      <td>
                        <div>
                          <div style={{fontWeight: '600'}}>{produto.nome}</div>
                          {produto.descricao && (
                            <div className="muted" style={{fontSize: '0.9rem'}}>
                              {produto.descricao}
                            </div>
                          )}
                        </div>
                      </td>
                      <td>{produto.categoria || '-'}</td>
                      <td>{formatCurrency(produto.preco_custo)}</td>
                      <td style={{fontWeight: '600'}}>{formatCurrency(produto.preco_venda)}</td>
                      <td>
                        <div>
                          <div>{produto.estoque_atual} {produto.unidade}</div>
                          <div className="muted" style={{fontSize: '0.8rem'}}>
                            Mín: {produto.estoque_minimo}
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className={estoqueStatus.class} style={{fontSize: '0.9rem'}}>
                          {estoqueStatus.text}
                        </span>
                      </td>
                      <td>
                        <button 
                          className="btn" 
                          style={{padding: '.25rem .5rem', fontSize: '12px'}}
                          onClick={() => handleEditProduto(produto)}
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

          {!loading && filteredProdutos.length === 0 && (
            <div style={{textAlign: 'center', padding: '2rem', color: '#666'}}>
              {searchTerm || selectedCategory 
                ? 'Nenhum produto encontrado com os filtros aplicados.' 
                : 'Nenhum produto cadastrado.'}
            </div>
          )}
        </div>
      </section>

      <section className="section">
        <h2>Resumo do Estoque</h2>
        <div className="grid">
          <div className="card">
            <h3>Total de Produtos</h3>
            <div style={{fontSize: '2rem', fontWeight: 'bold', color: 'var(--wc-orange)'}}>
              {produtos.length}
            </div>
          </div>
          <div className="card">
            <h3>Estoque Baixo</h3>
            <div style={{fontSize: '2rem', fontWeight: 'bold', color: '#ff6b35'}}>
              {produtos.filter(p => p.estoque_atual <= p.estoque_minimo && p.estoque_atual > 0).length}
            </div>
          </div>
          <div className="card">
            <h3>Sem Estoque</h3>
            <div style={{fontSize: '2rem', fontWeight: 'bold', color: '#dc3545'}}>
              {produtos.filter(p => p.estoque_atual <= 0).length}
            </div>
          </div>
          <div className="card">
            <h3>Valor Total</h3>
            <div style={{fontSize: '2rem', fontWeight: 'bold', color: '#28a745'}}>
              {formatCurrency(produtos.reduce((total, p) => total + (p.preco_custo * p.estoque_atual), 0))}
            </div>
          </div>
        </div>
      </section>

      <ProdutoModal
        produto={editingProduto}
        isOpen={showModal}
        onClose={handleModalClose}
        onSave={handleModalSave}
        onDelete={handleDeleteProduto}
      />

      <ImportCSVModal
        isOpen={showImportModal}
        onClose={() => setShowImportModal(false)}
        onImport={handleImportCSV}
      />
    </main>
  )
}