import { FabricaProjeto } from "./FabricaProjeto";
import { ProjetoPublicitario } from "../prototype/ProjetoPublicitario";
import { RegistroPrototiposProjeto } from "../prototype/RegistroPrototiposProjeto";
import { VisitanteProjeto } from "../atvi_patterns/visitor/VisitanteProjeto";
import { ValidadorPublicitario } from "../products/validadores/ValidadorPublicitario";
import { RecomendacaoStrategy } from "../atvi_patterns/strategy/RecomendacaoStrategy";
import { RecomendadorPublicitario } from "../products/recomendadores/RecomendadorPublicitario";
import { Observador } from "../atvi_patterns/observer/Observador";
import { NotificadorPublicitario } from "../products/notificadores/NotificadorPublicitario";

export class FabricaPublicitario implements FabricaProjeto {
  constructor(private readonly registro: RegistroPrototiposProjeto = new RegistroPrototiposProjeto()) {}

  public criarProjeto(dados?: any, orcamento?: number): ProjetoPublicitario {
    const titulo = typeof dados === "string" ? dados : dados?.titulo ?? "Nova Campanha Publicitária";
    const valorOrcamento = typeof dados === "object" && dados?.orcamento !== undefined ? dados.orcamento : orcamento;

    if (this.registro.tem("PUBLICITARIO")) {
      const clone = this.registro.clonar("PUBLICITARIO", titulo, valorOrcamento) as ProjetoPublicitario;
      if (typeof dados === "object") {
        if (dados.marcaCliente) clone.marcaCliente = dados.marcaCliente;
        if (dados.canaisVeiculacao) clone.canaisVeiculacao = [...dados.canaisVeiculacao];
      }
      return clone;
    }

    return new ProjetoPublicitario(
      `pub_${Date.now()}`,
      titulo,
      valorOrcamento ?? 85000
    );
  }

  public criarValidador(): VisitanteProjeto {
    return new ValidadorPublicitario();
  }

  public criarRecomendador(): RecomendacaoStrategy {
    return new RecomendadorPublicitario();
  }

  public criarNotificador(): Observador {
    return new NotificadorPublicitario();
  }
}
