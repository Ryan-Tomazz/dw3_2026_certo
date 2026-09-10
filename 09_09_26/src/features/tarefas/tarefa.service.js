class TarefaService {
  constructor(repository) {
    this.repository = repository
  }

  async listar(projetoId) {
    if (projetoId === undefined) {
      return this.repository.buscarTodos()
    }

    const projetoIdNumero = Number(projetoId)
    if (!Number.isInteger(projetoIdNumero)) {
      throw new Error('projetoId inválido')
    }

    return this.repository.buscarPorProjeto(projetoIdNumero)
  }

  async buscarPorId(id) {
    return this.repository.buscarPorId(id)
  }

  async criar({ descricao, concluido = false, projetoId = null }) {
    const dados = this.#normalizar({ descricao, concluido, projetoId })

    return this.repository.salvar(dados)
  }

  async atualizar(id, dadosAtualizados) {
    const tarefaAtual = await this.repository.buscarPorId(id)
    if (!tarefaAtual) return null

    const dados = this.#normalizar({
      descricao: dadosAtualizados.descricao ?? tarefaAtual.descricao,
      concluido: dadosAtualizados.concluido ?? tarefaAtual.concluido,
      projetoId: dadosAtualizados.projetoId ?? tarefaAtual.projetoId,
    })

    return this.repository.atualizar(id, dados)
  }

  async remover(id) {
    return this.repository.remover(id)
  }

  #normalizar({ descricao, concluido, projetoId }) {
    if (typeof descricao !== 'string' || descricao.trim() === '') {
      throw new Error('A descrição da tarefa é obrigatória')
    }

    if (typeof concluido !== 'boolean') {
      throw new Error('concluido deve ser booleano')
    }

    if (projetoId !== null && !Number.isInteger(Number(projetoId))) {
      throw new Error('projetoId inválido')
    }

    return {
      descricao: descricao.trim(),
      concluido,
      projetoId: projetoId === null ? null : Number(projetoId),
    }
  }
}

export default TarefaService
