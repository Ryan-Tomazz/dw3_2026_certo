function buscarPedido(id) {
  if (id === undefined || id === null) {
    throw new Error('ID do pedido é obrigatório');
  }

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id !== 1) {
        return reject(new Error('Pedido não encontrado'));
      }

      resolve({ id: 1, total: 150 });
    }, 1000);
  });
}

async function executar() {
  console.log('--- Exercício 5 ---');
  try {
    const pedido = await buscarPedido(1);
    console.log('Pedido encontrado =>', pedido);
  } catch (e) {
    console.log('Erro ao buscar pedido:', e.message);
  }

  try {
    await buscarPedido(99);
  } catch (e) {
    console.log('Pedido 99 =>', e.message);
  }
}

executar();
