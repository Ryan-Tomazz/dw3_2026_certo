// @file: src/features/tarefas/tarefa.routes.js
import TarefaRepository from './tarefa.repository.js'
import TarefaService from './tarefa.service.js'
import TarefaController from './tarefa.controller.js'
import ProjetoRepository from '../projetos/projeto.repository.js'

export default async function tarefaRoutes(server) {
  // ==========================================
  // INJEÇÃO DE DEPENDÊNCIA
  // ==========================================
  const tarefaRepository = new TarefaRepository()
  const projetoRepository = new ProjetoRepository()
  const tarefaService = new TarefaService(tarefaRepository, projetoRepository)
  const tarefaController = new TarefaController(tarefaService)

  // ==========================================
  // REGISTRO DAS ROTAS
  // ==========================================
  server.get('/tarefas', async (request, reply) => 
    tarefaController.listar(request, reply)
  )

  server.post('/tarefas', async (request, reply) => 
    tarefaController.criar(request, reply)
  )

  server.get('/tarefas/:id', async (request, reply) => 
    tarefaController.buscar(request, reply)
  )

  server.patch('/tarefas/:id', async (request, reply) => 
    tarefaController.atualizar(request, reply)
  )

  server.patch('/tarefas/:id/concluir', async (request, reply) => 
    tarefaController.concluir(request, reply)
  )

  server.delete('/tarefas/:id', async (request, reply) => 
    tarefaController.remover(request, reply)
  )

  // Exercício 2: Rota para listar tarefas de um projeto específico
  server.get('/projetos/:projetoId/tarefas', async (request, reply) => 
    tarefaController.buscarPorProjeto(request, reply)
  )
}
