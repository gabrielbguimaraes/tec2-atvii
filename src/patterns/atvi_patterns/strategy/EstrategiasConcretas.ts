import { EstrategiaPontuacao } from "./EstrategiaPontuacao";
import { Profissional } from "../../../models/Profissional";
import { PapelProjeto } from "../../../models/PapelProjeto";
import { Projeto } from "../../prototype/Projeto";

export class EstrategiaPadrao implements EstrategiaPontuacao {
  public calcularPontuacao(candidato: Profissional, papel: PapelProjeto, _projeto: Projeto): number {
    if (!candidato.disponivel) return 0;

    let pontuacao = 10;

    // Correspondência de habilidades
    const habilidadesCombinadas = papel.habilidadesExigidas.filter(h =>
      candidato.temHabilidade(h)
    ).length;

    const percentualHabilidades = papel.habilidadesExigidas.length > 0
      ? habilidadesCombinadas / papel.habilidadesExigidas.length
      : 1;

    pontuacao += percentualHabilidades * 50;
    pontuacao += Math.min(candidato.experienciaAnos * 3, 20);
    pontuacao += (candidato.portfolioScore / 100) * 20;

    return Math.round(pontuacao * 100) / 100;
  }
}

export class EstrategiaDocumentario implements EstrategiaPontuacao {
  public calcularPontuacao(candidato: Profissional, papel: PapelProjeto, projeto: Projeto): number {
    const base = new EstrategiaPadrao().calcularPontuacao(candidato, papel, projeto);
    if (base === 0) return 0;

    let bonus = 0;
    // Prioriza pesquisa, entrevista, captação direta e verificação factual
    const tagsPrioritarias = ["pesquisa", "entrevistas", "verificação factual", "captação direta", "arquivo"];
    for (const tag of tagsPrioritarias) {
      if (candidato.temHabilidade(tag) || candidato.temTag(tag)) {
        bonus += 15;
      }
    }

    return Math.round((base + bonus) * 100) / 100;
  }
}

export class EstrategiaAnimacao implements EstrategiaPontuacao {
  public calcularPontuacao(candidato: Profissional, papel: PapelProjeto, projeto: Projeto): number {
    const base = new EstrategiaPadrao().calcularPontuacao(candidato, papel, projeto);
    if (base === 0) return 0;

    let bonus = 0;
    // Prioriza 3D, rigging, modelagem, render e animação de personagens
    const tagsPrioritarias = ["modelagem 3d", "maya", "blender", "rigging", "animação 3d", "houdini", "render"];
    for (const tag of tagsPrioritarias) {
      if (candidato.temHabilidade(tag) || candidato.temTag(tag)) {
        bonus += 15;
      }
    }

    return Math.round((base + bonus) * 100) / 100;
  }
}

export class EstrategiaPublicitario implements EstrategiaPontuacao {
  public calcularPontuacao(candidato: Profissional, papel: PapelProjeto, projeto: Projeto): number {
    const base = new EstrategiaPadrao().calcularPontuacao(candidato, papel, projeto);
    if (base === 0) return 0;

    let bonus = 0;
    // Prioriza agilidade comercial, direção de arte publicitária e pós-produção rápida
    const tagsPrioritarias = ["direção de arte", "agilidade comercial", "motion graphics", "pós-produção rápida", "brand"];
    for (const tag of tagsPrioritarias) {
      if (candidato.temHabilidade(tag) || candidato.temTag(tag)) {
        bonus += 15;
      }
    }

    return Math.round((base + bonus) * 100) / 100;
  }
}
