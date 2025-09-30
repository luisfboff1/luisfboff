# Estrutura do Projeto

## 📁 Organização de Arquivos

```
luisfboff/
├── 📄 index.html                    # Página principal (vitrine)
├── 📄 README.md                     # Documentação do projeto
├── 📁 assets/                       # Recursos estáticos
│   ├── 📁 css/                      # Estilos
│   │   └── styles.css              # CSS principal
│   ├── 📁 js/                       # Scripts JavaScript
│   │   ├── script.js               # Script principal
│   │   ├── chatbot.js              # Chatbot reutilizável
│   │   ├── code-parallax.js        # Efeito parallax de código
│   │   ├── data-parallax.js        # Efeito parallax de dados
│   │   └── sun-parallax.js          # Animação do sol
│   ├── 📁 images/                   # Imagens
│   │   ├── favicon-v3-code-brackets-*.png
│   │   ├── luis-removebg-preview.png
│   │   ├── luis.jpeg
│   │   └── SL_031221_41450_08.jpg
│   └── 📁 videos/                   # Vídeos
│       └── CASA1.mp4               # Vídeo da casa solar
├── 📁 pages/                        # Páginas HTML
│   ├── sobre.html                  # Página sobre
│   ├── desenvolvimento.html        # Página de desenvolvimento
│   ├── energia-solar.html          # Página de energia solar
│   └── ciencia-dados.html          # Página de ciência de dados
├── 📁 docs/                         # Documentação
│   ├── DEPLOY_CONFIG.md            # Configuração de deploy
│   ├── ESTRUTURA.md                # Estrutura do projeto
│   ├── Luis Fernando Boff - Currículo 6.pdf
│   └── setup-repo.sh               # Script de configuração
└── 📄 ai-assistant.js              # Script do assistente IA
```

## 🎯 URLs do Site

- **Página Principal:** `/`
- **Sobre:** `/pages/sobre.html`
- **Desenvolvimento:** `/pages/desenvolvimento.html`
- **Energia Solar:** `/pages/energia-solar.html`
- **Ciência de Dados:** `/pages/ciencia-dados.html`

## 🔧 Arquivos Principais

### CSS
- `assets/css/styles.css` - Estilos principais com responsividade

### JavaScript
- `assets/js/script.js` - Funcionalidades gerais
- `assets/js/chatbot.js` - Chatbot reutilizável
- `assets/js/code-parallax.js` - Efeito parallax de código
- `assets/js/data-parallax.js` - Efeito parallax de dados
- `assets/js/sun-parallax.js` - Animação do sol

### Imagens
- `assets/images/` - Todas as imagens organizadas
- `assets/videos/` - Vídeos do projeto

## 📱 Responsividade

Todas as páginas são totalmente responsivas com breakpoints:
- Desktop: > 768px
- Tablet: 768px - 480px
- Mobile: < 480px
- Mobile pequeno: < 320px

## 🎨 Efeitos Especiais

- **Página Solar:** Animação do sol com movimento semicircular
- **Página Dev:** Parallax de código que aparece conforme scroll
- **Página Data:** Parallax de gráficos de análise de dados
- **Chatbot:** Presente em todas as páginas
