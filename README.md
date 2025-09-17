# Megui's Pet - Sistema Administrativo

## 📋 Visão Geral

O **Megui's Pet** é um sistema administrativo completo para gestão de pet shop, desenvolvido com tecnologias modernas para oferecer uma experiência robusta e escalável. O sistema permite gerenciar produtos, estoque, vendas, vendedores, clientes e fornecedores de forma integrada.

## 🏗️ Arquitetura e Tecnologias

### Stack Principal
- **Framework**: Next.js 15.5.3 (React 19.1.0)
- **Linguagem**: TypeScript 5
- **Estilização**: Tailwind CSS 4 + CSS Custom Properties
- **Banco de Dados**: Supabase (PostgreSQL) + SQLite local para desenvolvimento
- **Gráficos**: Recharts
- **Formulários**: React Hook Form + Zod
- **Ícones**: Lucide React

### Estrutura do Projeto

```
meguispet-admin/
├── 📁 src/                          # Código fonte principal
│   ├── 📁 app/                      # App Router do Next.js
│   │   ├── 📁 api/                  # API Routes (Backend)
│   │   │   ├── 📁 clientes-fornecedores/
│   │   │   ├── 📁 contas/
│   │   │   ├── 📁 fluxo-caixa/
│   │   │   ├── 📁 itens-venda/
│   │   │   ├── 📁 movimentos-estoque/
│   │   │   ├── 📁 produtos/
│   │   │   ├── 📁 tipos-movimentos/
│   │   │   ├── 📁 usuarios/
│   │   │   ├── 📁 vendas/
│   │   │   ├── 📁 vendedores/
│   │   │   ├── 📁 export-csv/
│   │   │   └── 📁 migrate/
│   │   ├── 📁 [páginas]/            # Páginas da aplicação
│   │   │   ├── 📄 page.tsx          # Dashboard principal
│   │   │   ├── 📄 dashboard/page.tsx
│   │   │   ├── 📄 produtos/page.tsx
│   │   │   ├── 📄 estoque/page.tsx
│   │   │   ├── 📄 vendas/page.tsx
│   │   │   ├── 📄 vendedores/page.tsx
│   │   │   ├── 📄 clientes/page.tsx
│   │   │   └── 📄 config/page.tsx
│   │   ├── 📄 layout.tsx            # Layout principal
│   │   ├── 📄 globals.css           # Estilos globais
│   │   └── 📄 page.tsx              # Página inicial
│   ├── 📁 components/               # Componentes reutilizáveis
│   │   ├── 📄 Header.tsx            # Cabeçalho com navegação
│   │   ├── 📄 Footer.tsx            # Rodapé
│   │   ├── 📄 DataManager.tsx       # Gerenciador de dados
│   │   ├── 📄 ProdutoForm.tsx       # Formulário de produtos
│   │   ├── 📄 ProdutoModal.tsx      # Modal de produtos
│   │   ├── 📄 ImportCSVModal.tsx    # Modal de importação CSV
│   │   └── 📄 RelatorioVendasModal.tsx
│   └── 📁 lib/                      # Utilitários e configurações
│       ├── 📄 database.ts           # Camada de abstração do banco
│       ├── 📄 database-client.ts    # Cliente do banco
│       ├── 📄 database-server.ts    # Servidor do banco
│       ├── 📄 supabase.ts           # Configuração Supabase
│       └── 📄 migration-server.ts   # Migração de dados
├── 📁 data/                         # Dados locais (JSON)
├── 📁 public/                       # Arquivos estáticos
│   ├── 📁 assets/                   # Imagens e logos
│   └── 📁 images/                   # Imagens dos produtos
├── 📄 database-schema.sql           # Schema do banco Supabase
├── 📄 package.json                  # Dependências e scripts
└── 📄 README.md                     # Este arquivo
```

## 🗄️ Estrutura do Banco de Dados

### Tabelas Principais

#### 1. **usuarios**
- Gestão de usuários do sistema
- Campos: id, nome, email, permissoes[], ativo, timestamps

#### 2. **produtos**
- Catálogo de produtos
- Campos: id, codigo, nome, descricao, preco_custo, preco_venda, estoque_minimo, estoque_atual, unidade, categoria, ativo, timestamps

#### 3. **vendedores**
- Cadastro de vendedores
- Campos: id, cpf, nome, email, telefone, comissao_percentual, ativo, timestamps

#### 4. **clientes_fornecedores**
- Clientes e fornecedores unificados
- Campos: id, tipo (fisica/juridica), cpf_cnpj, nome_razao_social, nome_fantasia, contatos, endereço, vendedor_id, ativo, timestamps

