# 🚀 Configuração GitHub Actions + FTP para Deploy Automático

## 📋 Visão Geral

Este guia mostra como configurar deploy automático do GitHub para a Hostinger usando GitHub Actions + FTP.

## 🔌 Passo 1: Configurar FTP na Hostinger

### 1.1 Acessar hPanel
1. Vá para [hpanel.hostinger.com](https://hpanel.hostinger.com)
2. Faça login com suas credenciais
3. Selecione seu domínio

### 1.2 Criar Conta FTP
1. No menu lateral, clique em **"FTP"**
2. Clique em **"Criar Conta FTP"**
3. Preencha os dados:
   - **Nome de usuário**: `deploy` (ou similar)
   - **Senha**: Gere uma senha forte (ex: `Deploy@123`)
   - **Diretório**: `/public_html/admin/`
4. Clique em **"Criar"**

### 1.3 Anotar Credenciais
**IMPORTANTE**: Anote essas informações:
- **Servidor FTP**: `ftp.hostinger.com` (ou similar)
- **Usuário**: `deploy@meguispet.com`
- **Senha**: `Deploy@123`
- **Porta**: `21`

## 🔐 Passo 2: Configurar Secrets no GitHub

### 2.1 Acessar Configurações do Repositório
1. Vá para [github.com/luisfboff1/meguispet](https://github.com/luisfboff1/meguispet)
2. Clique na aba **"Settings"**
3. No menu lateral, clique em **"Secrets and variables"**
4. Clique em **"Actions"**

### 2.2 Adicionar Secrets
Clique em **"New repository secret"** e adicione:

#### Secret 1: FTP_SERVER
- **Name**: `FTP_SERVER`
- **Value**: `ftp.hostinger.com` (ou o servidor que apareceu no hPanel)

#### Secret 2: FTP_USERNAME
- **Name**: `FTP_USERNAME`
- **Value**: `deploy@meguispet.com` (usuário FTP criado)

#### Secret 3: FTP_PASSWORD
- **Name**: `FTP_PASSWORD`
- **Value**: `Deploy@123` (senha FTP criada)

## 🎯 Passo 3: Testar Deploy Automático

### 3.1 Fazer uma Alteração
1. Edite qualquer arquivo no projeto
2. Faça commit e push:
```bash
git add .
git commit -m "test: teste de deploy automático"
git push origin master
```

### 3.2 Verificar Deploy
1. Vá para a aba **"Actions"** no GitHub
2. Clique no workflow que está executando
3. Acompanhe o progresso em tempo real
4. Se tudo der certo, verá ✅ verde

### 3.3 Verificar Site
- **Frontend**: https://admin.meguispet.com/app/
- **API**: https://admin.meguispet.com/api/health

## 🔄 Como Funciona o Fluxo

### Desenvolvimento:
```
1. Você edita código localmente
2. git add . && git commit -m "sua mensagem"
3. git push origin master
```

### Deploy Automático:
```
4. GitHub detecta o push
5. GitHub Actions executa:
   - Instala dependências (npm install)
   - Faz build estático (npm run build:static)
   - Prepara arquivos (npm run deploy:copy)
   - Upload via FTP para Hostinger
6. Site atualizado automaticamente
```

## 📊 Monitoramento

### Verificar Status:
- **GitHub Actions**: Aba "Actions" no repositório
- **Logs**: Clique no workflow para ver detalhes
- **Site**: Acesse https://admin.meguispet.com/app/

### Troubleshooting:
- **Erro de FTP**: Verifique credenciais nos Secrets
- **Erro de Build**: Verifique logs no GitHub Actions
- **Site não atualiza**: Aguarde alguns minutos (cache)

## ⚠️ Segurança

### Boas Práticas:
- ✅ **Senha forte** para FTP
- ✅ **Secrets** no GitHub (não commitar credenciais)
- ✅ **Diretório restrito** no FTP
- ✅ **Logs** de deploy para auditoria

### O que NÃO fazer:
- ❌ Commitar credenciais no código
- ❌ Usar senha fraca no FTP
- ❌ Dar acesso FTP para muitas pessoas

## 🎉 Benefícios

### Antes (Manual):
- ❌ Upload manual toda vez
- ❌ Risco de esquecer arquivos
- ❌ Processo demorado
- ❌ Propenso a erros

### Depois (Automático):
- ✅ Deploy automático a cada push
- ✅ Todos os arquivos sempre atualizados
- ✅ Processo rápido e confiável
- ✅ Logs de deploy para debug

## 🔧 Personalização

### Modificar Workflow:
Edite `.github/workflows/deploy.yml` para:
- Adicionar testes antes do deploy
- Notificar em caso de erro
- Deploy para múltiplos ambientes
- Executar scripts personalizados

### Exemplo de Notificação:
```yaml
- name: Notify on Success
  if: success()
  run: |
    echo "✅ Deploy concluído com sucesso!"
    # Aqui você pode adicionar notificação por email/Slack
```

## 📞 Suporte

### Problemas Comuns:
1. **FTP não conecta**: Verifique servidor e credenciais
2. **Build falha**: Verifique dependências e Node.js
3. **Arquivos não aparecem**: Aguarde cache ou verifique permissões

### Logs Úteis:
- GitHub Actions: Aba "Actions" → Clique no workflow
- Hostinger: hPanel → Logs de acesso
- FTP: Logs de conexão no hPanel

---

**🎯 Resultado Final**: A cada `git push`, seu site será atualizado automaticamente na Hostinger! 🚀
