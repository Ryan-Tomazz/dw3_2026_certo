-- Preparação de um banco de estudo vazio com a estrutura dos Roteiros 13 e 14.
-- CREATE TABLE IF NOT EXISTS não atualiza tabelas existentes.

CREATE TABLE IF NOT EXISTS projetos (
  id SERIAL PRIMARY KEY,
  nome TEXT NOT NULL,
  criado_em TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS tarefas (
  id SERIAL PRIMARY KEY,
  descricao TEXT NOT NULL,
  concluido BOOLEAN NOT NULL DEFAULT false,
  criada_em TIMESTAMP NOT NULL DEFAULT NOW(),
  projeto_id INTEGER REFERENCES projetos(id)
);

CREATE TABLE IF NOT EXISTS detalhes_projeto (
  id SERIAL PRIMARY KEY,
  projeto_id INTEGER NOT NULL UNIQUE REFERENCES projetos(id),
  descricao_longa TEXT,
  observacoes TEXT,
  prazo_final DATE
);

CREATE TABLE IF NOT EXISTS tags (
  id SERIAL PRIMARY KEY,
  nome TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS tarefas_tags (
  tarefa_id INTEGER NOT NULL REFERENCES tarefas(id),
  tag_id INTEGER NOT NULL REFERENCES tags(id),
  PRIMARY KEY (tarefa_id, tag_id)
);
