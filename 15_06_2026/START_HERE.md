# 🚀 COMECE AQUI - Roteiro 13

## 👋 Bem-vindo!

Você está prestes a aprender um dos conceitos **mais importantes** do backend moderno:  
**Como relacionar dados no banco de dados**.

Antes, suas tarefas estavam sozinhas. Agora, cada tarefa vai **pertencer a um projeto**.

---

## 🎯 O Que Você Vai Fazer (5 minutos)

### Passo 1: Ler Documentação  
Comece por aqui → [GUIA_PASSO_A_PASSO.md](./GUIA_PASSO_A_PASSO.md)

### Passo 2: Configurar Banco  
Execute o SQL em `scripts/schema.sql`

### Passo 3: Rodar a Aplicação  
```bash
npm install
npm run dev
```

### Passo 4: Testar Rotas  
Use `requests.http` para testar a API

### Passo 5: Explorar Código  
Veja como os JOINs funcionam em `src/features/tarefas/tarefa.repository.js`

---

## 🗺️ Mapa do Projeto

```
START_HERE.md (você está aqui!)
    │
    ├─► GUIA_PASSO_A_PASSO.md     ← Leia DEPOIS desta página
    ├─► INDICE.md                 ← Índice completo do projeto
    ├─► CHECKLIST.md              ← Acompanhamento de progresso
    │
    ├─ Conceitos:
    │   ├─► README.md             ← API & arquitetura
    │   ├─► EXERCICIOS.md         ← Conceitos aprofundados
    │   └─► DIAGRAMAS.md          ← Visualizações
    │
    ├─ Código:
    │   ├─► src/features/tarefas/tarefa.repository.js (JOINs aqui!)
    │   └─► scripts/schema.sql    (Estrutura do banco)
    │
    └─ Testes:
        └─► requests.http        ← Execute para testar

```

---

## 🎓 O Que Você Vai Aprender

