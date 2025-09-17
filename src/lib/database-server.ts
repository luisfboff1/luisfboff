// Sistema de banco de dados do servidor (lado do servidor)
// Usa fs para ler/escrever arquivos JSON

import fs from 'fs'
import path from 'path'

export interface DatabaseOperations<T> {
  getAll(): Promise<T[]>
  getById(id: string): Promise<T | null>
  create(data: Omit<T, 'id' | 'created_at' | 'updated_at'>): Promise<T>
  update(id: string, data: Partial<T>): Promise<T>
  delete(id: string): Promise<boolean>
  search(filters: Partial<T>): Promise<T[]>
}

export class LocalDatabase<T> implements DatabaseOperations<T> {
  private tableName: string
  private data: T[] = []
  private dataPath: string

  constructor(tableName: string) {
    this.tableName = tableName
    this.dataPath = path.join(process.cwd(), 'data', `${tableName}.json`)
    this.loadData()
  }

  private loadData() {
    try {
      if (fs.existsSync(this.dataPath)) {
        const fileData = fs.readFileSync(this.dataPath, 'utf8')
        this.data = JSON.parse(fileData)
      } else {
        this.data = []
      }
    } catch (error) {
      console.error(`Erro ao carregar dados de ${this.tableName}:`, error)
      this.data = []
    }
  }

  private saveData() {
    try {
      const dataDir = path.dirname(this.dataPath)
      
      // Cria diretório se não existir
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true })
      }
      
      fs.writeFileSync(this.dataPath, JSON.stringify(this.data, null, 2))
    } catch (error) {
      console.error('Erro ao salvar dados:', error)
      throw error
    }
  }

  async getAll(): Promise<T[]> {
    return [...this.data]
  }

  async getById(id: string): Promise<T | null> {
    return this.data.find((item: any) => item.id === id) || null
  }

  async create(data: Omit<T, 'id' | 'created_at' | 'updated_at'>): Promise<T> {
    const now = new Date().toISOString()
    const newItem = {
      ...data,
      id: this.generateId(),
      created_at: now,
      updated_at: now
    } as T

    this.data.push(newItem)
    this.saveData()
    return newItem
  }

  async update(id: string, data: Partial<T>): Promise<T> {
    const index = this.data.findIndex((item: any) => item.id === id)
    if (index === -1) {
      throw new Error('Item não encontrado')
    }

    const updatedItem = {
      ...this.data[index],
      ...data,
      updated_at: new Date().toISOString()
    } as T

    this.data[index] = updatedItem
    this.saveData()
    return updatedItem
  }

  async delete(id: string): Promise<boolean> {
    const index = this.data.findIndex((item: any) => item.id === id)
    if (index === -1) {
      return false
    }

    this.data.splice(index, 1)
    this.saveData()
    return true
  }

  async search(filters: Partial<T>): Promise<T[]> {
    return this.data.filter((item: any) => {
      return Object.keys(filters).every(key => {
        const filterValue = (filters as any)[key]
        const itemValue = item[key]
        
        if (typeof filterValue === 'string' && typeof itemValue === 'string') {
          return itemValue.toLowerCase().includes(filterValue.toLowerCase())
        }
        
        return itemValue === filterValue
      })
    })
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9) + Date.now().toString(36)
  }
}
