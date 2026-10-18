import { Observador } from "./Observador";
import { EventoRecomendacao } from "./EventoRecomendacao";

export { Observador, EventoRecomendacao };

export interface ObservadorEvento {
  atualizar(evento: string, dados: Record<string, unknown>): void;
}

export class SujeitoEventos {
  private observadores: (Observador | ObservadorEvento)[] = [];

  public inscrever(observador: Observador | ObservadorEvento): void {
    if (!this.observadores.includes(observador)) {
      this.observadores.push(observador);
    }
  }

  public desinscrever(observador: Observador | ObservadorEvento): void {
    const idx = this.observadores.indexOf(observador);
    if (idx !== -1) {
      this.observadores.splice(idx, 1);
    }
  }

  public emitirEvento(evento: EventoRecomendacao): void {
    for (const obs of this.observadores) {
      if ("atualizar" in obs) {
        try {
          (obs as Observador).atualizar(evento);
        } catch {
          // Mantém desacoplamento de event dispatch
        }
      }
    }
  }

  public notificarObservadores(evento: string, dados: Record<string, unknown>): void {
    for (const obs of this.observadores) {
      if (typeof (obs as any).atualizar === "function") {
        try {
          (obs as any).atualizar(evento, dados);
        } catch {
          // Mantém desacoplamento de event dispatch
        }
      }
    }
  }
}

export class HistoricoAuditoriaObservador implements Observador, ObservadorEvento {
  public logs: { evento: string; dados: Record<string, unknown>; timestamp: Date }[] = [];

  public atualizar(eventoOuNome: EventoRecomendacao | string, dados?: Record<string, unknown>): void {
    if (typeof eventoOuNome === "string") {
      this.logs.push({
        evento: eventoOuNome,
        dados: dados ?? {},
        timestamp: new Date()
      });
    } else {
      this.logs.push({
        evento: eventoOuNome.tipo,
        dados: {
          projetoId: eventoOuNome.projeto.id,
          titulo: (eventoOuNome.projeto as any).titulo ?? eventoOuNome.projeto.genero,
          mensagem: eventoOuNome.mensagem,
          ...eventoOuNome.dados
        },
        timestamp: eventoOuNome.timestamp ?? new Date()
      });
    }
  }

  public obterUltimoLog(): { evento: string; dados: Record<string, unknown>; timestamp: Date } | undefined {
    return this.logs[this.logs.length - 1];
  }
}
