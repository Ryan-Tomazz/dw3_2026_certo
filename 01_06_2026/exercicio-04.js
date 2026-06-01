const usuarios = [
  { id: 1, nome: 'Ana' },
  { id: 2, nome: 'Bruno' },
  { id: 3, nome: 'Carla' }
];

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
  }
}

function buscarUsuarioPorId(id) {
  const idNum = Number(id);

  if (Number.isNaN(idNum)) {
    throw new ValidationError('ID deve ser número');
  }

  const user = usuarios.find((u) => u.id === idNum);

  if (!user) {
    throw new NotFoundError('Usuário não encontrado');
  }

  return user;
}

// Testes
console.log('--- Exercício 4 ---');
try {
  console.log('buscarUsuarioPorId(1) =>', buscarUsuarioPorId(1));
} catch (e) {
  console.log(e.name + ':', e.message);
}

try {
  buscarUsuarioPorId('1');
} catch (e) {
  console.log(e.name + ':', e.message);
}

try {
  buscarUsuarioPorId(99);
} catch (e) {
  console.log(e.name + ':', e.message);
}
