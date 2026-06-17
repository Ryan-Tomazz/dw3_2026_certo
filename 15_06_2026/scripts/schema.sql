-- @file: scripts/schema.sql
-- ==========================================
-- SCRIPT DE CRIAÇÃO DAS TABELAS
-- ==========================================
-- Execute este arquivo no seu editor SQL do Neon (ou outro PostgreSQL)
-- para criar a estrutura inicial do banco de dados.

-- Passo 2: Criar a tabela projetos
CREATE TABLE projetos (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL UNIQUE,
  descricao TEXT,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Passo 3: Adicionar coluna projeto_id em tarefas
-- Se a tabela tarefas não existir ainda, crie assim:
CREATE TABLE tarefas (
  id SERIAL PRIMARY KEY,
  titulo VARCHAR(255) NOT NULL,
  descricao TEXT,
  status VARCHAR(50) DEFAULT 'pendente',
  projeto_id INTEGER,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_tarefas_projetos FOREIGN KEY (projeto_id) REFERENCES projetos(id) ON DELETE CASCADE
);

-- Caso a tabela tarefas já exista, adicione a coluna e restrição assim:
-- ALTER TABLE tarefas ADD COLUMN projeto_id INTEGER;
-- ALTER TABLE tarefas ADD CONSTRAINT fk_tarefas_projetos FOREIGN KEY (projeto_id) REFERENCES projetos(id) ON DELETE CASCADE;

-- Passo 4: Cadastrar alguns projetos iniciais
INSERT INTO projetos (nome, descricao) VALUES
('Backend API', 'Desenvolvimento da API REST'),
('Frontend Web', 'Interface web da aplicação'),
('Mobile App', 'Aplicativo mobile para iOS e Android');

-- Passo 5: Inserir algumas tarefas vinculadas aos projetos
-- Substitua os IDs dos projetos pelos valores reais do seu banco
INSERT INTO tarefas (titulo, descricao, status, projeto_id) VALUES
('Implementar autenticação', 'Adicionar JWT ao backend', 'pendente', 1),
('Criar endpoints de tarefas', 'Implementar CRUD de tarefas', 'pendente', 1),
('Configurar banco de dados', 'Setup PostgreSQL e migrations', 'concluida', 1),
('Design do dashboard', 'Criar wireframes da interface', 'pendente', 2),
('Responsividade mobile', 'Ajustar layout para celulares', 'pendente', 2);
