import { Projeto } from "../src/patterns/prototype/Projeto";
import { FabricaProjeto } from "../src/patterns/factory/FabricaProjeto";
import { VisitanteProjeto } from "../src/patterns/atvi_patterns/visitor/VisitanteProjeto";
import { RecomendacaoStrategy } from "../src/patterns/atvi_patterns/strategy/RecomendacaoStrategy";
import { Observador } from "../src/patterns/atvi_patterns/observer/Observador";
import { EventoRecomendacao } from "../src/patterns/atvi_patterns/observer/EventoRecomendacao";
import { OrquestradorPadrao } from "../src/services/OrquestradorEquipe";
import { SistemaRecomendacao } from "../src/services/SistemaRecomendacao";
import { Profissional } from "../src/models/Profissional";
import { Papel, PapelProjeto } from "../src/models/PapelProjeto";
import { RestricaoProjeto } from "../src/models/RestricaoProjeto";
import { ResultadoValidacao } from "../src/models/ResultadoValidacao";
import { NivelExperiencia, SeveridadeRestricao } from "../src/models/Tipos";

/**
 * -------------------------------------------------------------------------------------------------
 * 4ª FAMÍLIA SIMULADA DE PRODUTOS AUDIOVISUAIS: REALIDADE VIRTUAL (VR / XR)
 * Criada exclusivamente neste arquivo de teste para demonstrar conformidade estrita com o
 * Princípio Aberto/Fechado (Open-Closed Principle - OCP).
 * -------------------------------------------------------------------------------------------------
 */

class ProjetoRealidadeVirtual extends Projeto {
  constructor(
    id: string,
    titulo: string,
    orcamento: number,
    papeis: PapelProjeto[] = [],
    restricoes: RestricaoProjeto[] = [],
    metricasEspecificas: Record<string, number | string> = {},
    public taxaAtualizacaoMinimaHz: number = 90,
    public latenciaMaximaMs: number = 20
  ) {
    super(id, titulo, orcamento, papeis, restricoes, metricasEspecificas, "REALIDADE_VIRTUAL");
    this.definirMetrica("taxaAtualizacaoHz", taxaAtualizacaoMinimaHz);
    this.definirMetrica("latenciaMs", latenciaMaximaMs);
  }

  public obterTipo(): string {
    return "REALIDADE_VIRTUAL";
  }

  public criarFabrica(): FabricaProjeto {
    return new FabricaRealidadeVirtual();
  }

  public clonar(): ProjetoRealidadeVirtual {
    const { papeisClonados, restricoesClonadas, metricasClonadas } = this.clonarEstruturaBase();
    return new ProjetoRealidadeVirtual(
      `${this.id}_vr_clone_${Date.now()}`,
      this.titulo,
      this.orcamento,
      papeisClonados,
      restricoesClonadas,
      metricasClonadas,
      this.taxaAtualizacaoMinimaHz,
      this.latenciaMaximaMs
    );
  }
}

class ValidadorRealidadeVirtual implements VisitanteProjeto {
  public visitarProjeto(projeto: Projeto): boolean {
    const latencia = Number(projeto.obterMetrica("latenciaMs") ?? 20);
    return latencia <= 20 && projeto.orcamento > 0;
  }

  public visitarProfissional(profissional: Profissional): boolean {
    return (
      profissional.disponivel &&
      (profissional.temHabilidade("Unity VR") || profissional.temHabilidade("Unreal XR") || profissional.temTag("vr"))
    );
  }

