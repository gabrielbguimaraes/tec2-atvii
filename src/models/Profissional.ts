import { NivelExperiencia } from "./Tipos";

export class Profissional {
  constructor(
    public readonly id: string,
    public nome: string,
    public papelPrincipal: string,
    public nivel: NivelExperiencia,
    public habilidades: string[],
    public custoHora: number,
    public disponivel: boolean = true,
    public experienciaAnos: number = 0,
    public portfolioScore: number = 0,
    public tags: string[] = []
  ) {}

  public temHabilidade(habilidade: string): boolean {
    const normalizada = habilidade.toLowerCase().trim();
    return this.habilidades.some(h => h.toLowerCase().trim() === normalizada);
  }

  public temTag(tag: string): boolean {
    const normalizada = tag.toLowerCase().trim();
    return this.tags.some(t => t.toLowerCase().trim() === normalizada);
  }
}
