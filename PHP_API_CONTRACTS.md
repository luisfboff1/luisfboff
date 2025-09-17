# Contratos da API PHP - Megui's Pet Admin

## 📋 Visão Geral

Este documento define os contratos para a API PHP que será implementada na Hostinger para substituir as API Routes do Next.js em produção.

## 🏗️ Estrutura da API

### Base URL
```
https://admin.magspatch.com/api/
```

### Headers Padrão
```http
Content-Type: application/json
Accept: application/json
```

### Formato de Resposta Padrão
```json
{
  "success": true|false,
  "data": any,
  "message": "string",
  "error": "string"
}
```

### Formato de Resposta Paginada
```json
{
  "success": true,
  "data": [],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10
  }
}
```

## 🔗 Endpoints por Entidade

### 1. Usuários (`/usuarios`)

#### GET `/usuarios`
Lista todos os usuários com paginação
```http
GET /api/usuarios?page=1&limit=10&search=nome
```

**Resposta:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "nome": "string",
      "email": "string",
      "permissoes": ["string"],
      "ativo": true,
      "created_at": "2024-01-01T00:00:00Z",
      "updated_at": "2024-01-01T00:00:00Z"
    }
  ],
  "pagination": { ... }
}
```

#### GET `/usuarios/{id}`
Busca usuário por ID
```http
GET /api/usuarios/123
```

#### POST `/usuarios`
Cria novo usuário
```http
POST /api/usuarios
Content-Type: application/json

{
  "nome": "string",
  "email": "string",
  "permissoes": ["string"],
  "ativo": true
}
```

#### PUT `/usuarios/{id}`
Atualiza usuário
```http
PUT /api/usuarios/123
Content-Type: application/json

{
  "nome": "string",
  "email": "string",
  "permissoes": ["string"],
  "ativo": true
}
```

#### DELETE `/usuarios/{id}`
Remove usuário
```http
DELETE /api/usuarios/123
```

### 2. Produtos (`/produtos`)

#### GET `/produtos`
Lista produtos com filtros
```http
GET /api/produtos?page=1&limit=10&categoria=sachê&search=frango
```

**Resposta:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "codigo": "string",
      "nome": "string",
      "descricao": "string",
      "preco_custo": 15.50,
      "preco_venda": 25.00,
      "estoque_minimo": 10,
      "estoque_atual": 50,
      "unidade": "UN",
      "categoria": "string",
      "ativo": true,
      "created_at": "2024-01-01T00:00:00Z",
      "updated_at": "2024-01-01T00:00:00Z"
    }
  ],
  "pagination": { ... }
}
```

#### GET `/produtos/{id}`
Busca produto por ID

#### POST `/produtos`
Cria novo produto
```http
POST /api/produtos
Content-Type: application/json

{
  "codigo": "string",
  "nome": "string",
  "descricao": "string",
  "preco_custo": 15.50,
  "preco_venda": 25.00,
  "estoque_minimo": 10,
  "estoque_atual": 50,
  "unidade": "UN",
  "categoria": "string",
  "ativo": true
}
```

#### PUT `/produtos/{id}`
Atualiza produto

#### DELETE `/produtos/{id}`
Remove produto

### 3. Vendedores (`/vendedores`)

#### GET `/vendedores`
Lista vendedores
```http
GET /api/vendedores?page=1&limit=10&ativo=true
```

**Resposta:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "cpf": "string",
      "nome": "string",
      "email": "string",
      "telefone": "string",
      "comissao_percentual": 5.0,
      "ativo": true,
      "created_at": "2024-01-01T00:00:00Z",
      "updated_at": "2024-01-01T00:00:00Z"
    }
  ],
  "pagination": { ... }
}
```

#### GET `/vendedores/{id}`
#### POST `/vendedores`
#### PUT `/vendedores/{id}`
#### DELETE `/vendedores/{id}`

### 4. Clientes/Fornecedores (`/clientes-fornecedores`)

#### GET `/clientes-fornecedores`
Lista clientes e fornecedores
```http
GET /api/clientes-fornecedores?page=1&limit=10&tipo=fisica&vendedor_id=123
```

**Resposta:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "tipo": "fisica|juridica",
      "cpf_cnpj": "string",
      "nome_razao_social": "string",
      "nome_fantasia": "string",
      "email": "string",
      "telefone": "string",
      "endereco": "string",
      "cidade": "string",
      "estado": "string",
      "cep": "string",
      "vendedor_id": "uuid",
      "ativo": true,
      "created_at": "2024-01-01T00:00:00Z",
      "updated_at": "2024-01-01T00:00:00Z"
    }
  ],
  "pagination": { ... }
}
```

