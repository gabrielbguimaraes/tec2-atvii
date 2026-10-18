import { Projeto } from "../prototype/Projeto";
import { VisitanteProjeto } from "../atvi_patterns/visitor/VisitanteProjeto";
import { RecomendacaoStrategy } from "../atvi_patterns/strategy/RecomendacaoStrategy";
import { Observador } from "../atvi_patterns/observer/Observador";

/**
 * Interface Abstract Factory oficial da ATVII:
 * Declara a família de criação consistente de produtos (Visitor, Strategy, Observer e Prototype).
 */
export interface FabricaProjeto {
  criarProjeto(dados?: any, orcamento?: number): Projeto;
  criarValidador(): VisitanteProjeto;
  criarRecomendador(): RecomendacaoStrategy;
  criarNotificador(): Observador;
}
