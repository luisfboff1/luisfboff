# 🏗️ Configuração Completa da Hostinger - Megui's Pet Admin

## 📋 Visão Geral

Este documento contém **TODAS** as configurações necessárias na Hostinger para o sistema Megui's Pet Admin funcionar com deploy automático via GitHub Actions.

## 🎯 O que será configurado

1. **🗄️ MySQL Database** - Banco de dados para o sistema
2. **🔌 FTP Account** - Para deploy automático via GitHub
3. **🌐 Subdomain** - admin.meguispet.com
4. **📁 Directory Structure** - Estrutura de pastas
5. **🔒 Security Settings** - Configurações de segurança

---

## ⚠️ **IMPORTANTE: O QUE SEGUIR vs O QUE ALTERAR**

### ✅ **SEGUIR EXATAMENTE (NÃO ALTERAR):**
- **Portas**: 3306 (MySQL), 21 (FTP), 80/443 (HTTP/HTTPS)
- **Estrutura de pastas**: `/public_html/admin/`
- **URLs**: `https://admin.meguispet.com`
- **Comandos e scripts**: Todos os comandos fornecidos
- **Configurações de segurança**: .htaccess, permissões, firewall

### ❌ **ALTERAR OBRIGATORIAMENTE (VALORES GENÉRICOS):**
- **Credenciais MySQL**: Usuário, senha, nome do banco
- **Credenciais FTP**: Usuário, senha
- **IPs de acesso remoto**: Configurar para IPs reais

### 📍 **ONDE CADA CONFIGURAÇÃO SERÁ USADA NO CÓDIGO:**

#### **1. MySQL Database:**
- **Arquivo**: `.env.local` (desenvolvimento)
- **Arquivo**: `src/lib/database.ts` (conexão)
- **Arquivo**: `scripts/test-mysql-connection.ts` (teste)
- **Formato**: `DATABASE_URL="mysql://usuario:senha@host:porta/banco"`

#### **2. FTP Credentials:**
- **Arquivo**: `.github/workflows/deploy.yml` (deploy automático)
- **Arquivo**: `.github/workflows/rollback.yml` (rollback)
- **Local**: GitHub Secrets (FTP_SERVER, FTP_USERNAME, FTP_PASSWORD)

#### **3. API URLs:**
- **Arquivo**: `env.example` (exemplo)
- **Arquivo**: `src/lib/api-client.ts` (chamadas da API)
- **Arquivo**: `next.config.js` (configuração do Next.js)

---

## 1. 🗄️ CONFIGURAÇÃO DO MYSQL DATABASE

### **O que é:** MySQL é o banco de dados onde ficam armazenados todos os dados do sistema (produtos, vendas, clientes, etc.)

### **Por que precisa:** O sistema precisa de um banco de dados para funcionar. Atualmente está usando arquivos locais, mas para produção precisa de MySQL.

### **Passo a passo:**

