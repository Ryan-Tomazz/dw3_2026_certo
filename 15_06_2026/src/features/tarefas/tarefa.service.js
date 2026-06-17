// @file: src/features/tarefas/tarefa.service.js
import { AppError } from '../../errors/AppError.js'

export class TarefaService {
  constructor(repository, projetoRepository) {
    this.repository = repository
    this.projetoRepository = projetoRepository
  }

  async listarTarefas() {
    return this.repository.listarTodos()
  }

  async buscarPorId(id) {
    const tarefa = await this.repository.buscarPorId(id)
    if (!tarefa) {
      throw new AppError('Tarefa não encontrada', 404)
    }
    return tarefa
  }

  async criarTarefa(dados) {
    // Exercício 1: Validar que projetoId é obrigatório
    if (!dados.projetoId) {
      throw new AppError('O projetoId é obrigatório', 400)
    }

    if (!dados.titulo || dados.titulo.trim() === '') {
      throw new AppError('O título é obrigatório', 400)
    }

    // Verificar se o projeto existe
    const projeto = await this.projetoRepository.buscarPorId(dados.projetoId)
    if (!projeto) {
      throw new AppError('Projeto não encontrado', 404)
    }

    // Verificar se já existe tarefa com esse título
    const tarefas = await this.repository.listarTodos()
    const tituloJaExiste = tarefas.some(
      t => t.titulo.toLowerCase() === dados.titulo.toLowerCase().trim()
    )

    if (tituloJaExiste) {
      throw new AppError('Já existe uma tarefa com esse título', 400)
    }

    return this.repository.salvar({
      ...dados,
      status: 'pendente'
    })
  }

  async atualizarTarefa(id, dados) {
    const tarefa = await this.buscarPorId(id)

    if (tarefa.status === 'concluida') {
      throw new AppError('Não é possível atualizar uma tarefa já concluída', 400)
    }

    return this.repository.atualizar(id, dados)
  }

  async concluirTarefa(id) {
    const tarefa = await this.buscarPorId(id)

    const novoStatus = tarefa.status === 'concluida' ? 'pendente' : 'concluida'
    return this.repository.atualizar(id, { status: novoStatus })
  }

  async removerTarefa(id) {
    const tarefa = await this.buscarPorId(id)

    if (tarefa.status === 'concluida') {
      throw new AppError('Não é possível remover uma tarefa já concluída', 400)
    }

    return this.repository.remover(id)
  }

  // Exercício 2: Buscar tarefas de um projeto específico
  async buscarPorProjeto(projetoId) {
    // Verificar se o projeto existe
    const projeto = await this.projetoRepository.buscarPorId(projetoId)
    if (!projeto) {
      throw new AppError('Projeto não encontrado', 404)
    }

    return this.repository.buscarPorProjetoId(projetoId)
  }
}

export default TarefaService
