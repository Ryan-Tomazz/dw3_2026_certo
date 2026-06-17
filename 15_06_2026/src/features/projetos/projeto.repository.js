// @file: src/features/projetos/projeto.repository.js
import pool from '../../config/database.js'

export class ProjetoRepository {
  async salvar(projeto) {
    const { nome, descricao } = projeto

    const resultado = await pool.query(
      `INSERT INTO projetos (nome, descricao)
       VALUES ($1, $2)
       RETURNING id, nome, descricao`,
      [nome, descricao || null]
    )

    return resultado.rows[0]
  }

  async listarTodos() {
    const resultado = await pool.query(
      'SELECT id, nome, descricao, criado_em FROM projetos ORDER BY criado_em DESC'
    )

    return resultado.rows
  }

  async buscarPorId(id) {
    const resultado = await pool.query(
      'SELECT id, nome, descricao, criado_em FROM projetos WHERE id = $1',
      [id]
    )

    return resultado.rows[0] || null
  }

  async atualizar(id, dados) {
    const { nome, descricao } = dados

    const resultado = await pool.query(
      `UPDATE projetos 
       SET nome = COALESCE($1, nome),
           descricao = COALESCE($2, descricao)
       WHERE id = $3
       RETURNING id, nome, descricao`,
      [nome, descricao, id]
    )

    return resultado.rows[0] || null
  }

  async remover(id) {
    const resultado = await pool.query(
      'DELETE FROM projetos WHERE id = $1 RETURNING id',
      [id]
    )

    return resultado.rows.length > 0
  }
}

export default ProjetoRepository
