import { RecomendadorProfissionais } from "./RecomendadorProfissionais";
import { Projeto } from "../../prototype/Projeto";
import { Profissional } from "../../../models/Profissional";
import { EstrategiaPontuacao } from "../../atvi_patterns/strategy/EstrategiaPontuacao";

export abstract class RecomendadorBase implements RecomendadorProfissionais {
  constructor(protected readonly estrategia: EstrategiaPontuacao) {}

  public recomendar(projeto: Projeto, candidatos: Profissional[]): Profissional[] {
    const equipeSelecionada: Profissional[] = [];
    const idsAlocados = new Set<string>();

    for (const papel of projeto.papeis) {
      let vagasPreenchidas = 0;

      // Filtra candidatos disponíveis e ainda não alocados no projeto
      const candidatosElegiveis = candidatos
        .filter(c => c.disponivel && !idsAlocados.has(c.id))
        .map(c => ({
          candidato: c,
          pontuacao: this.estrategia.calcularPontuacao(c, papel, projeto)
        }))
        .filter(item => item.pontuacao > 0)
        .sort((a, b) => b.pontuacao - a.pontuacao);

      for (const item of candidatosElegiveis) {
        if (vagasPreenchidas >= papel.quantidade) break;
        equipeSelecionada.push(item.candidato);
        idsAlocados.add(item.candidato.id);
        vagasPreenchidas++;
      }
    }

    return equipeSelecionada;
  }
}
