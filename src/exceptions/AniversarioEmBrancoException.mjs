export class AniversarioEmBrancoException extends Error {
  constructor(message) {
    super(message);
    this.name = "AniversarioEmBrancoException";
  }
}
