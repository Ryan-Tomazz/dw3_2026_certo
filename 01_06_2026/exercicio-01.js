function dividir(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new Error('Os valores devem ser números');
  }

  if (b === 0) {
    throw new Error('Não é possível dividir por zero');
  }

  return a / b;
}

// Testes
console.log('--- Exercício 1 ---');
try {
  console.log('dividir(10, 2) =>', dividir(10, 2));
} catch (e) {
  console.log('Erro:', e.message);
}

try {
  console.log('dividir(10, 0) =>', dividir(10, 0));
} catch (e) {
  console.log('Erro:', e.message);
}

try {
  console.log("dividir('10', 2) =>", dividir('10', 2));
} catch (e) {
  console.log('Erro:', e.message);
}
