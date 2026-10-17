import { Projeto } from "./Projeto";
import { TipoProjeto } from "../../models/Tipos";
import { PapelProjeto } from "../../models/PapelProjeto";
import { RestricaoProjeto } from "../../models/RestricaoProjeto";

export class ProjetoDocumentario extends Projeto {
  constructor(
    id: string,
    titulo: string,
    orcamento: number,
    papeis: PapelProjeto[] = [],
    restricoes: RestricaoProjeto[] = [],
    metricasEspecificas: Record<string, number | string> = {},
    public pesquisaHistoricaProfunda: boolean = true,
    public licenciamentoArquivosObrigatorio: boolean = true,
    public equipeCampoEnxuta: boolean = true,
    public fontesVerificadas: number = 0
  ) {
    super(id, titulo, orcamento, papeis, restricoes, metricasEspecificas);
    // Inicializa métricas específicas se não definidas
    if (this.metricasEspecificas["pesquisaHistorica"] === undefined) {
      this.metricasEspecificas["pesquisaHistorica"] = pesquisaHistoricaProfunda ? 1 : 0;
    }
    if (this.metricasEspecificas["fontesVerificadas"] === undefined) {
      this.metricasEspecificas["fontesVerificadas"] = fontesVerificadas;
    }
  }

  public obterTipo(): TipoProjeto {
    return TipoProjeto.DOCUMENTARIO;
  }

  public clonar(): ProjetoDocumentario {
    const { papeisClonados, restricoesClonadas, metricasClonadas } = this.clonarEstruturaBase();
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
      this.fontesVerificadas
    );
  }
}
