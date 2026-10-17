import { NotificadorEquipe } from "./NotificadorEquipe";
import { Projeto } from "../../prototype/Projeto";
import { Profissional } from "../../../models/Profissional";
import { SujeitoEventos } from "../../atvi_patterns/observer/ObservadorEvento";

export class NotificadorPublicitario extends SujeitoEventos implements NotificadorEquipe {
  public notificar(projeto: Projeto, equipe: Profissional[], mensagem: string): string {
    const nomesEquipe = equipe.map(p => `${p.nome} (${p.papelPrincipal})`).join(", ");
    const sla = projeto.obterMetrica("prazoDiasSLA") ?? "7";
    const conversao = projeto.obterMetrica("taxaConversao") ?? "4.5";

    const corpo = [
      "============================================================",
      "💼 RELATÓRIO EXECUTIVO DE CAMPANHA & AGÊNCIA PUBLICITÁRIA",
      "============================================================",
      `Campanha: "${projeto.titulo}" (ID: ${projeto.id})`,
      `Investimento Total: R$ ${projeto.orcamento.toLocaleString("pt-BR")}`,
      `SLA Crítico de Entrega: ${sla} dias | Projeção de Conversão: ${conversao}%`,
      `Squad Criativo Alocado (${equipe.length}): ${nomesEquipe || "Nenhum membro alocado"}`,
      `Status Executivo / Aprovação: ${mensagem}`,
      "Ação Imediata: Enviar peças e cortes para aprovação da marca e mídia online.",
      "============================================================"
    ].join("\n");

    this.notificarObservadores("NOTIFICACAO_PUBLICITARIO_EMITIDA", {
      projetoId: projeto.id,
      titulo: projeto.titulo,
      totalEquipe: equipe.length,
      mensagem
    });

    return corpo;
  }
}
