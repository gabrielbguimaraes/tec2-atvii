import { Projeto } from "../../prototype/Projeto";
import { Profissional } from "../../../models/Profissional";

export interface RecomendadorProfissionais {
  recomendar(projeto: Projeto, candidatos: Profissional[]): Profissional[];
}
