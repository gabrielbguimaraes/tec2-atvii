import { Projeto } from "./Projeto";
import { ProjetoDocumentario } from "./ProjetoDocumentario";
import { ProjetoAnimacao } from "./ProjetoAnimacao";
import { ProjetoPublicitario } from "./ProjetoPublicitario";
import { PapelProjeto } from "../../models/PapelProjeto";
import { RestricaoProjeto } from "../../models/RestricaoProjeto";
import { NivelExperiencia, SeveridadeRestricao, TipoProjeto } from "../../models/Tipos";

export class RegistroPrototiposProjeto {
  private prototipos: Map<string, Projeto> = new Map();

  constructor() {
    this.inicializarTemplatesPadrao();
  }

  public registrar(chave: string, prototipo: Projeto): void {
    this.prototipos.set(chave.toUpperCase(), prototipo);
  }

  public obter(chave: string): Projeto {
    const prototipo = this.prototipos.get(chave.toUpperCase());
    if (!prototipo) {
      throw new Error(`Protótipo não encontrado para a chave: "${chave}"`);
    }
    return prototipo;
  }

  public clonar(chave: string, novoTitulo?: string, novoOrcamento?: number): Projeto {
    const prototipo = this.obter(chave);
    const clone = prototipo.clonar();

    if (novoTitulo) {
      clone.titulo = novoTitulo;
    }
    if (novoOrcamento !== undefined) {
      clone.orcamento = novoOrcamento;
    }

    return clone;
  }

  public tem(chave: string): boolean {
    return this.prototipos.has(chave.toUpperCase());
  }

  public listarChaves(): string[] {
    return Array.from(this.prototipos.keys());
  }

