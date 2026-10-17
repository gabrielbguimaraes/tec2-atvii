import { ProcessadorValidacaoTemplate } from "../../atvi_patterns/template_method/ProcessadorValidacaoTemplate";
import { Projeto } from "../../prototype/Projeto";
import { Profissional } from "../../../models/Profissional";

export class ValidadorDocumentario extends ProcessadorValidacaoTemplate {
  protected validarRegrasEspecificas(
    projeto: Projeto,
    equipe: Profissional[],
    erros: string[],
    avisos: string[],
    mensagens: string[]
  ): void {
    mensagens.push("[ValidadorDocumentario] Executando validação de regras factuais e direitos de acervo...");

    // 1. Validação de restrição de direitos autorais / licenciamento de imagem
    const temRestricaoDireitos = projeto.restricoes.some(
      r => r.tipo.toUpperCase().includes("DIREITOS") || r.tipo.toUpperCase().includes("LICENCIAMENTO")
    );

    if (temRestricaoDireitos) {
      mensagens.push("Conformidade de direitos autorais e licenciamento de acervo histórico: Verificada.");
    } else {
      avisos.push("Projeto documental sem restrição expressa de licenciamento de arquivos de terceiros.");
    }

    // 2. Validação de equipe de campo enxuta (documentário requer mobilidade)
    if (equipe.length > 5) {
      avisos.push(`Equipe de campo documental com ${equipe.length} profissionais. Recomenda-se equipe enxuta para maior mobilidade.`);
    } else {
      mensagens.push(`Equipe de campo enxuta e ágil (${equipe.length} profissionais alocados).`);
    }

    // 3. Verificação de habilidades de pesquisa / verificação factual na equipe
    const possuiPesquisador = equipe.some(p =>
      p.temHabilidade("Pesquisa Histórica") ||
      p.temHabilidade("Verificação Factual") ||
      p.temTag("pesquisa")
    );

    if (!possuiPesquisador) {
      erros.push("Equipe documental inválida: nenhum profissional possui habilidades em Pesquisa Histórica ou Verificação Factual.");
    } else {
      mensagens.push("Profissional de pesquisa documental e checagem factual presente na equipe.");
    }
  }
}
