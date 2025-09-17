'use client'

import { useState } from 'react'
import { Produto, produtosDB } from '@/lib/database-client'

interface ProdutoFormProps {
  produto?: Produto
  onSave: () => void
  onCancel: () => void
}

export default function ProdutoForm({ produto, onSave, onCancel }: ProdutoFormProps) {
  const [formData, setFormData] = useState({
    codigo: produto?.codigo || '',
    nome: produto?.nome || '',
    descricao: produto?.descricao || '',
    preco_custo: produto?.preco_custo || 0,
    preco_venda: produto?.preco_venda || 0,
    estoque_minimo: produto?.estoque_minimo || 0,
    estoque_atual: produto?.estoque_atual || 0,
    unidade: produto?.unidade || 'UN',
    categoria: produto?.categoria || '',
    ativo: produto?.ativo ?? true
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      if (produto) {
        await produtosDB.update(produto.id, formData)
      } else {
        await produtosDB.create(formData)
      }
      onSave()
    } catch (err) {
      setError('Erro ao salvar produto')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : 
              type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  return (
    <div className="card">
      <h3>{produto ? 'Editar Produto' : 'Novo Produto'}</h3>
      
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
              Código *
            </label>
            <input
              type="text"
              name="codigo"
              value={formData.codigo}
              onChange={handleChange}
              className="input"
              required
              placeholder="Ex: RAC001"
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
              Unidade
            </label>
            <select
              name="unidade"
              value={formData.unidade}
              onChange={handleChange}
              className="select"
            >
              <option value="UN">Unidade</option>
              <option value="KG">Quilograma</option>
              <option value="G">Grama</option>
              <option value="L">Litro</option>
              <option value="ML">Mililitro</option>
              <option value="CX">Caixa</option>
              <option value="PC">Peça</option>
            </select>
          </div>
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
            placeholder="Nome do produto"
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
            Descrição
          </label>
          <textarea
            name="descricao"
            value={formData.descricao}
            onChange={handleChange}
            className="input"
            rows={3}
            placeholder="Descrição detalhada do produto"
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
            Categoria
          </label>
          <input
            type="text"
            name="categoria"
            value={formData.categoria}
            onChange={handleChange}
            className="input"
            placeholder="Ex: Ração, Brinquedos, Medicamentos"
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
              Preço de Custo *
            </label>
            <input
              type="number"
              name="preco_custo"
              value={formData.preco_custo}
              onChange={handleChange}
              className="input"
              step="0.01"
              min="0"
              required
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
              Preço de Venda *
            </label>
            <input
              type="number"
              name="preco_venda"
              value={formData.preco_venda}
              onChange={handleChange}
              className="input"
              step="0.01"
              min="0"
              required
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
              Estoque Mínimo
            </label>
            <input
              type="number"
              name="estoque_minimo"
              value={formData.estoque_minimo}
              onChange={handleChange}
              className="input"
              min="0"
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
              Estoque Atual
            </label>
            <input
              type="number"
              name="estoque_atual"
              value={formData.estoque_atual}
              onChange={handleChange}
              className="input"
              min="0"
            />
          </div>
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
            Produto ativo
          </label>
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <button 
            type="submit" 
            className="btn"
            disabled={loading}
          >
            {loading ? 'Salvando...' : (produto ? 'Atualizar' : 'Criar')}
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
