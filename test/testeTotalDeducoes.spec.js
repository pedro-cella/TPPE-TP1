import {IRPF} from "../IRPF.js";
import assert from 'assert';

let irpf;

beforeEach(() => {
    irpf = new IRPF();
});

// Cálculo não bate com a resposta verificar o valor

describe('Testes - Total de Deduções', () => {

    describe('Falsificação', () => {

        it('Verifica se o total de deduções é 1000', () => {
            irpf.cadastrarDeducoes('Outros', 1000);
            assert.equal(irpf.totalDeducoes, 1000);
        });
    });

    describe('Duplicação - dedução + contribuição providenciaria', () => {

        it('Verifica se o total de deduções é 3000', () => {
            irpf.cadastrarDeducoes('Salario', 2000);
            irpf.cadastrarContribuicaoPrevidenciaria('Contribuição', 1000);
            assert.equal(irpf.totalDeducoes, 3000);
        });
    });

    describe('Duplicação - dedução + contribuicção providenciaria + pensao alimenticia', () => {

        it('Verifica se o total de deduções é 7000', () => {
            irpf.cadastrarDeducoes('Salario', 1000);
            irpf.cadastrarContribuicaoPrevidenciaria('Contribuição', 2000);
            irpf.cadastrarPensaoAlimenticia(2000);
            irpf.cadastrarPensaoAlimenticia(2000);
            assert.equal(irpf.totalDeducoes, 7000);
        });
    });

    describe('Duplicação - dedução + contribuicção providenciaria + pensao alimenticia + dependentes', () => {

        it('Verifica se o total de deduções é 10000', () => {
            console.log(irpf.totalDeducoes);
            irpf.cadastrarDeducoes('Salario', 3000);
            irpf.cadastrarDeducoes('Aluguel', 810.41);
            irpf.cadastrarContribuicaoPrevidenciaria('Contribuição', 2000);
            irpf.cadastrarPensaoAlimenticia(2000);
            irpf.cadastrarPensaoAlimenticia(2000);
            irpf.cadastrarDependente('Maria Helena dos Santos', '22/04/1935')
            assert.equal(irpf.totalDeducoes, 10000);
        });
    });
    
});