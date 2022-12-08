export class ValorRendimentoException extends Error {
    constructor(message) {
        super(message)
        
        this.name = 'ValorRendimentoException';
        this.message = "Teste";
    }
}