# 📚 Mapa Completo de Arquivos - Roteiro 13

## 📖 Documentação (Comece por aqui!)

| Arquivo | Tipo | Objetivo | Ler Primeiro? |
|---------|------|----------|---------------|
| [START_HERE.md](./START_HERE.md) | 🚀 Entrada | Bem-vindo e overview | ✅ SIM |
| [GUIA_PASSO_A_PASSO.md](./GUIA_PASSO_A_PASSO.md) | 🗺️ Tutorial | Setup e testes detalhados | ✅ DEPOIS |
| [README.md](./README.md) | 📖 Referência | Documentação completa API | 3️⃣ SIM |
| [INDICE.md](./INDICE.md) | 📑 Navegação | Índice do projeto | Conforme necessário |
| [ESTRUTURA.md](./ESTRUTURA.md) | 🗂️ Arquitetura | Estrutura de arquivos/fluxos | Conforme necessário |
| [EXERCICIOS.md](./EXERCICIOS.md) | 📝 Desafios | Exercícios + soluções | Depois de testar |
| [DIAGRAMAS.md](./DIAGRAMAS.md) | 🗂️ Visualização | Diagramas ER e fluxos | Para entender melhor |
| [CHECKLIST.md](./CHECKLIST.md) | ✅ Acompanhamento | Progresso do aprendizado | Para se orientar |

---

## 🛠️ Configuração

| Arquivo | Tipo | Descrição |
|---------|------|-----------|
| [package.json](./package.json) | 📋 Config | Dependências (fastify, pg) |
| [package-lock.json](./package-lock.json) | 🔒 Lock | Versões exatas instaladas |
| [.env.example](./.env.example) | 🔐 Template | Modelo de variáveis de ambiente |
| [.env](./env) | 🔐 Config | Seu DATABASE_URL (criar localmente) |
| [.gitignore](./.gitignore) | 📋 Git | Arquivos ignorados |

---

## 🗄️ Base de Dados

| Arquivo | Tipo | Conteúdo |
|---------|------|----------|
| [scripts/schema.sql](./scripts/schema.sql) | 📜 SQL | Criação de tabelas e dados iniciais |

**O que contém:**
- CREATE TABLE projetos
- CREATE TABLE tarefas
- INSERT INTO projetos (3 registros)
- INSERT INTO tarefas (5 registros)

---

## 🧪 Testes

| Arquivo | Tipo | Descrição |
|---------|------|-----------|
| [requests.http](./requests.http) | 🧪 HTTP | +20 testes prontos para executar |

**Como usar:**
1. Instale extensão "REST Client" no VS Code
2. Abra `requests.http`
3. Clique "Send Request" em cada teste

**Testes inclusos:**
- CREATE (POST) projetos
- CREATE (POST) tarefas
- LIST (GET) /tarefas com JOIN
- LIST (GET) /projetos/:id/tarefas
- UPDATE (PATCH)
- DELETE
- Erro esperados (400, 404)

---

## 🚀 Scripts de Setup

| Arquivo | Tipo | OS | Descrição |
|---------|------|----|-----------
| [setup.sh](./setup.sh) | 🔧 Script | Linux/Mac | Automação setup |
| [setup.ps1](./setup.ps1) | 🔧 Script | Windows | Automação setup |

**O que fazem:**
- Verificam Node.js instalado
- Rodam `npm install`
- Criam arquivo `.env`
- Dão próximas instruções

---

## 💻 Código Fonte

### Estrutura
```
src/
├── server.js                    (inicialização Fastify)
├── config/
│   └── database.js              (Pool PostgreSQL)
├── errors/
│   └── AppError.js              (classe de erro)
└── features/
    ├── projetos/                (CRUD Projetos)
    │   ├── projeto.controller.js
    │   ├── projeto.service.js
    │   ├── projeto.repository.js
    │   └── projeto.routes.js
    └── tarefas/                 (CRUD Tarefas + JOINs)
        ├── tarefa.controller.js
        ├── tarefa.service.js
        ├── tarefa.repository.js  ← JOINs aqui!
        └── tarefa.routes.js
```

### Arquivo por Arquivo

#### Core
| Arquivo | Linhas | Responsabilidade |
|---------|--------|------------------|
| [src/server.js](./src/server.js) | ~35 | Inicialização Fastify + erro global |
| [src/config/database.js](./src/config/database.js) | ~20 | Pool PostgreSQL |
| [src/errors/AppError.js](./src/errors/AppError.js) | ~10 | Classe de erro customizada |

#### Feature: Projetos
| Arquivo | Linhas | Responsabilidade |
|---------|--------|------------------|
| [src/features/projetos/projeto.repository.js](./src/features/projetos/projeto.repository.js) | ~50 | CRUD SQL projetos |
| [src/features/projetos/projeto.service.js](./src/features/projetos/projeto.service.js) | ~35 | Validações projetos |
| [src/features/projetos/projeto.controller.js](./src/features/projetos/projeto.controller.js) | ~30 | Handlers HTTP |
| [src/features/projetos/projeto.routes.js](./src/features/projetos/projeto.routes.js) | ~25 | Registro rotas |

#### Feature: Tarefas
| Arquivo | Linhas | Responsabilidade |
|---------|--------|------------------|
| [src/features/tarefas/tarefa.repository.js](./src/features/tarefas/tarefa.repository.js) | ~80 | **JOINs + CRUD SQL** |
| [src/features/tarefas/tarefa.service.js](./src/features/tarefas/tarefa.service.js) | ~60 | Validações + buscarPorProjeto |
| [src/features/tarefas/tarefa.controller.js](./src/features/tarefas/tarefa.controller.js) | ~40 | Handlers HTTP |
| [src/features/tarefas/tarefa.routes.js](./src/features/tarefas/tarefa.routes.js) | ~40 | Registro rotas (incluindo /projetos/:id/tarefas) |

