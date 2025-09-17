#!/bin/bash

# 🚀 Script de Configuração - Site Vitrine Luis Fernando Boff
# Este script ajuda a configurar o repositório e deploy automático

echo "🌟 Configurando Site Vitrine - Luis Fernando Boff"
echo "=================================================="

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Função para imprimir com cores
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# Verificar se estamos no diretório correto
if [ ! -f "index.html" ]; then
    print_error "Arquivo index.html não encontrado!"
    print_info "Execute este script no diretório do site vitrine"
    exit 1
fi

print_status "Arquivos do site vitrine encontrados!"

# 1. Configurar Git (se necessário)
if [ ! -d ".git" ]; then
    print_info "Inicializando repositório Git..."
    git init
    git remote add origin https://github.com/luisfboff1/luisfboff.git
    print_status "Repositório Git configurado!"
else
    print_status "Repositório Git já existe!"
fi

# 2. Adicionar arquivos
print_info "Adicionando arquivos ao Git..."
git add .
git commit -m "🎨 Site vitrine - Luis Fernando Boff

✨ Características:
- Tema dark code inspirado em Senhor dos Anéis
- Cores: Verde neon, Laranja, Roxo
- Seções: Hero, Sobre, Serviços, Projetos, Contato
- Animações, terminal interativo, formulário
- Totalmente responsivo

🚀 Deploy automático para Hostinger configurado"

print_status "Arquivos commitados!"

# 3. Push para GitHub
print_info "Enviando para GitHub..."
git push -u origin main

if [ $? -eq 0 ]; then
    print_status "Push realizado com sucesso!"
else
    print_warning "Erro no push. Verifique as credenciais do GitHub."
    print_info "Execute: git push -u origin main"
fi

# 4. Instruções para configurar secrets
echo ""
echo "🔐 CONFIGURAÇÃO DOS SECRETS NO GITHUB"
echo "====================================="
echo ""
print_info "Acesse: https://github.com/luisfboff1/luisfboff/settings/secrets/actions"
echo ""
print_info "Adicione os seguintes secrets:"
echo "  FTP_SERVER: luisfboff.com"
echo "  FTP_USERNAME: u903000160.deploy"
echo "  FTP_PASSWORD: Deploy2022!"
echo ""
print_warning "IMPORTANTE: Configure os secrets antes do próximo push!"

# 5. Informações finais
echo ""
echo "🎉 CONFIGURAÇÃO CONCLUÍDA!"
echo "=========================="
echo ""
print_status "Repositório: https://github.com/luisfboff1/luisfboff"
print_status "Site: https://luisfboff.com"
print_status "Email: luis@luisfboff.com"
echo ""
print_info "Próximos passos:"
echo "1. Configure os secrets no GitHub"
echo "2. Faça um push para testar o deploy"
echo "3. Acesse https://luisfboff.com para verificar"
echo ""
print_info "Para testar o deploy:"
echo "git add ."
echo "git commit -m 'Teste deploy'"
echo "git push"
echo ""
echo "🌟 Site criado com ❤️ e muito café ☕"
