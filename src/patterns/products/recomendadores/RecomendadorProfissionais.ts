import { Projeto } from "../../prototype/Projeto";
import { Profissional } from "../../../models/Profissional";
import { Papel } from "../../../models/PapelProjeto";
import { RecomendacaoStrategy } from "../../atvi_patterns/strategy/RecomendacaoStrategy";

export interface RecomendadorProfissionais extends RecomendacaoStrategy {
  recomendar(projeto: Projeto, candidatos: Profissional[]): Map<Papel, Profissional[]>;
}