  private inicializarTemplatesPadrao(): void {
    // 1. Template Padrão Documentário
    const docPapeis = [
      new PapelProjeto(
        "papel-doc-1",
        "Pesquisador e Roteirista Histórico",
        NivelExperiencia.SENIOR,
        ["Pesquisa Histórica", "Entrevistas", "Verificação Factual"],
        1
      ),
      new PapelProjeto(
        "papel-doc-2",
        "Diretor de Fotografia e Câmera Direta",
        NivelExperiencia.PLENO,
        ["Captação Direta", "Iluminação Natural", "Equipe de Campo"],
        1
      ),
      new PapelProjeto(
        "papel-doc-3",
        "Editor e Verificador de Licenciamento",
        NivelExperiencia.PLENO,
        ["Edição Não-Linear", "Licenciamento de Imagem", "Arquivo"],
        1
      )
    ];

    const docRestricoes = [
      new RestricaoProjeto(
        "res-doc-1",
        "DIREITOS_AUTORAIS",
        "Obrigatoriedade de licenciamento de todo material de arquivo histórico",
        SeveridadeRestricao.CRITICA,
        true
      ),
      new RestricaoProjeto(
        "res-doc-2",
        "EQUIPE_CAMPO",
        "Equipe de campo enxuta para mobilidade e segurança documental",
        SeveridadeRestricao.ALTA,
        true
      )
    ];

    const templateDoc = new ProjetoDocumentario(
      "tpl-documentario",
      "Documentário Base - Memória e Narrativa",
      65000,
      docPapeis,
      docRestricoes,
      {
        pesquisaHistorica: 1,
        fontesVerificadas: 15,
        formatoEntrega: "4K DCI"
      },
      true,
      true,
      true,
      15,
      "História e Memória Social",
      ["Especialistas Acadêmicos", "Testemunhas Oculares", "Historiadores"],
      75
    );

    // 2. Template Padrão Animação
    const animPapeis = [
      new PapelProjeto(
        "papel-anim-1",
        "Modelador 3D Hard Surface e Orgânico",
        NivelExperiencia.PLENO,
        ["Modelagem 3D", "Maya", "Blender", "Topologia"],
        1
      ),
      new PapelProjeto(
        "papel-anim-2",
        "Especialista em Rigging e Dinâmicas",
        NivelExperiencia.SENIOR,
        ["Rigging", "Python para Maya", "Skinning"],
        1
      ),
      new PapelProjeto(
        "papel-anim-3",
        "Animador de Personagens",
        NivelExperiencia.PLENO,
        ["Animação 3D", "12 Princípios de Animação", "Acting"],
        2
      ),
      new PapelProjeto(
        "papel-anim-4",
        "Supervisor de Render e Iluminação",
        NivelExperiencia.SENIOR,
        ["Houdini", "Render Farm", "Shading", "Composição"],
        1
      )
    ];

    const animRestricoes = [
      new RestricaoProjeto(
        "res-anim-1",
        "PIPELINE_SOFTWARE",
        "Pipeline restrito a DCCs homologados: Maya, Blender e Houdini",
        SeveridadeRestricao.CRITICA,
        true
      ),
      new RestricaoProjeto(
        "res-anim-2",
        "ORCAMENTO_RENDER",
        "Consumo máximo de render farm não pode ultrapassar 30% do orçamento total",
        SeveridadeRestricao.ALTA,
        true
      )
    ];

    const templateAnim = new ProjetoAnimacao(
      "tpl-animacao",
      "Curta de Animação 3D - Estúdio Avançado",
      140000,
      animPapeis,
      animRestricoes,
      {
        totalFrames: 7200,
        eficienciaRender: 85.5,
        pipeline3D: "Maya/Houdini"
      },
      ["Maya", "Blender", "Houdini"],
      "4K",
      85.5,
      7200,
      24,
      "3D Stylized",
      ["Maya", "Blender", "ZBrush", "Houdini"],
      15
    );

    // 3. Template Padrão Publicitário
    const pubPapeis = [
      new PapelProjeto(
        "papel-pub-1",
        "Diretor de Arte Publicitário",
        NivelExperiencia.SENIOR,
        ["Direção de Arte", "Storyboarding Comercial", "Brand Guidelines"],
        1
      ),
      new PapelProjeto(
        "papel-pub-2",
        "Motion Designer Comercial",
        NivelExperiencia.PLENO,
        ["After Effects", "Motion Graphics", "Agilidade Comercial"],
        1
      ),
      new PapelProjeto(
        "papel-pub-3",
        "Colorista e Finalizador Ágil",
        NivelExperiencia.PLENO,
        ["DaVinci Resolve", "Color Grading", "Pós-Produção Rápida"],
        1
      )
    ];

    const pubRestricoes = [
      new RestricaoProjeto(
        "res-pub-1",
        "SLA_CRITICO",
        "Prazo máximo estrito de 7 dias úteis para entrega do corte final",
        SeveridadeRestricao.CRITICA,
        true
      ),
      new RestricaoProjeto(
        "res-pub-2",
        "CONFORMIDADE_BRANDBOOK",
        "Aprovação rigorosa de diretrizes de marca e manual de identidade visual",
        SeveridadeRestricao.CRITICA,
        true
      )
    ];

    const templatePub = new ProjetoPublicitario(
      "tpl-publicitario",
      "Campanha Publicitária de Alta Conversão",
      85000,
      pubPapeis,
      pubRestricoes,
      {
        prazoDiasSLA: 7,
        taxaConversao: 4.5,
        targetAudience: "Digital / TVC"
      },
      7,
      "Agência Criativa Global",
      "Marca Premium",
      true,
      4.5,
      ["TV Aberta", "YouTube", "Instagram", "TikTok"],
      1
    );

    this.registrar("DOCUMENTARIO", templateDoc);
    this.registrar(TipoProjeto.DOCUMENTARIO, templateDoc);
    this.registrar("ANIMACAO", templateAnim);
    this.registrar(TipoProjeto.ANIMACAO, templateAnim);
    this.registrar("PUBLICITARIO", templatePub);
    this.registrar(TipoProjeto.PUBLICITARIO, templatePub);
  }
}
