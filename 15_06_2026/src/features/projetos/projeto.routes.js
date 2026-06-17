// @file: src/features/projetos/projeto.routes.js
import ProjetoRepository from './projeto.repository.js'
import ProjetoService from './projeto.service.js'
import ProjetoController from './projeto.controller.js'

export default async function projetoRoutes(server) {
  // ==========================================
  // INJEÇÃO DE DEPENDÊNCIA
  // ==========================================
  const projetoRepository = new ProjetoRepository()
  const projetoService = new ProjetoService(projetoRepository)
  const projetoController = new ProjetoController(projetoService)

  // ==========================================
  // REGISTRO DAS ROTAS
  // ==========================================
  server.get('/projetos', async (request, reply) => 
    projetoController.listar(request, reply)
  )

  server.post('/projetos', async (request, reply) => 
    projetoController.criar(request, reply)
  )

  server.get('/projetos/:id', async (request, reply) => 
    projetoController.buscar(request, reply)
  )

  server.patch('/projetos/:id', async (request, reply) => 
    projetoController.atualizar(request, reply)
  )

  server.delete('/projetos/:id', async (request, reply) => 
    projetoController.remover(request, reply)
  )
}
