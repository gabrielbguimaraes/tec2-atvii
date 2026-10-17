import { Prototipo } from "./Prototipo";
import { PapelProjeto } from "../../models/PapelProjeto";
import { RestricaoProjeto } from "../../models/RestricaoProjeto";
import { TipoProjeto } from "../../models/Tipos";
import { VisitanteProjeto, ElementoProjeto } from "../atvi_patterns/visitor/VisitanteProjeto";

export abstract class Projeto implements Prototipo<Projeto>, ElementoProjeto {
  constructor(
    public readonly id: string,
    public titulo: string,
    public orcamento: number,
    public papeis: PapelProjeto[] = [],
    public restricoes: RestricaoProjeto[] = [],
    public metricasEspecificas: Record<string, number | string> = {}
  ) {}

  public abstract clonar(): Projeto;

  public abstract obterTipo(): TipoProjeto | string;

  public adicionarPapel(papel: PapelProjeto): void {
    this.papeis.push(papel);
  }

  public adicionarRestricao(restricao: RestricaoProjeto): void {
    this.restricoes.push(restricao);
  }

  public definirMetrica(chave: string, valor: number | string): void {
    this.metricasEspecificas[chave] = valor;
  }

  public obterMetrica(chave: string): number | string | undefined {
    return this.metricasEspecificas[chave];
  }

  public aceitar(visitante: VisitanteProjeto): void {
    visitante.visitar(this);
  }

  /**
   * Utilitário para realizar a clonagem profunda (deep copy) dos atributos base
   */
  protected clonarEstruturaBase(): {
    papeisClonados: PapelProjeto[];
    restricoesClonadas: RestricaoProjeto[];
    metricasClonadas: Record<string, number | string>;
  } {
    const papeisClonados = this.papeis.map(p => p.clonar());
    const restricoesClonadas = this.restricoes.map(r => r.clonar());
    const metricasClonadas: Record<string, number | string> = { ...this.metricasEspecificas };

    return {
      papeisClonados,
      restricoesClonadas,
      metricasClonadas
    };
  }
}
