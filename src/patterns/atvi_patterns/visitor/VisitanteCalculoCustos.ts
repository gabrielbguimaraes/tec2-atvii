import { VisitanteProjeto } from "./VisitanteProjeto";
import { Projeto } from "../../prototype/Projeto";
import { Profissional } from "../../../models/Profissional";

export interface MetricasAuditoriaProjeto {
  totalPapeis: number;
  totalVagas: number;
  totalRestricoes: number;
  restricoesCriticas: number;
  orcamentoTotal: number;
  custoMedioPorPapel: number;
  tipoProjeto: string;
}

export class VisitanteCalculoCustos implements VisitanteProjeto {
  public relatorio: MetricasAuditoriaProjeto = {
    totalPapeis: 0,
    totalVagas: 0,
    totalRestricoes: 0,
    restricoesCriticas: 0,
    orcamentoTotal: 0,
    custoMedioPorPapel: 0,
    tipoProjeto: ""
  };

  public visitarProjeto(projeto: Projeto): MetricasAuditoriaProjeto {
    const totalPapeis = projeto.papeis.length;
    const totalVagas = projeto.papeis.reduce((acc, p) => acc + p.quantidade, 0);
    const totalRestricoes = projeto.restricoes.length;
    const restricoesCriticas = projeto.restricoes.filter(r => r.severidade === "CRITICA").length;
    const orcamentoTotal = projeto.orcamento;
    const custoMedioPorPapel = totalVagas > 0 ? orcamentoTotal / totalVagas : 0;

    this.relatorio = {
      totalPapeis,
      totalVagas,
      totalRestricoes,
      restricoesCriticas,
      orcamentoTotal,
      custoMedioPorPapel: Math.round(custoMedioPorPapel * 100) / 100,
      tipoProjeto: String(projeto.obterTipo())
    };

    return this.relatorio;
  }

  public visitarProfissional(profissional: Profissional): boolean {
    return profissional.disponivel;
  }

  public visitar(projeto: Projeto): void {
    this.visitarProjeto(projeto);
  }
}
