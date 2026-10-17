import { Projeto } from "../../prototype/Projeto";
import { Profissional } from "../../../models/Profissional";
import { ResultadoValidacao } from "../../../models/ResultadoValidacao";

export interface ValidadorProjeto {
  validar(projeto: Projeto, equipe: Profissional[]): ResultadoValidacao;
}
