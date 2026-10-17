import { Projeto } from "../prototype/Projeto";
import { ValidadorProjeto } from "../products/validadores/ValidadorProjeto";
import { RecomendadorProfissionais } from "../products/recomendadores/RecomendadorProfissionais";
import { NotificadorEquipe } from "../products/notificadores/NotificadorEquipe";

/**
 * Interface Abstract Factory: declara os Factory Methods para criação
 * de toda a família de produtos coesos de um tipo de projeto audiovisual.
 */
export interface FabricaProjeto {
  criarProjeto(titulo?: string, orcamento?: number): Projeto;
  criarValidador(): ValidadorProjeto;
  criarRecomendador(): RecomendadorProfissionais;
  criarNotificador(): NotificadorEquipe;
}
