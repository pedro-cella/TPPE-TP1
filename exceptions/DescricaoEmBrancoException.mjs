export class DescricaoEmBrancoException extends Error {
  constructor(message) {
    super(message);
    this.name = "DescricaoEmBrancoException";
  }
}