#### GET `/clientes-fornecedores/{id}`
#### POST `/clientes-fornecedores`
#### PUT `/clientes-fornecedores/{id}`
#### DELETE `/clientes-fornecedores/{id}`

### 5. Vendas (`/vendas`)

#### GET `/vendas`
Lista vendas com filtros
```http
GET /api/vendas?page=1&limit=10&status=confirmada&data_inicio=2024-01-01&data_fim=2024-12-31
```

**Resposta:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "numero_venda": "string",
      "cliente_id": "uuid",
      "vendedor_id": "uuid",
      "data": "2024-01-01",
      "valor_total": 150.00,
      "desconto": 10.00,
      "valor_final": 140.00,
      "status": "pendente|confirmada|cancelada",
      "observacoes": "string",
      "created_at": "2024-01-01T00:00:00Z",
      "updated_at": "2024-01-01T00:00:00Z"
    }
  ],
  "pagination": { ... }
}
```

#### GET `/vendas/{id}`
#### POST `/vendas`
#### PUT `/vendas/{id}`
#### DELETE `/vendas/{id}`

### 6. Itens de Venda (`/itens-venda`)

#### GET `/itens-venda`
Lista itens de venda
```http
GET /api/itens-venda?venda_id=123
```

**Resposta:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "venda_id": "uuid",
      "produto_id": "uuid",
      "quantidade": 2,
      "valor_unitario": 25.00,
      "valor_total": 50.00,
      "created_at": "2024-01-01T00:00:00Z"
    }
  ]
}
```

#### GET `/itens-venda/{id}`
#### POST `/itens-venda`
#### PUT `/itens-venda/{id}`
#### DELETE `/itens-venda/{id}`

### 7. Movimentos de Estoque (`/movimentos-estoque`)

#### GET `/movimentos-estoque`
Lista movimentações de estoque
```http
GET /api/movimentos-estoque?page=1&limit=10&produto_id=123&tipo=entrada
```

**Resposta:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "documento": "string",
      "cliente_fornecedor_id": "uuid",
      "data": "2024-01-01",
      "quantidade": 100,
      "valor_unitario": 15.50,
      "valor_total": 1550.00,
      "tipo_movimento_id": "uuid",
      "produto_id": "uuid",
      "estoque_local": "RS|SP",
      "observacoes": "string",
      "created_at": "2024-01-01T00:00:00Z",
      "updated_at": "2024-01-01T00:00:00Z"
    }
  ],
  "pagination": { ... }
}
```

#### GET `/movimentos-estoque/{id}`
#### POST `/movimentos-estoque`
#### PUT `/movimentos-estoque/{id}`
#### DELETE `/movimentos-estoque/{id}`

### 8. Tipos de Movimento (`/tipos-movimentos`)

#### GET `/tipos-movimentos`
Lista tipos de movimento
```http
GET /api/tipos-movimentos?tipo=entrada&ativo=true
```

**Resposta:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "descricao": "string",
      "tipo": "entrada|saida",
      "ativo": true,
      "created_at": "2024-01-01T00:00:00Z",
      "updated_at": "2024-01-01T00:00:00Z"
    }
  ]
}
```

#### GET `/tipos-movimentos/{id}`
#### POST `/tipos-movimentos`
#### PUT `/tipos-movimentos/{id}`
#### DELETE `/tipos-movimentos/{id}`

### 9. Contas (`/contas`)

#### GET `/contas`
Lista contas do plano de contas
```http
GET /api/contas?tipo=debito&categoria=despesas&ativo=true
```

