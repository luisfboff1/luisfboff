# 📚 Glossário Técnico - Megui's Pet Admin

## 🎯 **Visão Geral**

Este documento contém **TODOS** os termos técnicos utilizados no projeto Megui's Pet Admin, com explicações simples e práticas para facilitar o entendimento e comunicação entre a equipe.

---

## 🌐 **TERMOS DE REDE E INTERNET**

### **HTTP (HyperText Transfer Protocol)**
- **O que é**: Protocolo de comunicação para transferir dados na web
- **Como funciona**: Cliente (navegador) faz requisição → Servidor responde
- **Exemplo**: `http://localhost:3000` (desenvolvimento local)
- **Porta padrão**: 80

### **HTTPS (HTTP Secure)**
- **O que é**: HTTP com criptografia SSL/TLS para segurança
- **Como funciona**: Dados são criptografados antes de serem enviados
- **Exemplo**: `https://admin.meguispet.com` (produção)
- **Porta padrão**: 443
- **Vantagem**: Dados seguros, confiança do usuário

### **SSL (Secure Sockets Layer)**
- **O que é**: Certificado de segurança que criptografa dados
- **Como funciona**: Cria uma conexão segura entre navegador e servidor
- **Exemplo**: Cadeado verde no navegador
- **Vantagem**: Protege dados sensíveis (senhas, dados pessoais)

### **FTP (File Transfer Protocol)**
- **O que é**: Protocolo para transferir arquivos entre computadores
- **Como funciona**: Cliente FTP conecta no servidor e envia/recebe arquivos
- **Exemplo**: GitHub Actions envia arquivos para Hostinger via FTP
- **Porta padrão**: 21
- **Uso no projeto**: Deploy automático do sistema

### **IP (Internet Protocol)**
- **O que é**: Endereço único de cada dispositivo na internet
- **Como funciona**: Identifica onde enviar dados
- **Exemplo**: `192.168.0.4` (sua rede local), `mysql.hostinger.com` (servidor)
- **Uso no projeto**: Configurar acesso remoto ao MySQL

### **Porta (Port)**
- **O que é**: Número que identifica um serviço específico no servidor
- **Como funciona**: Cada serviço usa uma porta diferente
- **Exemplos**:
  - **80**: HTTP (navegador)
  - **443**: HTTPS (navegador seguro)
  - **21**: FTP (transferência de arquivos)
  - **3306**: MySQL (banco de dados)
  - **3000**: Next.js (desenvolvimento local)

---

## 🗄️ **TERMOS DE BANCO DE DADOS**

### **MySQL**
- **O que é**: Sistema de gerenciamento de banco de dados relacional
- **Como funciona**: Armazena dados em tabelas com relacionamentos
- **Exemplo**: Tabelas de produtos, vendas, clientes
- **Uso no projeto**: Banco de dados principal em produção

### **SQL (Structured Query Language)**
- **O que é**: Linguagem para gerenciar bancos de dados
- **Como funciona**: Comandos para criar, ler, atualizar e deletar dados
- **Exemplo**: `SELECT * FROM produtos WHERE preco > 100`
- **Uso no projeto**: Consultas e operações no banco

### **SQLite**
- **O que é**: Banco de dados leve, armazenado em arquivo
- **Como funciona**: Arquivo local que simula banco de dados
- **Exemplo**: `database.sqlite` (desenvolvimento local)
- **Uso no projeto**: Banco de dados para desenvolvimento local

### **PostgreSQL**
- **O que é**: Sistema de banco de dados avançado
- **Como funciona**: Similar ao MySQL, mas com recursos extras
- **Exemplo**: Supabase usa PostgreSQL
- **Uso no projeto**: Banco atual (será migrado para MySQL)

### **Supabase**
- **O que é**: Plataforma que oferece PostgreSQL como serviço
- **Como funciona**: Banco de dados na nuvem com interface web
- **Exemplo**: `supabase.com` (atual)
- **Uso no projeto**: Banco atual (será migrado para Hostinger MySQL)

---

## 💻 **TERMOS DE DESENVOLVIMENTO**

### **Next.js**
- **O que é**: Framework React para criar aplicações web
- **Como funciona**: Combina React com funcionalidades de servidor
- **Exemplo**: Sistema Megui's Pet Admin
- **Uso no projeto**: Framework principal do frontend

