import { Prototipo } from "./Prototipo";
import { PapelProjeto, Papel } from "../../models/PapelProjeto";
import { RestricaoProjeto } from "../../models/RestricaoProjeto";
import { TipoProjeto } from "../../models/Tipos";
import { Profissional } from "../../models/Profissional";
import { VisitanteProjeto, ElementoProjeto } from "../atvi_patterns/visitor/VisitanteProjeto";
import type { FabricaProjeto } from "../factory/FabricaProjeto";

export abstract class Projeto implements Prototipo<Projeto>, ElementoProjeto {
  protected _id: string;
  protected _titulo: string;
  protected _genero: string;
  protected _duracao: number;
  protected _orcamento: number;
  protected _prazo: Date;
  protected _papeis: Papel[];
  protected _equipe: Map<Papel, Profissional[]>;
  protected _fabrica?: FabricaProjeto;
  protected _restricoes: RestricaoProjeto[];
  protected _metricasEspecificas: Record<string, number | string>;

  constructor(
    id: string,
    titulo: string = "Projeto Audiovisual",
    orcamento: number = 50000,
    papeis: Papel[] = [],
    restricoes: RestricaoProjeto[] = [],
    metricasEspecificas: Record<string, number | string> = {},
    genero?: string,
    duracao: number = 60,
    prazo?: Date,
    equipe: Map<Papel, Profissional[]> = new Map(),
    fabrica?: FabricaProjeto
  ) {
    this._id = id;
    this._titulo = titulo;
    this._orcamento = orcamento;
    this._papeis = [...papeis];
    this._restricoes = [...restricoes];
    this._metricasEspecificas = { ...metricasEspecificas };
    this._genero = genero ?? (this.obterTipo?.() ? String(this.obterTipo()) : "AUDIOVISUAL");
    this._duracao = duracao;
    this._prazo = prazo ? new Date(prazo.getTime()) : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    this._equipe = new Map(equipe);
    this._fabrica = fabrica;
  }

  // --- Getters e Setters Estritos do Diagrama UML ---
  public get id(): string {
    return this._id;
  }
  public set id(valor: string) {
    this._id = valor;
  }

  public get titulo(): string {
    return this._titulo;
  }
  public set titulo(valor: string) {
    this._titulo = valor;
  }

  public get genero(): string {
    return this._genero;
  }
  public set genero(valor: string) {
    this._genero = valor;
  }

  public get duracao(): number {
    return this._duracao;
  }
  public set duracao(valor: number) {
    this._duracao = valor;
  }

  public get orcamento(): number {
    return this._orcamento;
  }
  public set orcamento(valor: number) {
    this._orcamento = valor;
  }

  public get prazo(): Date {
    return this._prazo;
  }
  public set prazo(valor: Date) {
    this._prazo = valor;
  }

  public get papeis(): Papel[] {
    return this._papeis;
  }
  public set papeis(valor: Papel[]) {
    this._papeis = valor;
  }

  public get equipe(): Map<Papel, Profissional[]> {
    return this._equipe;
  }
  public set equipe(valor: Map<Papel, Profissional[]>) {
    this._equipe = valor;
  }

  public get fabrica(): FabricaProjeto | undefined {
    return this._fabrica;
  }
  public set fabrica(valor: FabricaProjeto | undefined) {
    this._fabrica = valor;
  }

  public get restricoes(): RestricaoProjeto[] {
    return this._restricoes;
  }
  public set restricoes(valor: RestricaoProjeto[]) {
    this._restricoes = valor;
  }

  public get metricasEspecificas(): Record<string, number | string> {
    return this._metricasEspecificas;
  }
  public set metricasEspecificas(valor: Record<string, number | string>) {
    this._metricasEspecificas = valor;
  }

  // --- Métodos Obrigatórios do Diagrama UML Oficial ---

  /**
   * Aceita a recomendação de um profissional para determinado papel no projeto.
   */
  public aceitarRecomendacao(papel: Papel, profissional: Profissional): void {
    let lista = this._equipe.get(papel);
    if (!lista) {
      lista = [];
      this._equipe.set(papel, lista);
    }
    if (!lista.some(p => p.id === profissional.id)) {
      lista.push(profissional);
    }
  }

  /**
   * Substitui um membro da equipe alocado para o papel.
   */
  public substituirMembro(papel: Papel, profissional: Profissional): void {
    const lista = this._equipe.get(papel);
    if (lista && lista.length > 0) {
      lista[0] = profissional;
    } else {
      this._equipe.set(papel, [profissional]);
    }
  }

  /**
   * Solicita a reavaliação de recomendações da equipe, resetando a alocação atual.
   */
  public solicitarReavaliacao(): void {
    this._equipe.clear();
  }

  /**
   * Padrão Prototype: Realiza a clonagem profunda (deep copy real) da instância.
   */
  public abstract clonar(): Projeto;

  /**
   * Padrão Factory Method: cada subclasse instancia sua respectiva fábrica concreta.
   */
  public abstract criarFabrica(): FabricaProjeto;

  public abstract obterTipo(): TipoProjeto | string;

  public adicionarPapel(papel: Papel): void {
    this._papeis.push(papel);
  }

  public adicionarRestricao(restricao: RestricaoProjeto): void {
    this._restricoes.push(restricao);
  }

  public definirMetrica(chave: string, valor: number | string): void {
    this._metricasEspecificas[chave] = valor;
  }

  public obterMetrica(chave: string): number | string | undefined {
    return this._metricasEspecificas[chave];
  }

  public aceitar(visitante: VisitanteProjeto): void {
    visitante.visitarProjeto(this);
    if (typeof visitante.visitar === "function") {
      visitante.visitar(this);
    }
  }

  /**
   * Utilitário para realizar cópia profunda (deep copy) de todos os agregados e atributos base.
   */
  protected clonarEstruturaBase(): {
    papeisClonados: PapelProjeto[];
    restricoesClonadas: RestricaoProjeto[];
    metricasClonadas: Record<string, number | string>;
    prazoClonado: Date;
    equipeClonada: Map<Papel, Profissional[]>;
  } {
    const papeisClonados = this._papeis.map(p => p.clonar());
    const restricoesClonadas = this._restricoes.map(r => r.clonar());
    const metricasClonadas: Record<string, number | string> = { ...this._metricasEspecificas };
    const prazoClonado = new Date(this._prazo.getTime());

    const equipeClonada = new Map<Papel, Profissional[]>();
    for (const [papel, profs] of this._equipe.entries()) {
      equipeClonada.set(papel.clonar ? papel.clonar() : papel, [...profs]);
    }

    return {
      papeisClonados,
      restricoesClonadas,
      metricasClonadas,
      prazoClonado,
      equipeClonada
    };
  }
}
