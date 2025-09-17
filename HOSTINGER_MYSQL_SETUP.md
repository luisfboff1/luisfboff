# 🗄️ Guia Completo: Configurar MySQL na Hostinger

## 📋 Visão Geral

Este guia passo-a-passo mostra como configurar o banco de dados MySQL na Hostinger para o sistema Megui's Pet Admin, incluindo criação do banco, usuário, configuração de acesso remoto e importação do schema.

## 🎯 Objetivos

1. ✅ Criar banco de dados MySQL na Hostinger
2. ✅ Criar usuário com permissões completas
3. ✅ Habilitar acesso remoto para desenvolvimento
4. ✅ Importar schema do banco de dados
5. ✅ Testar conexão local
6. ✅ Configurar segurança

## 🚀 Passo 1: Acessar o hPanel

### 1.1 Login na Hostinger
1. Acesse [hpanel.hostinger.com](https://hpanel.hostinger.com)
2. Faça login com suas credenciais
3. Selecione seu domínio/hospedagem

### 1.2 Navegar para Bancos de Dados
1. No menu lateral, clique em **"Bancos de Dados"**
2. Selecione **"Bancos de Dados MySQL"**

## 🗄️ Passo 2: Criar Banco de Dados

### 2.1 Criar Novo Banco
1. Clique em **"Criar Banco de Dados"**
2. Preencha os campos:
   - **Nome do Banco**: `meguispet_admin` (ou similar)
   - **Descrição**: `Banco de dados do sistema Megui's Pet Admin`
3. Clique em **"Criar"**

### 2.2 Anotar Informações
**IMPORTANTE**: Anote as seguintes informações:
- **Nome do Banco**: `u123456789_meguispet` (exemplo)
- **Host**: `mysql.hostinger.com` (ou similar)
- **Porta**: `3306`

## 👤 Passo 3: Criar Usuário do Banco

### 3.1 Criar Novo Usuário
1. Na seção **"Usuários do Banco de Dados"**
2. Clique em **"Criar Usuário"**
3. Preencha os campos:
   - **Nome do Usuário**: `meguispet_admin` (ou similar)
   - **Senha**: Gere uma senha forte (ex: `MinhaSenh@123`)
   - **Confirmar Senha**: Digite a mesma senha

### 3.2 Anotar Credenciais
**IMPORTANTE**: Anote as credenciais:
- **Usuário**: `u123456789_admin` (exemplo)
- **Senha**: `MinhaSenh@123` (exemplo)

## 🔗 Passo 4: Associar Usuário ao Banco

### 4.1 Vincular Usuário
1. Na seção **"Usuários do Banco de Dados"**
2. Encontre o usuário criado
3. Clique em **"Gerenciar"**
4. Na aba **"Privilégios"**
5. Selecione o banco de dados criado
6. Marque **"Todos os Privilégios"**
7. Clique em **"Salvar"**

## 🌐 Passo 5: Configurar Acesso Remoto

### 5.1 Habilitar Acesso Remoto
1. Na seção **"Usuários do Banco de Dados"**
2. Encontre o usuário criado
3. Clique em **"Gerenciar"**
4. Na aba **"Acesso Remoto"**
5. Clique em **"Habilitar Acesso Remoto"**

### 5.2 Configurar IPs Permitidos
**Para Desenvolvimento Local:**
1. Selecione **"Permitir de qualquer IP"** (temporário)
2. Ou adicione seu IP público específico

**Para Produção (Recomendado):**
1. Adicione apenas IPs específicos:
   - IP do servidor Hostinger
   - IPs de desenvolvedores autorizados

### 5.3 Anotar Host Remoto
**IMPORTANTE**: Anote o host para acesso remoto:
- **Host Remoto**: `mysql.hostinger.com` (ou similar)
- **Porta**: `3306`

## 📊 Passo 6: Importar Schema do Banco

### 6.1 Acessar phpMyAdmin
1. No hPanel, vá em **"Bancos de Dados"**
2. Clique em **"phpMyAdmin"**
3. Selecione o banco de dados criado

### 6.2 Importar Schema
1. Clique na aba **"Importar"**
2. Clique em **"Escolher arquivo"**
3. Selecione o arquivo `database-schema.sql` do projeto
4. Clique em **"Executar"**

### 6.3 Verificar Importação
1. Verifique se todas as tabelas foram criadas:
   - `usuarios`
   - `produtos`
   - `vendedores`
   - `clientes_fornecedores`
   - `vendas`
   - `itens_venda`
   - `movimentos_estoque`
   - `tipos_movimentos`
   - `contas`
   - `fluxo_caixa`

## 🔧 Passo 7: Configurar Variáveis de Ambiente

### 7.1 Criar Arquivo .env.local
1. No projeto local, copie `env.example` para `.env.local`
2. Edite o arquivo com suas credenciais reais:

```env
# MySQL Hostinger - Desenvolvimento Local
DATABASE_URL="mysql://u123456789_admin:MinhaSenh@123@mysql.hostinger.com:3306/u123456789_meguispet"

# URL base da API PHP em produção
NEXT_PUBLIC_API_BASE_URL="https://admin.magspatch.com/api"

# Ambiente atual
NODE_ENV="development"
```

### 7.2 Formato da DATABASE_URL
```
mysql://[usuario]:[senha]@[host]:[porta]/[nome_banco]
```

**Exemplo:**
```
mysql://u123456789_admin:MinhaSenh@123@mysql.hostinger.com:3306/u123456789_meguispet
```

## 🧪 Passo 8: Testar Conexão

### 8.1 Instalar Dependências MySQL
```bash
npm install mysql2
```

### 8.2 Criar Script de Teste
Crie um arquivo `test-connection.js`:

```javascript
const mysql = require('mysql2/promise');

async function testConnection() {
  try {
    const connection = await mysql.createConnection({
      host: 'mysql.hostinger.com',
      user: 'u123456789_admin',
      password: 'MinhaSenh@123',
      database: 'u123456789_meguispet',
      port: 3306
    });

    console.log('✅ Conexão com MySQL estabelecida com sucesso!');
    
    // Testar query
    const [rows] = await connection.execute('SELECT COUNT(*) as total FROM usuarios');
    console.log(`📊 Total de usuários: ${rows[0].total}`);
    
    await connection.end();
    console.log('🔌 Conexão encerrada.');
    
  } catch (error) {
    console.error('❌ Erro na conexão:', error.message);
  }
}

testConnection();
```

### 8.3 Executar Teste
```bash
node test-connection.js
```

## 🔒 Passo 9: Configurar Segurança

### 9.1 Restringir Acesso Remoto
**IMPORTANTE**: Após testar, restrinja o acesso:

1. No hPanel, vá em **"Usuários do Banco de Dados"**
2. Clique em **"Gerenciar"** no usuário
3. Na aba **"Acesso Remoto"**
4. Remova **"Permitir de qualquer IP"**
5. Adicione apenas IPs específicos necessários

### 9.2 Configurar Firewall
1. No hPanel, vá em **"Segurança"**
2. Configure **"Firewall"** se disponível
3. Permita apenas portas necessárias (80, 443, 3306)

### 9.3 Backup Automático
1. No hPanel, vá em **"Backup"**
2. Configure backup automático do banco de dados
3. Defina frequência (diária recomendada)

## 📱 Passo 10: Configurar para Produção

### 10.1 Subdomínio
1. No hPanel, vá em **"Domínios"**
2. Crie subdomínio: `admin.magspatch.com`
3. Aponte para pasta: `public_html/admin`

### 10.2 Estrutura de Pastas
```
public_html/
├── admin/
│   ├── app/          # Frontend estático (Next.js export)
│   └── api/          # Backend PHP
│       ├── index.php
│       ├── usuarios.php
│       ├── produtos.php
│       └── ...
└── (arquivos WordPress)
```

### 10.3 Configurar .htaccess
Crie `public_html/admin/.htaccess`:

```apache
RewriteEngine On

# API Routes
RewriteRule ^api/(.*)$ api/$1 [L]

# Frontend estático
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ app/$1 [L]
```

## 🚨 Troubleshooting

### Problema: "Access denied for user"
**Solução:**
1. Verifique usuário e senha
2. Confirme se o usuário tem permissões no banco
3. Verifique se o acesso remoto está habilitado

### Problema: "Can't connect to MySQL server"
**Solução:**
1. Verifique o host e porta
2. Confirme se o firewall permite conexão
3. Teste com IP específico em vez de "qualquer IP"

### Problema: "Unknown database"
**Solução:**
1. Verifique se o banco foi criado
2. Confirme o nome do banco na DATABASE_URL
3. Verifique se o usuário tem acesso ao banco

### Problema: "Connection timeout"
**Solução:**
1. Verifique sua conexão com internet
2. Teste com IP específico
3. Verifique configurações de firewall

## 📋 Checklist Final

- [ ] ✅ Banco de dados MySQL criado
- [ ] ✅ Usuário criado com permissões completas
- [ ] ✅ Acesso remoto habilitado
- [ ] ✅ Schema importado com sucesso
- [ ] ✅ Arquivo .env.local configurado
- [ ] ✅ Conexão testada localmente
- [ ] ✅ Acesso remoto restringido (após teste)
- [ ] ✅ Backup automático configurado
- [ ] ✅ Subdomínio configurado
- [ ] ✅ Estrutura de pastas criada

## 🔗 Links Úteis

- [hPanel Hostinger](https://hpanel.hostinger.com)
- [Documentação MySQL](https://dev.mysql.com/doc/)
- [phpMyAdmin](https://www.phpmyadmin.net/)

## 📞 Suporte

Se encontrar problemas:
1. Consulte a documentação da Hostinger
2. Entre em contato com o suporte técnico
3. Verifique os logs de erro no hPanel

---

**🎉 Parabéns!** Seu banco de dados MySQL está configurado e pronto para uso com o sistema Megui's Pet Admin!