### **React**
- **O que é**: Biblioteca JavaScript para criar interfaces de usuário
- **Como funciona**: Componentes reutilizáveis que se atualizam automaticamente
- **Exemplo**: Botões, formulários, listas
- **Uso no projeto**: Base do Next.js

### **TypeScript**
- **O que é**: JavaScript com tipagem estática
- **Como funciona**: Adiciona tipos aos dados para evitar erros
- **Exemplo**: `const nome: string = "João"`
- **Uso no projeto**: Linguagem principal do código

### **Node.js**
- **O que é**: Ambiente para executar JavaScript no servidor
- **Como funciona**: Permite usar JavaScript fora do navegador
- **Exemplo**: Servidor de desenvolvimento, build do projeto
- **Uso no projeto**: Ambiente de execução

### **npm (Node Package Manager)**
- **O que é**: Gerenciador de pacotes do Node.js
- **Como funciona**: Instala e gerencia bibliotecas JavaScript
- **Exemplo**: `npm install`, `npm run dev`
- **Uso no projeto**: Gerenciar dependências e scripts

---

## 🔧 **TERMOS DE API E BACKEND**

### **API (Application Programming Interface)**
- **O que é**: Interface que permite comunicação entre sistemas
- **Como funciona**: Frontend faz requisições → Backend responde com dados
- **Exemplo**: `GET /api/produtos` retorna lista de produtos
- **Uso no projeto**: Comunicação entre frontend e banco de dados

### **REST (Representational State Transfer)**
- **O que é**: Padrão para criar APIs web
- **Como funciona**: Usa métodos HTTP (GET, POST, PUT, DELETE)
- **Exemplo**: 
  - `GET /api/produtos` (listar)
  - `POST /api/produtos` (criar)
  - `PUT /api/produtos/1` (atualizar)
  - `DELETE /api/produtos/1` (deletar)

### **JSON (JavaScript Object Notation)**
- **O que é**: Formato para trocar dados entre sistemas
- **Como funciona**: Dados em formato texto legível
- **Exemplo**: `{"nome": "Produto", "preco": 100}`
- **Uso no projeto**: Formato das respostas da API

### **PHP**
- **O que é**: Linguagem de programação para web
- **Como funciona**: Executa no servidor e gera HTML/JSON
- **Exemplo**: `<?php echo "Hello World"; ?>`
- **Uso no projeto**: Backend da API em produção (Hostinger)

### **Endpoint**
- **O que é**: URL específica de uma API
- **Como funciona**: Cada endpoint tem uma função específica
- **Exemplo**: 
  - `/api/produtos` (listar produtos)
  - `/api/vendas` (listar vendas)
  - `/api/clientes` (listar clientes)

---

## 🚀 **TERMOS DE DEPLOY E PRODUÇÃO**

### **Deploy**
- **O que é**: Processo de colocar o sistema em produção
- **Como funciona**: Código é enviado para o servidor e fica disponível
- **Exemplo**: Sistema vai do desenvolvimento para `admin.meguispet.com`
- **Uso no projeto**: Deploy automático via GitHub Actions

### **GitHub Actions**
- **O que é**: Sistema de automação do GitHub
- **Como funciona**: Executa tarefas automaticamente quando código é enviado
- **Exemplo**: Build automático e deploy para Hostinger
- **Uso no projeto**: Deploy automático do sistema

### **Build**
- **O que é**: Processo de compilar o código para produção
- **Como funciona**: Código é otimizado e preparado para o servidor
- **Exemplo**: `npm run build` gera arquivos otimizados
- **Uso no projeto**: Gerar versão estática do Next.js

### **Static Export**
- **O que é**: Gerar arquivos HTML/CSS/JS estáticos
- **Como funciona**: Next.js gera arquivos que podem ser servidos por qualquer servidor
- **Exemplo**: Pasta `out/` com arquivos estáticos
- **Uso no projeto**: Frontend estático para Hostinger

### **Environment Variables (Variáveis de Ambiente)**
- **O que é**: Configurações que mudam entre ambientes
- **Como funciona**: Valores diferentes para desenvolvimento e produção
- **Exemplo**: 
  - Desenvolvimento: `DATABASE_URL="sqlite:./dev.db"`
  - Produção: `DATABASE_URL="mysql://user:pass@host:3306/db"`
- **Uso no projeto**: Configurações de banco e API

---

## 🏗️ **TERMOS DE ARQUITETURA**