#### 5. **vendas**
- Registro de vendas
- Campos: id, numero_venda, cliente_id, vendedor_id, data, valor_total, desconto, valor_final, status, observacoes, timestamps

#### 6. **itens_venda**
- Itens de cada venda
- Campos: id, venda_id, produto_id, quantidade, valor_unitario, valor_total, timestamp

#### 7. **movimentos_estoque**
- Controle de estoque
- Campos: id, documento, cliente_fornecedor_id, data, quantidade, valor_unitario, valor_total, tipo_movimento_id, produto_id, estoque_local (RS/SP), observacoes, timestamps

#### 8. **tipos_movimentos**
- Tipos de movimentação (entrada/saída)
- Campos: id, descricao, tipo, ativo, timestamps

#### 9. **contas**
- Plano de contas
- Campos: id, descricao, tipo (debito/credito), categoria, ativo, timestamps

#### 10. **fluxo_caixa**
- Controle financeiro
- Campos: id, data, conta_id, historico, valor, tipo (entrada/saida), observacoes, timestamps

### Relacionamentos
- **vendas** → **clientes_fornecedores** (cliente_id)
- **vendas** → **vendedores** (vendedor_id)
- **itens_venda** → **vendas** (venda_id)
- **itens_venda** → **produtos** (produto_id)
- **movimentos_estoque** → **produtos** (produto_id)
- **movimentos_estoque** → **clientes_fornecedores** (cliente_fornecedor_id)
- **movimentos_estoque** → **tipos_movimentos** (tipo_movimento_id)
- **fluxo_caixa** → **contas** (conta_id)

## 🔄 Fluxo de Dados

### Entrada de Dados
1. **Interface Web**: Formulários React com validação Zod
2. **API Routes**: Endpoints Next.js para CRUD operations
3. **Camada de Abstração**: Database.ts para facilitar migração
4. **Banco de Dados**: Supabase (PostgreSQL) ou SQLite local

### Saída de Dados
1. **Dashboard**: Gráficos e KPIs em tempo real
2. **Relatórios**: Exportação CSV/PDF
3. **APIs**: Endpoints REST para integração externa
4. **Interface**: Tabelas e cards responsivos

### Processamento
- **Validação**: Zod schemas para type safety
- **Transformação**: Dados formatados para exibição
- **Agregação**: Cálculos de totais, médias e estatísticas
- **Cache**: Otimização de performance com Next.js

## 🎨 Sistema de Design

### Paleta de Cores
```css
/* Cores principais da marca Megui's Pet */
--wc-primary: #ffba00;         /* Laranja principal */
--wc-primary-text: #ffffff;    /* Texto branco */
--wc-secondary: #fff8e1;       /* Amarelo claro de fundo */
--wc-highlight: #fcb900;       /* Amarelo vibrante */
--wc-accent: #ff8c00;          /* Laranja mais escuro para hover */

/* Cores de status */
--text-green: #28a745;         /* Sucesso */
--text-orange: #ff6b35;        /* Aviso */
--text-red: #dc3545;           /* Erro */
```

### Componentes Visuais
- **Header**: Gradiente laranja com logo e navegação
- **Cards**: Bordas arredondadas com sombras suaves
- **Botões**: Estilo primário e outline
- **Tabelas**: Design limpo com hover effects
- **Modais**: Overlay com animações suaves
- **Gráficos**: Cores da marca com Recharts

### Responsividade
- **Mobile First**: Design adaptável para todos os dispositivos
- **Breakpoints**: Tailwind CSS para diferentes tamanhos
- **Grid System**: Layout flexível e responsivo

## 🚀 Como Executar o Projeto

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn
- Conta no Supabase (opcional)

### Instalação
```bash
# Clone o repositório
git clone [url-do-repositorio]
cd meguispet-admin

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env.local
# Edite .env.local com suas credenciais do Supabase

# Execute o projeto
npm run dev
```

### Scripts Disponíveis
```bash
npm run dev          # Desenvolvimento
npm run build        # Build para produção
npm run start        # Servidor de produção
npm run lint         # Verificação de código
npm run migrate      # Migração de dados
npm run export-csv   # Exportação CSV
```

## 🔧 Configuração do Banco de Dados

