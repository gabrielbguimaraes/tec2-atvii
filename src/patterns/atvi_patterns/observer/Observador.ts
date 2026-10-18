import { EventoRecomendacao } from "./EventoRecomendacao";

export interface Observador {
  atualizar(evento: EventoRecomendacao): void;
}
