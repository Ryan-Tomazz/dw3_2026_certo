TRUNCATE TABLE projetos, tarefas, detalhes_projeto, tags, tarefas_tags RESTART IDENTITY CASCADE;

INSERT INTO projetos (nome) VALUES
  ('Projeto API DW3'),
  ('Projeto Banco Relacional'),
  ('Projeto Integração Frontend');

INSERT INTO tarefas (descricao, concluido, projeto_id) VALUES
  ('Criar endpoints do projeto', false, 1),
  ('Integrar PostgreSQL', false, 1),
  ('Refatorar Repository', false, 2),
  ('Modelar relacionamentos N:N', false, 2),
  ('Ajustar resposta da API', true, 3);

INSERT INTO detalhes_projeto (projeto_id, descricao_longa, observacoes, prazo_final) VALUES
  (1, 'Projeto focado na evolução da API de tarefas', 'Organizar endpoints e persistência', '2026-07-10');

INSERT INTO tags (nome) VALUES
  ('backend'),
  ('postgres'),
  ('api'),
  ('urgente');

INSERT INTO tarefas_tags (tarefa_id, tag_id) VALUES
  (1, 1),
  (2, 2),
  (3, 1),
  (3, 3),
  (4, 2),
  (4, 4);
