import { FabricaProjeto } from "../patterns/factory/FabricaProjeto";
import { FabricaDocumentario } from "../patterns/factory/FabricaDocumentario";
import { FabricaAnimacao } from "../patterns/factory/FabricaAnimacao";
import { FabricaPublicitario } from "../patterns/factory/FabricaPublicitario";
import { OrquestradorEquipe, ResultadoOrquestracao } from "./OrquestradorEquipe";
import { TipoProjeto } from "../models/Tipos";
import { Profissional } from "../models/Profissional";

export class SistemaRecomendacao {
  private fabricas: Map<string, FabricaProjeto> = new Map();

  constructor() {
    this.registrarFabricasPadrao();
  }

  public registrarFabrica(tipo: TipoProjeto | string, fabrica: FabricaProjeto): void {
    const chave = String(tipo).toUpperCase();
    this.fabricas.set(chave, fabrica);
  }

  public obterFabrica(tipo: TipoProjeto | string): FabricaProjeto {
    const chave = String(tipo).toUpperCase();
    const fabrica = this.fabricas.get(chave);
    if (!fabrica) {
      throw new Error(`Nenhuma fábrica registrada para o tipo de projeto: "${tipo}"`);
    }
    return fabrica;
  }

  public processarSolicitacao(
    tipoProjeto: TipoProjeto | string,
    titulo: string,
    orcamento: number,
    candidatos: Profissional[]
  ): ResultadoOrquestracao {
    const fabrica = this.obterFabrica(tipoProjeto);
    const orquestrador = new OrquestradorEquipe(fabrica);
    return orquestrador.orquestrar(titulo, orcamento, candidatos);
  }

  public listarTiposRegistrados(): string[] {
    return Array.from(this.fabricas.keys());
  }

  private registrarFabricasPadrao(): void {
    this.registrarFabrica(TipoProjeto.DOCUMENTARIO, new FabricaDocumentario());
    this.registrarFabrica(TipoProjeto.ANIMACAO, new FabricaAnimacao());
    this.registrarFabrica(TipoProjeto.PUBLICITARIO, new FabricaPublicitario());
  }
}
