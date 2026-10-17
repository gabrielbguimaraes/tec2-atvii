import { RecomendadorBase } from "./RecomendadorBase";
import { EstrategiaDocumentario } from "../../atvi_patterns/strategy/EstrategiasConcretas";

export class RecomendadorDocumentario extends RecomendadorBase {
  constructor() {
    super(new EstrategiaDocumentario());
  }
}
