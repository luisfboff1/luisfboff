#!/usr/bin/env node

/**
 * Script para preparar arquivos para deploy na Hostinger
 * Execute: npm run deploy:copy
 */

const fs = require('fs')
const path = require('path')

console.log('🚀 Preparando arquivos para deploy na Hostinger...\n')

// Verificar se a pasta out existe
const outDir = path.join(process.cwd(), 'out')
if (!fs.existsSync(outDir)) {
  console.error('❌ Pasta "out" não encontrada!')
  console.log('💡 Execute primeiro: npm run build:static')
  process.exit(1)
}

// Criar pasta de deploy
const deployDir = path.join(process.cwd(), 'deploy')
if (fs.existsSync(deployDir)) {
  fs.rmSync(deployDir, { recursive: true })
}
fs.mkdirSync(deployDir, { recursive: true })

console.log('📁 Estrutura de pastas criada:')
console.log('   deploy/')
console.log('   ├── app/          # Frontend estático')
console.log('   └── api/          # Backend PHP (a ser implementado)')

// Copiar arquivos do frontend
const appDir = path.join(deployDir, 'app')
fs.mkdirSync(appDir, { recursive: true })

console.log('\n📋 Copiando arquivos do frontend...')

// Função para copiar recursivamente
function copyRecursive(src, dest) {
  const stats = fs.statSync(src)
  
  if (stats.isDirectory()) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true })
    }
    
    const files = fs.readdirSync(src)
    files.forEach(file => {
      copyRecursive(path.join(src, file), path.join(dest, file))
    })
  } else {
    fs.copyFileSync(src, dest)
  }
}

// Copiar conteúdo da pasta out para deploy/app
copyRecursive(outDir, appDir)

// Criar pasta API
const apiDir = path.join(deployDir, 'api')
fs.mkdirSync(apiDir, { recursive: true })

// Criar arquivo index.php básico para a API
const indexPhp = `<?php
/**
 * API PHP - Megui's Pet Admin
 * Endpoint principal da API
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: https://admin.magspatch.com');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Responder a requisições OPTIONS (CORS preflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Roteamento básico
$request_uri = $_SERVER['REQUEST_URI'];
$path = parse_url($request_uri, PHP_URL_PATH);
$path = str_replace('/api', '', $path);

// Health check
if ($path === '/' || $path === '/health') {
    echo json_encode([
        'success' => true,
        'message' => 'API PHP funcionando',
        'timestamp' => date('c')
    ]);
    exit();
}

// Redirecionar para endpoints específicos
$segments = explode('/', trim($path, '/'));
$entity = $segments[0] ?? '';

if ($entity && file_exists(__DIR__ . '/' . $entity . '.php')) {
    include __DIR__ . '/' . $entity . '.php';
} else {
    http_response_code(404);
    echo json_encode([
        'success' => false,
        'error' => 'Endpoint não encontrado',
        'path' => $path
    ]);
}
?>`

fs.writeFileSync(path.join(apiDir, 'index.php'), indexPhp)

// Criar arquivo .htaccess para a API
const htaccess = `RewriteEngine On

# Redirecionar todas as requisições para index.php
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ index.php [QSA,L]

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
`

fs.writeFileSync(path.join(apiDir, '.htaccess'), htaccess)

// Criar arquivo de configuração do banco
const configPhp = `<?php
/**
 * Configuração do banco de dados MySQL
 * IMPORTANTE: Configure estas variáveis com suas credenciais reais
 */

// Configurações do banco de dados
define('DB_HOST', 'mysql.hostinger.com');
define('DB_PORT', 3306);
define('DB_NAME', 'u123456789_meguispet'); // Substitua pelo nome real
define('DB_USER', 'u123456789_admin');     // Substitua pelo usuário real
define('DB_PASS', 'MinhaSenh@123');        // Substitua pela senha real

// Configurações da aplicação
define('API_BASE_URL', 'https://admin.magspatch.com/api');
define('FRONTEND_URL', 'https://admin.magspatch.com/app');

// Configurações de segurança
define('JWT_SECRET', 'sua_chave_secreta_aqui_123456789');
define('CORS_ORIGIN', 'https://admin.magspatch.com');

// Função para conectar ao banco
function getDatabaseConnection() {
    try {
        $dsn = "mysql:host=" . DB_HOST . ";port=" . DB_PORT . ";dbname=" . DB_NAME . ";charset=utf8mb4";
        $pdo = new PDO($dsn, DB_USER, DB_PASS, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ]);
        return $pdo;
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'error' => 'Erro de conexão com o banco de dados',
            'message' => $e->getMessage()
        ]);
        exit();
    }
}

// Função para enviar resposta JSON
function sendJsonResponse($data, $statusCode = 200) {
    http_response_code($statusCode);
    header('Content-Type: application/json');
    echo json_encode($data);
    exit();
}

// Função para validar método HTTP
function validateHttpMethod($allowedMethods) {
    $method = $_SERVER['REQUEST_METHOD'];
    if (!in_array($method, $allowedMethods)) {
        sendJsonResponse([
            'success' => false,
            'error' => 'Método não permitido',
            'allowed' => $allowedMethods
        ], 405);
    }
}

// Função para obter dados do corpo da requisição
function getRequestBody() {
    $input = file_get_contents('php://input');
    return json_decode($input, true);
}

// Função para validar CORS
function validateCors() {
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    if ($origin !== CORS_ORIGIN) {
        sendJsonResponse([
            'success' => false,
            'error' => 'Origem não permitida'
        ], 403);
    }
}
?>`

