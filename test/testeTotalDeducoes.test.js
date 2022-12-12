import {IRPF} from "../IRPF.js";
import assert from 'assert'


const irpf = new IRPF();

describe('Testes - Total de Deduções', () => {

    describe('Falsificação', () => {

        it('Verifica se o total de deduções é 1000', () => {
            irpf.cadastrarDeducoes('Outros', 1000);
            assert.equal(irpf.totalDeducoes, 1000);
        });
    });
    
});