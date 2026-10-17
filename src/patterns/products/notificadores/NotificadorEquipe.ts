import { Projeto } from "../../prototype/Projeto";
import { Profissional } from "../../../models/Profissional";

export interface NotificadorEquipe {
  notificar(projeto: Projeto, equipe: Profissional[], mensagem: string): string;
}
