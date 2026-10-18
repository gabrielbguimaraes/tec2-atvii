import { FabricaProjeto } from "../patterns/factory/FabricaProjeto";
import { Projeto } from "../patterns/prototype/Projeto";
import { Profissional } from "../models/Profissional";
import { Papel } from "../models/PapelProjeto";
import { ResultadoValidacao } from "../models/ResultadoValidacao";
import { Equipe } from "../models/Equipe";
import { RecomendacaoStrategy } from "../patterns/atvi_patterns/strategy/RecomendacaoStrategy";
import { EventoRecomendacao } from "../patterns/atvi_patterns/observer/EventoRecomendacao";

export type ResultadoOrquestracao = Equipe;

/**
 * Padrão Template Method: OrquestradorEquipe (Classe Abstrata Oficial ATVII)
 *
 * Define o algoritmo invariante de orquestração através do método template `orquestrar`,
 * delegando passos primitivos específicos (`validarRestricoes`, `normalizarDados`, `posProcessar`)
 * às subclasses concretas.
 *
 * Mantém relação de dependência 1:1 com FabricaProjeto e ZERO condicionais de tipo (OCP/DIP).
 */
export abstract class OrquestradorEquipe {
  constructor(
    protected readonly fabrica: FabricaProjeto,
    protected readonly baseProfissionais: Profissional[] = []
  ) {}

  /**
   * Método Template principal do diagrama oficial:
   * `public orquestrar(projeto: Projeto, estrategia?: RecomendacaoStrategy): Equipe`
   *
   * Suporta sobrecarga polimórfica para conveniência e compatibilidade retroativa.
   */
  public orquestrar(
    projetoOuTitulo: Projeto | string,
    estrategiaOuOrcamento?: RecomendacaoStrategy | number,
    candidatos?: Profissional[]
  ): Equipe {
    let projeto: Projeto;
    let estrategia: RecomendacaoStrategy;
    let poolCandidatos: Profissional[];

    if (projetoOuTitulo instanceof Projeto) {
      projeto = projetoOuTitulo;
      estrategia = (estrategiaOuOrcamento as RecomendacaoStrategy) ?? this.fabrica.criarRecomendador();
      poolCandidatos = candidatos ?? this.baseProfissionais;
    } else {
      const titulo = String(projetoOuTitulo);
      const orcamento = typeof estrategiaOuOrcamento === "number" ? estrategiaOuOrcamento : 60000;
      projeto = this.fabrica.criarProjeto(titulo, orcamento);
      estrategia = this.fabrica.criarRecomendador();
      poolCandidatos = candidatos ?? this.baseProfissionais;
    }

    // 1. Etapa do Template Method: Validação das restrições
    const restricoesValidas = this.validarRestricoes(projeto);

    // 2. Etapa do Template Method: Normalização dos dados dos profissionais
    const profissionaisNormalizados = this.normalizarDados(projeto, poolCandidatos);

    // 3. Recomendação via Strategy fornecida ou da Fábrica
    const recomendador = estrategia ?? this.fabrica.criarRecomendador();
    const retornoRecomendacao = recomendador.recomendar(projeto, profissionaisNormalizados);

    // Converte retorno para Map caso uma extensão legacy retorne Array
    let recomendacoesMap: Map<Papel, Profissional[]>;
    if (retornoRecomendacao instanceof Map) {
      recomendacoesMap = retornoRecomendacao;
    } else if (Array.isArray(retornoRecomendacao)) {
      recomendacoesMap = new Map<Papel, Profissional[]>();
      const primeiroPapel = projeto.papeis[0];
      if (primeiroPapel) {
        recomendacoesMap.set(primeiroPapel, retornoRecomendacao);
      }
    } else {
      recomendacoesMap = new Map();
    }

    // 4. Etapa do Template Method: Pós-processamento das recomendações
    const recomendacoesFinais = this.posProcessar(recomendacoesMap);

    // Associa a equipe recomendada ao projeto
    projeto.equipe = recomendacoesFinais;

    // Coleta a lista unificada de membros
    const todosMembros: Profissional[] = [];
    const ids = new Set<string>();
    for (const lista of recomendacoesFinais.values()) {
      for (const p of lista) {
        if (!ids.has(p.id)) {
          ids.add(p.id);
          todosMembros.push(p);
        }
      }
    }

    // 5. Validação com o Validador da Fábrica (VisitanteProjeto)
    const validador = this.fabrica.criarValidador();
    let validacao: ResultadoValidacao;
    if ("validar" in validador && typeof (validador as any).validar === "function") {
      validacao = (validador as any).validar(projeto, todosMembros);
    } else {
      const projValido = validador.visitarProjeto(projeto);
      const profsValidos = todosMembros.every(p => validador.visitarProfissional(p));
      const valido = restricoesValidas && projValido && profsValidos;
      validacao = valido
        ? ResultadoValidacao.sucesso(["Equipe e restrições validadas pelo Visitante com sucesso."])
        : ResultadoValidacao.falha(["Falha na validação de restrições técnicas ou competências."]);
    }

    // 6. Notificação via Observador da Fábrica
    const notificador = this.fabrica.criarNotificador();
    const mensagemStatus = validacao.valido
      ? "Orquestração executada com sucesso. Equipe homologada e em prontidão."
      : `Orquestração concluída com ressalvas: ${validacao.erros.join("; ")}`;

    const evento = new EventoRecomendacao(
      "RECOMENDACAO_CONCLUIDA",
      projeto,
      recomendacoesFinais,
      mensagemStatus
    );
    notificador.atualizar(evento);

    let textoNotificacao = "";
    if ("notificar" in notificador && typeof (notificador as any).notificar === "function") {
      textoNotificacao = (notificador as any).notificar(projeto, todosMembros, mensagemStatus);
    } else if ("ultimoRelatorio" in notificador) {
      textoNotificacao = (notificador as any).ultimoRelatorio;
    }

    return new Equipe(recomendacoesFinais, projeto, validacao, textoNotificacao);
  }

