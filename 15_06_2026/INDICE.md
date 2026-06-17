# 📑 Índice - Roteiro 13 Completo

## 🎯 Objetivo
Modelar relacionamentos 1:N (um-para-muitos) entre Projetos e Tarefas usando PostgreSQL e Express/Fastify no backend.

---

## 📚 Documentação

| Arquivo | Descrição |
|---------|-----------|
| [README.md](./README.md) | 📖 Documentação completa da API |
| [GUIA_PASSO_A_PASSO.md](./GUIA_PASSO_A_PASSO.md) | 🗺️ Setup inicial e testes passo a passo |
| [EXERCICIOS.md](./EXERCICIOS.md) | 📝 4 Exercícios propostos com soluções |
| [DIAGRAMAS.md](./DIAGRAMAS.md) | 🗂️ Diagramas ER, fluxos de dados |

---

## 🛠️ Setup Rápido

### 1. Instalar dependências
```bash
npm install
```

### 2. Configurar banco
Edite `.env` com sua `DATABASE_URL` do PostgreSQL

### 3. Criar tabelas
Execute `scripts/schema.sql` no seu editor SQL

### 4. Rodar aplicação
```bash
npm run dev
```

### 5. Testar
Use `requests.http` no VS Code com REST Client

**Detalhes:** Veja [GUIA_PASSO_A_PASSO.md](./GUIA_PASSO_A_PASSO.md)

---

## 📂 Estrutura do Projeto

```
src/
├── config/database.js           # Pool PostgreSQL
├── errors/AppError.js           # Tratamento de erros
├── features/
│   ├── projetos/                # Feature de Projetos
│   │   ├── projeto.controller.js
│   │   ├── projeto.service.js
│   │   ├── projeto.repository.js
│   │   └── projeto.routes.js
│   └── tarefas/                 # Feature de Tarefas (com JOINs!)
│       ├── tarefa.controller.js
│       ├── tarefa.service.js
│       ├── tarefa.repository.js  ← Implementa LEFT e INNER JOINs
│       └── tarefa.routes.js
└── server.js                    # App Fastify
```

---

## 🔗 Conceitos Principais

### Relacionamento 1:N
- **Um Projeto** pode ter **MUITAS Tarefas**
- **Uma Tarefa** pertence a **UM Projeto**

### Tabelas
```sql
projetos
├── id (PK)
├── nome (UNIQUE)
├── descricao
└── criado_em

tarefas
├── id (PK)
├── titulo
├── descricao
├── status
├── projeto_id (FK → projetos.id)
└── criado_em
```

### JOINs Utilizados
- **LEFT JOIN**: Listagem geral (inclui tarefas órfãs)
- **INNER JOIN**: Filtro por projeto (só com vínculo)

---

