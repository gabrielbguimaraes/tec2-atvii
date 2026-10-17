import { FabricaProjeto } from "./FabricaProjeto";
import { ProjetoPublicitario } from "../prototype/ProjetoPublicitario";
import { RegistroPrototiposProjeto } from "../prototype/RegistroPrototiposProjeto";
import { ValidadorProjeto } from "../products/validadores/ValidadorProjeto";
import { ValidadorPublicitario } from "../products/validadores/ValidadorPublicitario";
import { RecomendadorProfissionais } from "../products/recomendadores/RecomendadorProfissionais";
import { RecomendadorPublicitario } from "../products/recomendadores/RecomendadorPublicitario";
import { NotificadorEquipe } from "../products/notificadores/NotificadorEquipe";
import { NotificadorPublicitario } from "../products/notificadores/NotificadorPublicitario";

export class FabricaPublicitario implements FabricaProjeto {
  constructor(private readonly registro: RegistroPrototiposProjeto = new RegistroPrototiposProjeto()) {}

  public criarProjeto(titulo?: string, orcamento?: number): ProjetoPublicitario {
    if (this.registro.tem("PUBLICITARIO")) {
      return this.registro.clonar("PUBLICITARIO", titulo, orcamento) as ProjetoPublicitario;
    }

    return new ProjetoPublicitario(
      `pub_${Date.now()}`,
      titulo ?? "Nova Campanha Publicitária",
      orcamento ?? 80000
    );
  }

  public criarValidador(): ValidadorProjeto {
    return new ValidadorPublicitario();
  }

  public criarRecomendador(): RecomendadorProfissionais {
    return new RecomendadorPublicitario();
  }

  public criarNotificador(): NotificadorEquipe {
    return new NotificadorPublicitario();
  }
}