  public validar(projeto: Projeto, equipe: Profissional[]): ResultadoValidacao {
    const mensagens: string[] = ["[ValidadorVR] Validando latência motora e conforto visual (motion sickness)..."];
    const erros: string[] = [];

    const latencia = Number(projeto.obterMetrica("latenciaMs") ?? 20);
    if (latencia > 20) {
      erros.push(`Latência de ${latencia}ms excede o limiar de 20ms para conforto em VR.`);
    } else {
      mensagens.push("Métricas de latência estrita e taxa de 90 FPS em conformidade para headsets VR.");
    }

    const temEspecialistaUnityOuUnreal = equipe.some(p =>
      p.temHabilidade("Unity VR") || p.temHabilidade("Unreal XR") || p.temTag("vr")
    );

    if (!temEspecialistaUnityOuUnreal) {
      erros.push("Equipe de VR necessita de pelo menos um desenvolvedor com especialização em Unity VR ou Unreal XR.");
    } else {
      mensagens.push("Especialista em engines imersivas alocado na equipe de VR.");
    }

    return erros.length === 0
      ? ResultadoValidacao.sucesso(mensagens)
      : ResultadoValidacao.falha(erros, mensagens);
  }
}

class RecomendadorRealidadeVirtual implements RecomendacaoStrategy {
  public recomendar(projeto: Projeto, candidatos: Profissional[]): Map<Papel, Profissional[]> {
    const mapa = new Map<Papel, Profissional[]>();
    const selecionados = candidatos
      .filter(c => c.disponivel)
      .filter(c => c.temHabilidade("Unity VR") || c.temHabilidade("Unreal XR") || c.temTag("vr") || c.temHabilidade("Modelagem 3D"))
      .slice(0, 3);

    const primeiroPapel = projeto.papeis[0];
    if (primeiroPapel) {
      mapa.set(primeiroPapel, selecionados);
    }
    return mapa;
  }
}

class NotificadorRealidadeVirtual implements Observador {
  public ultimoRelatorio: string = "";

  public atualizar(evento: EventoRecomendacao): void {
    const todosProfs: Profissional[] = [];
    if (evento.equipe instanceof Map) {
      for (const lista of evento.equipe.values()) {
        if (Array.isArray(lista)) {
          todosProfs.push(...lista);
        } else {
          todosProfs.push(lista);
        }
      }
    } else if (Array.isArray(evento.equipe)) {
      todosProfs.push(...evento.equipe);
    }
    this.ultimoRelatorio = this.notificar(evento.projeto, todosProfs, evento.mensagem);
  }

  public notificar(projeto: Projeto, equipe: Profissional[], mensagem: string): string {
    return [
      "🥽 [DISPATCHER REALIDADE VIRTUAL & XR METAVERSO]",
      `Experiência Imersiva: "${projeto.titulo}"`,
      `Taxa de Atualização: ${projeto.obterMetrica("taxaAtualizacaoHz")} Hz`,
      `Desenvolvedores XR Alocados: ${equipe.map(p => p.nome).join(", ")}`,
      `Mensagem: ${mensagem}`
    ].join(" | ");
  }
}

class FabricaRealidadeVirtual implements FabricaProjeto {
  public criarProjeto(dados?: any, orcamento?: number): Projeto {
    const titulo = typeof dados === "string" ? dados : dados?.titulo ?? "Experiência de Realidade Virtual Imersiva";
    const valorOrcamento = typeof dados === "object" && dados?.orcamento !== undefined ? dados.orcamento : orcamento;

    const papeisVR = [
      new PapelProjeto(
        "papel-vr-dev",
        "Desenvolvedor Unity XR / Unreal VR",
        NivelExperiencia.SENIOR,
        ["Unity VR", "Unreal XR", "Oculus SDK"],
        1
      )
    ];

    const restricoesVR = [
      new RestricaoProjeto(
        "res-vr-fps",
        "PERFORMANCE_90FPS",
        "Otimização rigorosa de draw calls para manter 90 FPS estáveis",
        SeveridadeRestricao.CRITICA,
        true
      )
    ];

    return new ProjetoRealidadeVirtual(
      `vr_${Date.now()}`,
      titulo,
      valorOrcamento ?? 210000,
      papeisVR,
      restricoesVR,
      { latenciaMs: 16, taxaAtualizacaoHz: 90 }
    );
  }

