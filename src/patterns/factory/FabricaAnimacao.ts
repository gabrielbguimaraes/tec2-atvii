import { FabricaProjeto } from "./FabricaProjeto";
import { ProjetoAnimacao } from "../prototype/ProjetoAnimacao";
import { RegistroPrototiposProjeto } from "../prototype/RegistroPrototiposProjeto";
import { ValidadorProjeto } from "../products/validadores/ValidadorProjeto";
import { ValidadorAnimacao } from "../products/validadores/ValidadorAnimacao";
import { RecomendadorProfissionais } from "../products/recomendadores/RecomendadorProfissionais";
import { RecomendadorAnimacao } from "../products/recomendadores/RecomendadorAnimacao";
import { NotificadorEquipe } from "../products/notificadores/NotificadorEquipe";
import { NotificadorAnimacao } from "../products/notificadores/NotificadorAnimacao";

export class FabricaAnimacao implements FabricaProjeto {
  constructor(private readonly registro: RegistroPrototiposProjeto = new RegistroPrototiposProjeto()) {}

  public criarProjeto(titulo?: string, orcamento?: number): ProjetoAnimacao {
    if (this.registro.tem("ANIMACAO")) {
      return this.registro.clonar("ANIMACAO", titulo, orcamento) as ProjetoAnimacao;
    }

    return new ProjetoAnimacao(
      `anim_${Date.now()}`,
      titulo ?? "Novo Projeto de Animação",
      orcamento ?? 120000
    );
  }

  public criarValidador(): ValidadorProjeto {
    return new ValidadorAnimacao();
  }

  public criarRecomendador(): RecomendadorProfissionais {
    return new RecomendadorAnimacao();
  }

  public criarNotificador(): NotificadorEquipe {
    return new NotificadorAnimacao();
  }
}
