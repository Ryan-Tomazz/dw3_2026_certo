# 🗺️ Guia Passo a Passo Completo - Roteiro 13

## Antes de Começar

✅ Node.js instalado  
✅ PostgreSQL disponível (Neon ou local)  
✅ Editor SQL (pgAdmin, Neon WebUI, DBeaver, etc)  

---

## PASSO 1: Clonar / Copiar o Projeto

```bash
# Este projeto já deve estar em:
# 15_06_2026/

cd 15_06_2026
```

---

## PASSO 2: Instalar Dependências

```bash
npm install
```

**Esperado:**
```
> npm install

added 200+ packages in 15s
```

---

## PASSO 3: Configurar Banco de Dados

### Se usar Neon (recomendado para aprender)

1. Acesse https://neon.tech
2. Crie uma conta gratuita
3. Crie um projeto novo
4. Copie a **Connection String**

Deve ser algo como:
```
postgresql://seu_usuario:sua_senha@ep-cool-name.neon.tech/seu_banco?sslmode=require
```

### Se usar PostgreSQL Local

Certifique-se de ter PostgreSQL rodando:

**Linux/Mac:**
```bash
brew services start postgresql
```

**Windows:**
- PostgreSQL deve estar rodando como serviço

**Verificar:**
```bash
psql --version
```

---

## PASSO 4: Criar Arquivo .env

Na raiz do projeto (15_06_2026/), crie um arquivo `.env`:

```env
DATABASE_URL=postgresql://seu_usuario:sua_senha@localhost:5432/seu_banco
```

Ou se usar Neon:

```env
DATABASE_URL=postgresql://seu_usuario:sua_senha@ep-cool-name.neon.tech/seu_banco?sslmode=require
```

---

## PASSO 5: Executar o Script de Criação de Tabelas

Abra seu editor SQL e execute **TODO** o conteúdo de `scripts/schema.sql`:

```sql
-- ==========================================
-- Copie TUDO isto para seu editor SQL
-- ==========================================

CREATE TABLE projetos (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL UNIQUE,
  descricao TEXT,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tarefas (
  id SERIAL PRIMARY KEY,
  titulo VARCHAR(255) NOT NULL,
  descricao TEXT,
  status VARCHAR(50) DEFAULT 'pendente',
  projeto_id INTEGER,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_tarefas_projetos FOREIGN KEY (projeto_id) REFERENCES projetos(id) ON DELETE CASCADE
);

INSERT INTO projetos (nome, descricao) VALUES
('Backend API', 'Desenvolvimento da API REST'),
('Frontend Web', 'Interface web da aplicação'),
('Mobile App', 'Aplicativo mobile para iOS e Android');

INSERT INTO tarefas (titulo, descricao, status, projeto_id) VALUES
('Implementar autenticação', 'Adicionar JWT ao backend', 'pendente', 1),
('Criar endpoints de tarefas', 'Implementar CRUD de tarefas', 'pendente', 1),
('Configurar banco de dados', 'Setup PostgreSQL e migrations', 'concluida', 1),
('Design do dashboard', 'Criar wireframes da interface', 'pendente', 2),
('Responsividade mobile', 'Ajustar layout para celulares', 'pendente', 2);
```

**Esperado:**
- Tabela `projetos` criada ✅
- Tabela `tarefas` criada com chave estrangeira ✅
- 3 projetos inseridos ✅
- 5 tarefas inseridas (2 sem projeto, 3 com projeto) ✅

### Verificar:

```sql
SELECT * FROM projetos;
-- Deve retornar 3 projetos

SELECT * FROM tarefas;
-- Deve retornar 5 tarefas

SELECT t.id, t.titulo, p.nome FROM tarefas t
LEFT JOIN projetos p ON t.projeto_id = p.id;
-- Deve retornar tarefas com nomes dos projetos
```

---

## PASSO 6: Iniciar a Aplicação

```bash
npm run dev
```

**Esperado:**
```
Server running at http://localhost:3000
✅ Conectado ao PostgreSQL com sucesso
```

Se receber erro:
```
Erro no pool de conexão: connect ECONNREFUSED
```

Verifique:
- ❌ `DATABASE_URL` está correto em `.env`?
- ❌ PostgreSQL está rodando?
- ❌ Dados de usuario/senha estão certos?

---

## PASSO 7: Testar a API

Use VS Code com a extensão **REST Client** ou PostMan.

### Teste 1: Listar Projetos

```http
GET http://localhost:3000/projetos
```

**Esperado:**
```json
[
  {
    "id": 1,
    "nome": "Backend API",
    "descricao": "Desenvolvimento da API REST",
    "criado_em": "2026-06-15T10:30:00.000Z"
  },
  { ... }
]
```

