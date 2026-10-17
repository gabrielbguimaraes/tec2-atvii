import { Projeto } from "../../prototype/Projeto";

export interface VisitanteProjeto {
  visitar(projeto: Projeto): void;
}

export interface ElementoProjeto {
  aceitar(visitante: VisitanteProjeto): void;
}
