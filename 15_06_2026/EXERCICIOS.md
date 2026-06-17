# 📖 Exercícios Propostos - Roteiro 13

## Exercício 1: Impedir Tarefa sem Projeto ✅

**Status:** IMPLEMENTADO

A criação de uma tarefa agora requer `projetoId`. O Service valida isso:

```javascript
// src/features/tarefas/tarefa.service.js
async criarTarefa(dados) {
  if (!dados.projetoId) {
    throw new AppError('O projetoId é obrigatório', 400)
  }
  // ... resto da validação
}
```

**Teste:**
```http
POST /tarefas
Content-Type: application/json

{
  "titulo": "Tarefa sem projeto"
}
```

Você deve receber `400 Bad Request` com a mensagem de erro.

---

## Exercício 2: Buscar Tarefas de um Projeto ✅

**Status:** IMPLEMENTADO

A rota está disponível em:

```http
GET /projetos/:projetoId/tarefas
```

**Implementação:**

1. **Repository** (`tarefa.repository.js`): Query com INNER JOIN
   ```javascript
   async buscarPorProjetoId(projetoId) {
     const resultado = await pool.query(
       `SELECT ...
        FROM tarefas t
        INNER JOIN projetos p ON t.projeto_id = p.id
        WHERE p.id = $1
        ORDER BY t.criado_em DESC`,
       [projetoId]
     )
     return resultado.rows
   }
   ```

2. **Service** (`tarefa.service.js`): Valida existência do projeto
   ```javascript
   async buscarPorProjeto(projetoId) {
     const projeto = await this.projetoRepository.buscarPorId(projetoId)
     if (!projeto) {
       throw new AppError('Projeto não encontrado', 404)
     }
     return this.repository.buscarPorProjetoId(projetoId)
   }
   ```

3. **Controller** (`tarefa.controller.js`): Expõe a rota
4. **Routes** (`tarefa.routes.js`): Registra a rota

**Teste:**
```http
GET /projetos/1/tarefas
```

Você deve receber um array apenas com tarefas do projeto 1.

---

## Exercício 3: Melhorando a Resposta para o Frontend

**Status:** SUGESTÃO (não implementado, para você explorar)

Atualmente, a resposta traz:
```json
{
  "id": 1,
  "titulo": "Tarefa 1",
  "projeto_id": 1,
  "projeto_nome": "Backend API"
}
```

**Desafio:** Transformar para:
```json
{
  "id": 1,
  "titulo": "Tarefa 1",
  "projeto": {
    "id": 1,
    "nome": "Backend API"
  }
}
```

### Onde implementar?

#### Opção A: No Repository
```javascript
// Retorna dados já estruturados
async listarTodos() {
  const resultado = await pool.query(`...`)
  return resultado.rows.map(row => ({
    ...row,
    projeto: row.projeto_id ? { id: row.projeto_id, nome: row.projeto_nome } : null
  }))
}
```

**Vantagem:** Dados estruturados desde a fonte
**Desvantagem:** Repository começa a fazer lógica de apresentação

#### Opção B: No Service
```javascript
// Service transforma os dados
async listarTarefas() {
  const tarefas = await this.repository.listarTodos()
  return tarefas.map(t => ({
    id: t.id,
    titulo: t.titulo,
    projeto: t.projeto_id ? { id: t.projeto_id, nome: t.projeto_nome } : null
  }))
}
```

**Vantagem:** Lógica de transformação de domínio
**Desvantagem:** Repository e Service têm responsabilidades mistas

#### Opção C: No Controller
```javascript
// Controller estrutura a resposta
async listar(request, reply) {
  const tarefas = await this.service.listarTarefas()
  const estruturadas = tarefas.map(t => ({
    id: t.id,
    titulo: t.titulo,
    projeto: t.projeto_id ? { id: t.projeto_id, nome: t.projeto_nome } : null
  }))
  return reply.send(estruturadas)
}
```

**Vantagem:** Repository e Service focados em dados/negócio, Controller em apresentação
**Desvantagem:** Lógica de transformação espalhada em vários controllers

### Recomendação

**Use o Service** quando a transformação afeta a lógica de negócio (como aqui, onde a estrutura é importante para o domínio).

