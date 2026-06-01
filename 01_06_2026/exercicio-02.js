function criarProduto(dados) {
  if (!dados || !dados.nome) {
    throw new Error('Nome é obrigatório');
  }

  if (typeof dados.preco !== 'number' || Number.isNaN(dados.preco) || dados.preco <= 0) {
    throw new Error('Preco deve ser número maior que zero');
  }

  if (!Number.isInteger(dados.estoque) || dados.estoque < 0) {
    throw new Error('Estoque deve ser inteiro maior ou igual a zero');
  }

  return {
    nome: dados.nome,
    preco: dados.preco,
    estoque: dados.estoque
  };
}

// Testes
console.log('--- Exercício 2 ---');
try {
  const p = criarProduto({ nome: 'Caneca', preco: 25, estoque: 10 });
  console.log('Produto válido:', p);
} catch (e) {
  console.log('Erro:', e.message);
}

try {
  criarProduto({ preco: 10, estoque: 5 });
} catch (e) {
  console.log('Sem nome =>', e.message);
}

try {
  criarProduto({ nome: 'X', preco: -5, estoque: 1 });
} catch (e) {
  console.log('Preco negativo =>', e.message);
}

try {
  criarProduto({ nome: 'Y', preco: 10, estoque: 1.5 });
} catch (e) {
  console.log('Estoque quebrado =>', e.message);
}
