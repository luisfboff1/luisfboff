# 🚀 Configuração de Deploy - Site Vitrine

## 📋 Informações do Cliente

**Nome:** Luis Fernando Boff  
**Domínio:** luisfboff.com  
**Email:** luis@luisfboff.com  

## 🔐 Credenciais FTP (Hostinger)

```
Servidor: luisfboff.com
Usuário: u903000160.deploy
Senha: Deploy2022!
Diretório: public_html/
```

## ⚙️ Secrets do GitHub

Configure estes secrets no repositório:
- **FTP_SERVER**: `luisfboff.com`
- **FTP_USERNAME**: `u903000160.deploy`
- **FTP_PASSWORD**: `Deploy2022!`

## 🛠️ Passos para Configuração

### 1. Limpar Repositório Atual

```bash
# Clone o repositório
git clone https://github.com/luisfboff1/luisfboff.git
cd luisfboff

# Remove todos os arquivos
git rm -rf .
git clean -fd

# Copia arquivos do site vitrine
cp -r ../site-vitrine/* .

# Commit e push
git add .
git commit -m "🎨 Site vitrine - Luis Fernando Boff"
git push origin main
```

### 2. Configurar Secrets

1. Acesse: `https://github.com/luisfboff1/luisfboff/settings/secrets/actions`
2. Clique em **New repository secret**
3. Adicione cada secret:
   - Name: `FTP_SERVER`, Value: `luisfboff.com`
   - Name: `FTP_USERNAME`, Value: `u903000160.deploy`
   - Name: `FTP_PASSWORD`, Value: `Deploy2022!`

### 3. Testar Deploy

```bash
# Faça uma pequena alteração
echo "<!-- Teste deploy -->" >> index.html

# Commit e push
git add .
git commit -m "🧪 Teste deploy automático"
git push origin main
```

### 4. Verificar Deploy

- Acesse: `https://luisfboff.com`
- Verifique se o site está funcionando
- Teste as animações e funcionalidades

## 📁 Estrutura Final do Repositório

```
luisfboff/
├── .github/
│   └── workflows/
│       └── deploy-hostinger.yml
├── index.html
├── styles.css
├── script.js
├── README.md
├── setup-repo.sh
└── DEPLOY_CONFIG.md
```

## 🔧 Troubleshooting

### Deploy Falhou
1. Verifique se os secrets estão configurados
2. Confirme as credenciais FTP
3. Verifique os logs do GitHub Actions

### Site Não Carrega
1. Verifique se os arquivos foram enviados para `public_html/`
2. Confirme se o domínio está apontando corretamente
3. Teste acessando diretamente: `https://luisfboff.com/index.html`

### Animações Não Funcionam
1. Verifique se o JavaScript está habilitado
2. Confirme se todos os arquivos CSS/JS foram enviados
3. Teste em diferentes navegadores

## 📞 Suporte

**Email:** luis@luisfboff.com  
**GitHub:** github.com/luisfboff1  
**LinkedIn:** linkedin.com/in/luisfboff  

---

**🚀 Deploy configurado com sucesso!**
