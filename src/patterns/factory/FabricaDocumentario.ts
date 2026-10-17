import { FabricaProjeto } from "./FabricaProjeto";
import { ProjetoDocumentario } from "../prototype/ProjetoDocumentario";
import { RegistroPrototiposProjeto } from "../prototype/RegistroPrototiposProjeto";
import { ValidadorProjeto } from "../products/validadores/ValidadorProjeto";
import { ValidadorDocumentario } from "../products/validadores/ValidadorDocumentario";
import { RecomendadorProfissionais } from "../products/recomendadores/RecomendadorProfissionais";
import { RecomendadorDocumentario } from "../products/recomendadores/RecomendadorDocumentario";
import { NotificadorEquipe } from "../products/notificadores/NotificadorEquipe";
import { NotificadorDocumentario } from "../products/notificadores/NotificadorDocumentario";

export class FabricaDocumentario implements FabricaProjeto {
  constructor(private readonly registro: RegistroPrototiposProjeto = new RegistroPrototiposProjeto()) {}

  public criarProjeto(titulo?: string, orcamento?: number): ProjetoDocumentario {
    if (this.registro.tem("DOCUMENTARIO")) {
      return this.registro.clonar("DOCUMENTARIO", titulo, orcamento) as ProjetoDocumentario;
    }

    return new ProjetoDocumentario(
      `doc_${Date.now()}`,
      titulo ?? "Novo Documentário",
      orcamento ?? 60000
    );
  }

  public criarValidador(): ValidadorProjeto {
    return new ValidadorDocumentario();
  }

  public criarRecomendador(): RecomendadorProfissionais {
    return new RecomendadorDocumentario();
  }

  public criarNotificador(): NotificadorEquipe {
    return new NotificadorDocumentario();
  }
}
