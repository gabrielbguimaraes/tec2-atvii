import { Profissional } from "../../../models/Profissional";
import { PapelProjeto } from "../../../models/PapelProjeto";
import { Projeto } from "../../prototype/Projeto";

export interface EstrategiaPontuacao {
  calcularPontuacao(candidato: Profissional, papel: PapelProjeto, projeto: Projeto): number;
}
