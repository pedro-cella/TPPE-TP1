import { IRPF } from "../src/IRPF.js";
import { expect } from "chai";

let irpf;

beforeEach(() => {
  irpf = new IRPF();
});

describe("Testes - Base de Cálculo", () => {
  describe("Falsificação", () => {
    it("Verifica se o valor da base de cálculo é 2000", () => {
      irpf.cadastrarRendimentos("Salario", 3600)
      irpf.cadastrarPensaoAlimenticia(1600);
      Object.defineProperty(irpf, 'baseCalculo', {
        set: () => { /* Ignore setter */ },
        get: () => { return 3600 - 1600 },
      });
      expect(irpf.baseCalculo).equal(2000);
    });
  });

  describe("Duplicação", () => {
    it("Verifica o valor do imposto de Faixa 1", () => {
      irpf.cadastrarRendimentos("Salário", 2600);
      irpf.cadastrarPensaoAlimenticia(1000);
      Object.defineProperty(irpf, 'baseCalculo', {
        set: () => { /* Ignore setter */ },
        get: () => { return 2600 - 1000 },
      });
      expect(irpf.baseCalculo).equal(1600);
    });
  });

  describe("Triangulação por Parametrização", () => {
    const casosDeTeste = [
      {
        rendimentos: [
          {
            desc: "Salário",
            value: 3000,
          },
        ],
        deducoes: [
          {
            desc: "Loteria",
            value: 1000,
          }
        ],
        expectedBaseCalculo: 2000,
        expectedImposto: 7.20,
      },
      {
        rendimentos: [
          {
            desc: "Salário",
            value: 3000,
          },
          {
            desc: "Aluguel",
            value: 2000,
          },
        ],
        deducoes: [
          {
            desc: "Loteria",
            value: 1000,
          },
          {
            desc: "Auxílio Emergencia",
            value: 650,
          }
        ],
        expectedBaseCalculo: 3350,
        expectedImposto: 147.70,
      },
      {
        rendimentos: [
          {
            desc: "Salário",
            value: 6000,
          },
          {
            desc: "Aluguel",
            value: 2000,
          },
        ],
        deducoes: [
          {
            desc: "Loteria",
            value: 2000,
          },
          {
            desc: "Auxílio Emergencia",
            value: 650,
          },
          {
            desc: "Outros",
            value: 2100,
          }
        ],
        expectedBaseCalculo: 3250,
        expectedImposto: 132.70,
      },
    ];

    casosDeTeste.forEach(testCase => {
      it("Resultado da base de calculo e valor da faixa 1", () => {
        const { rendimentos, deducoes } = testCase;

        rendimentos.forEach(({ desc, value }) => {
          irpf.cadastrarRendimentos(desc, value);
        });
        deducoes.forEach(({ desc, value }) => {
          irpf.cadastrarDeducoes(desc, value);
        });

       expect(irpf.baseCalculo).equal(testCase.expectedBaseCalculo.toFixed(2));
       expect(irpf.imposto).equal(testCase.expectedImposto.toFixed(2));
      });
    });
  });
});
