# ✅ Checklist Completo - Roteiro 13

## PRÉ-REQUISITOS

- [ ] Node.js 18+ instalado
- [ ] PostgreSQL disponível (Neon ou local)
- [ ] Editor SQL acessível (pgAdmin, Neon WebUI, DBeaver)
- [ ] VS Code com extensões básicas (REST Client recomendado)

---

## SETUP INICIAL

- [ ] Copiar ou clonar projeto para `15_06_2026/`
- [ ] Entrar na pasta: `cd 15_06_2026`
- [ ] Instalar dependências: `npm install`
- [ ] Criar arquivo `.env` com `DATABASE_URL`
- [ ] Verificar conexão PostgreSQL

---

## CRIAÇÃO DO BANCO DE DADOS

### Tabelas
- [ ] Criar tabela `projetos` com:
  - [ ] `id` SERIAL PRIMARY KEY
  - [ ] `nome` VARCHAR(255) UNIQUE NOT NULL
  - [ ] `descricao` TEXT
  - [ ] `criado_em` TIMESTAMP DEFAULT CURRENT_TIMESTAMP

- [ ] Criar tabela `tarefas` com:
  - [ ] `id` SERIAL PRIMARY KEY
  - [ ] `titulo` VARCHAR(255) NOT NULL
  - [ ] `descricao` TEXT
  - [ ] `status` VARCHAR(50) DEFAULT 'pendente'
  - [ ] `projeto_id` INTEGER (chave estrangeira)
  - [ ] `criado_em` TIMESTAMP DEFAULT CURRENT_TIMESTAMP

- [ ] Adicionar constraint:
  - [ ] FOREIGN KEY `projeto_id` → `projetos.id`
  - [ ] ON DELETE CASCADE

### Dados Iniciais
- [ ] Inserir 3 projetos de exemplo
- [ ] Inserir 5 tarefas de exemplo (algumas com projeto, algumas sem)

### Verificação
- [ ] Consultar `SELECT * FROM projetos` → 3 linhas
- [ ] Consultar `SELECT * FROM tarefas` → 5 linhas
- [ ] Consultar LEFT JOIN → Todas aparecem, mesmo órfãs

---

## ESTRUTURA DO CÓDIGO

### Configuração
- [ ] `src/config/database.js` criado com Pool PostgreSQL
- [ ] `src/errors/AppError.js` criado com classe de erro

### Feature Projetos
- [ ] `src/features/projetos/projeto.repository.js` implementado
- [ ] `src/features/projetos/projeto.service.js` implementado
- [ ] `src/features/projetos/projeto.controller.js` implementado
- [ ] `src/features/projetos/projeto.routes.js` implementado

### Feature Tarefas (COM JOINS)
- [ ] `src/features/tarefas/tarefa.repository.js` com:
  - [ ] Query de listagem com LEFT JOIN
  - [ ] Query de busca por ID com LEFT JOIN
  - [ ] Query de busca por projeto com INNER JOIN
- [ ] `src/features/tarefas/tarefa.service.js` com:
  - [ ] Validação obrigatória de `projetoId`
  - [ ] Verificação se projeto existe
  - [ ] Método para buscar por projeto
- [ ] `src/features/tarefas/tarefa.controller.js` com:
  - [ ] Método `criar` que passa `projetoId`
  - [ ] Método `buscarPorProjeto`
- [ ] `src/features/tarefas/tarefa.routes.js` com:
  - [ ] Rota `POST /tarefas` com `projetoId`
  - [ ] Rota `GET /projetos/:projetoId/tarefas`

### Server
- [ ] `src/server.js` criado com registros de rotas

---

## TESTES DA API

### Teste 1: Listar Projetos
- [ ] `GET /projetos` → 3 projetos
- [ ] Status: 200 OK

### Teste 2: Listar Tarefas (Com JOIN)
- [ ] `GET /tarefas` → Cada tarefa tem `projeto_nome`
- [ ] Status: 200 OK
- [ ] Campo `projeto_nome` existe no JSON

### Teste 3: Criar Projeto
- [ ] `POST /projetos` → Novo projeto criado
- [ ] Status: 201 Created

### Teste 4: Criar Tarefa com Projeto
- [ ] `POST /tarefas` com `projetoId: 1` → Sucesso
- [ ] Tarefa retorna com `projeto_id` preenchido
- [ ] Status: 201 Created

### Teste 5: Validação Obrigatória
- [ ] `POST /tarefas` SEM `projetoId` → Erro 400
- [ ] Mensagem: "O projetoId é obrigatório"

### Teste 6: Erro de Projeto Inexistente
- [ ] `POST /tarefas` com `projetoId: 999` → Erro 404
- [ ] Mensagem: "Projeto não encontrado"

### Teste 7: Listar Tarefas por Projeto
- [ ] `GET /projetos/1/tarefas` → Apenas tarefas do projeto 1
- [ ] Status: 200 OK
- [ ] Retorna array com N tarefas

### Teste 8: Buscar Tarefa Específica
- [ ] `GET /tarefas/1` → Tarefa com `projeto_nome`
- [ ] Status: 200 OK

