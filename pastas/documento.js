class Documento {
  constructor(titulo) {
    this.titulo = titulo;
    this.conteudo = '';
    this._historico = [];
  }

  editar(novoConteudo) {
    this._historico.push(this.conteudo);
    this.conteudo = novoConteudo;
  }

  desfazer() {
    if (this._historico.length === 0) {
      console.log('Nada para desfazer.');
      return;
    }
    this.conteudo = this._historico.pop();
  }

  exibir() {
    console.log(`[${this.titulo}] Conteúdo atual: ${this.conteudo}`);
  }
}