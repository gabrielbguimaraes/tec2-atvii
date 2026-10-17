import { Projeto } from "../src/patterns/prototype/Projeto";
import { FabricaProjeto } from "../src/patterns/factory/FabricaProjeto";
import { ValidadorProjeto } from "../src/patterns/products/validadores/ValidadorProjeto";
import { RecomendadorProfissionais } from "../src/patterns/products/recomendadores/RecomendadorProfissionais";
import { NotificadorEquipe } from "../src/patterns/products/notificadores/NotificadorEquipe";
import { OrquestradorEquipe } from "../src/services/OrquestradorEquipe";
import { SistemaRecomendacao } from "../src/services/SistemaRecomendacao";
import { Profissional } from "../src/models/Profissional";
import { PapelProjeto } from "../src/models/PapelProjeto";
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
    super(id, titulo, orcamento, papeis, restricoes, metricasEspecificas);
    this.definirMetrica("taxaAtualizacaoHz", taxaAtualizacaoMinimaHz);
    this.definirMetrica("latenciaMs", latenciaMaximaMs);
  }

  public obterTipo(): string {
    return "REALIDADE_VIRTUAL";
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

class ValidadorRealidadeVirtual implements ValidadorProjeto {
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

class RecomendadorRealidadeVirtual implements RecomendadorProfissionais {
  public recomendar(_projeto: Projeto, candidatos: Profissional[]): Profissional[] {
    // Prioriza profissionais com tags ou habilidades em VR / XR
    return candidatos
      .filter(c => c.disponivel)
      .filter(c => c.temHabilidade("Unity VR") || c.temHabilidade("Unreal XR") || c.temTag("vr") || c.temHabilidade("Modelagem 3D"))
      .slice(0, 3);
  }
}

class NotificadorRealidadeVirtual implements NotificadorEquipe {
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
  public criarProjeto(titulo?: string, orcamento?: number): Projeto {
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
      titulo ?? "Experiência de Realidade Virtual Imersiva",
      orcamento ?? 210000,
      papeisVR,
      restricoesVR,
      { latenciaMs: 16, taxaAtualizacaoHz: 90 }
    );
  }

  public criarValidador(): ValidadorProjeto {
    return new ValidadorRealidadeVirtual();
  }

  public criarRecomendador(): RecomendadorProfissionais {
    return new RecomendadorRealidadeVirtual();
  }

  public criarNotificador(): NotificadorEquipe {
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

  it("deve orquestrar uma nova família de Realidade Virtual sem modificar o código do OrquestradorEquipe", () => {
    const fabricaVR = new FabricaRealidadeVirtual();

    // Injeta a nova fábrica diretamente no OrquestradorEquipe existente
    const orquestrador = new OrquestradorEquipe(fabricaVR);

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
});
