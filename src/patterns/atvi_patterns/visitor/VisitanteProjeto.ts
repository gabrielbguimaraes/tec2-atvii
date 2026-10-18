import { Projeto } from "../../prototype/Projeto";
import { Profissional } from "../../../models/Profissional";

export interface VisitanteProjeto {
  visitarProjeto(projeto: Projeto): any;
  visitarProfissional(profissional: Profissional): any;
  visitar?(projeto: Projeto): void;
}

export interface ElementoProjeto {
  aceitar(visitante: VisitanteProjeto): void;
}
