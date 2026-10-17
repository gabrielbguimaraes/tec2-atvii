import { RecomendadorBase } from "./RecomendadorBase";
import { EstrategiaPublicitario } from "../../atvi_patterns/strategy/EstrategiasConcretas";

export class RecomendadorPublicitario extends RecomendadorBase {
  constructor() {
    super(new EstrategiaPublicitario());
  }
}
