export class ValorDeducaoInvalidoException extends Error {
  constructor(message) {
    super(message);

    this.name = "ValorDeducaoInvalidoException";
    this.message = "Teste";
  }
}