### Teste 9: Atualizar Tarefa
- [ ] `PATCH /tarefas/1` → Tarefa atualizada
- [ ] Status: 200 OK

### Teste 10: Concluir Tarefa
- [ ] `PATCH /tarefas/1/concluir` → Status muda
- [ ] Status: 200 OK

---

## EXERCÍCIOS PROPOSTOS

### Exercício 1: Impedir Tarefa sem Projeto
- [ ] ✅ Já implementado
- [ ] Validação está no Service
- [ ] Teste retorna 400 se não tiver `projetoId`

### Exercício 2: Buscar Tarefas de um Projeto
- [ ] ✅ Já implementado
- [ ] Rota `GET /projetos/:projetoId/tarefas` funciona
- [ ] Retorna apenas tarefas do projeto especificado

### Exercício 3: Estruturar Resposta para Frontend (DESAFIO)
- [ ] [ ] Decidir onde implementar (Repository, Service ou Controller)
- [ ] [ ] Transformar `{ projeto_id, projeto_nome }` em `{ projeto: { id, nome } }`
- [ ] [ ] Testar em todas as rotas
- [ ] [ ] Documentar decisão de design

### Exercício 4: Raciocínio sobre Decisões (REFLEXÃO)
- [ ] Entender por quê LEFT JOIN na listagem geral
- [ ] Entender por quê INNER JOIN na busca por projeto
- [ ] Visualizar exemplo de tarefa órfã
- [ ] Esboçar estrutura de N:N (tags)

---

## DOCUMENTAÇÃO

- [ ] [README.md](./README.md) lido e entendido
- [ ] [GUIA_PASSO_A_PASSO.md](./GUIA_PASSO_A_PASSO.md) seguido completamente
- [ ] [EXERCICIOS.md](./EXERCICIOS.md) revisado
- [ ] [DIAGRAMAS.md](./DIAGRAMAS.md) visualizado
- [ ] [INDICE.md](./INDICE.md) como referência

---

## EXTRAS (DESAFIOS BÔNUS)

- [ ] Implementar soft delete (adicionar coluna `isDeleted`)
- [ ] Adicionar paginação na listagem de tarefas
- [ ] Implementar filtros (por status, por data, etc)
- [ ] Adicionar índices no banco para otimizar JOINs
- [ ] Criar testes automatizados (Jest/Vitest)
- [ ] Documentar API com Swagger/OpenAPI
- [ ] Implementar Exercício 3 (estrutura de resposta)
- [ ] Implementar autenticação básica (next roteiro)

---

## TROUBLESHOOTING

### Erro de Conexão
- [ ] Verificar `DATABASE_URL` em `.env`
- [ ] Confirmar PostgreSQL está rodando
- [ ] Testar manualmente: `psql <connection_string>`

### Erro de Tabelas
- [ ] Executar novamente `scripts/schema.sql`
- [ ] Verificar no banco: `SELECT * FROM information_schema.tables`
- [ ] Confirmar que projetos tem 3 linhas, tarefas tem 5

### Erro de API
- [ ] Verificar logs no terminal (npm run dev)
- [ ] Confirmar PORT 3000 está livre
- [ ] Testar com `curl` antes de REST Client

### Erro de JOINs
- [ ] Verificar query SQL diretamente no banco
- [ ] Confirmar que `projeto_id` está preenchido em algumas tarefas
- [ ] Verificar aliases (t, p) na query

---

## RESUMO FINAL

```
┌─────────────────────────────────────────┐
│    ROTEIRO 13 - RELACIONAMENTOS 1:N     │
├─────────────────────────────────────────┤
│  ✅ Tabelas criadas                     │
│  ✅ Chaves estrangeiras implementadas   │
│  ✅ JOINs (LEFT e INNER) funcionando   │
│  ✅ API completa com 11+ rotas         │
│  ✅ Validações em múltiplas camadas    │
│  ✅ Exercícios 1 e 2 completados       │
│  ✅ Documentação completa               │
│  ✅ Testes prontos para executar       │
└─────────────────────────────────────────┘
```

---

## 🎓 Conceitos Dominados

Se você completou TODO este checklist, você agora entende:

- [x] Modelagem relacional 1:N
- [x] Chaves estrangeiras e integridade referencial
- [x] LEFT JOIN (tolerante) vs INNER JOIN (restritivo)
- [x] Validação em camadas (Controllers, Services, Repositories)
- [x] Fluxo de dados com injeção de dependência
- [x] Como estruturar uma API com relacionamentos
- [x] Diferença entre dados do banco e dados da API

---

## 📈 Próximo Passo

Quando completar tudo, estude **Roteiro 14: Relacionamentos 1:1 e N:N**

- 1:1: Um usuário tem um perfil, um perfil pertence a um usuário
- N:N: Uma tarefa tem muitas tags, uma tag está em muitas tarefas

---

**Parabéns por chegar aqui!** 🎉  
Você está evoluindo de entidades isoladas para um modelo relacional de verdade.

**Agora é com você!** 💪
