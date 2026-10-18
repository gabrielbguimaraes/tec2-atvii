import { Projeto } from "./Projeto";
import { TipoProjeto } from "../../models/Tipos";
import { Papel } from "../../models/PapelProjeto";
import { RestricaoProjeto } from "../../models/RestricaoProjeto";
import { Profissional } from "../../models/Profissional";
import { FabricaDocumentario } from "../factory/FabricaDocumentario";
import type { FabricaProjeto } from "../factory/FabricaProjeto";

export class ProjetoDocumentario extends Projeto {
  public tema: string;
  public entrevistados: string[];

  constructor(
    id: string,
    titulo: string = "Documentário",
    orcamento: number = 60000,
    papeis: Papel[] = [],
    restricoes: RestricaoProjeto[] = [],
    metricasEspecificas: Record<string, number | string> = {},
    public pesquisaHistoricaProfunda: boolean = true,
    public licenciamentoArquivosObrigatorio: boolean = true,
    public equipeCampoEnxuta: boolean = true,
    public fontesVerificadas: number = 0,
    tema: string = "História e Memória Social",
    entrevistados: string[] = ["Especialistas Acadêmicos", "Testemunhas Oculares"],
    duracao: number = 75,
    prazo?: Date,
    equipe: Map<Papel, Profissional[]> = new Map(),
    fabrica?: FabricaProjeto
  ) {
    super(
      id,
      titulo,
      orcamento,
      papeis,
      restricoes,
      metricasEspecificas,
      "DOCUMENTARIO",
      duracao,
      prazo,
      equipe,
      fabrica
    );
    this.tema = tema;
    this.entrevistados = [...entrevistados];

    if (this._metricasEspecificas["pesquisaHistorica"] === undefined) {
      this._metricasEspecificas["pesquisaHistorica"] = pesquisaHistoricaProfunda ? 1 : 0;
    }
    if (this._metricasEspecificas["fontesVerificadas"] === undefined) {
      this._metricasEspecificas["fontesVerificadas"] = fontesVerificadas;
    }
  }

  public obterTipo(): TipoProjeto {
    return TipoProjeto.DOCUMENTARIO;
  }

  /**
   * Padrão Factory Method: instancia a fábrica concreta correspondente.
   */
  public criarFabrica(): FabricaProjeto {
    return new FabricaDocumentario();
  }

  /**
   * Padrão Prototype: Realiza cópia profunda real (deep copy) de todos os atributos,
   * incluindo agregados, data de prazo e a lista de entrevistados.
   */
  public clonar(): ProjetoDocumentario {
    const { papeisClonados, restricoesClonadas, metricasClonadas, prazoClonado, equipeClonada } =
      this.clonarEstruturaBase();

    return new ProjetoDocumentario(
      `${this.id}_clone_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      this.titulo,
      this.orcamento,
      papeisClonados,
      restricoesClonadas,
      metricasClonadas,
      this.pesquisaHistoricaProfunda,
      this.licenciamentoArquivosObrigatorio,
      this.equipeCampoEnxuta,
      this.fontesVerificadas,
      this.tema,
      [...this.entrevistados],
      this.duracao,
      prazoClonado,
      equipeClonada,
      this.fabrica
    );
  }
}
