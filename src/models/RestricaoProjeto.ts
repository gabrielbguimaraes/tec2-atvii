import { SeveridadeRestricao } from "./Tipos";
import { Prototipo } from "../patterns/prototype/Prototipo";

export class RestricaoProjeto implements Prototipo<RestricaoProjeto> {
  constructor(
    public readonly id: string,
    public tipo: string,
    public descricao: string,
    public severidade: SeveridadeRestricao,
    public obrigatoria: boolean = true,
    public parametros: Record<string, string | number | boolean> = {}
  ) {}

  public clonar(): RestricaoProjeto {
    return new RestricaoProjeto(
      this.id,
      this.tipo,
      this.descricao,
      this.severidade,
      this.obrigatoria,
      { ...this.parametros }
    );
  }
}