**Resposta:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "descricao": "string",
      "tipo": "debito|credito",
      "categoria": "despesas|investimentos|vendas|outras_receitas",
      "ativo": true,
      "created_at": "2024-01-01T00:00:00Z",
      "updated_at": "2024-01-01T00:00:00Z"
    }
  ]
}
```

#### GET `/contas/{id}`
#### POST `/contas`
#### PUT `/contas/{id}`
#### DELETE `/contas/{id}`

### 10. Fluxo de Caixa (`/fluxo-caixa`)

#### GET `/fluxo-caixa`
Lista movimentações do fluxo de caixa
```http
GET /api/fluxo-caixa?page=1&limit=10&data_inicio=2024-01-01&data_fim=2024-12-31&tipo=entrada
```

**Resposta:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "data": "2024-01-01",
      "conta_id": "uuid",
      "historico": "string",
      "valor": 1500.00,
      "tipo": "entrada|saida",
      "observacoes": "string",
      "created_at": "2024-01-01T00:00:00Z",
      "updated_at": "2024-01-01T00:00:00Z"
    }
  ],
  "pagination": { ... }
}
```

#### GET `/fluxo-caixa/{id}`
#### POST `/fluxo-caixa`
#### PUT `/fluxo-caixa/{id}`
#### DELETE `/fluxo-caixa/{id}`

## 🔍 Endpoints Especiais

### Health Check
```http
GET /api/health
```

**Resposta:**
```json
{
  "success": true,
  "message": "API funcionando",
  "timestamp": "2024-01-01T00:00:00Z"
}
```

### Export CSV
```http
GET /api/export-csv?entity=produtos&format=csv
```

**Resposta:**
```http
Content-Type: text/csv
Content-Disposition: attachment; filename="produtos.csv"

codigo,nome,preco_venda,estoque_atual
PROD001,Sachê Frango,25.00,50
PROD002,Ração Premium,89.90,30
```

## 📊 Filtros e Parâmetros Comuns

### Paginação
- `page`: Número da página (padrão: 1)
- `limit`: Itens por página (padrão: 10, máximo: 100)

### Busca
- `search`: Termo de busca (busca em campos de texto)

### Filtros de Data
- `data_inicio`: Data inicial (formato: YYYY-MM-DD)
- `data_fim`: Data final (formato: YYYY-MM-DD)

### Filtros de Status
- `ativo`: true/false para filtrar registros ativos
- `status`: Status específico (ex: "confirmada" para vendas)

## ⚠️ Códigos de Erro

### HTTP Status Codes
- `200`: Sucesso
- `201`: Criado com sucesso
- `400`: Dados inválidos
- `401`: Não autorizado
- `403`: Acesso negado
- `404`: Não encontrado
- `500`: Erro interno do servidor

### Mensagens de Erro Padrão
```json
{
  "success": false,
  "error": "Descrição do erro",
  "code": "ERROR_CODE",
  "details": {
    "field": "Campo com erro",
    "message": "Mensagem específica"
  }
}
```

## 🔒 Segurança

### Autenticação (Futuro)
```http
Authorization: Bearer <token>
```

### Validação de Dados
- Todos os campos obrigatórios devem ser validados
- Tipos de dados devem ser verificados
- Sanitização de entrada para prevenir SQL injection

### CORS
```php
header('Access-Control-Allow-Origin: https://admin.magspatch.com');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
```

## 📝 Notas de Implementação

1. **Formato de Datas**: Sempre usar ISO 8601 (YYYY-MM-DDTHH:mm:ssZ)
2. **Formato de Moeda**: Sempre usar números decimais (ex: 25.50)
3. **IDs**: Usar UUIDs para todos os registros
4. **Paginação**: Implementar em todos os endpoints de listagem
5. **Logs**: Registrar todas as operações para auditoria
6. **Backup**: Implementar backup automático do banco de dados

## 🚀 Próximos Passos

1. Implementar endpoints PHP seguindo estes contratos
2. Configurar banco de dados MySQL na Hostinger
3. Testar todos os endpoints com Postman/Insomnia
4. Implementar autenticação e autorização
5. Configurar logs e monitoramento
6. Implementar backup automático

