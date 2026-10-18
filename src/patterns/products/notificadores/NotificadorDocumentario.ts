import { NotificadorEquipe } from "./NotificadorEquipe";
import { Projeto } from "../../prototype/Projeto";
import { Profissional } from "../../../models/Profissional";
import { SujeitoEventos } from "../../atvi_patterns/observer/ObservadorEvento";
import { Observador } from "../../atvi_patterns/observer/Observador";
import { EventoRecomendacao } from "../../atvi_patterns/observer/EventoRecomendacao";

export class NotificadorDocumentario extends SujeitoEventos implements Observador, NotificadorEquipe {
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
    const fontes = (projeto as any).fontesVerificadas ?? projeto.obterMetrica?.("fontesVerificadas") ?? "Não especificado";

    const corpo = [
      "============================================================",
      "📖 DIÁRIO DE CAMPO & PRODUÇÃO DOCUMENTAL (CINEBRIDGE)",
      "============================================================",
      `Projeto: "${(projeto as any).titulo || projeto.genero}" (ID: ${projeto.id})`,
      `Orçamento de Campo: R$ ${projeto.orcamento.toLocaleString("pt-BR")}`,
      `Fontes Históricas Verificadas: ${fontes}`,
      `Equipe de Campo Mobilizada (${equipe.length}): ${nomesEquipe || "Nenhum membro alocado"}`,
      `Status / Despacho: ${mensagem}`,
      "Diretriz: Manter registro fotográfico, termo de cessão e diário diário assinado.",
      "============================================================"
    ].join("\n");

    this.notificarObservadores("NOTIFICACAO_DOCUMENTARIO_EMITIDA", {
      projetoId: projeto.id,
      titulo: (projeto as any).titulo || projeto.genero,
      totalEquipe: equipe.length,
      mensagem
    });

    return corpo;
  }
}
