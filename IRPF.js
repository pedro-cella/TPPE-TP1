import { DescricaoEmBrancoException } from './exceptions/DescricaoEmBrancoException.mjs';
import { ValorRendimentoException } from './exceptions/ValorRendimentoInvalidoException.mjs';
import { ValorDeducaoInvalidoException } from './exceptions/ValorDeducaoInvalidoException.mjs';
import { NomeEmBrancoException } from './exceptions/NomeEmBrancoException.mjs';



class IRPF {
    constructor() {
        this.rendimentos = [];
        this.deducoes = [];
        this.contribuicaoPrevidenciaria = [];
        this.pensaoAlimenticia = 0;
        this.dependentes = [];
    }


    cadastrarRendimentos = (desc, value) => {
        if (!desc || desc.length < 1) return this.checkDescricao();
        if (value === null || value < 0) throw new ValorRendimentoException();      
        this.rendimentos.push({ desc, value });
    }

    get totalRendimentos() {
        return this.rendimentos.reduce((sum, rendimento) => {
            return sum + rendimento.value;
        }, 0)
    }

    cadastrarContribuicaoPrevidenciaria = (desc, value) => {
        if (!desc || desc.length < 1) return this.checkDescricao();
        if (value === null || value < 0) return this.checkValorDeducao();
        this.contribuicaoPrevidenciaria.push({ desc, value });
     }
    
    cadastrarPensaoAlimenticia = (value) => {
        if (value === null || value < 0) return this.checkValorDeducao();
        this.pensaoAlimenticia += value;
     }

    cadastrarDependente = (name, birth) => {
        if (!name || name.length < 1) throw new NomeEmBrancoException();
        if (!birth || birth.length < 1);
        this.dependentes.push({ name, birth });
    }

    cadastrarDeducoes = (desc, value) => {
        if (!desc || desc.length < 1) return this.checkDescricao();
        if (value === null || value < 0) return this.checkValorDeducao();
        this.deducoes.push({ desc, value });
    }

    get totalDeducoes() {
        let totalDeducoes = 0;
        totalDeducoes += this.deducoes.reduce((sum, deducao) => {
            return sum + deducao.value;
        }, 0);
        totalDeducoes += this.contribuicaoPrevidenciaria.reduce((sum, contribuicao) => {
            return sum + contribuicao.value;
        }, 0);
        totalDeducoes += this.pensaoAlimenticia;
        totalDeducoes += this.dependentes.length * 189.59;

        return totalDeducoes;
    }

    checkDescricao(desc) { 
        throw new DescricaoEmBrancoException();
    }

    checkValorDeducao(value) {
        throw new ValorDeducaoInvalidoException();
    }

    get baseCalculo() {
        return (this.totalRendimentos - this.totalDeducoes).toFixed(2);
    }

    get imposto() {
        if (this.baseCalculo < 1) return;

        if (this.baseCalculo <= 1903.98) return 0;

        if (this.baseCalculo <= 2826.65) return 0.075 * (this.baseCalculo - 142.80);

        if (this.baseCalculo <= 3751.05) return 0.15 * (this.baseCalculo - 354.80);
        
        if (this.baseCalculo <= 4664.68) return 0.225 * (this.baseCalculo - 636.13);

        return 0.275 * (this.baseCalculo - 869.36);
    }
}