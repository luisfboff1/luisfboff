# 🛡️ Guia de Backup e Rollback - Megui's Pet Admin

## 📋 Visão Geral

Este guia explica como funciona o sistema de backup e rollback automático implementado no GitHub Actions.

## 🔄 Como Funciona o Sistema de Backup

### **Backup Automático**
- ✅ **A cada deploy**: Versão anterior é salva automaticamente
- ✅ **Timestamp**: Cada backup tem data/hora única
- ✅ **Localização**: `/public_html/admin/backup/YYYYMMDD_HHMMSS/`
- ✅ **Conteúdo**: Todos os arquivos do frontend

### **Estrutura de Backups**
```
public_html/admin/
├── app/                    # Versão atual (ativa)
├── api/                    # API PHP
└── backup/                 # Backups automáticos
    ├── 20241201_143022/    # Backup 1
    ├── 20241201_150315/    # Backup 2
    ├── 20241201_162148/    # Backup 3
    └── ...
```

## 🚀 Fluxo de Deploy com Backup

### **1. Deploy Automático**
```
git push → GitHub Actions → Backup → Deploy → Teste
```

### **2. Detalhes do Processo**
1. **Push para GitHub**: Você envia código
2. **GitHub Actions**: Detecta mudança
3. **Backup**: Salva versão atual em `/backup/YYYYMMDD_HHMMSS/`
4. **Build**: Compila nova versão
5. **Deploy**: Envia nova versão para `/app/`
6. **Teste**: Verifica se site está funcionando

## 🔄 Como Fazer Rollback

### **Opção 1: Via GitHub Actions (Recomendado)**

#### **Passo 1: Acessar GitHub Actions**
1. Vá para [github.com/luisfboff1/meguispet](https://github.com/luisfboff1/meguispet)
2. Clique na aba **"Actions"**
3. Clique em **"Rollback to Previous Version"**

#### **Passo 2: Executar Rollback**
1. Clique em **"Run workflow"**
2. Digite a versão do backup (ex: `20241201_143022`)
3. Clique em **"Run workflow"**

#### **Passo 3: Aguardar Conclusão**
- Acompanhe o progresso em tempo real
- Quando concluído, site estará restaurado

### **Opção 2: Via Script Local**

#### **Listar Backups Disponíveis**
```bash
# Configurar variáveis de ambiente
export FTP_SERVER="ftp.hostinger.com"
export FTP_USERNAME="deploy@meguispet.com"
export FTP_PASSWORD="SuaSenh@123"

# Listar backups
npm run backup:list
```

#### **Executar Rollback Manual**
```bash
# Via GitHub Actions (recomendado)
# Ou via File Manager da Hostinger
```

## 📊 Monitoramento de Versões

### **GitHub Actions - Histórico**
- **Aba "Actions"**: Histórico completo de deploys
- **Logs detalhados**: Cada passo do processo
- **Status**: ✅ Sucesso ou ❌ Falha
- **Tempo**: Duração de cada deploy

### **Informações de Cada Deploy**
```
✅ Deploy concluído com sucesso!
🌐 Site: https://admin.meguispet.com/app/
🔗 API: https://admin.meguispet.com/api/health
📅 Versão: 2024-12-01_14:30:22
📝 Commit: abc123def456
👤 Autor: luisfboff1
```

## 🛡️ Estratégias de Backup

### **Backup Automático (Implementado)**
- ✅ **A cada deploy**: Versão anterior salva
- ✅ **Timestamp único**: Não sobrescreve backups
- ✅ **Automático**: Sem intervenção manual
- ✅ **Rápido**: Backup + Deploy em minutos

### **Backup Manual (Opcional)**
```bash
# Fazer backup manual antes de mudanças grandes
npm run deploy:prepare
# Upload manual da pasta deploy/ para backup/
```

### **Backup do Código (Git)**
- ✅ **GitHub**: Histórico completo de código
- ✅ **Branches**: Versões diferentes
- ✅ **Tags**: Versões marcadas (v1.0, v2.0)
- ✅ **Commits**: Histórico detalhado

## 🔧 Configurações Avançadas

### **Limitar Número de Backups**
Para evitar ocupar muito espaço, você pode:

#### **Opção 1: Script de Limpeza**
```bash
# Manter apenas últimos 10 backups
# Executar via cron job ou manualmente
```

#### **Opção 2: Backup Seletivo**
```bash
# Fazer backup apenas de mudanças importantes
# Marcar commits com tags
```

### **Backup da API PHP**
```bash
# Backup da API também (se necessário)
# Incluir no workflow de backup
```

## 🚨 Cenários de Rollback

### **Cenário 1: Site Quebrou**
```
1. Usuário reporta: "Site não está funcionando"
2. Você verifica: GitHub Actions falhou
3. Solução: Rollback para versão anterior
4. Tempo: 2-3 minutos
```

### **Cenário 2: Bug em Produção**
```
1. Deploy funcionou, mas há bug
2. Você identifica: Problema no código
3. Solução: Rollback + correção local
4. Tempo: 5-10 minutos
```

### **Cenário 3: Mudança Indesejada**
```
1. Deploy funcionou, mas mudança não desejada
2. Você decide: Voltar versão anterior
3. Solução: Rollback imediato
4. Tempo: 2-3 minutos
```

## 📋 Checklist de Backup

### **Antes de Deploy**
- [ ] ✅ Código testado localmente
- [ ] ✅ Backup automático configurado
- [ ] ✅ Rollback testado

### **Durante Deploy**
- [ ] ✅ Acompanhar GitHub Actions
- [ ] ✅ Verificar logs de deploy
- [ ] ✅ Testar site após deploy

### **Após Deploy**
- [ ] ✅ Verificar se site está funcionando
- [ ] ✅ Testar funcionalidades principais
- [ ] ✅ Confirmar backup foi criado

## 🔍 Troubleshooting

### **Problema: Backup não foi criado**
**Solução:**
- Verificar se é o primeiro deploy
- Verificar logs do GitHub Actions
- Verificar permissões FTP

### **Problema: Rollback não funciona**
**Solução:**
- Verificar se backup existe
- Verificar credenciais FTP
- Verificar logs do rollback

### **Problema: Site não atualiza**
**Solução:**
- Aguardar alguns minutos (cache)
- Verificar se deploy foi concluído
- Testar em modo incógnito

## 📞 Suporte

### **Logs Úteis**
- **GitHub Actions**: Aba "Actions" → Clique no workflow
- **Hostinger**: hPanel → Logs de acesso
- **FTP**: Logs de conexão no hPanel

### **Comandos Úteis**
```bash
# Listar backups
npm run backup:list

# Verificar status do site
curl -I https://admin.meguispet.com/app/

# Verificar API
curl https://admin.meguispet.com/api/health
```

---

**🎯 Resultado**: Sistema robusto de backup e rollback que garante que seu site sempre funcione, mesmo em caso de problemas! 🛡️
