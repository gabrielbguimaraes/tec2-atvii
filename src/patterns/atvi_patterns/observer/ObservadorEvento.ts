export interface ObservadorEvento {
  atualizar(evento: string, dados: Record<string, unknown>): void;
}

export class SujeitoEventos {
  private observadores: ObservadorEvento[] = [];

  public inscrever(observador: ObservadorEvento): void {
    if (!this.observadores.includes(observador)) {
      this.observadores.push(observador);
    }
  }

  public desinscrever(observador: ObservadorEvento): void {
    const idx = this.observadores.indexOf(observador);
    if (idx !== -1) {
      this.observadores.splice(idx, 1);
    }
  }

  public notificarObservadores(evento: string, dados: Record<string, unknown>): void {
    for (const obs of this.observadores) {
      obs.atualizar(evento, dados);
    }
  }
}

export class HistoricoAuditoriaObservador implements ObservadorEvento {
  public logs: { evento: string; dados: Record<string, unknown>; timestamp: Date }[] = [];

  public atualizar(evento: string, dados: Record<string, unknown>): void {
    this.logs.push({
      evento,
      dados,
      timestamp: new Date()
    });
  }

  public obterUltimoLog(): { evento: string; dados: Record<string, unknown>; timestamp: Date } | undefined {
    return this.logs[this.logs.length - 1];
  }
}