| Conceito | Onde Aprender |
|----------|---------------|
| **O que é 1:N** | [GUIA_PASSO_A_PASSO.md](./GUIA_PASSO_A_PASSO.md#passo-1-clonar--copiar-o-projeto) |
| **Chaves Estrangeiras** | [DIAGRAMAS.md](./DIAGRAMAS.md) |
| **LEFT vs INNER JOIN** | [EXERCICIOS.md](./EXERCICIOS.md#pergunta-a-left-join-vs-inner-join) |
| **Validação em Camadas** | [README.md](./README.md#-o-que-você-vai-aprenderao) |
| **Fluxo de Dados** | [DIAGRAMAS.md](./DIAGRAMAS.md#fluxo-de-dados-na-api) |

---

## 📁 Arquivos Importantes

### Documentação
```
✨ START_HERE.md          ← Você está aqui
📖 README.md              ← Documentação da API
🗺️  GUIA_PASSO_A_PASSO.md ← **LEIA ISSO PRIMEIRO**
📑 INDICE.md              ← Índice e busca rápida
✅ CHECKLIST.md           ← Acompanhamento
📚 EXERCICIOS.md          ← Desafios propostos
🗂️  DIAGRAMAS.md          ← Visualizações
```

### Código Fonte
```
src/
├── config/database.js               ← Conexão PostgreSQL
├── errors/AppError.js               ← Tratamento de erros
├── server.js                        ← App principal
└── features/
    ├── projetos/                    ← CRUD Projetos
    │   ├── projeto.controller.js
    │   ├── projeto.service.js
    │   ├── projeto.repository.js
    │   └── projeto.routes.js
    └── tarefas/                     ← CRUD Tarefas + JOINs
        ├── tarefa.controller.js
        ├── tarefa.service.js
        ├── tarefa.repository.js     ← 👈 JOINs aqui!
        └── tarefa.routes.js
```

### Configuração & Testes
```
package.json                ← Dependências
.env.example                ← Variáveis de ambiente
scripts/schema.sql          ← Criação das tabelas
requests.http               ← Testes HTTP
setup.sh / setup.ps1        ← Scripts de setup
```

---

## ⚡ Quick Start (3 passos)

### 1️⃣ Setup
```bash
cd 15_06_2026
npm install
cp .env.example .env          # Edite com sua DATABASE_URL
```

### 2️⃣ Banco
Execute `scripts/schema.sql` no seu PostgreSQL

### 3️⃣ Rodar
```bash
npm run dev
```

**Pronto!** API está em `http://localhost:3000`

Vá para: [GUIA_PASSO_A_PASSO.md](./GUIA_PASSO_A_PASSO.md) para testes detalhados.

---

## 🎯 O Problema que Vamos Resolver

### Antes (Roteiro 12)

```javascript
// Tarefa solta, sem contexto
{
  id: 1,
  titulo: "Autenticação",
  status: "pendente"
  // ❓ De qual projeto é esta tarefa?
}
```

### Depois (Roteiro 13)

```javascript
// Tarefa com contexto relacional
{
  id: 1,
  titulo: "Autenticação",
  status: "pendente",
  projeto_id: 1,            // ✅ Sabe qual projeto é
  projeto_nome: "Backend"   // ✅ Até o nome vem junto (JOIN!)
}
```

---

## 🔗 O Relacionamento 1:N

```
Um Projeto  ────────────┬──────────→ Muitas Tarefas
                        │
                        ├─→ Tarefa 1
                        ├─→ Tarefa 2
                        └─→ Tarefa 3
```

**No banco:**
- Tabela `projetos`: PK = id
- Tabela `tarefas`: FK = projeto_id (aponta para projetos.id)

**Na API:**
- POST /tarefas precisa de `projetoId`
- GET /tarefas retorna `projeto_nome` (via JOIN)
- GET /projetos/:id/tarefas filtra por projeto

---

## 🧪 Teste Rápido

Depois de `npm run dev`, abra VS Code e:

1. Instale extensão "REST Client"
2. Abra `requests.http`
3. Clique "Send Request" em:
   - `POST - Criar Projeto 1` ✅
   - `GET - Listar projetos` (deve retornar 3)
   - `POST - Criar tarefa vinculada` (use projetoId do passo anterior)
   - `GET - Listar tarefas` (deve trazer `projeto_nome`)

---

## 📊 Estrutura Visual

```
┌────────────────────────────────────────────────────────┐
│           RELACIONAMENTO 1:N NA PRÁTICA                │
├────────────────────────────────────────────────────────┤
│                                                        │
│  Projetos (tabela "um")                              │
│  ┌─────────────────────────────────────────────┐    │
│  │ id │ nome           │ descricao             │    │
│  ├────┼────────────────┼───────────────────────┤    │
│  │ 1  │ Backend API    │ Desenvolvimento REST  │    │
│  │ 2  │ Frontend Web   │ Interface web         │    │
│  │ 3  │ Mobile App     │ App iOS/Android       │    │
│  └─────────────────────────────────────────────┘    │
│                 ▲                                     │
│                 │ projeto_id (FK)                    │
│                 │                                    │
│  Tarefas (tabela "muitos")                          │
│  ┌────────────────────────────────────────────────┐ │
│  │ id │ titulo          │ projeto_id            │ │
│  ├────┼─────────────────┼───────────────────────┤ │
│  │ 1  │ Autenticação    │ 1 ──→ Backend API    │ │
│  │ 2  │ API REST        │ 1 ──→ Backend API    │ │
│  │ 3  │ Dashboard       │ 2 ──→ Frontend Web   │ │
│  │ 4  │ Responsividade  │ 2 ──→ Frontend Web   │ │
│  │ 5  │ Deploy          │ NULL (órfã)         │ │
│  └────────────────────────────────────────────────┘ │
│                                                      │
│  Resultado do LEFT JOIN:                            │
│  Todas as tarefas aparecem, mesmo sem projeto ✅    │
│                                                      │
└────────────────────────────────────────────────────────┘
```

---

## 🎓 Depois de Completar Este Roteiro

Você entenderá:
- ✅ Como estruturar dados relacionados
- ✅ Quando usar LEFT vs INNER JOIN
- ✅ Como validar relacionamentos na API
- ✅ Por que o banco protege a integridade
- ✅ Como evoluir para N:N (próximo roteiro)

---

## 🚀 Próximas Ações

**Agora:**
1. Leia [GUIA_PASSO_A_PASSO.md](./GUIA_PASSO_A_PASSO.md)
2. Siga cada passo até `npm run dev`
3. Execute os testes em `requests.http`

**Depois:**
1. Leia [EXERCICIOS.md](./EXERCICIOS.md) para aprofundar
2. Implemente o Exercício 3 (desafio)
3. Reflexione sobre o Exercício 4

**Próximo Roteiro:**
Quando dominar 1:N, estude Roteiro 14 (1:1 e N:N)

---

## ❓ Dúvidas Rápidas

**P: Por onde começo?**  
R: Leia [GUIA_PASSO_A_PASSO.md](./GUIA_PASSO_A_PASSO.md) do começo ao fim.

**P: Como saber se está funcionando?**  
R: Execute `npm run dev` e teste `GET /tarefas` → deve vir com `projeto_nome`.

**P: O que é JOIN?**  
R: Veja [DIAGRAMAS.md](./DIAGRAMAS.md) - tem diagrama visual.

**P: Por quê LEFT vs INNER?**  
R: Leia [EXERCICIOS.md](./EXERCICIOS.md#pergunta-a-left-join-vs-inner-join).

**P: Fiz algo errado, como resetar?**  
R: Execute novamente `scripts/schema.sql` no banco.

---

## 🎬 Vamos Começar!

```bash
cd 15_06_2026
npm install
# ... configure .env ...
npm run dev
```

**Próximo:** [GUIA_PASSO_A_PASSO.md](./GUIA_PASSO_A_PASSO.md)

---

**Boa sorte!** 🚀  
Você está prestes a evoluir de dados isolados para um banco relacional de verdade.