### Supabase (Recomendado)
1. Crie um projeto no [Supabase](https://supabase.com)
2. Execute o script `database-schema.sql` no SQL Editor
3. Configure as variáveis de ambiente:
```env
NEXT_PUBLIC_SUPABASE_URL=sua_url_do_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima
```

### SQLite Local (Desenvolvimento)
- Os dados são salvos em arquivos JSON na pasta `data/`
- Ideal para desenvolvimento e testes
- Migração automática para Supabase quando necessário

## 📊 Funcionalidades Principais

### Dashboard
- **KPIs**: Faturamento, vendas, estoque, vendedores
- **Gráficos**: Vendas por mês, categoria, vendedor
- **Análises**: Produtos mais vendidos, performance
- **Controle de Estoque**: Alertas de estoque baixo

### Gestão de Produtos
- **CRUD Completo**: Criar, editar, excluir produtos
- **Categorização**: Por tipo, sabor, animal
- **Controle de Preços**: Custo e venda
- **Gestão de Estoque**: Mínimo e atual
- **Upload de Imagens**: Fotos dos produtos

### Sistema de Vendas
- **Processo Completo**: Cliente → Produtos → Vendedor → Venda
- **Cálculos Automáticos**: Totais, descontos, comissões
- **Status**: Pendente, confirmada, cancelada
- **Relatórios**: Por período, vendedor, produto

### Controle de Estoque
- **Movimentações**: Entrada e saída
- **Múltiplos Locais**: RS e SP
- **Rastreabilidade**: Documento, fornecedor, data
- **Alertas**: Estoque abaixo do mínimo

### Gestão de Pessoas
- **Vendedores**: CPF, comissão, contatos
- **Clientes/Fornecedores**: PF/PJ, endereços, vendedor responsável
- **Usuários**: Sistema de permissões

## 🔄 Migração e Importação

### Importação CSV
- **Formatos Suportados**: Produtos, clientes, vendedores
- **Validação**: Dados obrigatórios e formatos
- **Preview**: Visualização antes da importação
- **Logs**: Relatório de sucessos e erros

### Migração de Dados
- **Local → Supabase**: Migração automática
- **Backup**: Exportação completa
- **Rollback**: Reversão de mudanças

## 🎯 Personalização e Extensibilidade

### Modificar Cores e Design
1. **Edite `src/app/globals.css`**:
   - Altere as variáveis CSS custom properties
   - Modifique a paleta de cores
   - Ajuste espaçamentos e tipografia

2. **Componentes Tailwind**:
   - Use classes utilitárias do Tailwind
   - Crie componentes customizados
   - Mantenha consistência visual

### Adicionar Novas Funcionalidades
1. **Crie nova página** em `src/app/[nome]/page.tsx`
2. **Adicione API route** em `src/app/api/[nome]/route.ts`
3. **Defina tipos** em `src/lib/database.ts`
4. **Atualize navegação** em `src/components/Header.tsx`

### Integração com Sistemas Externos
- **APIs REST**: Endpoints prontos para integração
- **Webhooks**: Notificações de eventos
- **Exportação**: CSV, JSON, PDF
- **Importação**: Dados de outros sistemas

## 📱 Responsividade e Performance

### Otimizações
- **Next.js**: SSR/SSG para performance
- **Imagens**: Otimização automática com Next/Image
- **Bundle**: Code splitting automático
- **Cache**: Estratégias de cache inteligentes

### Dispositivos Suportados
- **Desktop**: 1200px+ (layout completo)
- **Tablet**: 768px-1199px (layout adaptado)
- **Mobile**: <768px (layout otimizado)

## 🔒 Segurança

### Autenticação
- **Supabase Auth**: Sistema robusto de autenticação
- **Permissões**: Controle granular de acesso
- **Sessões**: Gerenciamento seguro de sessões

### Validação
- **Zod**: Validação de tipos em runtime
- **Sanitização**: Limpeza de dados de entrada
- **CORS**: Configuração de origens permitidas

## 🚀 Deploy e Produção

### Vercel (Recomendado)
```bash
# Deploy automático
vercel --prod

# Configuração de variáveis
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
```

### Outras Plataformas
- **Netlify**: Compatível com Next.js
- **Railway**: Deploy simples
- **Docker**: Containerização disponível

## 📈 Monitoramento e Analytics

### Métricas Disponíveis
- **Performance**: Core Web Vitals
- **Uso**: Páginas mais acessadas
- **Erros**: Logs de erro em tempo real
- **Negócio**: KPIs de vendas e estoque

## 🤝 Contribuição

### Padrões de Código
- **TypeScript**: Tipagem forte obrigatória
- **ESLint**: Configuração Next.js
- **Prettier**: Formatação consistente
- **Conventional Commits**: Padrão de commits

### Estrutura de Commits
```
feat: adiciona nova funcionalidade
fix: corrige bug
docs: atualiza documentação
style: mudanças de estilo
refactor: refatoração de código
test: adiciona testes
chore: tarefas de manutenção
```

## 📞 Suporte

Para dúvidas, sugestões ou problemas:
- **Issues**: Use o sistema de issues do GitHub
- **Documentação**: Consulte este README
- **Código**: Comentários inline no código

---

**Megui's Pet** - Sistema desenvolvido com ❤️ para facilitar a gestão de pet shops modernos.