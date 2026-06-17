# 📦 Estrutura do Projeto - Roteiro 13

## 🗂️ Árvore Completa

```
15_06_2026/
│
├── 📄 START_HERE.md .......................... Comece por aqui!
├── 📄 README.md ............................. Documentação da API
├── 📄 GUIA_PASSO_A_PASSO.md ................. Setup e testes detalhados
├── 📄 INDICE.md ............................ Índice navegável
├── 📄 CHECKLIST.md ......................... Progresso
├── 📄 EXERCICIOS.md ........................ Desafios propostos
├── 📄 DIAGRAMAS.md ......................... Visualizações ER
├── 📄 ESTRUTURA.md ......................... Este arquivo
│
├── 📋 package.json .......................... Dependências (fastify, pg)
├── 📋 package-lock.json ..................... Lock file
│
├── 🔐 .env.example .......................... Template de configuração
├── 🔐 .env (criar localmente) ............... Seu DATABASE_URL
├── .gitignore ............................... Arquivos ignorados
│
├── 📚 scripts/
│   └── schema.sql ........................... DDL (criar tabelas)
│
├── 🧪 requests.http ......................... Testes HTTP (copie em VS Code)
│
├── 🚀 setup.sh .............................. Script setup (Linux/Mac)
├── 🚀 setup.ps1 ............................ Script setup (Windows)
│
└── 📁 src/
    │
    ├── server.js ........................... Inicialização Fastify
    │
    ├── config/
    │   └── database.js ..................... 🔌 Pool PostgreSQL
    │
    ├── errors/
    │   └── AppError.js ..................... ⚠️ Tratamento erros
    │
    └── features/
        │
        ├── projetos/ ...................... 📦 Feature Projetos
        │   ├── projeto.controller.js ...... (listar, criar, etc)
        │   ├── projeto.service.js ......... (validações)
        │   ├── projeto.repository.js ...... (queries SQL)
        │   └── projeto.routes.js .......... (GET /projetos, etc)
        │
        └── tarefas/ ....................... ✅ Feature Tarefas (COM JOINs!)
            ├── tarefa.controller.js ....... (listar, criar, etc)
            ├── tarefa.service.js .......... (validações + buscarPorProjeto)
            ├── tarefa.repository.js ....... 🔗 LEFT/INNER JOINs aqui!
            └── tarefa.routes.js ........... (GET /tarefas, /projetos/:id/tarefas)
```

---

## 🎯 Fluxo de Execução

```
npm run dev
    │
    ▼
src/server.js
    │
    ├─► Registra tarefaRoutes
    │       │
    │       ▼
    │   features/tarefas/tarefa.routes.js
    │       │
    │       ├─► GET /tarefas → tarefaController.listar()
    │       ├─► POST /tarefas → tarefaController.criar()
    │       ├─► GET /tarefas/:id → tarefaController.buscar()
    │       ├─► GET /projetos/:projetoId/tarefas → tarefaController.buscarPorProjeto()
    │       └─► ... (outros)
    │
    └─► Registra projetoRoutes
            │
            ▼
        features/projetos/projeto.routes.js
            │
            ├─► GET /projetos → projetoController.listar()
            ├─► POST /projetos → projetoController.criar()
            └─► ... (outros)
```

---

## 🔗 Fluxo de uma Requisição POST /tarefas

```
Cliente
  │
  ├─ POST /tarefas
  │  {
  │    "titulo": "Tarefa X",
  │    "projetoId": 1
  │  }
  │
  ▼
server.js (setErrorHandler ativa)
  │
  ▼
tarefa.routes.js
  │
  ▼
TarefaController.criar(request, reply)
  │
  ├─ Extrai request.body
  │
  ▼
TarefaService.criarTarefa(dados)
  │
  ├─ Valida: titulo obrigatório?
  ├─ Valida: projetoId obrigatório? ✅
  ├─ Valida: projeto existe?
  ├─ Valida: título duplicado?
  │
  ▼ (Se tudo OK)
TarefaRepository.salvar(tarefa)
  │
  ├─ SQL: INSERT INTO tarefas (...)
  │
  ▼
Pool PostgreSQL
  │
  ├─ Banco verifica: FK projeto_id existe?
  │
  ▼ (Se FK válido)
Banco retorna: RETURNING id, titulo, projeto_id
  │
  ▼
Controller.criar retorna JSON + 201
  │
  ▼
Cliente recebe: { id: 6, titulo: "Tarefa X", projeto_id: 1 }
```

