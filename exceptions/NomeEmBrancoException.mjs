export class NomeEmBrancoException extends Error {
    constructor(message) {
        super(message)
        
        this.name = 'NomeEmBrancoException';
        this.message = "Teste";
    }
}