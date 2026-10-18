import { FabricaProjeto } from "../patterns/factory/FabricaProjeto";
import { FabricaDocumentario } from "../patterns/factory/FabricaDocumentario";
import { FabricaAnimacao } from "../patterns/factory/FabricaAnimacao";
import { FabricaPublicitario } from "../patterns/factory/FabricaPublicitario";
import { OrquestradorPadrao } from "./OrquestradorEquipe";
import { Equipe } from "../models/Equipe";
import { TipoProjeto } from "../models/Tipos";
import { Profissional } from "../models/Profissional";
import { Projeto } from "../patterns/prototype/Projeto";
import { RecomendacaoStrategy } from "../patterns/atvi_patterns/strategy/RecomendacaoStrategy";

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

  /**
   * Processa a solicitação de recomendação:
   * Identifica a FabricaProjeto adequada (diretamente ou via Factory Method do Projeto),
   * instancia o OrquestradorPadrao com essa fábrica e executa o fluxo completo.
   */
  public processarSolicitacao(
    tipoOuProjeto: TipoProjeto | string | Projeto,
    tituloOuEstrategia?: string | RecomendacaoStrategy,
    orcamento?: number,
    candidatos?: Profissional[]
  ): Equipe {
    let fabrica: FabricaProjeto;

    if (tipoOuProjeto instanceof Projeto) {
      const projeto = tipoOuProjeto;
      // Obtém via Factory Method do próprio projeto ou fábrica agregada
      fabrica = projeto.fabrica ?? projeto.criarFabrica();
      const orquestrador = new OrquestradorPadrao(fabrica);
      return orquestrador.orquestrar(
        projeto,
        tituloOuEstrategia as RecomendacaoStrategy,
        candidatos
      );
    } else {
      const tipo = String(tipoOuProjeto);
      fabrica = this.obterFabrica(tipo);
      const orquestrador = new OrquestradorPadrao(fabrica);
      const titulo = typeof tituloOuEstrategia === "string" ? tituloOuEstrategia : "Novo Projeto Audiovisual";
      return orquestrador.orquestrar(titulo, orcamento ?? 60000, candidatos ?? []);
    }
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
