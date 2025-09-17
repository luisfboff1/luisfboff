-- Schema do Sistema Gerencial Meguis Pet
-- Execute este script no Supabase SQL Editor

-- Tabela de Usuários
CREATE TABLE usuarios (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  permissoes TEXT[] DEFAULT '{}',
  ativo BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Produtos
CREATE TABLE produtos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  codigo VARCHAR(50) UNIQUE NOT NULL,
  nome VARCHAR(255) NOT NULL,
  descricao TEXT,
  preco_custo DECIMAL(10,2) NOT NULL DEFAULT 0,
  preco_venda DECIMAL(10,2) NOT NULL DEFAULT 0,
  estoque_minimo INTEGER DEFAULT 0,
  estoque_atual INTEGER DEFAULT 0,
  unidade VARCHAR(20) DEFAULT 'UN',
  categoria VARCHAR(100),
  ativo BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Vendedores
CREATE TABLE vendedores (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  cpf VARCHAR(14) UNIQUE NOT NULL,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  telefone VARCHAR(20),
  comissao_percentual DECIMAL(5,2) NOT NULL DEFAULT 0,
  ativo BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Clientes/Fornecedores
CREATE TABLE clientes_fornecedores (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  tipo VARCHAR(10) NOT NULL CHECK (tipo IN ('fisica', 'juridica')),
  cpf_cnpj VARCHAR(18) UNIQUE NOT NULL,
  nome_razao_social VARCHAR(255) NOT NULL,
  nome_fantasia VARCHAR(255),
  email VARCHAR(255),
  telefone VARCHAR(20),
  endereco TEXT,
  cidade VARCHAR(100),
  estado VARCHAR(2),
  cep VARCHAR(9),
  vendedor_id UUID REFERENCES vendedores(id),
  ativo BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Tipos de Movimentos
CREATE TABLE tipos_movimentos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  descricao VARCHAR(255) NOT NULL,
  tipo VARCHAR(10) NOT NULL CHECK (tipo IN ('entrada', 'saida')),
  ativo BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Contas
CREATE TABLE contas (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  descricao VARCHAR(255) NOT NULL,
  tipo VARCHAR(10) NOT NULL CHECK (tipo IN ('debito', 'credito')),
  categoria VARCHAR(20) NOT NULL CHECK (categoria IN ('despesas', 'investimentos', 'vendas', 'outras_receitas')),
  ativo BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Movimentos de Estoque
CREATE TABLE movimentos_estoque (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  documento VARCHAR(100) NOT NULL,
  cliente_fornecedor_id UUID REFERENCES clientes_fornecedores(id),
  data DATE NOT NULL,
  quantidade INTEGER NOT NULL,
  valor_unitario DECIMAL(10,2) NOT NULL,
  valor_total DECIMAL(10,2) NOT NULL,
  tipo_movimento_id UUID REFERENCES tipos_movimentos(id),
  produto_id UUID REFERENCES produtos(id),
  estoque_local VARCHAR(2) NOT NULL CHECK (estoque_local IN ('RS', 'SP')),
  observacoes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Fluxo de Caixa
CREATE TABLE fluxo_caixa (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  data DATE NOT NULL,
  conta_id UUID REFERENCES contas(id),
  historico TEXT NOT NULL,
  valor DECIMAL(10,2) NOT NULL,
  tipo VARCHAR(10) NOT NULL CHECK (tipo IN ('entrada', 'saida')),
  observacoes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Vendas
CREATE TABLE vendas (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  numero_venda VARCHAR(50) UNIQUE NOT NULL,
  cliente_id UUID REFERENCES clientes_fornecedores(id),
  vendedor_id UUID REFERENCES vendedores(id),
  data DATE NOT NULL,
  valor_total DECIMAL(10,2) NOT NULL,
  desconto DECIMAL(10,2) DEFAULT 0,
  valor_final DECIMAL(10,2) NOT NULL,
  status VARCHAR(20) NOT NULL CHECK (status IN ('pendente', 'confirmada', 'cancelada')),
  observacoes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Itens de Venda
CREATE TABLE itens_venda (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  venda_id UUID REFERENCES vendas(id) ON DELETE CASCADE,
  produto_id UUID REFERENCES produtos(id),
  quantidade INTEGER NOT NULL,
  valor_unitario DECIMAL(10,2) NOT NULL,
  valor_total DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para melhor performance
CREATE INDEX idx_produtos_codigo ON produtos(codigo);
CREATE INDEX idx_produtos_nome ON produtos(nome);
CREATE INDEX idx_vendedores_cpf ON vendedores(cpf);
CREATE INDEX idx_clientes_cpf_cnpj ON clientes_fornecedores(cpf_cnpj);
CREATE INDEX idx_movimentos_data ON movimentos_estoque(data);
CREATE INDEX idx_movimentos_produto ON movimentos_estoque(produto_id);
CREATE INDEX idx_fluxo_caixa_data ON fluxo_caixa(data);
CREATE INDEX idx_vendas_data ON vendas(data);
CREATE INDEX idx_vendas_vendedor ON vendas(vendedor_id);

-- Função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para atualizar updated_at
CREATE TRIGGER update_usuarios_updated_at BEFORE UPDATE ON usuarios FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_produtos_updated_at BEFORE UPDATE ON produtos FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_vendedores_updated_at BEFORE UPDATE ON vendedores FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_clientes_updated_at BEFORE UPDATE ON clientes_fornecedores FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_tipos_movimentos_updated_at BEFORE UPDATE ON tipos_movimentos FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_contas_updated_at BEFORE UPDATE ON contas FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_movimentos_updated_at BEFORE UPDATE ON movimentos_estoque FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_fluxo_caixa_updated_at BEFORE UPDATE ON fluxo_caixa FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_vendas_updated_at BEFORE UPDATE ON vendas FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Dados iniciais
INSERT INTO tipos_movimentos (descricao, tipo) VALUES
('Compra', 'entrada'),
('Ajuste de Entrada', 'entrada'),
('Devolução de Venda', 'entrada'),
('Venda', 'saida'),
('Ajuste de Saída', 'saida'),
('Perda/Roubo', 'saida');

INSERT INTO contas (descricao, tipo, categoria) VALUES
('Vendas de Produtos', 'credito', 'vendas'),
('Receitas Diversas', 'credito', 'outras_receitas'),
('Compras de Mercadorias', 'debito', 'despesas'),
('Despesas Operacionais', 'debito', 'despesas'),
('Investimentos em Equipamentos', 'debito', 'investimentos'),
('Salários e Comissões', 'debito', 'despesas');
