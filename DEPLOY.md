# 🚀 Guia de Deploy - Portfolio Next.js

Este guia explica como fazer deploy do portfolio refatorado em diferentes plataformas.

## 📋 Pré-requisitos

- Node.js 18+ instalado
- Git configurado
- Conta no GitHub (para GitHub Pages ou Vercel)

## 🏗️ Build do Projeto

```bash
# Instalar dependências
npm install

# Gerar build de produção
npm run build
```

O build cria uma pasta `/out` com todos os arquivos estáticos prontos para deploy.

## 🌐 Opções de Deploy

### 1. GitHub Pages (Recomendado)

#### Opção A: Deploy Manual

1. Faça o build do projeto:
   ```bash
   npm run build
   ```

2. Os arquivos estáticos estarão na pasta `/out`

3. Configure o GitHub Pages:
   - Vá em Settings > Pages
   - Selecione "Deploy from a branch"
   - Escolha `gh-pages` branch
   
4. Use o GitHub Actions para automatizar (veja abaixo)

#### Opção B: GitHub Actions (Automático)

Crie o arquivo `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run build
        
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./out

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

Depois:
1. Commit o arquivo de workflow
2. Vá em Settings > Pages
3. Selecione "GitHub Actions" como source
4. O deploy acontecerá automaticamente a cada push na branch main

### 2. Vercel (Mais Fácil)

1. Acesse [vercel.com](https://vercel.com) e faça login com GitHub

2. Clique em "Import Project"

3. Selecione o repositório do portfolio

4. Vercel detectará automaticamente Next.js

5. Clique em "Deploy"

**Pronto!** A Vercel fará build e deploy automaticamente a cada push.

### 3. Netlify

1. Acesse [netlify.com](https://netlify.com) e faça login

2. Clique em "Add new site" > "Import an existing project"

3. Conecte o repositório GitHub

4. Configure:
   - Build command: `npm run build`
   - Publish directory: `out`

5. Clique em "Deploy site"

### 4. Servidor Próprio (Apache/Nginx)

#### Apache

1. Faça build do projeto:
   ```bash
   npm run build
   ```

2. Copie o conteúdo da pasta `/out` para o diretório web:
   ```bash
   cp -r out/* /var/www/html/
   ```

3. Configure o `.htaccess` para SPA:
   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule . /index.html [L]
   </IfModule>
   ```

#### Nginx

1. Faça build e copie os arquivos:
   ```bash
   npm run build
   cp -r out/* /usr/share/nginx/html/
   ```

2. Configure o nginx:
   ```nginx
   server {
       listen 80;
       server_name seudominio.com;
       root /usr/share/nginx/html;
       
       location / {
           try_files $uri $uri.html $uri/ /index.html;
       }
   }
   ```

3. Reinicie o nginx:
   ```bash
   sudo systemctl restart nginx
   ```

## 🔧 Configurações Adicionais

### Domínio Customizado (GitHub Pages)

1. Adicione um arquivo `CNAME` na pasta `public/`:
   ```
   seudominio.com
   ```

2. Configure DNS:
   - Type: A
   - Host: @
   - Value: 185.199.108.153 (ou outros IPs do GitHub)
   
   Ou para subdomínio:
   - Type: CNAME
   - Host: www
   - Value: seuusuario.github.io

### Variáveis de Ambiente

Se você usar variáveis de ambiente, crie um arquivo `.env.local`:

```env
NEXT_PUBLIC_SITE_URL=https://seudominio.com
```

**Importante:** Variáveis públicas devem começar com `NEXT_PUBLIC_`

### Analytics (Opcional)

Para adicionar Google Analytics, edite `app/layout.tsx`:

```tsx
export const metadata: Metadata = {
  // ... existing metadata
  verification: {
    google: "seu-codigo-de-verificacao",
  },
};
```

## 📊 Monitoramento

Após o deploy, verifique:

- ✅ Todas as páginas carregam corretamente
- ✅ Imagens aparecem
- ✅ Navegação funciona
- ✅ Responsividade em mobile
- ✅ Performance no Lighthouse

## 🐛 Troubleshooting

### Erro 404 nas rotas

**Solução:** Verifique se o servidor está configurado para SPA routing

### Imagens não carregam

**Solução:** Use caminhos relativos começando com `/images/` ao invés de `./images/`

### Build falha

**Solução:** Limpe o cache e reinstale:
```bash
rm -rf .next node_modules
npm install
npm run build
```

## 📝 Checklist de Deploy

- [ ] Build local funcionando (`npm run build`)
- [ ] Todos os testes passando
- [ ] README atualizado
- [ ] Variáveis de ambiente configuradas
- [ ] Domínio configurado (se aplicável)
- [ ] Analytics configurado (se aplicável)
- [ ] Commit e push das alterações
- [ ] Deploy realizado
- [ ] Site verificado em produção

## 🎉 Próximos Passos

Após o deploy bem-sucedido:

1. ✅ Teste todas as páginas
2. ✅ Verifique o SEO no Google Search Console
3. ✅ Configure SSL/HTTPS (geralmente automático)
4. ✅ Adicione o site ao Google Analytics
5. ✅ Compartilhe seu novo portfolio!

---

Para mais informações, consulte:
- [Documentação Next.js](https://nextjs.org/docs)
- [Documentação Vercel](https://vercel.com/docs)
- [Documentação GitHub Pages](https://docs.github.com/pages)
