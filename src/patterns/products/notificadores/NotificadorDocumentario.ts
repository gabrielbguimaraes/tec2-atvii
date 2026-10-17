import { NotificadorEquipe } from "./NotificadorEquipe";
import { Projeto } from "../../prototype/Projeto";
import { Profissional } from "../../../models/Profissional";
import { SujeitoEventos } from "../../atvi_patterns/observer/ObservadorEvento";

export class NotificadorDocumentario extends SujeitoEventos implements NotificadorEquipe {
  public notificar(projeto: Projeto, equipe: Profissional[], mensagem: string): string {
    const nomesEquipe = equipe.map(p => `${p.nome} (${p.papelPrincipal})`).join(", ");
    const fontes = projeto.obterMetrica("fontesVerificadas") ?? "Não especificado";

    const corpo = [
      "============================================================",
      "📖 DIÁRIO DE CAMPO & PRODUÇÃO DOCUMENTAL (CINEBRIDGE)",
      "============================================================",
      `Projeto: "${projeto.titulo}" (ID: ${projeto.id})`,
      `Orçamento de Campo: R$ ${projeto.orcamento.toLocaleString("pt-BR")}`,
      `Fontes Históricas Verificadas: ${fontes}`,
      `Equipe de Campo Mobilizada (${equipe.length}): ${nomesEquipe || "Nenhum membro alocado"}`,
      `Status / Despacho: ${mensagem}`,
      "Diretriz: Manter registro fotográfico, termo de cessão e diário diário assinado.",
      "============================================================"
    ].join("\n");

    this.notificarObservadores("NOTIFICACAO_DOCUMENTARIO_EMITIDA", {
      projetoId: projeto.id,
      titulo: projeto.titulo,
      totalEquipe: equipe.length,
      mensagem
    });

    return corpo;
  }
}
