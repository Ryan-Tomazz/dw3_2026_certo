class Estoque {
  constructor() {
    this.produtos = [];
  }

  cadastrar(nome, quantidade) {
    if (this.produtos.some(p => p.nome === nome)) {
      console.log('Produto já cadastrado.');
      return;
    }
    this.produtos.push({ nome, quantidade });
  }

  entrada(nome, quantidade) {
    const produto = this.produtos.find(p => p.nome === nome);
    if (!produto) return console.log('Produto não encontrado.');
    produto.quantidade += quantidade;
  }

  saida(nome, quantidade) {
    const produto = this.produtos.find(p => p.nome === nome);
    if (!produto) return console.log('Produto não encontrado.');
    if (produto.quantidade < quantidade) {
      console.log('Quantidade insuficiente.');
      return;
    }
    produto.quantidade -= quantidade;
  }

  exibir() {
    this.produtos.forEach(p => console.log(`${p.nome}: ${p.quantidade} unidades`));
  }
}