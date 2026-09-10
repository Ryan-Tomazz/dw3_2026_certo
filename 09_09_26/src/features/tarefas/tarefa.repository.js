import pool from '../../database/pool.js'

class TarefaRepository {
  async buscarTodos() {
    const resultado = await pool.query(`
      SELECT
        t.id,
        t.descricao,
        t.concluido,
        t.criada_em AS "criadaEm",
        t.projeto_id AS "projetoId",
        p.nome AS "projetoNome"
      FROM tarefas t
      LEFT JOIN projetos p ON p.id = t.projeto_id
      ORDER BY t.id
    `)

    return resultado.rows
  }

  async buscarPorId(id) {
    const resultado = await pool.query(
      `
        SELECT
          t.id,
          t.descricao,
          t.concluido,
          t.criada_em AS "criadaEm",
          t.projeto_id AS "projetoId",
          p.nome AS "projetoNome"
        FROM tarefas t
        LEFT JOIN projetos p ON p.id = t.projeto_id
        WHERE t.id = $1
      `,
      [id],
    )

    return resultado.rows[0] ?? null
  }

  async buscarPorProjeto(projetoId) {
    const resultado = await pool.query(
      `
        SELECT
          t.id,
          t.descricao,
          t.concluido,
          t.criada_em AS "criadaEm",
          t.projeto_id AS "projetoId",
          p.nome AS "projetoNome"
        FROM tarefas t
        INNER JOIN projetos p ON p.id = t.projeto_id
        WHERE p.id = $1
        ORDER BY t.id
      `,
      [projetoId],
    )

    return resultado.rows
  }

  async salvar({ descricao, concluido, projetoId }) {
    const resultado = await pool.query(
      `
        INSERT INTO tarefas (descricao, concluido, projeto_id)
        VALUES ($1, $2, $3)
        RETURNING
          id,
          descricao,
          concluido,
          criada_em AS "criadaEm",
          projeto_id AS "projetoId"
      `,
      [descricao, concluido, projetoId],
    )

    return resultado.rows[0]
  }

  async atualizar(id, { descricao, concluido, projetoId }) {
    const resultado = await pool.query(
      `
        UPDATE tarefas
        SET descricao = $1, concluido = $2, projeto_id = $3
        WHERE id = $4
        RETURNING
          id,
          descricao,
          concluido,
          criada_em AS "criadaEm",
          projeto_id AS "projetoId"
      `,
      [descricao, concluido, projetoId, id],
    )

    return resultado.rows[0] ?? null
  }

  async remover(id) {
    const resultado = await pool.query('DELETE FROM tarefas WHERE id = $1', [id])

    return resultado.rowCount > 0
  }
}

export default TarefaRepository
