import { Projeto } from "./Projeto";
import { TipoProjeto } from "../../models/Tipos";
import { PapelProjeto } from "../../models/PapelProjeto";
import { RestricaoProjeto } from "../../models/RestricaoProjeto";

export class ProjetoAnimacao extends Projeto {
  public pipelineSoftware: string[];

  constructor(
    id: string,
    titulo: string,
    orcamento: number,
    papeis: PapelProjeto[] = [],
    restricoes: RestricaoProjeto[] = [],
    metricasEspecificas: Record<string, number | string> = {},
    pipelineSoftware: string[] = ["Blender", "Maya", "Houdini"],
    public resolucaoRender: string = "4K",
    public eficienciaRenderFarmGhz: number = 85.5,
    public totalFrames: number = 7200,
    public taxaQuadrosPorSegundo: number = 24
  ) {
    super(id, titulo, orcamento, papeis, restricoes, metricasEspecificas);
    this.pipelineSoftware = [...pipelineSoftware];
    if (this.metricasEspecificas["totalFrames"] === undefined) {
      this.metricasEspecificas["totalFrames"] = totalFrames;
    }
    if (this.metricasEspecificas["eficienciaRender"] === undefined) {
      this.metricasEspecificas["eficienciaRender"] = eficienciaRenderFarmGhz;
    }
  }

  public obterTipo(): TipoProjeto {
    return TipoProjeto.ANIMACAO;
  }

  public clonar(): ProjetoAnimacao {
    const { papeisClonados, restricoesClonadas, metricasClonadas } = this.clonarEstruturaBase();
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
      this.taxaQuadrosPorSegundo
    );
  }
}
