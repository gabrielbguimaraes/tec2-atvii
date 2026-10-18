import { NotificadorEquipe } from "./NotificadorEquipe";
import { Projeto } from "../../prototype/Projeto";
import { Profissional } from "../../../models/Profissional";
import { SujeitoEventos } from "../../atvi_patterns/observer/ObservadorEvento";
import { Observador } from "../../atvi_patterns/observer/Observador";
import { EventoRecomendacao } from "../../atvi_patterns/observer/EventoRecomendacao";

export class NotificadorPublicitario extends SujeitoEventos implements Observador, NotificadorEquipe {
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
    const nomesEquipe = equipe.map(p => `${p.nome} (${p.papelPrincipal})`).join(", ");
    const sla = (projeto as any).prazoDiasSLA ?? projeto.obterMetrica?.("prazoDiasSLA") ?? "7";
    const conversao = (projeto as any).taxaConversaoEsperada ?? projeto.obterMetrica?.("taxaConversao") ?? "4.5";

    const corpo = [
      "============================================================",
      "💼 RELATÓRIO EXECUTIVO DE CAMPANHA & AGÊNCIA PUBLICITÁRIA",
      "============================================================",
      `Campanha: "${(projeto as any).titulo || projeto.genero}" (ID: ${projeto.id})`,
      `Investimento Total: R$ ${projeto.orcamento.toLocaleString("pt-BR")}`,
      `SLA Crítico de Entrega: ${sla} dias | Projeção de Conversão: ${conversao}%`,
      `Squad Criativo Alocado (${equipe.length}): ${nomesEquipe || "Nenhum membro alocado"}`,
      `Status Executivo / Aprovação: ${mensagem}`,
      "Ação Imediata: Enviar peças e cortes para aprovação da marca e mídia online.",
      "============================================================"
    ].join("\n");

    this.notificarObservadores("NOTIFICACAO_PUBLICITARIO_EMITIDA", {
      projetoId: projeto.id,
      titulo: (projeto as any).titulo || projeto.genero,
      totalEquipe: equipe.length,
      mensagem
    });

    return corpo;
  }
}
