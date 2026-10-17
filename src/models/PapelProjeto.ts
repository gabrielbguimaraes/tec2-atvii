import { NivelExperiencia } from "./Tipos";
import { Prototipo } from "../patterns/prototype/Prototipo";

export class PapelProjeto implements Prototipo<PapelProjeto> {
  constructor(
    public readonly id: string,
    public nome: string,
    public nivelMinimo: NivelExperiencia,
    public habilidadesExigidas: string[],
    public quantidade: number = 1
  ) {}

  public clonar(): PapelProjeto {
    return new PapelProjeto(
      this.id,
      this.nome,
      this.nivelMinimo,
      [...this.habilidadesExigidas],
      this.quantidade
    );
  }

  public adicionarHabilidade(habilidade: string): void {
    if (!this.habilidadesExigidas.includes(habilidade)) {
      this.habilidadesExigidas.push(habilidade);
    }
  }

  public temHabilidade(habilidade: string): boolean {
    return this.habilidadesExigidas.includes(habilidade);
  }
}
