import db from '../database/drizzle.js'
import pool from '../database/pool.js'
import { projetos } from '../database/schema.js'

try {
  const listaProjetos = await db.select().from(projetos).orderBy(projetos.id)
  console.table(listaProjetos)
} finally {
  await pool.end()
}
