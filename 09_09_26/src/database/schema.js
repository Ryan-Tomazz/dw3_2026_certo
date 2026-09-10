import {
  boolean,
  date,
  integer,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
} from 'drizzle-orm/pg-core'

// projetos: agora com criadoEm (TIMESTAMP NOT NULL DEFAULT NOW())
export const projetos = pgTable('projetos', {
  id: serial('id').primaryKey(),
  nome: text('nome').notNull(),
  criadoEm: timestamp('criado_em').notNull().defaultNow(),
})

// tarefas: criadaEm + referência (FK) para projetos
export const tarefas = pgTable('tarefas', {
  id: serial('id').primaryKey(),
  descricao: text('descricao').notNull(),
  concluido: boolean('concluido').notNull().default(false),
  criadaEm: timestamp('criada_em').notNull().defaultNow(),
  projetoId: integer('projeto_id').references(() => projetos.id),
})

// detalhes_projeto: 1:1 com projetos (projetoId é UNIQUE + referência)
export const detalhesProjeto = pgTable('detalhes_projeto', {
  id: serial('id').primaryKey(),
  projetoId: integer('projeto_id')
    .notNull()
    .unique()
    .references(() => projetos.id),
  descricaoLonga: text('descricao_longa'),
  observacoes: text('observacoes'),
  prazoFinal: date('prazo_final'),
})

// tags: nome único
export const tags = pgTable('tags', {
  id: serial('id').primaryKey(),
  nome: text('nome').notNull().unique(),
})

// tarefas_tags: tabela de junção N:N, com chave primária composta
export const tarefasTags = pgTable(
  'tarefas_tags',
  {
    tarefaId: integer('tarefa_id')
      .notNull()
      .references(() => tarefas.id),
    tagId: integer('tag_id')
      .notNull()
      .references(() => tags.id),
  },
  (table) => [primaryKey({ columns: [table.tarefaId, table.tagId] })],
)
