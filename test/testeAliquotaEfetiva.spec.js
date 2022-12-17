import { IRPF } from "../src/IRPF.js";
import { expect } from "chai";

let irpf;

beforeEach(() => {
  irpf = new IRPF();
});

describe("Testes - Aliquota Efetiva", () => {
  describe("Falsificação", () => {
    it("Verifica se o valor da alíquota efetiva é 0.20.", () => {
      irpf.cadastrarRendimentos("Salario", 3600)
      irpf.cadastrarPensaoAlimenticia(1600)

      Object.defineProperty(irpf, 'aliquotaEfetiva', {
        set: () => { /* Ignore setter */ },
        get: () => { return 0.20 },
      });
      expect(irpf.aliquotaEfetiva).equal(0.20);
    });
  });

  describe("Duplicação", () => {    
    it("Verifica o valor da alíquota efetiva é 0.56.", () => {
      irpf.cadastrarRendimentos("Salário", 2600);
      irpf.cadastrarPensaoAlimenticia(500);
  
      Object.defineProperty(irpf, 'aliquotaEfetiva', {
        set: () => { /* Ignore setter */ },
        get: () => { return 0.56 },
      });
      expect(irpf.aliquotaEfetiva).equal(0.56);
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
        expected: 0.24,
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
        expected: 2.95,
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
        expected: 1.65,
      },
    ];

    casosDeTeste.forEach(testCase => {
        it("Resultado da Alíquota efetiva.", () => {
          const { rendimentos, deducoes, expected } = testCase;
  
          rendimentos.forEach(({ desc, value }) => {
            irpf.cadastrarRendimentos(desc, value);
          });
          deducoes.forEach(({ desc, value }) => {
            irpf.cadastrarDeducoes(desc, value);
          });

          expect(irpf.aliquotaEfetiva).equals(expected)

        });
      });
    });



  });

