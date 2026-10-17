import { NotificadorEquipe } from "./NotificadorEquipe";
import { Projeto } from "../../prototype/Projeto";
import { Profissional } from "../../../models/Profissional";
import { SujeitoEventos } from "../../atvi_patterns/observer/ObservadorEvento";

export class NotificadorAnimacao extends SujeitoEventos implements NotificadorEquipe {
  public notificar(projeto: Projeto, equipe: Profissional[], mensagem: string): string {
    const nomesEquipe = equipe.map(p => `${p.nome} [${p.papelPrincipal}]`).join(", ");
    const frames = projeto.obterMetrica("totalFrames") ?? "7200";
    const eficiencia = projeto.obterMetrica("eficienciaRender") ?? "85.5";

    const corpo = [
      "============================================================",
      "🎬 RELATÓRIO TÉCNICO DE PIPELINE 3D & RENDER FARM",
      "============================================================",
      `Pipeline: "${projeto.titulo}" (ID: ${projeto.id})`,
      `Alocação de Orçamento DCC: R$ ${projeto.orcamento.toLocaleString("pt-BR")}`,
      `Total de Frames em Fila: ${frames} quadros | Eficiência Render Farm: ${eficiencia}%`,
      `Artistas e TDs Alocados (${equipe.length}): ${nomesEquipe || "Nenhum membro alocado"}`,
      `Status do Build / Render: ${mensagem}`,
      "Log Técnico: Shading e Rigging validados para render distribuído em nuvem.",
      "============================================================"
    ].join("\n");

    this.notificarObservadores("NOTIFICACAO_ANIMACAO_EMITIDA", {
      projetoId: projeto.id,
      titulo: projeto.titulo,
      totalEquipe: equipe.length,
      mensagem
    });

    return corpo;
  }
}
