import { OrquestradorEquipe } from "../src/services/OrquestradorEquipe";
import { FabricaDocumentario } from "../src/patterns/factory/FabricaDocumentario";
import { FabricaAnimacao } from "../src/patterns/factory/FabricaAnimacao";
import { FabricaPublicitario } from "../src/patterns/factory/FabricaPublicitario";
import { ProjetoDocumentario } from "../src/patterns/prototype/ProjetoDocumentario";
import { ProjetoAnimacao } from "../src/patterns/prototype/ProjetoAnimacao";
import { ProjetoPublicitario } from "../src/patterns/prototype/ProjetoPublicitario";
import { criarBaseCandidatos } from "../src/index";
import { Profissional } from "../src/models/Profissional";
import { TipoProjeto } from "../src/models/Tipos";

describe("Teste 2: Abstract Factory & OrquestradorEquipe (Famílias Coesas)", () => {
  let candidatos: Profissional[];

  beforeEach(() => {
    candidatos = criarBaseCandidatos();
  });

  it("deve orquestrar família de Documentário com produtos consistentes entre si", () => {
    const fabrica = new FabricaDocumentario();
    const orquestrador = new OrquestradorEquipe(fabrica);

    const resultado = orquestrador.orquestrar(
      "Documentário Histórico: Revolução Científica",
      70000,
      candidatos
    );

    // Validação do Projeto
    expect(resultado.projeto).toBeInstanceOf(ProjetoDocumentario);
    expect(resultado.projeto.obterTipo()).toBe(TipoProjeto.DOCUMENTARIO);
    expect(resultado.projeto.titulo).toBe("Documentário Histórico: Revolução Científica");

    // Validação da Equipe Recomendada (prioriza pesquisa e acervo)
    expect(resultado.equipe.length).toBeGreaterThan(0);
    const possuiPesquisador = resultado.equipe.some(p =>
      p.temHabilidade("Pesquisa Histórica") || p.temHabilidade("Verificação Factual")
    );
    expect(possuiPesquisador).toBe(true);

    // Validação do Validador de Documentário
    expect(resultado.validacao.valido).toBe(true);
    const temMensagemDoc = resultado.validacao.mensagens.some(m =>
      m.includes("ValidadorDocumentario") || m.includes("acervo histórico") || m.includes("enxuta")
    );
    expect(temMensagemDoc).toBe(true);

    // Validação da Notificação (Diário de Campo)
    expect(resultado.notificacao).toContain("DIÁRIO DE CAMPO & PRODUÇÃO DOCUMENTAL");
    expect(resultado.notificacao).toContain("Fontes Históricas Verificadas");
  });

  it("deve orquestrar família de Animação com produtos consistentes entre si", () => {
    const fabrica = new FabricaAnimacao();
    const orquestrador = new OrquestradorEquipe(fabrica);

    const resultado = orquestrador.orquestrar(
      "Curta 3D: A Odisséia Cibernética",
      160000,
      candidatos
    );

    // Validação do Projeto
    expect(resultado.projeto).toBeInstanceOf(ProjetoAnimacao);
    expect(resultado.projeto.obterTipo()).toBe(TipoProjeto.ANIMACAO);

    // Validação da Equipe Recomendada (prioriza 3D, Rigging, Render)
    expect(resultado.equipe.length).toBeGreaterThan(0);
    const possuiArtista3D = resultado.equipe.some(p =>
      p.temHabilidade("Modelagem 3D") || p.temHabilidade("Rigging") || p.temHabilidade("Animação 3D")
    );
    expect(possuiArtista3D).toBe(true);

    // Validação do Validador de Animação
    expect(resultado.validacao.valido).toBe(true);
    const temMensagemAnim = resultado.validacao.mensagens.some(m =>
      m.includes("ValidadorAnimacao") || m.includes("pipeline DCC") || m.includes("render farm")
    );
    expect(temMensagemAnim).toBe(true);

    // Validação da Notificação (Relatório Técnico)
    expect(resultado.notificacao).toContain("RELATÓRIO TÉCNICO DE PIPELINE 3D & RENDER FARM");
    expect(resultado.notificacao).toContain("Eficiência Render Farm");
  });

  it("deve orquestrar família de Publicitário com produtos consistentes entre si", () => {
    const fabrica = new FabricaPublicitario();
    const orquestrador = new OrquestradorEquipe(fabrica);

    const resultado = orquestrador.orquestrar(
      "Spot TVC: Lançamento Automóvel Elétrico",
      90000,
      candidatos
    );

    // Validação do Projeto
    expect(resultado.projeto).toBeInstanceOf(ProjetoPublicitario);
    expect(resultado.projeto.obterTipo()).toBe(TipoProjeto.PUBLICITARIO);

    // Validação da Equipe Recomendada (prioriza Direção de Arte e Agilidade)
    expect(resultado.equipe.length).toBeGreaterThan(0);
    const possuiCriativo = resultado.equipe.some(p =>
      p.temHabilidade("Direção de Arte") || p.temHabilidade("Agilidade Comercial")
    );
    expect(possuiCriativo).toBe(true);

    // Validação do Validador de Publicidade
    expect(resultado.validacao.valido).toBe(true);
    const temMensagemPub = resultado.validacao.mensagens.some(m =>
      m.includes("ValidadorPublicitario") || m.includes("SLA") || m.includes("brandbook")
    );
    expect(temMensagemPub).toBe(true);

    // Validação da Notificação (Relatório Executivo para Agência)
    expect(resultado.notificacao).toContain("RELATÓRIO EXECUTIVO DE CAMPANHA & AGÊNCIA PUBLICITÁRIA");
    expect(resultado.notificacao).toContain("SLA Crítico de Entrega");
  });
});