### **Frontend**
- **O que é**: Parte do sistema que o usuário vê e interage
- **Como funciona**: Interface web (botões, formulários, listas)
- **Exemplo**: Páginas do sistema Megui's Pet Admin
- **Tecnologias**: Next.js, React, TypeScript

### **Backend**
- **O que é**: Parte do sistema que processa dados e lógica
- **Como funciona**: API que recebe requisições e retorna dados
- **Exemplo**: Endpoints que gerenciam produtos, vendas, clientes
- **Tecnologias**: PHP (produção), Next.js API Routes (desenvolvimento)

### **Database (Banco de Dados)**
- **O que é**: Local onde ficam armazenados os dados
- **Como funciona**: Tabelas organizadas com relacionamentos
- **Exemplo**: Tabelas de produtos, vendas, clientes, usuários
- **Tecnologias**: MySQL (produção), SQLite (desenvolvimento)

### **Subdomain (Subdomínio)**
- **O que é**: Extensão do domínio principal
- **Como funciona**: `admin.meguispet.com` é subdomínio de `meguispet.com`
- **Exemplo**: Sistema fica em `admin.meguispet.com`
- **Uso no projeto**: Endereço do sistema administrativo

### **Shared Hosting (Hospedagem Compartilhada)**
- **O que é**: Servidor compartilhado entre vários sites
- **Como funciona**: Múltiplos sites usam os mesmos recursos
- **Exemplo**: Hostinger Single (R$ 8,99/mês)
- **Uso no projeto**: Hospedagem do sistema em produção

---

## 🔒 **TERMOS DE SEGURANÇA**

### **Firewall**
- **O que é**: Sistema que controla tráfego de rede
- **Como funciona**: Bloqueia ou permite conexões baseado em regras
- **Exemplo**: Permitir apenas portas 80, 443, 21
- **Uso no projeto**: Proteger servidor Hostinger

### **Backup**
- **O que é**: Cópia de segurança dos dados
- **Como funciona**: Dados são copiados regularmente para outro local
- **Exemplo**: Backup diário do banco de dados
- **Uso no projeto**: Proteger dados em caso de problemas

### **Rollback**
- **O que é**: Voltar para uma versão anterior do sistema
- **Como funciona**: Restaura backup ou versão anterior
- **Exemplo**: Se algo der errado, volta para versão que funcionava
- **Uso no projeto**: Recuperação rápida em caso de problemas

### **Credentials (Credenciais)**
- **O que é**: Informações de login (usuário, senha)
- **Como funciona**: Identifica e autentica acesso
- **Exemplo**: Usuário e senha do MySQL, FTP
- **Uso no projeto**: Acesso ao banco e deploy

---

## 📊 **TERMOS DE MONITORAMENTO**

### **Logs**
- **O que é**: Registro de atividades do sistema
- **Como funciona**: Sistema registra tudo que acontece
- **Exemplo**: Quem acessou, quando, o que fez
- **Uso no projeto**: Monitorar uso e problemas

### **Performance**
- **O que é**: Velocidade e eficiência do sistema
- **Como funciona**: Mede tempo de resposta e uso de recursos
- **Exemplo**: Página carrega em 2 segundos
- **Uso no projeto**: Otimizar velocidade do sistema

### **Uptime**
- **O que é**: Tempo que o sistema está funcionando
- **Como funciona**: Mede disponibilidade do sistema
- **Exemplo**: 99.9% de uptime (sistema funcionando 99.9% do tempo)
- **Uso no projeto**: Garantir que sistema esteja sempre disponível

---

## 🛠️ **TERMOS DE FERRAMENTAS**

### **Git**
- **O que é**: Sistema de controle de versão
- **Como funciona**: Registra mudanças no código ao longo do tempo
- **Exemplo**: `git commit`, `git push`, `git pull`
- **Uso no projeto**: Gerenciar código e deploy automático

### **GitHub**
- **O que é**: Plataforma para hospedar código Git
- **Como funciona**: Código fica na nuvem, acessível para equipe
- **Exemplo**: `github.com/luisfboff1/meguispet`
- **Uso no projeto**: Repositório do código e deploy automático

### **hPanel**
- **O que é**: Painel de controle da Hostinger
- **Como funciona**: Interface web para gerenciar hospedagem
- **Exemplo**: Configurar MySQL, FTP, subdomínios
- **Uso no projeto**: Gerenciar configurações da Hostinger

### **File Manager**
- **O que é**: Gerenciador de arquivos do hPanel
- **Como funciona**: Interface para navegar e gerenciar arquivos
- **Exemplo**: Criar pastas, upload de arquivos
- **Uso no projeto**: Gerenciar estrutura de pastas

