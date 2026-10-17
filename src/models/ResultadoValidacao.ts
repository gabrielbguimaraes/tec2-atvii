export class ResultadoValidacao {
  constructor(
    public readonly valido: boolean,
    public readonly mensagens: string[] = [],
    public readonly erros: string[] = [],
    public readonly avisos: string[] = [],
    public readonly detalhes: Record<string, unknown> = {}
  ) {}

  public static sucesso(mensagens: string[] = [], avisos: string[] = [], detalhes: Record<string, unknown> = {}): ResultadoValidacao {
    return new ResultadoValidacao(true, mensagens, [], avisos, detalhes);
  }

  public static falha(erros: string[], mensagens: string[] = [], avisos: string[] = [], detalhes: Record<string, unknown> = {}): ResultadoValidacao {
    return new ResultadoValidacao(false, mensagens, erros, avisos, detalhes);
  }
}
