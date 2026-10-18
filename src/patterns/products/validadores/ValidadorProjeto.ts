import { Projeto } from "../../prototype/Projeto";
import { Profissional } from "../../../models/Profissional";
import { ResultadoValidacao } from "../../../models/ResultadoValidacao";
import { VisitanteProjeto } from "../../atvi_patterns/visitor/VisitanteProjeto";

export interface ValidadorProjeto extends VisitanteProjeto {
  visitarProjeto(projeto: Projeto): boolean;
  visitarProfissional(profissional: Profissional): boolean;
  validar(projeto: Projeto, equipe: Profissional[]): ResultadoValidacao;
}