### Teste 2: Listar Tarefas (COM PROJETO)

```http
GET http://localhost:3000/tarefas
```

**Esperado:**
```json
[
  {
    "id": 1,
    "titulo": "Implementar autenticação",
    "descricao": "Adicionar JWT ao backend",
    "status": "pendente",
    "projeto_id": 1,
    "projeto_nome": "Backend API"  ← Aqui! JOIN funcionando!
  },
  { ... }
]
```

### Teste 3: Criar Tarefa com Projeto

```http
POST http://localhost:3000/tarefas
Content-Type: application/json

{
  "titulo": "Nova Tarefa",
  "descricao": "Descrição da tarefa",
  "projetoId": 1
}
```

**Esperado:**
```json
{
  "id": 6,
  "titulo": "Nova Tarefa",
  "descricao": "Descrição da tarefa",
  "status": "pendente",
  "projeto_id": 1
}
```

### Teste 4: Erro - Tarefa SEM Projeto

```http
POST http://localhost:3000/tarefas
Content-Type: application/json

{
  "titulo": "Tarefa Órfã",
  "descricao": "Sem projeto"
}
```

**Esperado (400 Bad Request):**
```json
{
  "status": "error",
  "message": "O projetoId é obrigatório"
}
```

### Teste 5: Listar Tarefas de um Projeto

```http
GET http://localhost:3000/projetos/1/tarefas
```

**Esperado:**
```json
[
  {
    "id": 1,
    "titulo": "Implementar autenticação",
    "projeto_id": 1,
    "projeto_nome": "Backend API"
  },
  {
    "id": 2,
    "titulo": "Criar endpoints de tarefas",
    "projeto_id": 1,
    "projeto_nome": "Backend API"
  }
]
```

Apenas tarefas do projeto 1!

---

## PASSO 8: Explorar Exercícios

Abra [EXERCICIOS.md](./EXERCICIOS.md) para:
- ✅ Exercício 1: Validação obrigatória de projeto
- ✅ Exercício 2: Listagem por projeto
- 🔲 Exercício 3: Estruturar resposta para frontend
- 🔲 Exercício 4: Reflexão sobre JOINs e N:N

---

## 🐛 Troubleshooting

| Problema | Solução |
|----------|---------|
| `ECONNREFUSED` | PostgreSQL não está rodando |
| `Database "seu_banco" does not exist` | Execute schema.sql para criar tabelas |
| `relation "tarefas" does not exist` | Schemas não foi executado corretamente |
| `foreign key violation` | Tentou criar tarefa com projeto_id que não existe |
| `projetoId is required` | Não enviou `projetoId` no POST |

---

## ✨ Conceitos Aprendidos

- ✅ Criação de tabelas relacionadas
- ✅ Chaves estrangeiras (FK)
- ✅ LEFT JOIN vs INNER JOIN
- ✅ Validações em múltiplas camadas
- ✅ Fluxo de dados Controller → Service → Repository → Banco

---

## 📊 Estrutura de Arquivos Criada

```
15_06_2026/
├── src/
│   ├── config/database.js         ← Pool PostgreSQL
│   ├── errors/AppError.js         ← Tratamento erros
│   ├── features/
│   │   ├── projetos/              ← CRUD Projetos
│   │   │   ├── projeto.controller.js
│   │   │   ├── projeto.service.js
│   │   │   ├── projeto.repository.js
│   │   │   └── projeto.routes.js
│   │   └── tarefas/               ← CRUD Tarefas + JOINs
│   │       ├── tarefa.controller.js
│   │       ├── tarefa.service.js
│   │       ├── tarefa.repository.js  ← LEFT/INNER JOINs aqui!
│   │       └── tarefa.routes.js
│   └── server.js                  ← App Fastify
├── scripts/schema.sql             ← DDL (tabelas + dados)
├── requests.http                  ← Testes HTTP
├── EXERCICIOS.md                  ← Exercícios + soluções
├── DIAGRAMAS.md                   ← Visualizações
├── .env.example                   ← Template config
├── setup.ps1                       ← Setup (Windows)
├── setup.sh                        ← Setup (Linux/Mac)
├── README.md                       ← Documentação
└── package.json
```

---

## 🚀 Próximos Passos

Uma vez dominado o 1:N, o Roteiro 14 vai cobrir:
- 1:1 (um-para-um, tipo: usuário ↔ perfil)
- N:N (muitos-para-muitos, tipo: tarefas ↔ tags)

---

**Pronto para começar? Vamos ao Passo 1!** 💪
