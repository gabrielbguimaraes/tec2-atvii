import { Projeto } from "./Projeto";
import { TipoProjeto } from "../../models/Tipos";
import { PapelProjeto } from "../../models/PapelProjeto";
import { RestricaoProjeto } from "../../models/RestricaoProjeto";

export class ProjetoPublicitario extends Projeto {
  constructor(
    id: string,
    titulo: string,
    orcamento: number,
    papeis: PapelProjeto[] = [],
    restricoes: RestricaoProjeto[] = [],
    metricasEspecificas: Record<string, number | string> = {},
    public prazoDiasSLA: number = 7,
    public agenciaParceira: string = "Agência Criativa Global",
    public marcaCliente: string = "Marca Premium",
    public conformidadeBrandbook: boolean = true,
    public taxaConversaoEsperada: number = 4.5
  ) {
    super(id, titulo, orcamento, papeis, restricoes, metricasEspecificas);
    if (this.metricasEspecificas["prazoDiasSLA"] === undefined) {
      this.metricasEspecificas["prazoDiasSLA"] = prazoDiasSLA;
    }
    if (this.metricasEspecificas["taxaConversao"] === undefined) {
      this.metricasEspecificas["taxaConversao"] = taxaConversaoEsperada;
    }
  }

  public obterTipo(): TipoProjeto {
    return TipoProjeto.PUBLICITARIO;
  }

  public clonar(): ProjetoPublicitario {
    const { papeisClonados, restricoesClonadas, metricasClonadas } = this.clonarEstruturaBase();
    return new ProjetoPublicitario(
      `${this.id}_clone_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      this.titulo,
      this.orcamento,
      papeisClonados,
      restricoesClonadas,
      metricasClonadas,
      this.prazoDiasSLA,
      this.agenciaParceira,
      this.marcaCliente,
      this.conformidadeBrandbook,
      this.taxaConversaoEsperada
    );
  }
}