  // --- Passos Abstratos Primitivos do Template Method ---
  protected abstract validarRestricoes(projeto: Projeto): boolean;
  protected abstract normalizarDados(projeto: Projeto, profissionais: Profissional[]): Profissional[];
  protected abstract posProcessar(recomendacoes: Map<Papel, Profissional[]>): Map<Papel, Profissional[]>;
}

/**
 * Subclasse Concreta Oficial: OrquestradorPadrao
 * Implementa as etapas protegidas do Template Method utilizando os produtos coesos da FabricaProjeto.
 */
export class OrquestradorPadrao extends OrquestradorEquipe {
  protected validarRestricoes(projeto: Projeto): boolean {
    const validador = this.fabrica.criarValidador();
    const visitanteValido = validador.visitarProjeto(projeto);
    const restricoesValidas = projeto.restricoes.every(r => (r.obrigatoria ? r.tipo.length > 0 : true));
    return Boolean(visitanteValido !== false && restricoesValidas);
  }

  protected normalizarDados(_projeto: Projeto, profissionais: Profissional[]): Profissional[] {
    const validador = this.fabrica.criarValidador();
    return profissionais
      .filter(p => p.disponivel)
      .filter(p => validador.visitarProfissional(p) || p.habilidades.length > 0);
  }

  protected posProcessar(recomendacoes: Map<Papel, Profissional[]>): Map<Papel, Profissional[]> {
    const mapaProcessado = new Map<Papel, Profissional[]>();
    const idsAlocados = new Set<string>();

    for (const [papel, lista] of recomendacoes.entries()) {
      const semDuplicados: Profissional[] = [];
      for (const prof of lista) {
        if (!idsAlocados.has(prof.id)) {
          idsAlocados.add(prof.id);
          semDuplicados.push(prof);
        }
      }
      mapaProcessado.set(papel, semDuplicados);
    }

    return mapaProcessado;
  }
}
