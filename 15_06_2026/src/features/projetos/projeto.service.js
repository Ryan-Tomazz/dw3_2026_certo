// @file: src/features/projetos/projeto.service.js
import { AppError } from '../../errors/AppError.js'

export class ProjetoService {
  constructor(repository) {
    this.repository = repository
  }

  async listarProjetos() {
    return this.repository.listarTodos()
  }

  async buscarPorId(id) {
    const projeto = await this.repository.buscarPorId(id)
    if (!projeto) {
      throw new AppError('Projeto não encontrado', 404)
    }
    return projeto
  }

  async criarProjeto(dados) {
    if (!dados.nome || dados.nome.trim() === '') {
      throw new AppError('O nome do projeto é obrigatório', 400)
    }

    const projetos = await this.repository.listarTodos()
    const nomeJaExiste = projetos.some(
      p => p.nome.toLowerCase() === dados.nome.toLowerCase().trim()
    )

    if (nomeJaExiste) {
      throw new AppError('Já existe um projeto com esse nome', 400)
    }

    return this.repository.salvar(dados)
  }

  async atualizarProjeto(id, dados) {
    await this.buscarPorId(id) // Verifica existência

    return this.repository.atualizar(id, dados)
  }

  async removerProjeto(id) {
    await this.buscarPorId(id) // Verifica existência

    return this.repository.remover(id)
  }
}

export default ProjetoService
