/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuração para export estático (produção)
  output: 'export',
  
  // Desabilita otimização de imagens para export estático
  images: {
    unoptimized: true,
  },
  
  // Adiciona trailing slash para compatibilidade com servidores estáticos
  trailingSlash: true,
  
  // Configuração para subpasta /app (public_html/admin/app)
  basePath: '/app',
  assetPrefix: '/app/',
  
  // Desabilita Turbopack em desenvolvimento
  experimental: {
    turbo: {
      enabled: false,
    },
  },
  
  // Configurações de build
  distDir: 'out',
  
  // Desabilita features não suportadas em export estático
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Configuração para desenvolvimento vs produção
  ...(process.env.NODE_ENV === 'development' && {
    // Em desenvolvimento, remove configurações de export
    output: undefined,
    basePath: undefined,
    assetPrefix: undefined,
    distDir: '.next',
  }),
}

module.exports = nextConfig
