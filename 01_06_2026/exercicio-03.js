class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
    this.isOperational = true;
  }
}

function criarProduto(dados) {
  if (!dados || !dados.nome) {
    throw new ValidationError('Nome é obrigatório');
  }

  if (typeof dados.preco !== 'number' || Number.isNaN(dados.preco) || dados.preco <= 0) {
    throw new ValidationError('Preco deve ser número maior que zero');
  }

  if (!Number.isInteger(dados.estoque) || dados.estoque < 0) {
    throw new ValidationError('Estoque deve ser inteiro maior ou igual a zero');
  }

  return {
    nome: dados.nome,
    preco: dados.preco,
    estoque: dados.estoque
  };
}

// Testes
console.log('--- Exercício 3 ---');
try {
  console.log('Produto:', criarProduto({ nome: 'Caneca', preco: 20, estoque: 5 }));
} catch (e) {
  if (e instanceof ValidationError) {
    console.log('Erro de validação:', e.message);
  } else {
    console.log('Erro inesperado');
  }
}

try {
  criarProduto({ preco: 10 });
} catch (e) {
  if (e instanceof ValidationError) {
    console.log('Erro de validação:', e.message);
  } else {
    console.log('Erro inesperado');
  }
}