### **phpMyAdmin**
- **O que é**: Interface web para gerenciar MySQL
- **Como funciona**: Interface gráfica para banco de dados
- **Exemplo**: Ver tabelas, executar consultas SQL
- **Uso no projeto**: Gerenciar banco de dados MySQL

---

## 📱 **TERMOS DE INTERFACE**

### **UI (User Interface)**
- **O que é**: Interface do usuário (o que o usuário vê)
- **Como funciona**: Botões, formulários, listas, cores
- **Exemplo**: Design das páginas do sistema
- **Uso no projeto**: Interface do sistema Megui's Pet Admin

### **UX (User Experience)**
- **O que é**: Experiência do usuário (como o usuário se sente)
- **Como funciona**: Facilidade de uso, velocidade, clareza
- **Exemplo**: Sistema é fácil de usar e rápido
- **Uso no projeto**: Experiência dos usuários do sistema

### **Responsive Design**
- **O que é**: Design que se adapta a diferentes tamanhos de tela
- **Como funciona**: Interface muda conforme dispositivo
- **Exemplo**: Funciona bem no celular, tablet e computador
- **Uso no projeto**: Sistema funciona em qualquer dispositivo

---

## 🔄 **TERMOS DE PROCESSO**

### **CI/CD (Continuous Integration/Continuous Deployment)**
- **O que é**: Integração e deploy contínuos
- **Como funciona**: Código é testado e deployado automaticamente
- **Exemplo**: GitHub Actions faz deploy automático
- **Uso no projeto**: Deploy automático para Hostinger

### **Workflow**
- **O que é**: Sequência de tarefas automatizadas
- **Como funciona**: GitHub Actions executa tarefas em ordem
- **Exemplo**: Build → Test → Deploy
- **Uso no projeto**: Processo de deploy automático

### **Pipeline**
- **O que é**: Caminho que o código percorre até produção
- **Como funciona**: Desenvolvimento → Teste → Deploy → Produção
- **Exemplo**: Código vai do GitHub para Hostinger
- **Uso no projeto**: Pipeline de deploy automático

---

## 📋 **TERMOS DE DADOS**

### **CRUD (Create, Read, Update, Delete)**
- **O que é**: Operações básicas de dados
- **Como funciona**: 
  - **Create**: Criar novo registro
  - **Read**: Ler/listar registros
  - **Update**: Atualizar registro existente
  - **Delete**: Deletar registro
- **Exemplo**: Gerenciar produtos (criar, listar, editar, excluir)
- **Uso no projeto**: Todas as operações do sistema

### **Schema (Esquema)**
- **O que é**: Estrutura do banco de dados
- **Como funciona**: Define tabelas, campos e relacionamentos
- **Exemplo**: Tabela produtos tem campos: id, nome, preço, estoque
- **Uso no projeto**: Estrutura das tabelas do sistema

### **Migration (Migração)**
- **O que é**: Processo de mover dados de um sistema para outro
- **Como funciona**: Dados são transferidos e adaptados
- **Exemplo**: Migrar de Supabase para MySQL Hostinger
- **Uso no projeto**: Migração do banco atual para Hostinger

---

## 🎯 **RESUMO EXECUTIVO**

### **✅ O que você precisa saber:**
- **HTTP/HTTPS**: Como dados trafegam na web
- **MySQL**: Banco de dados principal
- **FTP**: Como arquivos são enviados para servidor
- **API**: Como frontend e backend se comunicam
- **Deploy**: Como sistema vai para produção
- **GitHub Actions**: Deploy automático
- **SSL**: Segurança dos dados

### **🔧 O que a equipe técnica precisa saber:**
- **Next.js**: Framework do frontend
- **PHP**: Backend da API em produção
- **MySQL**: Banco de dados em produção
- **GitHub Actions**: Automação de deploy
- **Hostinger**: Hospedagem e configurações
- **Backup/Rollback**: Recuperação de problemas

### **📚 Como usar este glossário:**
1. **Consultar** quando encontrar termo desconhecido
2. **Compartilhar** com equipe técnica
3. **Atualizar** conforme novos termos surgem
4. **Usar** para comunicação clara entre equipes

---

**🎯 Objetivo**: Facilitar comunicação e entendimento entre todos os envolvidos no projeto Megui's Pet Admin! 🚀
