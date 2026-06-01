class ValidationError extends Error {
  constructor(message, details = []) {
    super(message);
    this.name = 'ValidationError';
    this.details = details;
  }
}

function validarAluno(aluno) {
  const errors = [];

  if (!aluno || !aluno.nome) {
    errors.push('Nome é obrigatório');
  }

  if (!aluno || !aluno.email || !aluno.email.includes('@')) {
    errors.push('Email inválido');
  }

  if (!aluno || typeof aluno.idade !== 'number' || aluno.idade < 16) {
    errors.push('Idade deve ser número >= 16');
  }

  if (errors.length > 0) {
    throw new ValidationError('Aluno inválido', errors);
  }

  return true;
}

// Testes
console.log('--- Exercício 7 ---');
try {
  console.log('Aluno válido =>', validarAluno({ nome: 'Ana', email: 'ana@example.com', idade: 20 }));
} catch (e) {
  if (e instanceof ValidationError) {
    console.log('ValidationError:', e.details);
  } else {
    console.log('Erro inesperado');
  }
}

try {
  validarAluno({ nome: '', email: 'invalid', idade: 15 });
} catch (e) {
  if (e instanceof ValidationError) {
    console.log('Aluno inválido detalhes =>', e.details);
  } else {
    console.log('Erro inesperado');
  }
}
