import { IRPF } from "../IRPF.js";
import { expect } from "chai";

let irpf;

beforeEach(() => {
  irpf = new IRPF();
});

describe("Testes - Total de Deduções", () => {
  describe("Falsificação", () => {
    it("Verifica se o total de deduções é 1000", () => {
      irpf.cadastrarDeducoes("Outros", 1000);
      expect(irpf.totalDeducoes).equal(1000);
    });
  });

  describe("Duplicação", () => {
    describe("Dedução + contribuição providenciaria", () => {
      it("Verifica se o total de deduções é 3000", () => {
        irpf.cadastrarDeducoes("Salario", 2000);
        irpf.cadastrarContribuicaoPrevidenciaria("Contribuição", 1000);
        expect(irpf.totalDeducoes).equal(3000);
      });
    });

    describe("Dedução + contribuicção providenciaria + pensao alimenticia", () => {
      it("Verifica se o total de deduções é 7000", () => {
        irpf.cadastrarDeducoes("Salario", 1000);
        irpf.cadastrarContribuicaoPrevidenciaria("Contribuição", 2000);
        irpf.cadastrarPensaoAlimenticia(2000);
        irpf.cadastrarPensaoAlimenticia(2000);
        expect(irpf.totalDeducoes).equal(7000);
      });
    });

    describe("Dedução + contribuicção providenciaria + pensao alimenticia + dependentes", () => {
      it("Verifica se o total de deduções é 10000", () => {
        irpf.cadastrarDeducoes("Salario", 3000);
        irpf.cadastrarDeducoes("Aluguel", 810.41);
        irpf.cadastrarContribuicaoPrevidenciaria("Contribuição", 2000);
        irpf.cadastrarPensaoAlimenticia(2000);
        irpf.cadastrarPensaoAlimenticia(2000);
        irpf.cadastrarDependente("Maria Helena dos Santos", "22/04/1935");
        expect(irpf.totalDeducoes).equal(1000);
      });
    });
  });

  describe("Parametrização", () => {
    const casosDeTeste = [
      {
        params: [
          {
            desc: "Salário",
            value: 3000,
          },
          {
            desc: "Aluguel",
            value: 2000,
          },
        ],
        expected: 5000,
      },
      {
        params: [
          {
            desc: "Auxílio Emergencial",
            value: 600,
          },
          {
            desc: "Loteria",
            value: 2000,
          },
          {
            desc: "Salário",
            value: 1000,
          },
        ],
        expected: 3600,
      },
    ];

    casosDeTeste.forEach(testCase => {
      it("Resultado do total de deduções", () => {
        testCase.params.forEach(param => {
          irpf.cadastrarDeducoes(param.desc, param.value);
        });
        expect(irpf.totalDeducoes).equal(testCase.expected);
      });
    });
  });
});
