import TarefaController from './tarefa.controller.js'
import TarefaRepository from './tarefa.repository.js'
import TarefaService from './tarefa.service.js'

export default async function tarefaRoutes(server) {
  const repository = new TarefaRepository()
  const service = new TarefaService(repository)
  const controller = new TarefaController(service)

  server.get('/', (request, reply) => controller.listar(request, reply))
  server.get('/:id', (request, reply) => controller.buscarPorId(request, reply))
  server.post('/', (request, reply) => controller.criar(request, reply))
  server.put('/:id', (request, reply) => controller.atualizar(request, reply))
  server.delete('/:id', (request, reply) => controller.remover(request, reply))
}
