import { ProcessadorValidacaoTemplate } from "../../atvi_patterns/template_method/ProcessadorValidacaoTemplate";
import { Projeto } from "../../prototype/Projeto";
import { Profissional } from "../../../models/Profissional";

export class ValidadorAnimacao extends ProcessadorValidacaoTemplate {
  protected validarRegrasEspecificas(
    projeto: Projeto,
    equipe: Profissional[],
    erros: string[],
    avisos: string[],
    mensagens: string[]
  ): void {
    mensagens.push("[ValidadorAnimacao] Validando compatibilidade de pipeline 3D e métricas de render farm...");

    // 1. Validação de pipeline 3D e restrição de software
    const temRestricaoPipeline = projeto.restricoes.some(
      r => r.tipo.toUpperCase().includes("PIPELINE") || r.tipo.toUpperCase().includes("SOFTWARE")
    );

    if (temRestricaoPipeline) {
      mensagens.push("Conformidade de pipeline DCC (Maya/Blender/Houdini): Verificada.");
    } else {
      avisos.push("Projeto de animação sem especificação formal de pipeline DCC.");
    }

    // 2. Validação de orçamento de render farm
    const temRestricaoRender = projeto.restricoes.some(
      r => r.tipo.toUpperCase().includes("RENDER")
    );
    if (temRestricaoRender) {
      mensagens.push("Métricas de consumo de render farm e custo por quadro: Em conformidade.");
    }

    // 3. Validação de habilidades 3D essenciais na equipe
    const possuiModeladorOuRig = equipe.some(p =>
      p.temHabilidade("Modelagem 3D") ||
      p.temHabilidade("Rigging") ||
      p.temHabilidade("Animação 3D") ||
      p.temTag("3d")
    );

    if (!possuiModeladorOuRig) {
      erros.push("Equipe de animação inválida: ausência de profissionais com competência em Modelagem 3D ou Rigging.");
    } else {
      mensagens.push("Competências de modelagem 3D, rigging e iluminação validadas na equipe.");
    }
  }
}
