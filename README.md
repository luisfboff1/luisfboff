# 🌟 Portfolio - Luis Fernando Boff

Portfolio profissional desenvolvido com React, Next.js, Shadcn UI e Lucide Icons.

## 🚀 Tecnologias

### **Frontend:**
- **Next.js 15** - Framework React com App Router
- **React 19** - Biblioteca para interfaces
- **TypeScript** - Tipagem estática
- **Tailwind CSS 3** - Framework de estilização
- **Shadcn UI** - Componentes acessíveis
- **Lucide Icons** - Ícones modernos

### **Features:**
- ✅ **SSG (Static Site Generation)**: Geração estática para máxima performance
- ✅ **Responsivo**: Design adaptado para todos os dispositivos
- ✅ **Dark Theme**: Tema escuro com cores vibrantes
- ✅ **Animações**: Transições suaves e efeitos interativos
- ✅ **SEO Otimizado**: Meta tags e estrutura otimizada
- ✅ **Acessível**: Componentes com acessibilidade integrada

## 📦 Instalação

```bash
# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm run dev

# Build para produção
npm run build

# Iniciar servidor de produção
npm start
```

## 🎨 Estrutura do Projeto

```
luisfboff/
├── app/                      # App Router do Next.js
│   ├── page.tsx             # Página inicial
│   ├── layout.tsx           # Layout raiz
│   ├── globals.css          # Estilos globais
│   ├── sobre/               # Página sobre
│   ├── desenvolvimento/     # Página desenvolvimento
│   ├── energia-solar/       # Página energia solar
│   └── ciencia-dados/       # Página ciência de dados
├── components/              # Componentes React
│   ├── navbar.tsx          # Navegação
│   ├── footer.tsx          # Rodapé
│   └── ui/                 # Componentes Shadcn UI
├── lib/                     # Utilitários
├── public/                  # Arquivos estáticos
│   ├── images/             # Imagens
│   └── videos/             # Vídeos
├── tailwind.config.ts      # Configuração Tailwind
├── tsconfig.json           # Configuração TypeScript
└── next.config.ts          # Configuração Next.js
```

## 🎨 Paleta de Cores

- **Primary (Verde neon)**: `hsl(142 76% 50%)` - #00ff88
- **Secondary (Laranja)**: `hsl(17 100% 60%)` - #ff6b35
- **Accent (Roxo)**: `hsl(263 70% 63%)` - #8b5cf6
- **Background**: `hsl(0 0% 4%)` - #0a0a0a

## 📄 Páginas

1. **Home** (`/`) - Apresentação com hero section, especializações e contato
2. **Sobre** (`/sobre`) - História profissional e timeline
3. **Desenvolvimento** (`/desenvolvimento`) - Serviços e tecnologias
4. **Energia Solar** (`/energia-solar`) - Projetos fotovoltaicos
5. **Ciência de Dados** (`/ciencia-dados`) - IA e Machine Learning

## 🔧 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria o build de produção
- `npm start` - Inicia o servidor de produção
- `npm run lint` - Executa o linter do Next.js

## 📱 Responsividade

O site é totalmente responsivo e adaptado para:
- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: 320px - 767px

## 🌐 Deploy

O projeto está configurado para export estático e pode ser hospedado em:
- **GitHub Pages**
- **Vercel**
- **Netlify**
- Qualquer servidor de arquivos estáticos

Para gerar os arquivos estáticos:
```bash
npm run build
# Os arquivos estarão na pasta /out
```

## 📝 Customização

### Alterar Cores

Edite o arquivo `tailwind.config.ts` para modificar as cores do tema:

```typescript
colors: {
  primary: "hsl(142 76% 50%)",  // Verde
  secondary: "hsl(17 100% 60%)", // Laranja
  accent: "hsl(263 70% 63%)",    // Roxo
}
```

### Adicionar Novos Componentes

Use o padrão Shadcn UI para adicionar novos componentes:

```bash
# Exemplo: adicionar componente de dialog
npx shadcn-ui@latest add dialog
```

## 👨‍💻 Autor

**Luis Fernando Boff**
- Website: [luisfboff.com](https://luisfboff.com/)
- LinkedIn: [luis-fernando-boff](https://www.linkedin.com/in/luis-fernando-boff-7a64a716b/)
- GitHub: [@luisfboff1](https://github.com/luisfboff1)
- Email: luisfboff@hotmail.com

## 📄 Licença

© 2024-2025 Luis Fernando Boff. Todos os direitos reservados.

---

**🚀 Site criado com ❤️ e muito café ☕**

*Transformando ideias em realidade através de código, dados e inteligência artificial.*
