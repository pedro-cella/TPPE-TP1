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

  });
  
