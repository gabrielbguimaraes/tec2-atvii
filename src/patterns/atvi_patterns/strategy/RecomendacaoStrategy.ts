import { Projeto } from "../../prototype/Projeto";
import { Papel } from "../../../models/PapelProjeto";
import { Profissional } from "../../../models/Profissional";

export interface RecomendacaoStrategy {
  recomendar(projeto: Projeto, profissionais: Profissional[]): Map<Papel, Profissional[]>;
}
