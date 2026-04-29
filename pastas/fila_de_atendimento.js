class FilaAtendimento {
  constructor() {
    this._fila = [];
    this.contador = 1;
  }

  entrar(nome) {
    const pessoa = { senha: this.contador, nome };
    this._fila.push(pessoa);
    console.log(`Senha ${this.contador} gerada para ${nome}.`);
    this.contador++;
  }

  chamarProximo() {
    if (this._fila.length === 0) {
      console.log('Fila vazia.');
      return;
    }
    const proximo = this._fila.shift();
    console.log(`Chamando senha ${proximo.senha} — ${proximo.nome}`);
    return proximo;
  }

  tamanho() {
    return this._fila.length;
  }
}