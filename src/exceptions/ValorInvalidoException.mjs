export class ValorInvalidoException extends Error {
    constructor(message) {
      super(message);
      this.name = "Valor Inválido";
    }
  }
  