---

## 🔗 Fluxo de uma Requisição GET /tarefas

```
Cliente
  │
  ├─ GET /tarefas
  │
  ▼
server.js
  │
  ▼
tarefa.routes.js → TarefaController.listar(request, reply)
  │
  ▼
TarefaService.listarTarefas()
  │
  ▼
TarefaRepository.listarTodos()
  │
  ├─ SQL:
  │   SELECT t.id, t.titulo, t.status, t.projeto_id,
  │          p.nome as projeto_nome
  │   FROM tarefas t
  │   LEFT JOIN projetos p ON t.projeto_id = p.id
  │   ORDER BY t.criado_em DESC
  │
  ▼
Pool PostgreSQL
  │
  ├─ Executa LEFT JOIN
  │ ├─ Tarefa 1 + Projeto Backend API
  │ ├─ Tarefa 2 + Projeto Backend API
  │ ├─ Tarefa 3 + NULL (sem projeto)
  │ └─ ...
  │
  ▼
Banco retorna: Array de registros com projeto_nome
  │
  ▼
Controller envia JSON
  │
  ▼
Cliente recebe:
[
  { id: 1, titulo: "Aut...", projeto_id: 1, projeto_nome: "Backend" },
  { id: 2, titulo: "API...", projeto_id: 1, projeto_nome: "Backend" },
  { id: 3, titulo: "Deploy", projeto_id: NULL, projeto_nome: NULL }
]
```

---

## 📊 Estrutura de Dados - PostgreSQL

### Tabela: projetos

