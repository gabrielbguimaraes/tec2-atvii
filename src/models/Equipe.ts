import { Papel } from "./PapelProjeto";
import { Profissional } from "./Profissional";
import { ResultadoValidacao } from "./ResultadoValidacao";

export class Equipe {
  constructor(
    public membros: Map<Papel, Profissional[]> = new Map(),
    public projeto?: any,
    public validacao: ResultadoValidacao = ResultadoValidacao.sucesso(),
    public notificacao: string = ""
  ) {}

  public get equipe(): Profissional[] {
    return this.obterTodosProfissionais();
  }

  public get length(): number {
    return this.obterTodosProfissionais().length;
  }

  public obterTodosProfissionais(): Profissional[] {
    const todos: Profissional[] = [];
    const ids = new Set<string>();
    for (const lista of this.membros.values()) {
      for (const p of lista) {
        if (!ids.has(p.id)) {
          ids.add(p.id);
          todos.push(p);
        }
      }
    }
    return todos;
  }

  public some(predicate: (p: Profissional) => boolean): boolean {
    return this.obterTodosProfissionais().some(predicate);
  }

  public filter(predicate: (p: Profissional) => boolean): Profissional[] {
    return this.obterTodosProfissionais().filter(predicate);
  }

  public map<T>(callback: (p: Profissional, index: number) => T): T[] {
    return this.obterTodosProfissionais().map(callback);
  }

  public forEach(callback: (p: Profissional, index: number) => void): void {
    this.obterTodosProfissionais().forEach(callback);
  }

  public [Symbol.iterator](): IterableIterator<Profissional> {
    return this.obterTodosProfissionais()[Symbol.iterator]();
  }

  public adicionarMembro(papel: Papel, profissional: Profissional): void {
    let lista = this.membros.get(papel);
    if (!lista) {
      lista = [];
      this.membros.set(papel, lista);
    }
    if (!lista.some(p => p.id === profissional.id)) {
      lista.push(profissional);
    }
  }

  public obterProfissionaisPorPapel(papel: Papel): Profissional[] {
    return this.membros.get(papel) ?? [];
  }
}
