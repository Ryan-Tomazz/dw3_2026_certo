# Roteiro 13 - Modelando Relacionamentos 1:N no Backend

Este projeto implementa o relacionamento um-para-muitos (1:N) entre Projetos e Tarefas usando PostgreSQL e Fastify.

## 📋 Pré-requisitos

1. **PostgreSQL** instalado e rodando (ou conta no [Neon](https://neon.tech))
2. **Node.js** 18+ instalado
3. **npm** para gerenciar dependências

## 🚀 Setup Inicial

### 1. Instalar dependências

```bash
cd 15_06_2026
npm install
```

### 2. Configurar banco de dados

#### Opção A: Usando Neon (PostgreSQL em nuvem)

1. Acesse [neon.tech](https://neon.tech) e crie uma conta
2. Crie um novo projeto
3. Copie a connection string
4. Crie um arquivo `.env` na raiz do projeto:

```env
DATABASE_URL=postgresql://seu_usuario:sua_senha@seu_host/seu_banco
```

#### Opção B: PostgreSQL local

```env
DATABASE_URL=postgresql://postgres:sua_senha@localhost:5432/roteiro13
```

### 3. Criar as tabelas

Execute o script SQL em `scripts/schema.sql` no seu editor SQL (pgAdmin, Neon, DBeaver, etc):

```sql
-- Execute tudo que está em scripts/schema.sql
```

### 4. Iniciar a aplicação

```bash
npm run dev
```

A API estará rodando em `http://localhost:3000`

---

## 📚 Estrutura do Projeto

```
15_06_2026/
├── src/
│   ├── config/
│   │   └── database.js          # Configuração do Pool PostgreSQL
│   ├── errors/
│   │   └── AppError.js          # Classe para tratamento de erros
│   ├── features/
│   │   ├── projetos/            # Feature de Projetos
│   │   │   ├── projeto.controller.js
│   │   │   ├── projeto.service.js
│   │   │   ├── projeto.repository.js
│   │   │   └── projeto.routes.js
│   │   └── tarefas/             # Feature de Tarefas (com JOIN)
│   │       ├── tarefa.controller.js
│   │       ├── tarefa.service.js
│   │       ├── tarefa.repository.js
│   │       └── tarefa.routes.js
│   └── server.js                # Inicialização da API
├── scripts/
│   └── schema.sql              # DDL (criação de tabelas)
├── package.json
└── README.md
```

---

## 🔗 O Relacionamento 1:N

### Conceito

- **Um Projeto** pode ter **várias Tarefas**
- **Uma Tarefa** pertence a **um único Projeto**

### Tabelas

**projetos**
```sql
id (INT, PRIMARY KEY)
nome (VARCHAR)
descricao (TEXT)
criado_em (TIMESTAMP)
```

**tarefas**
```sql
id (INT, PRIMARY KEY)
titulo (VARCHAR)
descricao (TEXT)
status (VARCHAR)
projeto_id (INT, FOREIGN KEY → projetos.id)  ← Vínculo 1:N
criado_em (TIMESTAMP)
```

### JOINs utilizados

- **LEFT JOIN**: Usado na listagem geral para incluir tarefas sem projeto
- **INNER JOIN**: Usado ao filtrar por projeto específico (garante que existe vínculo)

---

## 🧪 Testando a API

### 1. Criar um Projeto

```http
POST /projetos
Content-Type: application/json

{
  "nome": "Backend API",
  "descricao": "Desenvolvimento da API REST"
}
```

**Resposta esperada:**
```json
{
  "id": 1,
  "nome": "Backend API",
  "descricao": "Desenvolvimento da API REST"
}
```

### 2. Listar Projetos

```http
GET /projetos
```

### 3. Criar uma Tarefa Vinculada a um Projeto (PASSO 8)

```http
POST /tarefas
Content-Type: application/json

{
  "titulo": "Implementar autenticação",
  "descricao": "Adicionar JWT ao backend",
  "projetoId": 1
}
```

**⚠️ Importante:** Você DEVE enviar `projetoId`. Sem ele, a tarefa não será criada (Exercício 1).

### 4. Listar Tarefas com Informações do Projeto (PASSO 11)

```http
GET /tarefas
```

**Resposta esperada (com JOIN):**
```json
[
  {
    "id": 1,
    "titulo": "Implementar autenticação",
    "descricao": "Adicionar JWT ao backend",
    "status": "pendente",
    "projeto_id": 1,
    "projeto_nome": "Backend API"  ← Vem do JOIN!
  }
]
```

### 5. Buscar uma Tarefa Específica com Projeto (PASSO 12)

```http
GET /tarefas/:id
```

### 6. Listar Tarefas de um Projeto Específico (EXERCÍCIO 2)

```http
GET /projetos/1/tarefas
```

**Nota:** Esta rota usa `INNER JOIN`, então só retorna tarefas realmente vinculadas.

---

## ✅ Exercícios Propostos

### Exercício 1: Impedir Tarefa sem Projeto
✅ **Já implementado!** O Service valida `projetoId` obrigatório.

```javascript
if (!dados.projetoId) {
  throw new AppError('O projetoId é obrigatório', 400)
}
```

### Exercício 2: Buscar Tarefas de um Projeto
✅ **Já implementado!** Rota disponível em:
```http
GET /projetos/:projetoId/tarefas
```

### Exercício 3: Melhorando a Resposta para o Frontend

Atualmente, a resposta traz `projeto_id` e `projeto_nome` separados:
```json
{
  "projeto_id": 1,
  "projeto_nome": "Backend API"
}
```

**Desafio:** Transformar para:
```json
{
  "projeto": {
    "id": 1,
    "nome": "Backend API"
  }
}
```

**Onde implementar?**
- No Controller: Transforma antes de enviar a resposta
- No Service: Lógica de negócio a cargo do domínio
- No Repository: Mais próximo do banco, menos encapsulamento

**Sugestão:** Implementar no Controller ou Service para separar responsabilidades.

### Exercício 4: Raciocinando sobre Decisões

**Pergunta A:** Por que LEFT JOIN na listagem geral e INNER JOIN na busca por projeto?

**Resposta:**
- Listagem geral: Quer ser tolerante com tarefas órfãs (sem projeto) → LEFT JOIN
- Busca por projeto: Filtra por um projeto específico, tarefas sem projeto não devem aparecer → INNER JOIN

**Pergunta B:** Relação N:N (tags) necessitaria de outra estrutura?

**Resposta:** Sim! Uma tarefa com múltiplas tags e uma tag em múltiplas tarefas requer:
- Tabela `tags` (id, nome)
- Tabela de junção `tarefa_tags` (tarefa_id, tag_id)
- Query com múltiplos JOINs

---

## 🔍 Verificação no Banco

Para verificar os dados diretamente:

```sql
-- Ver a estrutura de tarefas
\d tarefas;

-- Listar todas as tarefas com seus projetos
SELECT t.id, t.titulo, t.status, p.nome as projeto
FROM tarefas t
LEFT JOIN projetos p ON t.projeto_id = p.id;

-- Contar tarefas por projeto
SELECT p.nome, COUNT(t.id) as total_tarefas
FROM projetos p
LEFT JOIN tarefas t ON p.id = t.projeto_id
GROUP BY p.id, p.nome;
```

---

## 📝 Notas Importantes

1. **Chave Estrangeira com CASCADE**: Se deletar um projeto, as tarefas associadas são deletadas automaticamente
2. **LEFT JOIN vs INNER JOIN**: Escolha depende da intenção da query
3. **Validação em múltiplas camadas**: Controller, Service e banco trabalham juntos
4. **Transição relacional**: O 1:N é o primeiro passo para modelos mais complexos

---

## 🎯 Próximos Passos

- **Roteiro 14**: Relacionamentos 1:1 e N:N
- Adicionar índices para otimizar queries com JOIN
- Implementar soft deletes (isDeleted) em vez de deletar de verdade
- Adicionar testes automatizados

---

## ❓ Troubleshooting

**Erro: "relation "tarefas" does not exist"**
- Execute novamente o script em `scripts/schema.sql`

**Erro: "projetoId is required"**
- Você esqueceu de enviar `projetoId` no body do POST

**Banco vazio?**
- Execute o INSERT de dados iniciais em `scripts/schema.sql`

**Tarefa aparece mas sem projeto?**
- É normal se foi criada antes de adicionar `projeto_id`
- Use LEFT JOIN na listagem para ser tolerante

---

**Bora codar!** 🚀
