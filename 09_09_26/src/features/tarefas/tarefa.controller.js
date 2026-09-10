class TarefaController {
  constructor(service) {
    this.service = service
  }

  async listar(request, reply) {
    try {
      const tarefas = await this.service.listar(request.query.projetoId)
      return reply.send(tarefas)
    } catch (erro) {
      return reply.code(400).send({ status: 'error', message: erro.message })
    }
  }

  async buscarPorId(request, reply) {
    const tarefa = await this.service.buscarPorId(Number(request.params.id))
    if (!tarefa) {
      return reply.code(404).send({ status: 'error', message: 'Tarefa não encontrada' })
    }

    return reply.send(tarefa)
  }

  async criar(request, reply) {
    try {
      const tarefa = await this.service.criar(request.body)
      return reply.code(201).send(tarefa)
    } catch (erro) {
      return reply.code(400).send({ status: 'error', message: erro.message })
    }
  }

  async atualizar(request, reply) {
    try {
      const tarefa = await this.service.atualizar(Number(request.params.id), request.body)
      if (!tarefa) {
        return reply.code(404).send({ status: 'error', message: 'Tarefa não encontrada' })
      }

      return reply.send(tarefa)
    } catch (erro) {
      return reply.code(400).send({ status: 'error', message: erro.message })
    }
  }

  async remover(request, reply) {
    const removida = await this.service.remover(Number(request.params.id))
    if (!removida) {
      return reply.code(404).send({ status: 'error', message: 'Tarefa não encontrada' })
    }

    return reply.code(204).send()
  }
}

export default TarefaController
