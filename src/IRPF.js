import { DescricaoEmBrancoException } from "./exceptions/DescricaoEmBrancoException.mjs";
import { ValorRendimentoException } from "./exceptions/ValorRendimentoInvalidoException.mjs";
import { ValorDeducaoInvalidoException } from "./exceptions/ValorDeducaoInvalidoException.mjs";
import { NomeEmBrancoException } from "./exceptions/NomeEmBrancoException.mjs";
import { AniversarioEmBrancoException } from "./exceptions/AniversarioEmBrancoException.mjs";

export class IRPF {
  constructor() {
    this.rendimentos = [];
    this.deducoes = [];
    this.contribuicaoPrevidenciaria = [];
    this.pensaoAlimenticia = 0;
    this.dependentes = [];
  }

  cadastrarRendimentos = (desc, value) => {
    this.checkDescricao(desc);
    this.checkValorRendimento(value);
    this.rendimentos.push({ desc, value });
  };

  cadastrarContribuicaoPrevidenciaria = (desc, value) => {
    this.checkDescricao(desc);
    this.checkValorDeducao(value);
    this.contribuicaoPrevidenciaria.push({ desc, value });
  };

  cadastrarPensaoAlimenticia = (value) => {
    this.checkValorDeducao(value);
    this.pensaoAlimenticia += value;
  };

  cadastrarDependente = (name, birth) => {
    this.checkNome(name);
    this.checkAniversario(birth);
    this.dependentes.push({ name, birth });
  };

  cadastrarDeducoes = (desc, value) => {
    this.checkDescricao(desc);
    this.checkValorDeducao(value);
    this.deducoes.push({ desc, value });
  };

  get totalDeducoes() {
    return [...this.deducoes, ...this.contribuicaoPrevidenciaria]
      .map(({ value }) => value)
      .reduce((sum, value) => sum + value, 0) + this.pensaoAlimenticia + (this.dependentes.length * 189.59);
  }
  

  checkDescricao(desc) {
    if (!desc || desc.length < 1) throw new DescricaoEmBrancoException();
  }

  checkNome(nome) {
    if (!nome || nome.length < 1) throw new NomeEmBrancoException();
  }

  checkAniversario(birth) {
    if (!birth || birth.length < 1) throw new AniversarioEmBrancoException();
  }

  checkNull(value) {
    if (value === null) throw new ValorInvalidoException();
  }

  checkValorDeducao(value) {
    this.checkNull(value);
    if (value < 0) throw new ValorDeducaoInvalidoException();
  }

  checkValorRendimento(value) {
    this.checkNull(value);
    if (value < 0) throw new ValorRendimentoException();
  }

  get baseCalculo() {
    return (this.totalRendimentos - this.totalDeducoes).toFixed(2);
  }

  get impostoFaixa1() {
    return 0;
  }

  get impostoFaixa2() {
    return this.impostoFaixaN(0.075, 142.8);
  }

  get impostoFaixa3() {
    return this.impostoFaixaN(0.15, 354.8);
  }

  get impostoFaixa4() {
    return this.impostoFaixaN(0.225, 636.13);
  }

  get impostoFaixa5() {
    return this.impostoFaixaN(0.275, 869.36);
  }

  impostoFaixaN = (aliquota, deducao) => {
    return ((aliquota * this.baseCalculo) - deducao).toFixed(2);
  }

  get imposto() {
    if (this.baseCalculo < 1) return;

    if (this.baseCalculo <= 1903.98) return this.impostoFaixa1;

    if (this.baseCalculo <= 2826.65) return this.impostoFaixa2;

    if (this.baseCalculo <= 3751.05) return this.impostoFaixa3;

    if (this.baseCalculo <= 4664.68) return this.impostoFaixa4;

    return this.impostoFaixa5;
  }


    get aliquotaEfetiva() {
    const porcentagem = this.imposto / this.totalRendimentos * 100;
    const resultadoAliquota = Math.floor(porcentagem * 100) / 100;
    return resultadoAliquota;
  }
}