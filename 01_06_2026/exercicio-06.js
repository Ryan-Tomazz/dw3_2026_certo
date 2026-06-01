function processarPagamento(valor) {
  if (typeof valor !== 'number' || Number.isNaN(valor) || valor <= 0) {
    throw new Error('Valor inválido');
  }

  return 'Pagamento aprovado';
}

// Quem chama é responsável pelo try/catch
console.log('--- Exercício 6 ---');
try {
  console.log(processarPagamento(100));
} catch (e) {
  console.log('Erro:', e.message);
}

try {
  console.log(processarPagamento(0));
} catch (e) {
  console.log('Erro:', e.message);
}
