import { EstrategiaDocumentario, EstrategiaAnimacao, EstrategiaPublicitario } from "../src/patterns/atvi_patterns/strategy/EstrategiasConcretas";
import { SujeitoEventos, HistoricoAuditoriaObservador } from "../src/patterns/atvi_patterns/observer/ObservadorEvento";
import { EventoRecomendacao } from "../src/patterns/atvi_patterns/observer/EventoRecomendacao";
import { VisitanteCalculoCustos } from "../src/patterns/atvi_patterns/visitor/VisitanteCalculoCustos";
import { RegistroPrototiposProjeto } from "../src/patterns/prototype/RegistroPrototiposProjeto";
import { Profissional } from "../src/models/Profissional";
import { PapelProjeto } from "../src/models/PapelProjeto";
import { NivelExperiencia } from "../src/models/Tipos";
import { ValidadorDocumentario } from "../src/patterns/products/validadores/ValidadorDocumentario";
import { RecomendadorDocumentario } from "../src/patterns/products/recomendadores/RecomendadorDocumentario";
import { NotificadorDocumentario } from "../src/patterns/products/notificadores/NotificadorDocumentario";

describe("Integração dos Padrões Comportamentais da ATVI (Strategy, Observer, Visitor)", () => {
  let registro: RegistroPrototiposProjeto;

  beforeEach(() => {
    registro = new RegistroPrototiposProjeto();
  });

  describe("Strategy Pattern", () => {
    it("deve atribuir bônus com base na especialidade da estratégia", () => {
      const projeto = registro.obter("DOCUMENTARIO");
      const papel = new PapelProjeto("p1", "Pesquisador", NivelExperiencia.SENIOR, ["Pesquisa Histórica"]);

      const profDoc = new Profissional(
        "p-1",
        "Ana",
        "Pesquisadora",
        NivelExperiencia.SENIOR,
        ["Pesquisa Histórica", "Entrevistas"],
        100,
        true,
        10,
        90,
        ["pesquisa"]
      );

      const estrategiaDoc = new EstrategiaDocumentario();
      const pontuacaoDoc = estrategiaDoc.calcularPontuacao(profDoc, papel, projeto);

      const estrategiaAnim = new EstrategiaAnimacao();
      const pontuacaoAnim = estrategiaAnim.calcularPontuacao(profDoc, papel, projeto);

      // Ana possui habilidades de pesquisa, recebendo maior pontuação na estratégia de documentário
      expect(pontuacaoDoc).toBeGreaterThan(pontuacaoAnim);
    });

    it("deve valorizar competências 3D na Estratégia de Animação", () => {
      const projeto = registro.obter("ANIMACAO");
      const papel = new PapelProjeto("p2", "Modelador", NivelExperiencia.PLENO, ["Modelagem 3D"]);

      const profAnim = new Profissional(
        "p-2",
        "Bruno",
        "Modelador 3D",
        NivelExperiencia.PLENO,
        ["Modelagem 3D", "Maya", "Blender"],
        120,
        true,
        6,
        95,
        ["3d"]
      );

      const pontuacaoAnim = new EstrategiaAnimacao().calcularPontuacao(profAnim, papel, projeto);
      const pontuacaoPub = new EstrategiaPublicitario().calcularPontuacao(profAnim, papel, projeto);

      expect(pontuacaoAnim).toBeGreaterThan(pontuacaoPub);
    });

    it("deve implementar RecomendacaoStrategy retornando Map<Papel, Profissional[]>", () => {
      const projeto = registro.obter("DOCUMENTARIO");
      const recomendador = new RecomendadorDocumentario();
      const prof = new Profissional("p-1", "Ana", "Pesquisadora", NivelExperiencia.SENIOR, ["Pesquisa Histórica"], 100);

      const resultado = recomendador.recomendar(projeto, [prof]);
      expect(resultado).toBeInstanceOf(Map);
    });
  });

  describe("Observer Pattern", () => {
    it("deve notificar observadores inscritos quando eventos forem disparados", () => {
      const sujeito = new SujeitoEventos();
      const observador = new HistoricoAuditoriaObservador();

      sujeito.inscrever(observador);

      sujeito.notificarObservadores("PROJETO_ORQUESTRADO", {
        titulo: "Documentário Teste",
        status: "SUCESSO"
      });

      expect(observador.logs.length).toBe(1);
      expect(observador.obterUltimoLog()?.evento).toBe("PROJETO_ORQUESTRADO");
      expect(observador.obterUltimoLog()?.dados["titulo"]).toBe("Documentário Teste");

      // Teste de desinscrição
      sujeito.desinscrever(observador);
      sujeito.notificarObservadores("OUTRO_EVENTO", {});
      expect(observador.logs.length).toBe(1);
    });

    it("deve notificar observadores implementando a interface Observador com EventoRecomendacao", () => {
      const notificador = new NotificadorDocumentario();
      const projeto = registro.obter("DOCUMENTARIO");
      const evento = new EventoRecomendacao("RECOMENDACAO_CONCLUIDA", projeto, new Map(), "Equipe aprovada");

      notificador.atualizar(evento);
      expect(notificador.ultimoRelatorio).toContain("DIÁRIO DE CAMPO & PRODUÇÃO DOCUMENTAL");
    });
  });

  describe("Visitor Pattern", () => {
    it("deve percorrer e calcular métricas de projeto corretamente", () => {
      const projeto = registro.obter("PUBLICITARIO");
      const visitante = new VisitanteCalculoCustos();

      projeto.aceitar(visitante);

      expect(visitante.relatorio.tipoProjeto).toBe("PUBLICITARIO");
      expect(visitante.relatorio.totalPapeis).toBe(3);
      expect(visitante.relatorio.restricoesCriticas).toBe(2);
      expect(visitante.relatorio.orcamentoTotal).toBe(85000);
      expect(visitante.relatorio.custoMedioPorPapel).toBeGreaterThan(0);
    });

    it("deve visitarProjeto e visitarProfissional com ValidadorDocumentario (VisitanteProjeto)", () => {
      const projeto = registro.obter("DOCUMENTARIO");
      const validador = new ValidadorDocumentario();

      const projetoValido = validador.visitarProjeto(projeto);
      expect(projetoValido).toBe(true);

      const profApto = new Profissional("p-1", "Ana", "Pesquisadora", NivelExperiencia.SENIOR, ["Pesquisa Histórica"], 100);
      expect(validador.visitarProfissional(profApto)).toBe(true);

      const profIndisponivel = new Profissional("p-2", "Beto", "Auxiliar", NivelExperiencia.JUNIOR, [], 50, false);
      expect(validador.visitarProfissional(profIndisponivel)).toBe(false);
    });
  });
});