  public criarValidador(): VisitanteProjeto {
    return new ValidadorRealidadeVirtual();
  }

  public criarRecomendador(): RecomendacaoStrategy {
    return new RecomendadorRealidadeVirtual();
  }

  public criarNotificador(): Observador {
    return new NotificadorRealidadeVirtual();
  }
}

describe("Teste 3: Extensibilidade & Princípio Aberto/Fechado (OCP)", () => {
  let candidatosVR: Profissional[];

  beforeEach(() => {
    candidatosVR = [
      new Profissional(
        "vr-01",
        "Lucas Neo",
        "Engenheiro de Realidade Virtual",
        NivelExperiencia.SENIOR,
        ["Unity VR", "Oculus SDK", "Shader Optimization"],
        180,
        true,
        9,
        98,
        ["vr", "xr"]
      ),
      new Profissional(
        "vr-02",
        "Sofia Morpheus",
        "Designer de Interação Háptica",
        NivelExperiencia.PLENO,
        ["Unreal XR", "Spatial Audio", "Haptics"],
        150,
        true,
        6,
        93,
        ["vr", "xr"]
      )
    ];
  });

  it("deve orquestrar uma nova família de Realidade Virtual sem modificar o código do OrquestradorEquipe / OrquestradorPadrao", () => {
    const fabricaVR = new FabricaRealidadeVirtual();

    // Injeta a nova fábrica diretamente no OrquestradorPadrao existente
    const orquestrador = new OrquestradorPadrao(fabricaVR);

    const resultado = orquestrador.orquestrar(
      "Simulador Cirúrgico Imersivo VR",
      250000,
      candidatosVR
    );

    // Validações comprovando que o ecossistema operou de forma coesa
    expect(resultado.projeto.obterTipo()).toBe("REALIDADE_VIRTUAL");
    expect(resultado.projeto.titulo).toBe("Simulador Cirúrgico Imersivo VR");
    expect(resultado.validacao.valido).toBe(true);
    expect(resultado.validacao.mensagens).toContain("Especialista em engines imersivas alocado na equipe de VR.");
    expect(resultado.equipe.length).toBeGreaterThan(0);
    expect(resultado.notificacao).toContain("[DISPATCHER REALIDADE VIRTUAL & XR METAVERSO]");
  });

  it("deve permitir registrar a 4ª fábrica dinamicamente no SistemaRecomendacao", () => {
    const sistema = new SistemaRecomendacao();

    // Registro dinâmico da nova fábrica sem modificar a classe SistemaRecomendacao
    sistema.registrarFabrica("REALIDADE_VIRTUAL", new FabricaRealidadeVirtual());

    expect(sistema.listarTiposRegistrados()).toContain("REALIDADE_VIRTUAL");

    const resultado = sistema.processarSolicitacao(
      "REALIDADE_VIRTUAL",
      "Passeio Histórico em Museu Virtual XR",
      190000,
      candidatosVR
    );

    expect(resultado.projeto.obterTipo()).toBe("REALIDADE_VIRTUAL");
    expect(resultado.validacao.valido).toBe(true);
    expect(resultado.equipe[0]?.nome).toBe("Lucas Neo");
  });

  it("deve permitir obter a fábrica a partir do próprio ProjetoRealidadeVirtual via Factory Method", () => {
    const fabricaVR = new FabricaRealidadeVirtual();
    const projetoVR = fabricaVR.criarProjeto("Tour Virtual", 200000);
    const fabricaObtida = projetoVR.criarFabrica();

    expect(fabricaObtida).toBeInstanceOf(FabricaRealidadeVirtual);

    const sistema = new SistemaRecomendacao();
    const resultado = sistema.processarSolicitacao(projetoVR, undefined, undefined, candidatosVR);
    expect(resultado.projeto).toBe(projetoVR);
    expect(resultado.equipe.length).toBeGreaterThan(0);
  });
});
