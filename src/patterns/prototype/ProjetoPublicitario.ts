import { Projeto } from "./Projeto";
import { TipoProjeto } from "../../models/Tipos";
import { Papel } from "../../models/PapelProjeto";
import { RestricaoProjeto } from "../../models/RestricaoProjeto";
import { Profissional } from "../../models/Profissional";
import { FabricaPublicitario } from "../factory/FabricaPublicitario";
import type { FabricaProjeto } from "../factory/FabricaProjeto";

export class ProjetoPublicitario extends Projeto {
  public marcaCliente: string;
  public canaisVeiculacao: string[];

  constructor(
    id: string,
    titulo: string = "Campanha Comercial",
    orcamento: number = 85000,
    papeis: Papel[] = [],
    restricoes: RestricaoProjeto[] = [],
    metricasEspecificas: Record<string, number | string> = {},
    public prazoDiasSLA: number = 7,
    public agenciaParceira: string = "Agência Criativa Global",
    marcaCliente: string = "Marca Premium",
    public conformidadeBrandbook: boolean = true,
    public taxaConversaoEsperada: number = 4.5,
    canaisVeiculacao: string[] = ["TV Aberta", "YouTube", "Instagram", "TikTok"],
    duracao: number = 1,
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
      "PUBLICITARIO",
      duracao,
      prazo,
      equipe,
      fabrica
    );
    this.marcaCliente = marcaCliente;
    this.canaisVeiculacao = [...canaisVeiculacao];

    if (this._metricasEspecificas["prazoDiasSLA"] === undefined) {
      this._metricasEspecificas["prazoDiasSLA"] = prazoDiasSLA;
    }
    if (this._metricasEspecificas["taxaConversao"] === undefined) {
      this._metricasEspecificas["taxaConversao"] = taxaConversaoEsperada;
    }
  }

  public obterTipo(): TipoProjeto {
    return TipoProjeto.PUBLICITARIO;
  }

  /**
   * Padrão Factory Method: instancia a fábrica concreta correspondente.
   */
  public criarFabrica(): FabricaProjeto {
    return new FabricaPublicitario();
  }

  /**
   * Padrão Prototype: Realiza cópia profunda real (deep copy) de todos os agregados,
   * prazo e canais de veiculação.
   */
  public clonar(): ProjetoPublicitario {
    const { papeisClonados, restricoesClonadas, metricasClonadas, prazoClonado, equipeClonada } =
      this.clonarEstruturaBase();

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
      this.taxaConversaoEsperada,
      [...this.canaisVeiculacao],
      this.duracao,
      prazoClonado,
      equipeClonada,
      this.fabrica
    );
  }
}
