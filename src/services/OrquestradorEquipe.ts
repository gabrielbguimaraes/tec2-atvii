import { FabricaProjeto } from "../patterns/factory/FabricaProjeto";
import { Projeto } from "../patterns/prototype/Projeto";
import { Profissional } from "../models/Profissional";
import { ResultadoValidacao } from "../models/ResultadoValidacao";

export interface ResultadoOrquestracao {
  projeto: Projeto;
  equipe: Profissional[];
  validacao: ResultadoValidacao;
  notificacao: string;
}

/**
 * OrquestradorEquipe: responsável pela orquestração do ecossistema de produção audiovisual.
 *
 * REGRA ARQUITETURAL CRÍTICA:
 * Zero condicionais de tipo (sem if, else ou switch checando tipo de projeto).
 * Opera 100% acoplado exclusivamente à abstração FabricaProjeto (cumprindo OCP e DIP).
 */
export class OrquestradorEquipe {
  constructor(private readonly fabrica: FabricaProjeto) {}

  public orquestrar(
    titulo: string,
    orcamento: number,
    candidatos: Profissional[]
  ): ResultadoOrquestracao {
    // 1. Obtém a família de objetos coesos através da Abstract Factory
    const projeto = this.fabrica.criarProjeto(titulo, orcamento);
    const recomendador = this.fabrica.criarRecomendador();
    const validador = this.fabrica.criarValidador();
    const notificador = this.fabrica.criarNotificador();

    // 2. Recomenda a melhor equipe para os papéis do projeto
    const equipe = recomendador.recomendar(projeto, candidatos);

    // 3. Valida a conformidade técnica, orçamentária e operacional
    const validacao = validador.validar(projeto, equipe);

    // 4. Emite a notificação específica para o ecossistema do gênero
    const mensagemStatus = validacao.valido
      ? "Orquestração executada com sucesso. Equipe homologada e em prontidão."
      : `Orquestração concluída com ressalvas: ${validacao.erros.join("; ")}`;

    const notificacao = notificador.notificar(projeto, equipe, mensagemStatus);

    return {
      projeto,
      equipe,
      validacao,
      notificacao
    };
  }
}