## 🧪 Rotas da API

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/projetos` | Listar todos os projetos |
| POST | `/projetos` | Criar novo projeto |
| GET | `/projetos/:id` | Buscar projeto específico |
| PATCH | `/projetos/:id` | Atualizar projeto |
| DELETE | `/projetos/:id` | Deletar projeto (cascata) |
| GET | `/tarefas` | Listar tarefas + projeto (LEFT JOIN) |
| POST | `/tarefas` | Criar tarefa com projeto obrigatório |
| GET | `/tarefas/:id` | Buscar tarefa com projeto |
| PATCH | `/tarefas/:id` | Atualizar tarefa |
| PATCH | `/tarefas/:id/concluir` | Concluir/desconcluir |
| DELETE | `/tarefas/:id` | Deletar tarefa |
| GET | `/projetos/:projetoId/tarefas` | **Listar tarefas de um projeto** |

---

## ✅ Exercícios Implementados

### Exercício 1: Impedir Tarefa sem Projeto ✅
A validação `projetoId` é obrigatória no Service.

**Teste:**
```http
POST /tarefas
{ "titulo": "Sem projeto" }
```
→ Retorna `400 Bad Request`

### Exercício 2: Buscar Tarefas de um Projeto ✅
Nova rota implementada: `GET /projetos/:projetoId/tarefas`

**Teste:**
```http
GET /projetos/1/tarefas
```
→ Retorna apenas tarefas do projeto 1

### Exercício 3: Estruturar Resposta para Frontend 🔲
Transformar `{ projeto_id, projeto_nome }` em `{ projeto: { id, nome } }`

**Sugestão:** Implementar no Service ou Controller

Veja [EXERCICIOS.md](./EXERCICIOS.md#exercício-3-melhorando-a-resposta-para-o-frontend)

### Exercício 4: Raciocínio sobre Decisões 🔲
Por quê LEFT JOIN vs INNER JOIN?
Por quê 1:N não resolve N:N?

Veja [EXERCICIOS.md](./EXERCICIOS.md#exercício-4-raciocinando-sobre-decisões)

---

## 🎓 O Que Você Vai Aprender

- [x] Criar tabelas com relacionamento 1:N
- [x] Usar chaves estrangeiras (FOREIGN KEY)
- [x] LEFT JOIN (tolerante) vs INNER JOIN (restritivo)
- [x] Validação em múltiplas camadas (Controller, Service, Repository)
- [x] Fluxo de dados com dependências
- [x] Como a modelagem relacional muda a API

---

## 🚀 Testando a API

### Opção 1: VS Code + REST Client
1. Instale extensão "REST Client"
2. Abra `requests.http`
3. Clique "Send Request" em cada teste

### Opção 2: cURL
```bash
curl -X GET http://localhost:3000/tarefas
```

### Opção 3: PostMan
Importe as rotas manualmente ou use `requests.http`

---

## 📋 Arquivos Auxiliares

| Arquivo | Propósito |
|---------|-----------|
| `requests.http` | Testes HTTP prontos para executar |
| `scripts/schema.sql` | DDL para criar tabelas no banco |
| `.env.example` | Template para configuração |
| `setup.ps1` | Script de setup (Windows) |
| `setup.sh` | Script de setup (Linux/Mac) |
| `.gitignore` | Arquivos a ignorar no git |

---

## 🔍 Verificação Rápida

Seu projeto está funcionando se:

```bash
npm run dev
```

Retorna:
```
Server running at http://localhost:3000
✅ Conectado ao PostgreSQL com sucesso
```

E:
```bash
curl http://localhost:3000/tarefas
```

Retorna JSON com tarefas e `projeto_nome` do JOIN.

---

## 🐛 Problemas Comuns

| Erro | Causa | Solução |
|------|-------|---------|
| `ECONNREFUSED` | PostgreSQL não roda | Inicie PostgreSQL |
| `database does not exist` | Schema não executado | Execute `scripts/schema.sql` |
| `projetoId is required` | Não enviou projeto | Adicione `projetoId` no POST |
| `projeto_nome é null` | LEFT JOIN com tarefa órfã | Normal! Use LEFT JOIN |

Veja troubleshooting em [GUIA_PASSO_A_PASSO.md](./GUIA_PASSO_A_PASSO.md#-troubleshooting)

---

## 📊 Próxima Etapa

**Roteiro 14:** Relacionamentos 1:1 e N:N
- 1:1: Usuário ↔ Perfil
- N:N: Tarefas ↔ Tags (com tabela de junção)

---

## 💡 Dicas Importantes

1. **Sempre comece pelo lado "Um"**  
   Antes de linkar uma tarefa a um projeto, o projeto deve existir.

2. **LEFT vs INNER é intenção**  
   Escolha depende do que a query está respondendo.

3. **Validação em múltiplas camadas**  
   Banco (FK), Repository, Service, Controller trabalham juntos.

4. **Teste antes de refatorar**  
   Certifique-se que funciona antes de otimizar.

---

## 📞 Precisa de Ajuda?

1. Verifique [GUIA_PASSO_A_PASSO.md](./GUIA_PASSO_A_PASSO.md)
2. Leia [EXERCICIOS.md](./EXERCICIOS.md) para conceitos
3. Visualize [DIAGRAMAS.md](./DIAGRAMAS.md) para entender estrutura
4. Consulte [README.md](./README.md) para referência da API

---

**Bora modelar relacionamentos!** 🚀
