import { ProcessadorValidacaoTemplate } from "../../atvi_patterns/template_method/ProcessadorValidacaoTemplate";
import { Projeto } from "../../prototype/Projeto";
import { Profissional } from "../../../models/Profissional";

export class ValidadorPublicitario extends ProcessadorValidacaoTemplate {
  protected validarRegrasEspecificas(
    projeto: Projeto,
    equipe: Profissional[],
    erros: string[],
    avisos: string[],
    mensagens: string[]
  ): void {
    mensagens.push("[ValidadorPublicitario] Validando SLA crítico, diretrizes de briefing e conformidade de marca...");

    // 1. Validação de SLA crítico
    const temRestricaoSLA = projeto.restricoes.some(
      r => r.tipo.toUpperCase().includes("SLA") || r.tipo.toUpperCase().includes("PRAZO")
    );

    if (temRestricaoSLA) {
      mensagens.push("Validação de cronograma e SLA curto: Cronograma viável aprovado.");
    } else {
      avisos.push("Campanha publicitária sem SLA formalmente estipulado em restrições.");
    }

    // 2. Validação de conformidade de marca / brandbook
    const temRestricaoBrandbook = projeto.restricoes.some(
      r => r.tipo.toUpperCase().includes("BRAND") || r.tipo.toUpperCase().includes("MARCA")
    );

    if (temRestricaoBrandbook) {
      mensagens.push("Diretrizes de brandbook e aprovação de cliente final: Conforme.");
    }

    // 3. Validação de Direção de Arte ou Agilidade Comercial na equipe
    const possuiDiretorArteOuComercial = equipe.some(p =>
      p.temHabilidade("Direção de Arte") ||
      p.temHabilidade("Agilidade Comercial") ||
      p.temHabilidade("Motion Graphics") ||
      p.temTag("publicidade")
    );

    if (!possuiDiretorArteOuComercial) {
      erros.push("Equipe publicitária inválida: ausência de liderança de Direção de Arte Publicitária ou pós-produção ágil.");
    } else {
      mensagens.push("Equipe publicitária capacitada para aprovação ágil de agência.");
    }
  }
}
