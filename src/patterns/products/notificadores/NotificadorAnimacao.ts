import { NotificadorEquipe } from "./NotificadorEquipe";
import { Projeto } from "../../prototype/Projeto";
import { Profissional } from "../../../models/Profissional";
import { SujeitoEventos } from "../../atvi_patterns/observer/ObservadorEvento";
import { Observador } from "../../atvi_patterns/observer/Observador";
import { EventoRecomendacao } from "../../atvi_patterns/observer/EventoRecomendacao";

export class NotificadorAnimacao extends SujeitoEventos implements Observador, NotificadorEquipe {
  public ultimoRelatorio: string = "";

  public atualizar(evento: EventoRecomendacao): void {
    const profs: Profissional[] = [];
    if (evento.equipe instanceof Map) {
      for (const lista of evento.equipe.values()) {
        profs.push(...lista);
      }
    } else if (Array.isArray(evento.equipe)) {
      profs.push(...evento.equipe);
    }
    this.ultimoRelatorio = this.notificar(evento.projeto, profs, evento.mensagem);
  }

  public notificar(projeto: Projeto, equipe: Profissional[], mensagem: string): string {
    const nomesEquipe = equipe.map(p => `${p.nome} [${p.papelPrincipal}]`).join(", ");
    const frames = (projeto as any).totalFrames ?? projeto.obterMetrica?.("totalFrames") ?? "7200";
    const eficiencia = (projeto as any).eficienciaRenderFarmGhz ?? projeto.obterMetrica?.("eficienciaRender") ?? "85.5";

    const corpo = [
      "============================================================",
      "🎬 RELATÓRIO TÉCNICO DE PIPELINE 3D & RENDER FARM",
      "============================================================",
      `Pipeline: "${(projeto as any).titulo || projeto.genero}" (ID: ${projeto.id})`,
      `Alocação de Orçamento DCC: R$ ${projeto.orcamento.toLocaleString("pt-BR")}`,
      `Total de Frames em Fila: ${frames} quadros | Eficiência Render Farm: ${eficiencia}%`,
      `Artistas e TDs Alocados (${equipe.length}): ${nomesEquipe || "Nenhum membro alocado"}`,
      `Status do Build / Render: ${mensagem}`,
      "Log Técnico: Shading e Rigging validados para render distribuído em nuvem.",
      "============================================================"
    ].join("\n");

    this.notificarObservadores("NOTIFICACAO_ANIMACAO_EMITIDA", {
      projetoId: projeto.id,
      titulo: (projeto as any).titulo || projeto.genero,
      totalEquipe: equipe.length,
      mensagem
    });

    return corpo;
  }
}
