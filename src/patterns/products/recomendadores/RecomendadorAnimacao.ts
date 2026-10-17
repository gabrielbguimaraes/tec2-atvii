import { RecomendadorBase } from "./RecomendadorBase";
import { EstrategiaAnimacao } from "../../atvi_patterns/strategy/EstrategiasConcretas";

export class RecomendadorAnimacao extends RecomendadorBase {
  constructor() {
    super(new EstrategiaAnimacao());
  }
}