---

## Exercício 4: Raciocinando Sobre Decisões

### Pergunta A: LEFT JOIN vs INNER JOIN

**Cenário:**

Na listagem geral de tarefas, usamos:
```sql
LEFT JOIN projetos p ON t.projeto_id = p.id
```

Na busca por projeto específico, usamos:
```sql
INNER JOIN projetos p ON t.projeto_id = p.id
```

**Por quê?**

#### LEFT JOIN (Listagem Geral)

Resultado esperado: **Todas as tarefas, mesmo sem projeto**

```
id | titulo              | projeto_id | projeto_nome
---|--------------------|-----------|----------
1  | Autenticação       | 1         | Backend API
2  | Dashboard         | 2         | Frontend Web
3  | Tarefa órfã        | NULL      | NULL        ← Aparece mesmo sem projeto
```

**Razão:** Tolerância com dados históricos. Se existem tarefas antigas sem projeto, elas não devem sumir do sistema.

#### INNER JOIN (Busca por Projeto)

Resultado esperado: **Apenas tarefas realmente vinculadas**

```
id | titulo              | projeto_id | projeto_nome
---|--------------------|-----------|----------
1  | Autenticação       | 1         | Backend API
2  | API REST           | 1         | Backend API

-- Tarefa órfã NÃO aparece
```

**Razão:** Quando você filtra por um projeto específico, está dizendo "quero VER as tarefas DESTE projeto". Uma tarefa sem projeto não faz parte deste filtro.

### Pergunta B: Limite do Modelo 1:N

**Novo Requisito:** Uma tarefa precisa ter várias tags (backend, urgente, api), e uma mesma tag pode aparecer em várias tarefas.

**Pergunta:** A chave estrangeira `projeto_id` que usamos ainda resolve esse caso?

**Resposta:** NÃO! Porque:

- Hoje: Uma tarefa tem UM projeto (1:N)
- Novo requisito: Uma tarefa tem VÁRIAS tags, e uma tag está em VÁRIAS tarefas (N:N)

### Solução para N:N

Você precisa de uma **tabela de junção**:

```sql
-- Tabela de tags
CREATE TABLE tags (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) UNIQUE NOT NULL
);

-- Tabela de junção (relacionamento N:N)
CREATE TABLE tarefa_tags (
  tarefa_id INTEGER NOT NULL REFERENCES tarefas(id) ON DELETE CASCADE,
  tag_id INTEGER NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (tarefa_id, tag_id)
);
```

**Exemplo de dados:**

```
-- Tarefa 1 tem tags 1 e 2
tarefa_id | tag_id
----------|-------
1         | 1 (backend)
1         | 2 (urgente)

-- Tarefa 2 tem tags 1 e 3
2         | 1 (backend)
2         | 3 (api)

-- Tag "backend" está em 2 tarefas (1 e 2)
```

**Query com N:N:**

```sql
SELECT t.id, t.titulo, array_agg(tg.nome) as tags
FROM tarefas t
LEFT JOIN tarefa_tags tt ON t.id = tt.tarefa_id
LEFT JOIN tags tg ON tt.tag_id = tg.id
GROUP BY t.id, t.titulo;
```

**Resultado:**

```
id | titulo              | tags
---|-------------------|------------------
1  | Autenticação      | {backend, urgente}
2  | API REST          | {backend, api}
3  | Tarefa órfã       | NULL
```

---

## 🎯 Reflexão Final

Esses exercícios mostram a evolução natural do design de um backend:

1. **Tabelas simples** → Um CRUD isolado (Roteiro 12)
2. **Relacionamentos 1:N** → Uma entidade se vincula a muitas (Roteiro 13, aqui)
3. **Relacionamentos N:N** → Muitas entidades se relacionam com muitas (Roteiro 14)
4. **Validações inteligentes** → Regras de negócio distribuídas em camadas
5. **Transformações de dados** → Dados do banco em formato útil para o frontend

O importante é: **cada decisão tem trade-offs**. LEFT/INNER, Repository/Service, tabela de junção... tudo depende do que você quer expressar.

---

**Bora evoluir!** 🚀
