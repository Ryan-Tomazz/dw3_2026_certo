class Livro {
  constructor(titulo, autor) {
    this.titulo = titulo;
    this.autor = autor;
    this.disponivel = true;
  }

  emprestar() {
    if (!this.disponivel) {
      console.log('Livro indisponível.');
      return;
    }
    this.disponivel = false;
  }

  devolver() {
    this.disponivel = true;
  }

  exibir() {
    return `${this.titulo} — ${this.autor} — ${this.disponivel ? 'Disponível' : 'Indisponível'}`;
  }
}

class Biblioteca {
  constructor(nome) {
    this.nome = nome;
    this.acervo = [];
  }

  adicionar(livro) {
    this.acervo.push(livro);
  }

  buscar(titulo) {
    return this.acervo.find(l => l.titulo === titulo) || null;
  }

  emprestar(titulo) {
    const livro = this.buscar(titulo);
    if (!livro) return console.log('Livro não encontrado.');
    livro.emprestar();
  }

  devolver(titulo) {
    const livro = this.buscar(titulo);
    if (!livro) return console.log('Livro não encontrado.');
    livro.devolver();
  }

  exibirAcervo() {
    this.acervo.forEach(livro => console.log(livro.exibir()));
  }
}