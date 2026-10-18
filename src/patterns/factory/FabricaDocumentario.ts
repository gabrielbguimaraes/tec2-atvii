import { FabricaProjeto } from "./FabricaProjeto";
import { ProjetoDocumentario } from "../prototype/ProjetoDocumentario";
import { RegistroPrototiposProjeto } from "../prototype/RegistroPrototiposProjeto";
import { VisitanteProjeto } from "../atvi_patterns/visitor/VisitanteProjeto";
import { ValidadorDocumentario } from "../products/validadores/ValidadorDocumentario";
import { RecomendacaoStrategy } from "../atvi_patterns/strategy/RecomendacaoStrategy";
import { RecomendadorDocumentario } from "../products/recomendadores/RecomendadorDocumentario";
import { Observador } from "../atvi_patterns/observer/Observador";
import { NotificadorDocumentario } from "../products/notificadores/NotificadorDocumentario";

export class FabricaDocumentario implements FabricaProjeto {
  constructor(private readonly registro: RegistroPrototiposProjeto = new RegistroPrototiposProjeto()) {}

  public criarProjeto(dados?: any, orcamento?: number): ProjetoDocumentario {
    const titulo = typeof dados === "string" ? dados : dados?.titulo ?? "Novo Documentário";
    const valorOrcamento = typeof dados === "object" && dados?.orcamento !== undefined ? dados.orcamento : orcamento;

    if (this.registro.tem("DOCUMENTARIO")) {
      const clone = this.registro.clonar("DOCUMENTARIO", titulo, valorOrcamento) as ProjetoDocumentario;
      if (typeof dados === "object") {
        if (dados.tema) clone.tema = dados.tema;
        if (dados.entrevistados) clone.entrevistados = [...dados.entrevistados];
      }
      return clone;
    }

    return new ProjetoDocumentario(
      `doc_${Date.now()}`,
      titulo,
      valorOrcamento ?? 60000
    );
  }

  public criarValidador(): VisitanteProjeto {
    return new ValidadorDocumentario();
  }

  public criarRecomendador(): RecomendacaoStrategy {
    return new RecomendadorDocumentario();
  }

  public criarNotificador(): Observador {
    return new NotificadorDocumentario();
  }
}
