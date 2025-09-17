'use client'

import { useState, useEffect } from 'react'
import { Produto, produtosDB } from '@/lib/database-client'
import Image from 'next/image'

interface ProdutoModalProps {
  produto?: Produto
  isOpen: boolean
  onClose: () => void
  onSave: () => void
  onDelete?: () => void
}

export default function ProdutoModal({ produto, isOpen, onClose, onSave, onDelete }: ProdutoModalProps) {
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
    ativo: produto?.ativo ?? true,
    imagem: produto?.imagem || ''
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  useEffect(() => {
    if (produto) {
      setFormData({
        codigo: produto.codigo,
        nome: produto.nome,
        descricao: produto.descricao || '',
        preco_custo: produto.preco_custo,
        preco_venda: produto.preco_venda,
        estoque_minimo: produto.estoque_minimo,
        estoque_atual: produto.estoque_atual,
        unidade: produto.unidade,
        categoria: produto.categoria || '',
        ativo: produto.ativo,
        imagem: produto.imagem || ''
      })
      setImagePreview(produto.imagem || null)
    } else {
      setFormData({
        codigo: '',
        nome: '',
        descricao: '',
        preco_custo: 0,
        preco_venda: 0,
        estoque_minimo: 0,
        estoque_atual: 0,
        unidade: 'UN',
        categoria: '',
        ativo: true,
        imagem: ''
      })
      setImagePreview(null)
    }
  }, [produto])

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
      onClose()
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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Por enquanto, apenas simular o upload
      // Em produção, você faria upload para um serviço como Cloudinary ou AWS S3
      const reader = new FileReader()
      reader.onload = (event) => {
        const result = event.target?.result as string
        setImagePreview(result)
        setFormData(prev => ({ ...prev, imagem: result }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveImage = () => {
    setImagePreview(null)
    setFormData(prev => ({ ...prev, imagem: '' }))
  }

  const handleDelete = async () => {
    if (!produto || !onDelete) return
    
    setLoading(true)
    setError('')

    try {
      await produtosDB.delete(produto.id)
      onDelete()
      onClose()
    } catch (err) {
      setError('Erro ao excluir produto')
      console.error(err)
    } finally {
      setLoading(false)
      setShowDeleteConfirm(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{produto ? 'Editar Produto' : 'Novo Produto'}</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-row">
            <div className="form-group">
              <label>Código *</label>
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
            
            <div className="form-group">
              <label>Unidade</label>
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

          <div className="form-group">
            <label>Nome *</label>
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

          <div className="form-group">
            <label>Descrição</label>
            <textarea
              name="descricao"
              value={formData.descricao}
              onChange={handleChange}
              className="input"
              rows={3}
              placeholder="Descrição detalhada do produto"
            />
          </div>

          <div className="form-group">
            <label>Categoria</label>
            <input
              type="text"
              name="categoria"
              value={formData.categoria}
              onChange={handleChange}
              className="input"
              placeholder="Ex: Ração, Brinquedos, Medicamentos, Snacks"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Preço de Custo *</label>
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
            
            <div className="form-group">
              <label>Preço de Venda *</label>
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

          <div className="form-row">
            <div className="form-group">
              <label>Estoque Mínimo</label>
              <input
                type="number"
                name="estoque_minimo"
                value={formData.estoque_minimo}
                onChange={handleChange}
                className="input"
                min="0"
              />
            </div>
            
            <div className="form-group">
              <label>Estoque Atual</label>
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

          {/* Seção de Upload de Imagem */}
          <div className="form-group">
            <label>Imagem do Produto</label>
            <div className="image-upload-section">
              {imagePreview ? (
                <div className="image-preview">
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    width={200}
                    height={200}
                    style={{ objectFit: 'cover', borderRadius: '8px' }}
                  />
                  <button
                    type="button"
                    className="btn btn-outline btn-sm"
                    onClick={handleRemoveImage}
                  >
                    Remover Imagem
                  </button>
                </div>
              ) : (
                <div className="image-upload-placeholder">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="file-input"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="file-input-label">
                    <span>📷</span>
                    <span>Clique para fazer upload da imagem</span>
                  </label>
                </div>
              )}
            </div>
          </div>

          <div className="form-group checkbox-group">
            <input
              type="checkbox"
              name="ativo"
              checked={formData.ativo}
              onChange={handleChange}
              id="ativo"
            />
            <label htmlFor="ativo">Produto ativo</label>
          </div>

          <div className="modal-actions">
            <div className="modal-actions-left">
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
                onClick={onClose}
                disabled={loading}
              >
                Cancelar
              </button>
            </div>
            
            {produto && onDelete && (
              <div className="modal-actions-right">
                <button 
                  type="button" 
                  className="btn btn-danger"
                  onClick={() => setShowDeleteConfirm(true)}
                  disabled={loading}
                >
                  Excluir Produto
                </button>
              </div>
            )}
          </div>
        </form>
      </div>

      {/* Modal de Confirmação de Exclusão */}
      {showDeleteConfirm && (
        <div className="modal-overlay" onClick={() => setShowDeleteConfirm(false)}>
          <div className="modal-content delete-confirm-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Confirmar Exclusão</h2>
              <button 
                className="modal-close" 
                onClick={() => setShowDeleteConfirm(false)}
              >
                ×
              </button>
            </div>
            
            <div className="modal-form">
              <div className="delete-warning">
                <div className="warning-icon">⚠️</div>
                <h3>Tem certeza que deseja excluir este produto?</h3>
                <p>
                  <strong>{produto?.nome}</strong> será permanentemente removido do sistema.
                </p>
                <p className="warning-text">
                  Esta ação não pode ser desfeita!
                </p>
              </div>
              
              <div className="modal-actions">
                <button 
                  type="button" 
                  className="btn btn-outline"
                  onClick={() => setShowDeleteConfirm(false)}
                  disabled={loading}
                >
                  Cancelar
                </button>
                <button 
                  type="button" 
                  className="btn btn-danger"
                  onClick={handleDelete}
                  disabled={loading}
                >
                  {loading ? 'Excluindo...' : 'Sim, Excluir'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
