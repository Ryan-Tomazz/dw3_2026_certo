// @file: src/features/tarefas/tarefa.repository.js
import pool from '../../config/database.js'

export class TarefaRepository {
  // Passo 6: Salvar tarefa com projeto
  async salvar(tarefa) {
    const { titulo, descricao, status, projetoId } = tarefa

    const resultado = await pool.query(
      `INSERT INTO tarefas (titulo, descricao, status, projeto_id)
       VALUES ($1, $2, $3, $4)
       RETURNING id, titulo, descricao, status, projeto_id`,
      [titulo, descricao || null, status || 'pendente', projetoId || null]
    )

    return resultado.rows[0]
  }

  // Passo 10: Listar tarefas com JOIN para trazer informações do projeto
  async listarTodos() {
    const resultado = await pool.query(
      `SELECT 
        t.id,
        t.titulo,
        t.descricao,
        t.status,
        t.projeto_id,
        p.nome as projeto_nome
       FROM tarefas t
       LEFT JOIN projetos p ON t.projeto_id = p.id
       ORDER BY t.criado_em DESC`
    )

    return resultado.rows
  }

  // Passo 11: Buscar tarefa individual com JOIN
  async buscarPorId(id) {
    const resultado = await pool.query(
      `SELECT 
        t.id,
        t.titulo,
        t.descricao,
        t.status,
        t.projeto_id,
        p.nome as projeto_nome
       FROM tarefas t
       LEFT JOIN projetos p ON t.projeto_id = p.id
       WHERE t.id = $1`,
      [id]
    )

    return resultado.rows[0] || null
  }

  // Passo 13: Listar tarefas de um projeto específico
  async buscarPorProjetoId(projetoId) {
    const resultado = await pool.query(
      `SELECT 
        t.id,
        t.titulo,
        t.descricao,
        t.status,
        t.projeto_id,
        p.nome as projeto_nome
       FROM tarefas t
       INNER JOIN projetos p ON t.projeto_id = p.id
       WHERE p.id = $1
       ORDER BY t.criado_em DESC`,
      [projetoId]
    )

    return resultado.rows
  }

  async atualizar(id, dados) {
    const { titulo, descricao, status } = dados

    const resultado = await pool.query(
      `UPDATE tarefas 
       SET titulo = COALESCE($1, titulo),
           descricao = COALESCE($2, descricao),
           status = COALESCE($3, status)
       WHERE id = $4
       RETURNING id, titulo, descricao, status, projeto_id`,
      [titulo, descricao, status, id]
    )

    return resultado.rows[0] || null
  }

  async remover(id) {
    const resultado = await pool.query(
      'DELETE FROM tarefas WHERE id = $1 RETURNING id',
      [id]
    )

    return resultado.rows.length > 0
  }
}

export default TarefaRepository