---

## 📊 Resumo Executivo

| Aspecto | Detalhe |
|--------|---------|
| **Total de Arquivos** | 20+ documentação + 14 código |
| **Total de Linhas** | ~1500 (comentários inclusos) |
| **Rotas API** | 11 rotas totais |
| **JOINs** | 2 (LEFT + INNER) |
| **Camadas** | 4 (Controller, Service, Repository, Banco) |
| **Validações** | 5+ regras de negócio |
| **Tempo de Setup** | ~15-20 min (incluindo banco) |

---

## 🎯 Roteiro de Leitura Recomendado

```
DIA 1 - ENTENDIMENTO
├─ START_HERE.md (5 min)
├─ GUIA_PASSO_A_PASSO.md - até o Passo 5 (10 min)
└─ ESTRUTURA.md (10 min)

DIA 1 - EXECUÇÃO
├─ GUIA_PASSO_A_PASSO.md - Passos 6-7 (15 min)
├─ npm install && npm run dev (5 min)
├─ Testar requests.http (10 min)
└─ Explorar código em src/ (15 min)

DIA 2 - APROFUNDAMENTO
├─ README.md - Conceitos (10 min)
├─ DIAGRAMAS.md (15 min)
├─ EXERCICIOS.md (20 min)
└─ Implementar Exercício 3 (30-60 min)

DIA 3 - CONSOLIDAÇÃO
├─ CHECKLIST.md - Validar tudo (15 min)
├─ Exercício 4 - Reflexão (20 min)
└─ Explorar bonus challenges (conforme tempo)
```

---

## 🔍 Como Encontrar Coisas

### "Quero entender Relacionamento 1:N"
→ [START_HERE.md](./START_HERE.md) + [DIAGRAMAS.md](./DIAGRAMAS.md)

### "Quero aprender LEFT vs INNER JOIN"
→ [EXERCICIOS.md](./EXERCICIOS.md#pergunta-a-left-join-vs-inner-join) + [DIAGRAMAS.md](./DIAGRAMAS.md#escolha-de-join)

### "Quero ver o código de JOIN"
→ [src/features/tarefas/tarefa.repository.js](./src/features/tarefas/tarefa.repository.js#L8-L50)

### "Quero testar a API"
→ [requests.http](./requests.http)

### "Quero fazer setup do projeto"
→ [GUIA_PASSO_A_PASSO.md](./GUIA_PASSO_A_PASSO.md)

### "Quero ver a arquitetura"
→ [ESTRUTURA.md](./ESTRUTURA.md)

### "Quero validação de progresso"
→ [CHECKLIST.md](./CHECKLIST.md)

---

## 🎓 Arquivos por Objetivo

### Para Iniciante
1. [START_HERE.md](./START_HERE.md) - Visão geral
2. [GUIA_PASSO_A_PASSO.md](./GUIA_PASSO_A_PASSO.md) - Passo a passo
3. [requests.http](./requests.http) - Testes

### Para Aprendizado
1. [README.md](./README.md) - Conceitos
2. [DIAGRAMAS.md](./DIAGRAMAS.md) - Visualizações
3. [EXERCICIOS.md](./EXERCICIOS.md) - Desafios

### Para Desenvolvimento
1. [src/](./src/) - Código fonte
2. [scripts/schema.sql](./scripts/schema.sql) - Banco
3. [ESTRUTURA.md](./ESTRUTURA.md) - Arquitetura

### Para Acompanhamento
1. [CHECKLIST.md](./CHECKLIST.md) - Progresso
2. [INDICE.md](./INDICE.md) - Índice navegável

---

## 📋 Checklist de Navegação

- [ ] Li [START_HERE.md](./START_HERE.md)
- [ ] Instalei dependências (npm install)
- [ ] Criei .env com DATABASE_URL
- [ ] Executei [scripts/schema.sql](./scripts/schema.sql)
- [ ] Rodei npm run dev
- [ ] Testei com [requests.http](./requests.http)
- [ ] Explorei [src/features/tarefas/tarefa.repository.js](./src/features/tarefas/tarefa.repository.js)
- [ ] Li [README.md](./README.md)
- [ ] Estudei [DIAGRAMAS.md](./DIAGRAMAS.md)
- [ ] Resolvi Exercício 1 (já vem pronto)
- [ ] Resolvi Exercício 2 (já vem pronto)
- [ ] Tentei Exercício 3 (desafio)
- [ ] Refletir sobre Exercício 4

---

## 💡 Dicas de Navegação

**VS Code:**
- Use `Ctrl+P` para abrir arquivo rapidinho
- `Ctrl+F` para buscar texto dentro de arquivo
- `Ctrl+Shift+F` para buscar em todos arquivos

**GitHub:**
- Se estiver em repositório, use `t` para search
- Clique no arquivo para visualizar raw

**Navegador:**
- Use `Ctrl+F` para buscar em MD
- Links em markdown funcionam normalmente

---

## 🚀 Para Começar Agora

```bash
# 1. Leia isto:
cat START_HERE.md

# 2. Execute isto:
npm install
npm run dev

# 3. Teste isto:
# Abra requests.http no VS Code + REST Client
# Clique "Send Request"
```

---

**Tudo está pronto! Bora começar?** 🎯
