import { Projeto } from "../../prototype/Projeto";
import { Papel } from "../../../models/PapelProjeto";
import { Profissional } from "../../../models/Profissional";

export class EventoRecomendacao {
  constructor(
    public readonly tipo: string,
    public readonly projeto: Projeto,
    public readonly equipe: Map<Papel, Profissional[]> | Profissional[] = new Map(),
    public readonly mensagem: string = "",
    public readonly timestamp: Date = new Date(),
    public readonly dados: Record<string, unknown> = {}
  ) {}
}
