import { Projeto } from "../../prototype/Projeto";
import { Profissional } from "../../../models/Profissional";
import { ResultadoValidacao } from "../../../models/ResultadoValidacao";
import { ValidadorProjeto } from "../../products/validadores/ValidadorProjeto";

export abstract class ProcessadorValidacaoTemplate implements ValidadorProjeto {
  /**
   * Template Method: define o esqueleto do algoritmo de validação de projetos e equipes.
   */
  public validar(projeto: Projeto, equipe: Profissional[]): ResultadoValidacao {
    const mensagens: string[] = [];
    const erros: string[] = [];
    const avisos: string[] = [];

    // Etapa 1: Validação de disponibilidade de profissionais
    this.validarDisponibilidade(equipe, erros, mensagens);

    // Etapa 2: Validação de cobertura dos papéis mínimos exigidos
    this.validarCoberturaPapeis(projeto, equipe, erros, mensagens);

    // Etapa 3: Validação de teto orçamentário
    this.validarOrcamento(projeto, equipe, erros, avisos, mensagens);

    // Etapa 4: Passo primitivo abstrato (específico de cada família de projeto)
    this.validarRegrasEspecificas(projeto, equipe, erros, avisos, mensagens);

    // Etapa 5: Hook opcional pós-validação
    this.hookAposValidacao(projeto, equipe, mensagens);

    if (erros.length > 0) {
      return ResultadoValidacao.falha(erros, mensagens, avisos);
    }

    return ResultadoValidacao.sucesso(mensagens, avisos);
  }

  protected validarDisponibilidade(equipe: Profissional[], erros: string[], mensagens: string[]): void {
    const indisponiveis = equipe.filter(p => !p.disponivel);
    if (indisponiveis.length > 0) {
      erros.push(`Profissionais indisponíveis na equipe: ${indisponiveis.map(p => p.nome).join(", ")}`);
    } else {
      mensagens.push("Todos os membros da equipe estão disponíveis.");
    }
  }

  protected validarCoberturaPapeis(projeto: Projeto, equipe: Profissional[], erros: string[], mensagens: string[]): void {
    if (projeto.papeis.length === 0) {
      mensagens.push("Projeto sem papéis configurados.");
      return;
    }

    if (equipe.length === 0) {
      erros.push("Equipe vazia: nenhum papel foi atendido.");
      return;
    }

    mensagens.push(`Equipe alocada possui ${equipe.length} profissionais atendendo os papéis do projeto.`);
  }

  protected validarOrcamento(projeto: Projeto, equipe: Profissional[], erros: string[], avisos: string[], mensagens: string[]): void {
    // Estimativa de 160h por profissional
    const custoTotalEquipe = equipe.reduce((acc, p) => acc + p.custoHora * 160, 0);
    if (custoTotalEquipe > projeto.orcamento * 0.9) {
      avisos.push(`Custo estimado de equipe (R$ ${custoTotalEquipe.toFixed(2)}) consome mais de 90% do orçamento (R$ ${projeto.orcamento.toFixed(2)})`);
    }

    if (custoTotalEquipe > projeto.orcamento * 1.5) {
      erros.push(`Custo da equipe (R$ ${custoTotalEquipe.toFixed(2)}) excede criticamente o orçamento total (R$ ${projeto.orcamento.toFixed(2)})`);
    } else {
      mensagens.push(`Orçamento compatível. Custo projetado de equipe: R$ ${custoTotalEquipe.toFixed(2)}.`);
    }
  }

  /**
   * Método gancho/primitivo que cada família concreta deve implementar com suas regras específicas.
   */
  protected abstract validarRegrasEspecificas(
    projeto: Projeto,
    equipe: Profissional[],
    erros: string[],
    avisos: string[],
    mensagens: string[]
  ): void;

  /**
   * Hook opcional para extensões
   */
  protected hookAposValidacao(_projeto: Projeto, _equipe: Profissional[], _mensagens: string[]): void {}
}