```sql
CREATE TABLE projetos (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL UNIQUE,
  descricao TEXT,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Exemplo de dados:**
```
id │ nome           │ descricao
───┼────────────────┼─────────────────────────
1  │ Backend API    │ Desenvolvimento REST
2  │ Frontend Web   │ Interface web
3  │ Mobile App     │ App iOS/Android
```

### Tabela: tarefas

```sql
CREATE TABLE tarefas (
  id SERIAL PRIMARY KEY,
  titulo VARCHAR(255) NOT NULL,
  descricao TEXT,
  status VARCHAR(50) DEFAULT 'pendente',
  projeto_id INTEGER REFERENCES projetos(id) ON DELETE CASCADE,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Exemplo de dados:**
```
id │ titulo           │ status     │ projeto_id
───┼──────────────────┼────────────┼────────────
1  │ Autenticação     │ pendente   │ 1
2  │ API REST         │ pendente   │ 1
3  │ Dashboard        │ pendente   │ 2
4  │ Responsividade   │ pendente   │ 2
5  │ Deploy           │ pendente   │ NULL
```

---

## 🎯 Camadas da Aplicação

### 1️⃣ Controller
**Arquivo:** `src/features/tarefas/tarefa.controller.js`
```javascript
async criar(request, reply) {
  // Lê dados da requisição
  const tarefa = await this.service.criarTarefa(request.body)
  return reply.status(201).send(tarefa)
}
```
**Responsabilidade:** Converter requisição HTTP → chamada ao Service

### 2️⃣ Service
**Arquivo:** `src/features/tarefas/tarefa.service.js`
```javascript
async criarTarefa(dados) {
  // Valida: projetoId obrigatório
  if (!dados.projetoId) {
    throw new AppError('O projetoId é obrigatório', 400)
  }
  // Valida: projeto existe
  const projeto = await this.projetoRepository.buscarPorId(dados.projetoId)
  if (!projeto) {
    throw new AppError('Projeto não encontrado', 404)
  }
  // Persiste
  return this.repository.salvar({ ...dados, status: 'pendente' })
}
```
**Responsabilidade:** Lógica de negócio e validações

### 3️⃣ Repository
**Arquivo:** `src/features/tarefas/tarefa.repository.js`
```javascript
async salvar(tarefa) {
  const { titulo, projetoId } = tarefa
  const resultado = await pool.query(
    'INSERT INTO tarefas (titulo, projeto_id) VALUES ($1, $2) RETURNING *',
    [titulo, projetoId]
  )
  return resultado.rows[0]
}
```
**Responsabilidade:** Queries SQL e acesso ao banco

### 4️⃣ Banco (PostgreSQL)
**Responsabilidade:** Persistência, FK, integridade

---

## 🔐 JOINs Utilizados

### LEFT JOIN (Listagem Geral)
```sql
SELECT t.*, p.nome as projeto_nome
FROM tarefas t
LEFT JOIN projetos p ON t.projeto_id = p.id

-- Resultado: INCLUI tarefas sem projeto (projeto_nome = NULL)
```

### INNER JOIN (Filtro por Projeto)
```sql
SELECT t.*, p.nome as projeto_nome
FROM tarefas t
INNER JOIN projetos p ON t.projeto_id = p.id
WHERE p.id = 1

-- Resultado: EXCLUI tarefas sem projeto (filtra pelo critério)
```

---

## 📝 Rotas Implementadas

```
Projetos:
  GET   /projetos              ├─ Listar todos
  POST  /projetos              ├─ Criar novo
  GET   /projetos/:id          ├─ Buscar por ID
  PATCH /projetos/:id          ├─ Atualizar
  DELETE /projetos/:id         └─ Deletar

Tarefas:
  GET   /tarefas               ├─ Listar (com LEFT JOIN)
  POST  /tarefas               ├─ Criar (requer projetoId)
  GET   /tarefas/:id           ├─ Buscar (com JOIN)
  PATCH /tarefas/:id           ├─ Atualizar
  PATCH /tarefas/:id/concluir  ├─ Concluir/Desconcluir
  DELETE /tarefas/:id          └─ Deletar

Relação:
  GET /projetos/:projetoId/tarefas ── Listar tarefas de um projeto (INNER JOIN)
```

---

## ✨ Validações Implementadas

### No Banco
- FK: `projeto_id` deve referenciar projeto existente
- Cascade Delete: Deletar projeto remove suas tarefas

### No Service
- `projetoId` obrigatório
- Projeto deve existir
- Título obrigatório
- Título deve ser único

### No Controller
- Extração de dados de request.body
- Passagem para Service

### Global (AppError)
- Erro 400: Validação falhou
- Erro 404: Recurso não encontrado
- Erro 500: Erro interno

---

## 🎓 Conceitos Implementados

| Conceito | Onde | Como |
|----------|------|------|
| 1:N | Schema SQL | FK projeto_id em tarefas |
| Chave Estrangeira | Banco | REFERENCES projetos(id) |
| Integridade Referencial | Banco | ON DELETE CASCADE |
| LEFT JOIN | Query | Inclui órfãs |
| INNER JOIN | Query | Exclui órfãs |
| Validação Obrigatória | Service | if (!projetoId) |
| Existência | Service | buscarPorId() |
| Injeção de Dependência | Routes | Construtor Service(Repository) |
| Tratamento de Erros | Server | setErrorHandler() |

---

## 🧪 Como Testar

1. **VS Code + REST Client:**
   - Instale "REST Client"
   - Abra `requests.http`
   - Clique "Send Request"

2. **cURL:**
   ```bash
   curl http://localhost:3000/tarefas
   ```

3. **PostMan:**
   Importe as rotas manualmente

---

**Estrutura clara e funcional!** 🎉