fs.writeFileSync(path.join(apiDir, 'config.php'), configPhp)

// Criar arquivo README para deploy
const deployReadme = `# Deploy na Hostinger - Megui's Pet Admin

## 📁 Estrutura de Arquivos

\`\`\`
public_html/
├── admin/
│   ├── app/          # Frontend estático (Next.js export)
│   │   ├── index.html
│   │   ├── _next/
│   │   └── ...
│   └── api/          # Backend PHP
│       ├── index.php
│       ├── config.php
│       ├── .htaccess
│       ├── usuarios.php
│       ├── produtos.php
│       └── ...
└── (arquivos WordPress)
\`\`\`

## 🚀 Instruções de Deploy

### 1. Upload via File Manager
1. Acesse o hPanel da Hostinger
2. Vá em "File Manager"
3. Navegue até \`public_html/admin/\`
4. Faça upload da pasta \`app/\` (frontend)
5. Faça upload da pasta \`api/\` (backend PHP)

### 2. Configurar Banco de Dados
1. Edite \`api/config.php\` com suas credenciais reais
2. Execute o script de setup do banco se necessário

### 3. Configurar .htaccess
1. Certifique-se de que o \`.htaccess\` está na pasta \`api/\`
2. Verifique se o mod_rewrite está habilitado

### 4. Testar
1. Acesse \`https://admin.magspatch.com/app/\`
2. Teste a API: \`https://admin.magspatch.com/api/health\`

## ⚠️ Importante

- Configure as credenciais do banco em \`api/config.php\`
- Verifique se o acesso remoto MySQL está configurado
- Teste todos os endpoints da API
- Configure backup automático do banco

## 🔧 Troubleshooting

### Erro 500
- Verifique logs de erro no hPanel
- Confirme se o PHP está configurado corretamente
- Verifique permissões de arquivo

### Erro de CORS
- Verifique a configuração CORS_ORIGIN em config.php
- Confirme se o domínio está correto

### Erro de Banco
- Verifique credenciais em config.php
- Confirme se o acesso remoto está habilitado
- Teste conexão com phpMyAdmin
`

fs.writeFileSync(path.join(deployDir, 'README.md'), deployReadme)

// Estatísticas do deploy
const stats = {
  frontendFiles: countFiles(appDir),
  apiFiles: countFiles(apiDir),
  totalSize: getDirectorySize(deployDir)
}

console.log('\n📊 Estatísticas do deploy:')
console.log(`   Arquivos do frontend: ${stats.frontendFiles}`)
console.log(`   Arquivos da API: ${stats.apiFiles}`)
console.log(`   Tamanho total: ${formatBytes(stats.totalSize)}`)

console.log('\n✅ Deploy preparado com sucesso!')
console.log('\n📋 Próximos passos:')
console.log('   1. Configure as credenciais em deploy/api/config.php')
console.log('   2. Faça upload da pasta deploy/ para public_html/admin/')
console.log('   3. Teste o acesso em https://admin.magspatch.com/app/')
console.log('   4. Implemente os endpoints PHP conforme PHP_API_CONTRACTS.md')

// Funções auxiliares
function countFiles(dir) {
  let count = 0
  const files = fs.readdirSync(dir)
  
  files.forEach(file => {
    const filePath = path.join(dir, file)
    const stats = fs.statSync(filePath)
    
    if (stats.isDirectory()) {
      count += countFiles(filePath)
    } else {
      count++
    }
  })
  
  return count
}

function getDirectorySize(dir) {
  let size = 0
  const files = fs.readdirSync(dir)
  
  files.forEach(file => {
    const filePath = path.join(dir, file)
    const stats = fs.statSync(filePath)
    
    if (stats.isDirectory()) {
      size += getDirectorySize(filePath)
    } else {
      size += stats.size
    }
  })
  
  return size
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

