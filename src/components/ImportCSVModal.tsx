'use client'

import { useState, useRef } from 'react'

interface ImportCSVModalProps {
  isOpen: boolean
  onClose: () => void
  onImport: (file: File) => Promise<void>
}

export default function ImportCSVModal({ isOpen, onClose, onImport }: ImportCSVModalProps) {
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [preview, setPreview] = useState<string>('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      if (selectedFile.type !== 'text/csv' && !selectedFile.name.endsWith('.csv')) {
        setError('Por favor, selecione um arquivo CSV válido.')
        return
      }
      
      setFile(selectedFile)
      setError('')
      setSuccess('')
      
      // Gerar preview do arquivo
      const reader = new FileReader()
      reader.onload = (event) => {
        const content = event.target?.result as string
        const lines = content.split('\n').slice(0, 6) // Primeiras 6 linhas
        setPreview(lines.join('\n'))
      }
      reader.readAsText(selectedFile)
    }
  }

  const handleImport = async () => {
    if (!file) {
      setError('Por favor, selecione um arquivo CSV.')
      return
    }

    setLoading(true)
    setError('')
    setSuccess('')

    try {
      await onImport(file)
      setSuccess('Produtos importados com sucesso!')
      setFile(null)
      setPreview('')
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    } catch (err) {
      setError('Erro ao importar arquivo. Verifique o formato do CSV.')
      console.error('Erro na importação:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    setFile(null)
    setError('')
    setSuccess('')
    setPreview('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
    onClose()
  }

  const downloadTemplate = () => {
    const template = `codigo,nome,descricao,preco_custo,preco_venda,estoque_minimo,estoque_atual,unidade,categoria,ativo
RAC001,Ração Premium Cães,Alimento completo para cães adultos,45.50,89.90,10,50,UN,Ração,true
BRQ001,Brinquedo Pelúcia,Urso de pelúcia para cães,12.00,24.90,5,20,UN,Brinquedos,true
MED001,Vermífugo Canino,Medicamento para vermes em cães,8.50,18.90,3,15,UN,Medicamentos,true
SNK001,Snack Dental,Petisco para limpeza dental,6.00,12.90,8,30,UN,Snacks,true`

    const blob = new Blob([template], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', 'template_produtos.csv')
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content import-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Importar Produtos via CSV</h2>
          <button className="modal-close" onClick={handleClose}>×</button>
        </div>

        <div className="import-content">
          {/* Instruções */}
          <div className="instructions-section">
            <h3>📋 Instruções</h3>
            <div className="instructions">
              <p>1. Baixe o template CSV para ver o formato correto</p>
              <p>2. Preencha os dados dos produtos no arquivo CSV</p>
              <p>3. Faça upload do arquivo preenchido</p>
              <p>4. Clique em "Importar" para adicionar os produtos</p>
            </div>
            
            <button className="btn btn-outline" onClick={downloadTemplate}>
              📥 Baixar Template CSV
            </button>
          </div>

          {/* Upload de Arquivo */}
          <div className="upload-section">
            <h3>📁 Selecionar Arquivo</h3>
            
            <div className="file-upload-area">
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv"
                onChange={handleFileSelect}
                className="file-input"
                id="csv-upload"
              />
              <label htmlFor="csv-upload" className="file-upload-label">
                <div className="upload-icon">📄</div>
                <div className="upload-text">
                  {file ? file.name : 'Clique para selecionar um arquivo CSV'}
                </div>
                <div className="upload-hint">ou arraste o arquivo aqui</div>
              </label>
            </div>

            {file && (
              <div className="file-info">
                <div className="file-details">
                  <span className="file-name">📄 {file.name}</span>
                  <span className="file-size">
                    ({(file.size / 1024).toFixed(1)} KB)
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Preview do Arquivo */}
          {preview && (
            <div className="preview-section">
              <h3>👁️ Preview do Arquivo</h3>
              <div className="preview-content">
                <pre className="csv-preview">{preview}</pre>
                <div className="preview-note">
                  * Mostrando apenas as primeiras 6 linhas
                </div>
              </div>
            </div>
          )}

          {/* Campos Obrigatórios */}
          <div className="required-fields-section">
            <h3>⚠️ Campos Obrigatórios</h3>
            <div className="required-fields">
              <div className="field-group">
                <span className="field-name">codigo</span>
                <span className="field-desc">Código único do produto</span>
              </div>
              <div className="field-group">
                <span className="field-name">nome</span>
                <span className="field-desc">Nome do produto</span>
              </div>
              <div className="field-group">
                <span className="field-name">preco_custo</span>
                <span className="field-desc">Preço de custo (número)</span>
              </div>
              <div className="field-group">
                <span className="field-name">preco_venda</span>
                <span className="field-desc">Preço de venda (número)</span>
              </div>
            </div>
          </div>

          {/* Mensagens de Status */}
          {error && (
            <div className="error-message">
              <div className="error-icon">❌</div>
              <div className="error-text">{error}</div>
            </div>
          )}

          {success && (
            <div className="success-message">
              <div className="success-icon">✅</div>
              <div className="success-text">{success}</div>
            </div>
          )}
        </div>

        <div className="modal-actions">
          <button 
            className="btn btn-outline" 
            onClick={handleClose}
            disabled={loading}
          >
            Cancelar
          </button>
          <button 
            className="btn" 
            onClick={handleImport}
            disabled={!file || loading}
          >
            {loading ? 'Importando...' : 'Importar Produtos'}
          </button>
        </div>
      </div>
    </div>
  )
}

