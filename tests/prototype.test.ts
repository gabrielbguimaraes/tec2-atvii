import { ProjetoDocumentario } from "../src/patterns/prototype/ProjetoDocumentario";
import { ProjetoAnimacao } from "../src/patterns/prototype/ProjetoAnimacao";
import { ProjetoPublicitario } from "../src/patterns/prototype/ProjetoPublicitario";
import { RegistroPrototiposProjeto } from "../src/patterns/prototype/RegistroPrototiposProjeto";
import { PapelProjeto } from "../src/models/PapelProjeto";
import { RestricaoProjeto } from "../src/models/RestricaoProjeto";
import { NivelExperiencia, SeveridadeRestricao } from "../src/models/Tipos";

describe("Teste 1: Padrão Prototype & Garantia de Cópia Profunda (Deep Copy)", () => {
  let registro: RegistroPrototiposProjeto;

  beforeEach(() => {
    registro = new RegistroPrototiposProjeto();
  });

  describe("ProjetoDocumentario - Clonagem Profunda", () => {
    it("deve clonar profundamente ProjetoDocumentario e manter o protótipo original intacto", () => {
      const original = registro.obter("DOCUMENTARIO") as ProjetoDocumentario;
      const qtdPapeisOriginal = original.papeis.length;
      const qtdRestricoesOriginal = original.restricoes.length;

      // Realiza o clone
      const clone = original.clonar();
      expect(clone).not.toBe(original);
      expect(clone.id).not.toBe(original.id);
      expect(clone.papeis).not.toBe(original.papeis);
      expect(clone.restricoes).not.toBe(original.restricoes);
      expect(clone.metricasEspecificas).not.toBe(original.metricasEspecificas);

      // Modifica listas no clone
      clone.adicionarPapel(
        new PapelProjeto(
          "papel-novo-pesquisador",
          "Consultor Antropológico",
          NivelExperiencia.ESPECIALISTA,
          ["Etnografia", "Pesquisa de Campo"],
          1
        )
      );

      clone.adicionarRestricao(
        new RestricaoProjeto(
          "res-nova-etica",
          "CONSENTIMENTO_INFORMADO",
          "Termo de consentimento prévio e informado de todas as comunidades",
          SeveridadeRestricao.CRITICA,
          true
        )
      );

      // Modifica objeto agregado interno (papel existente)
      const primeiroPapelClone = clone.papeis[0];
      expect(primeiroPapelClone).toBeDefined();
      if (primeiroPapelClone) {
        primeiroPapelClone.adicionarHabilidade("Nova Habilidade Rara");
      }

      // Modifica métrica no clone
      clone.definirMetrica("fontesVerificadas", 999);

      // Asserções comprovando imutabilidade do original
      expect(original.papeis.length).toBe(qtdPapeisOriginal);
      expect(clone.papeis.length).toBe(qtdPapeisOriginal + 1);

      expect(original.restricoes.length).toBe(qtdRestricoesOriginal);
      expect(clone.restricoes.length).toBe(qtdRestricoesOriginal + 1);

      const primeiroPapelOriginal = original.papeis[0];
      expect(primeiroPapelOriginal?.temHabilidade("Nova Habilidade Rara")).toBe(false);
      expect(primeiroPapelClone?.temHabilidade("Nova Habilidade Rara")).toBe(true);

      expect(original.obterMetrica("fontesVerificadas")).toBe(15);
      expect(clone.obterMetrica("fontesVerificadas")).toBe(999);
    });
  });

  describe("ProjetoAnimacao - Clonagem Profunda", () => {
    it("deve clonar profundamente ProjetoAnimacao garantindo independência de pipeline e métricas", () => {
      const original = registro.obter("ANIMACAO") as ProjetoAnimacao;
      const qtdPapeisOriginal = original.papeis.length;

      const clone = original.clonar();
      expect(clone).not.toBe(original);
      expect(clone.pipelineSoftware).not.toBe(original.pipelineSoftware);

      // Modifica pipeline no clone
      clone.pipelineSoftware.push("Unreal Engine 5");

      // Modifica papéis e métricas
      clone.adicionarPapel(
        new PapelProjeto(
          "papel-unreal",
          "Technical Artist Unreal",
          NivelExperiencia.SENIOR,
          ["Unreal Engine", "Blueprints", "Lumen"],
          1
        )
      );
      clone.definirMetrica("eficienciaRender", 99.9);

      // Asserções
      expect(original.papeis.length).toBe(qtdPapeisOriginal);
      expect(clone.papeis.length).toBe(qtdPapeisOriginal + 1);

      expect(original.pipelineSoftware).not.toContain("Unreal Engine 5");
      expect(clone.pipelineSoftware).toContain("Unreal Engine 5");

      expect(original.obterMetrica("eficienciaRender")).toBe(85.5);
      expect(clone.obterMetrica("eficienciaRender")).toBe(99.9);
    });
  });

  describe("ProjetoPublicitario - Clonagem Profunda", () => {
    it("deve clonar profundamente ProjetoPublicitario garantindo integridade de prazos e restrições de marca", () => {
      const original = registro.obter("PUBLICITARIO") as ProjetoPublicitario;
      const qtdRestricoesOriginal = original.restricoes.length;

      const clone = original.clonar();
      expect(clone).not.toBe(original);

      // Altera SLA e adiciona restrição de mídia
      clone.prazoDiasSLA = 3;
      clone.adicionarRestricao(
        new RestricaoProjeto(
          "res-pub-midia",
          "SUPER_BOWL_FORMAT",
          "Formatação de aspect ratio específico para transmissão em telões",
          SeveridadeRestricao.ALTA,
          true
        )
      );

      expect(original.prazoDiasSLA).toBe(7);
      expect(clone.prazoDiasSLA).toBe(3);
      expect(original.restricoes.length).toBe(qtdRestricoesOriginal);
      expect(clone.restricoes.length).toBe(qtdRestricoesOriginal + 1);
    });
  });

  describe("RegistroPrototiposProjeto (Prototype Registry)", () => {
    it("deve permitir obter clones customizados com novo título e orçamento sem alterar o template base", () => {
      const clone1 = registro.clonar("DOCUMENTARIO", "Doc Amazônia 1", 50000);
      const clone2 = registro.clonar("DOCUMENTARIO", "Doc Pantanal 2", 70000);

      expect(clone1.titulo).toBe("Doc Amazônia 1");
      expect(clone1.orcamento).toBe(50000);

      expect(clone2.titulo).toBe("Doc Pantanal 2");
      expect(clone2.orcamento).toBe(70000);

      const template = registro.obter("DOCUMENTARIO");
      expect(template.titulo).toBe("Documentário Base - Memória e Narrativa");
      expect(template.orcamento).toBe(65000);
    });

    it("deve lançar erro ao solicitar chave de protótipo inexistente", () => {
      expect(() => registro.obter("INEXISTENTE")).toThrow('Protótipo não encontrado para a chave: "INEXISTENTE"');
    });
  });
});
