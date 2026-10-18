import { Projeto } from "./Projeto";
import { TipoProjeto } from "../../models/Tipos";
import { Papel } from "../../models/PapelProjeto";
import { RestricaoProjeto } from "../../models/RestricaoProjeto";
import { Profissional } from "../../models/Profissional";
import { FabricaAnimacao } from "../factory/FabricaAnimacao";
import type { FabricaProjeto } from "../factory/FabricaProjeto";

export class ProjetoAnimacao extends Projeto {
  public estiloAnimacao: string;
  public softwareModelagem3D: string[];
  public pipelineSoftware: string[];

  constructor(
    id: string,
    titulo: string = "Curta de Animação 3D",
    orcamento: number = 140000,
    papeis: Papel[] = [],
    restricoes: RestricaoProjeto[] = [],
    metricasEspecificas: Record<string, number | string> = {},
    pipelineSoftware: string[] = ["Blender", "Maya", "Houdini"],
    public resolucaoRender: string = "4K",
    public eficienciaRenderFarmGhz: number = 85.5,
    public totalFrames: number = 7200,
    public taxaQuadrosPorSegundo: number = 24,
    estiloAnimacao: string = "3D Stylized",
    softwareModelagem3D: string[] = ["Maya", "Blender", "ZBrush"],
    duracao: number = 15,
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
      "ANIMACAO",
      duracao,
      prazo,
      equipe,
      fabrica
    );
    this.pipelineSoftware = [...pipelineSoftware];
    this.estiloAnimacao = estiloAnimacao;
    this.softwareModelagem3D = [...softwareModelagem3D];

    if (this._metricasEspecificas["totalFrames"] === undefined) {
      this._metricasEspecificas["totalFrames"] = totalFrames;
    }
    if (this._metricasEspecificas["eficienciaRender"] === undefined) {
      this._metricasEspecificas["eficienciaRender"] = eficienciaRenderFarmGhz;
    }
  }

  public obterTipo(): TipoProjeto {
    return TipoProjeto.ANIMACAO;
  }

  /**
   * Padrão Factory Method: instancia a fábrica concreta correspondente.
   */
  public criarFabrica(): FabricaProjeto {
    return new FabricaAnimacao();
  }

  /**
   * Padrão Prototype: Realiza cópia profunda real (deep copy) de todos os agregados,
   * pipeline de softwares e softwares de modelagem 3D.
   */
  public clonar(): ProjetoAnimacao {
    const { papeisClonados, restricoesClonadas, metricasClonadas, prazoClonado, equipeClonada } =
      this.clonarEstruturaBase();

    return new ProjetoAnimacao(
      `${this.id}_clone_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      this.titulo,
      this.orcamento,
      papeisClonados,
      restricoesClonadas,
      metricasClonadas,
      [...this.pipelineSoftware],
      this.resolucaoRender,
      this.eficienciaRenderFarmGhz,
      this.totalFrames,
      this.taxaQuadrosPorSegundo,
      this.estiloAnimacao,
      [...this.softwareModelagem3D],
      this.duracao,
      prazoClonado,
      equipeClonada,
      this.fabrica
    );
  }
}
