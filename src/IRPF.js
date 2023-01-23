import { DescricaoEmBrancoException } from "./exceptions/DescricaoEmBrancoException.mjs";
import { ValorRendimentoException } from "./exceptions/ValorRendimentoInvalidoException.mjs";
import { ValorDeducaoInvalidoException } from "./exceptions/ValorDeducaoInvalidoException.mjs";
import { NomeEmBrancoException } from "./exceptions/NomeEmBrancoException.mjs";
import { AniversarioEmBrancoException } from "./exceptions/AniversarioEmBrancoException.mjs";
import { ValorInvalidoException } from "./exceptions/ValorInvalidoException.mjs";

const faixaImposto = [
  { maxValue: 1903.98, rate: 0, deduction: 0 },
  { maxValue: 2826.65, rate: 0.075, deduction: 142.8 },
  { maxValue: 3751.05, rate: 0.15, deduction: 354.8 },
  { maxValue: 4664.68, rate: 0.225, deduction: 636.13 },
  { maxValue: Infinity, rate: 0.275, deduction: 869.36 }
];
const aliquota = [0.07, 0.1, 0.22, 0.275];
const deducoes = [142.8, 354.8, 636.13, 869.36];

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

  get totalRendimentos() {
    return this.rendimentos.reduce((sum, rendimento) => {
      return sum + rendimento.value;
    }, 0);
  }

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

  // Refatorado - Tarefa 2 - Método Objeto - Funciona
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

  // Métodos alterados - Tarefa 1 - Extração do value == null - Funciona
  checkValorDeducao(value) {
    this.checkNull(value);
    if (value < 0) throw new ValorDeducaoInvalidoException();
  }

  checkValorRendimento(value) {
    this.checkNull(value);
    if (value < 0) throw new ValorRendimentoException();
  }

  // Extração da constante - Tarefa 3
  get baseCalculo() {
    return (this.totalRendimentos - this.totalDeducoes).toFixed(2);
  }

  // Refatorado - Tarefa 3 - Extrair constants impostoFaixa - Funciona
  get impostoFaixa2() {
    return this.impostoFaixaN(aliquota[0], deducoes[0]);
  }

  get impostoFaixa3() {
    return this.impostoFaixaN(aliquota[1], deducoes[1]);
  }

  get impostoFaixa4() {
    return this.impostoFaixaN(aliquota[2], deducoes[2]);
  }

  get impostoFaixa5() {
    return this.impostoFaixaN(aliquota[3], deducoes[3]);
  }

  impostoFaixaN = (aliquota, deducao) => {
    return ((aliquota * this.baseCalculo) - deducao).toFixed(2);
  }

  // Refatorado - Tarefa 3 - Extrair constante get imposto() - Funciona
  get imposto() {
    if (this.baseCalculo < 1) return;

    for (let i = 0; i < faixaImposto.length; i++) {
      if (this.baseCalculo <= faixaImposto[i].maxValue) {
        return this.impostoFaixaN(faixaImposto[i].rate, faixaImposto[i].deduction);
      }
    }
  }

  get aliquotaEfetiva() {
    const porcentagem = this.imposto / this.totalRendimentos * 100;
    const resultadoAliquota = Math.floor(porcentagem * 100) / 100;
    return resultadoAliquota;
  }
}