import { FabricaProjeto } from "./FabricaProjeto";
import { ProjetoAnimacao } from "../prototype/ProjetoAnimacao";
import { RegistroPrototiposProjeto } from "../prototype/RegistroPrototiposProjeto";
import { VisitanteProjeto } from "../atvi_patterns/visitor/VisitanteProjeto";
import { ValidadorAnimacao } from "../products/validadores/ValidadorAnimacao";
import { RecomendacaoStrategy } from "../atvi_patterns/strategy/RecomendacaoStrategy";
import { RecomendadorAnimacao } from "../products/recomendadores/RecomendadorAnimacao";
import { Observador } from "../atvi_patterns/observer/Observador";
import { NotificadorAnimacao } from "../products/notificadores/NotificadorAnimacao";

export class FabricaAnimacao implements FabricaProjeto {
  constructor(private readonly registro: RegistroPrototiposProjeto = new RegistroPrototiposProjeto()) {}

  public criarProjeto(dados?: any, orcamento?: number): ProjetoAnimacao {
    const titulo = typeof dados === "string" ? dados : dados?.titulo ?? "Novo Projeto de Animação";
    const valorOrcamento = typeof dados === "object" && dados?.orcamento !== undefined ? dados.orcamento : orcamento;

    if (this.registro.tem("ANIMACAO")) {
      const clone = this.registro.clonar("ANIMACAO", titulo, valorOrcamento) as ProjetoAnimacao;
      if (typeof dados === "object") {
        if (dados.estiloAnimacao) clone.estiloAnimacao = dados.estiloAnimacao;
        if (dados.softwareModelagem3D) clone.softwareModelagem3D = [...dados.softwareModelagem3D];
      }
      return clone;
    }

    return new ProjetoAnimacao(
      `anim_${Date.now()}`,
      titulo,
      valorOrcamento ?? 140000
    );
  }

  public criarValidador(): VisitanteProjeto {
    return new ValidadorAnimacao();
  }

  public criarRecomendador(): RecomendacaoStrategy {
    return new RecomendadorAnimacao();
  }

  public criarNotificador(): Observador {
    return new NotificadorAnimacao();
  }
}
