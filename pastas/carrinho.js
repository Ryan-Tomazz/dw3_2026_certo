class Carrinho {
  constructor() {
    this.itens = [];
  }

  adicionar(nome, preco, quantidade) {
    this.itens.push({ nome, preco, quantidade });
  }

  remover(nome) {
    const indice = this.itens.findIndex(item => item.nome === nome);
    if (indice === -1) {
      console.log('Item não encontrado.');
      return;
    }
    this.itens.splice(indice, 1);
  }

  total() {
    return this.itens.reduce((total, item) => total + item.preco * item.quantidade, 0);
  }

  exibir() {
    this.itens.forEach(item => {
      console.log(`${item.quantidade}x ${item.nome} — R$ ${(item.preco * item.quantidade).toFixed(2)}`);
    });
    console.log(`Total: R$ ${this.total().toFixed(2)}`);
  }
}