#### **1.1 Acessar hPanel**
1. Vá para [hpanel.hostinger.com](https://hpanel.hostinger.com)
2. Faça login com as credenciais da conta
3. Selecione o domínio **meguispet.com**

#### **1.2 Criar Banco de Dados**
1. No menu lateral, clique em **"Bancos de Dados"**
2. Selecione **"Bancos de Dados MySQL"**
3. Clique em **"Criar Banco de Dados"**
4. Preencha:
   - **Nome do Banco**: `meguispet_admin`
   - **Descrição**: `Banco de dados do sistema Megui's Pet Admin`
5. Clique em **"Criar"**

#### **1.3 Anotar Informações do Banco**
**IMPORTANTE**: Anote essas informações (serão necessárias depois):
- **Nome do Banco**: `u123456789_meguispet` (exemplo - ⚠️ **ALTERAR** para o nome real)
- **Host**: `mysql.hostinger.com` (✅ **SEGUIR** exatamente)
- **Porta**: `3306` (✅ **SEGUIR** exatamente)

**📍 ONDE USAR NO CÓDIGO:**
- **Arquivo**: `.env.local` → `DATABASE_URL="mysql://usuario:senha@mysql.hostinger.com:3306/nome_banco"`
- **Arquivo**: `scripts/test-mysql-connection.ts` → Teste de conexão

---

## 2. 👤 CONFIGURAÇÃO DO USUÁRIO MYSQL

### **O que é:** Usuário com permissões para acessar o banco de dados

### **Por que precisa:** O sistema precisa de um usuário com permissões para ler/escrever dados no banco

### **Passo a passo:**

#### **2.1 Criar Usuário**
1. Na seção **"Usuários do Banco de Dados"**
2. Clique em **"Criar Usuário"**
3. Preencha:
   - **Nome do Usuário**: `meguispet_admin`
   - **Senha**: Gere uma senha forte (ex: `Meguispet@2024!`)
   - **Confirmar Senha**: Digite a mesma senha
4. Clique em **"Criar"**

#### **2.2 Anotar Credenciais do Usuário**
**IMPORTANTE**: Anote essas informações:
- **Usuário**: `u123456789_admin` (exemplo - ⚠️ **ALTERAR** para o usuário real)
- **Senha**: `Meguispet@2024!` (exemplo - ⚠️ **ALTERAR** para a senha real)

**📍 ONDE USAR NO CÓDIGO:**
- **Arquivo**: `.env.local` → `DATABASE_URL="mysql://USUARIO_REAL:SENHA_REAL@mysql.hostinger.com:3306/BANCO_REAL"`
- **Arquivo**: `src/lib/database.ts` → Conexão com o banco

---

## 3. 🔗 ASSOCIAR USUÁRIO AO BANCO

### **O que é:** Dar permissões para o usuário acessar o banco de dados

### **Por que precisa:** O usuário precisa ter permissões para usar o banco

### **Passo a passo:**

#### **3.1 Vincular Usuário**
1. Na seção **"Usuários do Banco de Dados"**
2. Encontre o usuário criado
3. Clique em **"Gerenciar"**
4. Na aba **"Privilégios"**
5. Selecione o banco de dados `meguispet_admin`
6. Marque **"Todos os Privilégios"** (SELECT, INSERT, UPDATE, DELETE, etc.)
7. Clique em **"Salvar"**

---

## 4. 🌐 CONFIGURAÇÃO DE ACESSO REMOTO MYSQL

### **O que é:** Permitir que o sistema acesse o banco de dados de fora do servidor

### **Por que precisa:** O sistema em desenvolvimento local precisa conectar no banco da Hostinger

### **Passo a passo:**

#### **4.1 Habilitar Acesso Remoto**
1. Na seção **"Usuários do Banco de Dados"**
2. Encontre o usuário criado
3. Clique em **"Gerenciar"**
4. Na aba **"Acesso Remoto"**
5. Clique em **"Habilitar Acesso Remoto"**

#### **4.2 Configurar IPs Permitidos**
**Para Desenvolvimento:**
1. Selecione **"Permitir de qualquer IP"** (temporário)
2. **⚠️ IMPORTANTE**: Após testar, restringir para IPs específicos

**Para Produção (Recomendado):**
1. Adicione apenas IPs específicos:
   - IP do servidor Hostinger
   - IPs de desenvolvedores autorizados

---

## 5. 🔌 CONFIGURAÇÃO DO FTP

### **O que é:** FTP (File Transfer Protocol) é o protocolo para transferir arquivos entre computadores

### **Por que precisa:** O GitHub Actions precisa enviar arquivos automaticamente para o servidor

### **Passo a passo:**

#### **5.1 Criar Conta FTP**
1. No menu lateral, clique em **"FTP"**
2. Clique em **"Criar Conta FTP"**
3. Preencha:
   - **Nome de usuário**: `deploy`
   - **Senha**: Gere uma senha forte (ex: `Deploy@2024!`)
   - **Diretório**: `/public_html/admin/`
4. Clique em **"Criar"**

#### **5.2 Anotar Credenciais FTP**
**IMPORTANTE**: Anote essas informações:
- **Servidor FTP**: `ftp.hostinger.com` (✅ **SEGUIR** exatamente)
- **Usuário**: `deploy@meguispet.com` (exemplo - ⚠️ **ALTERAR** para o usuário real)
- **Senha**: `Deploy@2024!` (exemplo - ⚠️ **ALTERAR** para a senha real)
- **Porta**: `21` (✅ **SEGUIR** exatamente)

**📍 ONDE USAR NO CÓDIGO:**
- **GitHub Secrets**: `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD`
- **Arquivo**: `.github/workflows/deploy.yml` → Deploy automático
- **Arquivo**: `.github/workflows/rollback.yml` → Rollback automático

---

## 6. 🌐 CONFIGURAÇÃO DO SUBDOMÍNIO

### **O que é:** Subdomínio é uma extensão do domínio principal (ex: admin.meguispet.com)

### **Por que precisa:** O sistema precisa de um endereço próprio para funcionar

### **Passo a passo:**

#### **6.1 Criar Subdomínio**
1. No menu lateral, clique em **"Domínios"**
2. Clique em **"Subdomínios"**
3. Clique em **"Criar Subdomínio"**
4. Preencha:
- **Subdomínio**: `admin`
- **Domínio**: `meguispet.com`
   - **Diretório**: `public_html/admin`
5. Clique em **"Criar"**

#### **6.2 Verificar Subdomínio**
- **URL**: https://admin.meguispet.com (✅ **SEGUIR** exatamente)
- **Diretório**: `/public_html/admin/` (✅ **SEGUIR** exatamente)

**📍 ONDE USAR NO CÓDIGO:**
- **Arquivo**: `env.example` → `NEXT_PUBLIC_API_BASE_URL="https://admin.meguispet.com/api"`
- **Arquivo**: `src/lib/api-client.ts` → Base URL da API
- **Arquivo**: `next.config.js` → Configuração do Next.js

---

## 7. 📁 ESTRUTURA DE PASTAS

### **O que é:** Organização das pastas onde ficam os arquivos do sistema

### **Por que precisa:** O sistema precisa de uma estrutura específica para funcionar

### **Estrutura necessária:**
```
public_html/
├── admin/                    # Pasta do sistema
│   ├── app/                  # Frontend (será criado automaticamente)
│   ├── api/                  # Backend PHP (será criado automaticamente)
│   └── backup/               # Backups automáticos (será criado automaticamente)
└── (arquivos WordPress)      # Arquivos do site principal
```

### **Passo a passo:**

#### **7.1 Criar Estrutura Base**
1. Acesse **"File Manager"** no hPanel
2. Navegue até `public_html/`
3. Crie a pasta `admin/` (se não existir)
4. Dentro de `admin/`, crie:
   - `app/` (para frontend)
   - `api/` (para backend PHP)
   - `backup/` (para backups)

#### **7.2 Configurar Permissões**
1. Clique com botão direito na pasta `admin/`
2. Selecione **"Permissões"**
3. Configure:
   - **Owner**: 755
   - **Group**: 755
   - **Public**: 755

---

## 8. 🔒 CONFIGURAÇÕES DE SEGURANÇA

### **O que é:** Configurações para proteger o sistema

### **Por que precisa:** Segurança é fundamental para proteger dados e evitar ataques

### **Passo a passo:**

#### **8.1 Configurar .htaccess**
1. Na pasta `public_html/admin/`
2. Crie arquivo `.htaccess`
3. Adicione conteúdo:

```apache
# Configurações de segurança
<Files "*.php">
    Order Allow,Deny
    Allow from all
</Files>

# Desabilitar listagem de diretórios
Options -Indexes

# Configurações de cache
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType application/json "access plus 0 seconds"
</IfModule>
```

#### **8.2 Configurar Firewall**
1. No hPanel, vá em **"Segurança"**
2. Configure **"Firewall"** se disponível
3. Permita apenas portas necessárias:
   - **80** (HTTP)
   - **443** (HTTPS)
   - **3306** (MySQL - apenas se necessário)

---

## 9. 📊 CONFIGURAÇÃO DO BACKUP AUTOMÁTICO

### **O que é:** Backup automático do banco de dados

### **Por que precisa:** Proteger dados em caso de problemas

### **Passo a passo:**

#### **9.1 Configurar Backup**
1. No hPanel, vá em **"Backup"**
2. Configure backup automático:
   - **Frequência**: Diária
   - **Horário**: 02:00 (madrugada)
   - **Retenção**: 7 dias
3. Clique em **"Salvar"**

---

## 10. 🧪 TESTE DAS CONFIGURAÇÕES

### **O que é:** Verificar se tudo está funcionando

### **Por que precisa:** Garantir que as configurações estão corretas

### **Passo a passo:**

#### **10.1 Testar MySQL**
1. Acesse **"phpMyAdmin"** no hPanel
2. Faça login com as credenciais criadas
3. Verifique se consegue acessar o banco `meguispet_admin`

#### **10.2 Testar FTP**
1. Use um cliente FTP (FileZilla, WinSCP)
2. Conecte com as credenciais criadas
3. Verifique se consegue acessar `/public_html/admin/`

#### **10.3 Testar Subdomínio**
1. Acesse https://admin.meguispet.com
2. Verifique se carrega (mesmo que dê erro 404)

---

## 📋 CHECKLIST FINAL

### **MySQL Database:**
- [ ] ✅ Banco de dados criado
- [ ] ✅ Usuário criado
- [ ] ✅ Usuário associado ao banco
- [ ] ✅ Acesso remoto habilitado
- [ ] ✅ Teste de conexão funcionando

### **FTP:**
- [ ] ✅ Conta FTP criada
- [ ] ✅ Diretório configurado
- [ ] ✅ Teste de conexão funcionando

### **Subdomínio:**
- [ ] ✅ Subdomínio criado
- [ ] ✅ Diretório configurado
- [ ] ✅ Teste de acesso funcionando

### **Estrutura:**
- [ ] ✅ Pastas criadas
- [ ] ✅ Permissões configuradas
- [ ] ✅ .htaccess configurado

### **Segurança:**
- [ ] ✅ Firewall configurado
- [ ] ✅ Backup automático ativo
- [ ] ✅ Permissões restritivas

---

## 📞 INFORMAÇÕES PARA O DESENVOLVEDOR

### **🔧 CONFIGURAÇÕES QUE DEVEM SER ALTERADAS:**

#### **1. MySQL Database (⚠️ ALTERAR):**
```bash
# ❌ NÃO usar estes valores genéricos:
Host: mysql.hostinger.com
Porta: 3306
Banco: u123456789_meguispet
Usuário: u123456789_admin
Senha: Meguispet@2024!

# ✅ USAR os valores REAIS da Hostinger:
# Substituir pelos valores criados na configuração acima
```

#### **2. FTP Credentials (⚠️ ALTERAR):**
```bash
# ❌ NÃO usar estes valores genéricos:
Servidor: ftp.hostinger.com
Porta: 21
Usuário: deploy@meguispet.com
Senha: Deploy@2024!
Diretório: /public_html/admin/

# ✅ USAR os valores REAIS da Hostinger:
# Substituir pelos valores criados na configuração acima
```

### **🌐 CONFIGURAÇÕES QUE DEVEM SER SEGUIDAS EXATAMENTE:**

#### **3. URLs (✅ SEGUIR EXATAMENTE):**
```bash
# ✅ USAR exatamente como está:
Site: https://admin.meguispet.com
API: https://admin.meguispet.com/api/
Frontend: https://admin.meguispet.com/app/
```

### **📁 ARQUIVOS QUE PRECISAM SER ATUALIZADOS:**

#### **1. Arquivo `.env.local` (Desenvolvimento):**
```bash
# Substituir pelos valores REAIS:
DATABASE_URL="mysql://USUARIO_REAL:SENHA_REAL@mysql.hostinger.com:3306/BANCO_REAL"
NEXT_PUBLIC_API_BASE_URL="https://admin.meguispet.com/api"
```

#### **2. GitHub Secrets (Deploy Automático):**
```bash
# Configurar no GitHub → Settings → Secrets:
FTP_SERVER=ftp.hostinger.com
FTP_USERNAME=USUARIO_FTP_REAL
FTP_PASSWORD=SENHA_FTP_REAL
```

#### **3. Arquivo `src/lib/database.ts` (Conexão):**
```typescript
// Usar a DATABASE_URL do .env.local
const connectionString = process.env.DATABASE_URL;
```

#### **4. Arquivo `src/lib/api-client.ts` (API):**
```typescript
// Usar a URL do .env.local
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '/api';
```

---

## 💻 CONFIGURAÇÃO PARA DESENVOLVIMENTO LOCAL

### **🏠 Ambiente de Desenvolvimento:**
```bash
# ✅ USAR exatamente como está:
URL Local: http://localhost:3000
URL Rede: http://192.168.0.4:3000
Porta: 3000 (✅ SEGUIR exatamente)
```

### **🔧 Arquivo `.env.local` (Criar na raiz do projeto):**
```bash
# ⚠️ ALTERAR pelos valores REAIS da Hostinger:
DATABASE_URL="mysql://USUARIO_REAL:SENHA_REAL@mysql.hostinger.com:3306/BANCO_REAL"

# ✅ SEGUIR exatamente:
NEXT_PUBLIC_API_BASE_URL="https://admin.meguispet.com/api"
```

### **📋 Comandos para Desenvolvimento:**
```bash
# ✅ SEGUIR exatamente:
npm install          # Instalar dependências
npm run dev         # Iniciar desenvolvimento
npm run db:check    # Testar conexão MySQL
npm run build:static # Gerar build para produção
```

---

## ⚠️ IMPORTANTE

### **Após Configuração:**
1. **Restringir acesso remoto MySQL** para IPs específicos
2. **Testar todas as funcionalidades**
3. **Configurar monitoramento**
4. **Fazer backup inicial**

### **Segurança:**
- **Nunca compartilhar** credenciais por email
- **Usar senhas fortes**
- **Ativar 2FA** se disponível
- **Monitorar logs** regularmente

---

**🎯 Resultado**: Sistema completamente configurado e pronto para deploy automático via GitHub Actions! 🚀
