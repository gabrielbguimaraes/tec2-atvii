// EasterEgg: rho_P=c^5/(hbar*G^2)
export const EASTER_EGG = "rho_P=c^5/(hbar*G^2)";

import { RegistroPrototiposProjeto } from "./patterns/prototype/RegistroPrototiposProjeto";
import { ProjetoDocumentario } from "./patterns/prototype/ProjetoDocumentario";
import { PapelProjeto } from "./models/PapelProjeto";
import { RestricaoProjeto } from "./models/RestricaoProjeto";
import { Profissional } from "./models/Profissional";
import { NivelExperiencia, SeveridadeRestricao, TipoProjeto } from "./models/Tipos";
import { SistemaRecomendacao } from "./services/SistemaRecomendacao";
import { VisitanteCalculoCustos } from "./patterns/atvi_patterns/visitor/VisitanteCalculoCustos";

export function criarBaseCandidatos(): Profissional[] {
  return [
    // Especialistas em Documentário
    new Profissional(
      "prof-01",
      "Dra. Helena Barreto",
      "Pesquisador e Roteirista Histórico",
      NivelExperiencia.SENIOR,
      ["Pesquisa Histórica", "Entrevistas", "Verificação Factual", "Acervo"],
      120,
      true,
      14,
      96,
      ["pesquisa", "entrevistas", "documental"]
    ),
    new Profissional(
      "prof-02",
      "Carlos Mendonça",
      "Diretor de Fotografia e Câmera Direta",
      NivelExperiencia.PLENO,
      ["Captação Direta", "Iluminação Natural", "Equipe de Campo", "4K"],
      95,
      true,
      8,
      90,
      ["captação direta", "campo", "documental"]
    ),
    new Profissional(
      "prof-03",
      "Mariana Rios",
      "Editor e Verificador de Licenciamento",
      NivelExperiencia.PLENO,
      ["Edição Não-Linear", "Licenciamento de Imagem", "Arquivo"],
      80,
      true,
      7,
      88,
      ["arquivo", "licenciamento", "documental"]
    ),

    // Especialistas em Animação 3D
    new Profissional(
      "prof-04",
      "Arthur Zimmerman",
      "Modelador 3D Hard Surface e Orgânico",
      NivelExperiencia.SENIOR,
      ["Modelagem 3D", "Maya", "Blender", "Topologia", "ZBrush"],
      135,
      true,
      11,
      98,
      ["3d", "maya", "blender", "modelagem 3d"]
    ),
    new Profissional(
      "prof-05",
      "Beatriz Lima",
      "Especialista em Rigging e Dinâmicas",
      NivelExperiencia.SENIOR,
      ["Rigging", "Python para Maya", "Skinning", "Dinâmicas"],
      140,
      true,
      9,
      94,
      ["rigging", "maya", "3d"]
    ),
    new Profissional(
      "prof-06",
      "Felipe Albuquerque",
      "Animador de Personagens",
      NivelExperiencia.PLENO,
      ["Animação 3D", "12 Princípios de Animação", "Acting", "Maya"],
      105,
      true,
      6,
      89,
      ["animação 3d", "acting", "3d"]
    ),
    new Profissional(
      "prof-07",
      "Daniela Rocha",
      "Supervisor de Render e Iluminação",
      NivelExperiencia.SENIOR,
      ["Houdini", "Render Farm", "Shading", "Composição", "Mantra"],
      150,
      true,
      12,
      97,
      ["houdini", "render", "iluminação", "3d"]
    ),

    // Especialistas em Publicidade
    new Profissional(
      "prof-08",
      "Lucas Vasconcelos",
      "Diretor de Arte Publicitário",
      NivelExperiencia.SENIOR,
      ["Direção de Arte", "Storyboarding Comercial", "Brand Guidelines", "Pitch"],
      160,
      true,
      10,
      95,
      ["publicidade", "direção de arte", "brand"]
    ),
    new Profissional(
      "prof-09",
      "Camila Siqueira",
      "Motion Designer Comercial",
      NivelExperiencia.PLENO,
      ["After Effects", "Motion Graphics", "Agilidade Comercial", "Cinema 4D"],
      110,
      true,
      6,
      92,
      ["publicidade", "motion graphics", "agilidade comercial"]
    ),
    new Profissional(
      "prof-10",
      "Rodrigo Tavares",
      "Colorista e Finalizador Ágil",
      NivelExperiencia.PLENO,
      ["DaVinci Resolve", "Color Grading", "Pós-Produção Rápida", "Mastering"],
      100,
      true,
      7,
      91,
      ["publicidade", "pós-produção rápida", "color grading"]
    )
  ];
}

export function executarDemonstracaoCLI(): void {
  console.log("================================================================================");
  console.log("   CINEBRIDGE PLATFORM - ATVII - ARQUITETURA DE MICROSSERVIÇOS AUDIOVISUAIS    ");
  console.log("   Técnicas de Programação II | Prof. Dr. Eng. Gerson Penha                    ");
  console.log(`   Easter Egg Científico: ${EASTER_EGG}`);
  console.log("================================================================================\n");

  // -------------------------------------------------------------------------------------------
  // 1. DEMONSTRAÇÃO DO PADRÃO PROTOTYPE & DEEP COPY
  // -------------------------------------------------------------------------------------------
  console.log(">> [ETAPA 1] DEMONSTRAÇÃO DO PADRÃO PROTOTYPE & DEEP COPY (CLONAGEM PROFUNDA)");
  console.log("--------------------------------------------------------------------------------");
  const registro = new RegistroPrototiposProjeto();

  const prototipoOriginal = registro.obter("DOCUMENTARIO") as ProjetoDocumentario;
  console.log(`[Registro] Protótipo Original: "${prototipoOriginal.titulo}" | Papéis: ${prototipoOriginal.papeis.length}`);

  // Clonagem profunda com especialização de atributos
  const projetoClonado = prototipoOriginal.clonar();
  projetoClonado.titulo = "Documentário: Raízes da Amazônia";
  projetoClonado.orcamento = 95000;

  // Modificação profunda no clone: adição de papel e restrição
  projetoClonado.adicionarPapel(
    new PapelProjeto(
      "papel-extra-drone",
      "Piloto de Drone e Captação Aérea",
      NivelExperiencia.PLENO,
      ["Pilotagem de Drone", "Captação 4K"],
      1
    )
  );

  projetoClonado.adicionarRestricao(
    new RestricaoProjeto(
      "res-extra-ambiental",
      "LICENCA_AMBIENTAL",
      "Licenciamento obrigatório de entrada em área de preservação",
      SeveridadeRestricao.CRITICA,
      true
    )
  );

  // Alteração no primeiro papel clonado para testar independência de objetos agregados
  if (projetoClonado.papeis[0]) {
    projetoClonado.papeis[0].adicionarHabilidade("Bioacústica");
  }

  console.log(`[Clone]   Projeto Clonado:  "${projetoClonado.titulo}" | Papéis: ${projetoClonado.papeis.length}`);
  console.log(`[Verificação de Imutabilidade do Protótipo Original]`);
  console.log(` - Papéis no Original: ${prototipoOriginal.papeis.length} (Intacto: ${prototipoOriginal.papeis.length === 3 ? "SIM" : "NÃO"})`);
  console.log(` - Papéis no Clone:    ${projetoClonado.papeis.length} (Adicionado: ${projetoClonado.papeis.length === 4 ? "SIM" : "NÃO"})`);
  console.log(` - Habilidade "Bioacústica" presente no Original: ${prototipoOriginal.papeis[0]?.temHabilidade("Bioacústica") ? "SIM (FALHA)" : "NÃO (SUCESSO - Deep Copy Confirmado!)"}`);
  console.log("--------------------------------------------------------------------------------\n");

  // -------------------------------------------------------------------------------------------
  // 2. DEMONSTRAÇÃO DO PADRÃO VISITOR (INTEGRAÇÃO ATVI)
  // -------------------------------------------------------------------------------------------
  console.log(">> [ETAPA 2] AUDITORIA DE PROJETO COM PADRÃO VISITOR (INTEGRAÇÃO ATVI)");
  console.log("--------------------------------------------------------------------------------");
  const visitante = new VisitanteCalculoCustos();
  projetoClonado.aceitar(visitante);
  console.log(`Relatório do Visitante de Custos:`);
  console.log(` - Tipo: ${visitante.relatorio.tipoProjeto}`);
  console.log(` - Vagas Totais: ${visitante.relatorio.totalVagas} | Restrições Críticas: ${visitante.relatorio.restricoesCriticas}`);
  console.log(` - Orçamento: R$ ${visitante.relatorio.orcamentoTotal.toLocaleString("pt-BR")}`);
  console.log(` - Custo Médio por Vaga: R$ ${visitante.relatorio.custoMedioPorPapel.toLocaleString("pt-BR")}`);
  console.log("--------------------------------------------------------------------------------\n");

  // -------------------------------------------------------------------------------------------
  // 3. DEMONSTRAÇÃO DO SISTEMA DE RECOMENDAÇÃO & ABSTRACT FACTORY
  // -------------------------------------------------------------------------------------------
  console.log(">> [ETAPA 3] EXECUÇÃO DO SISTEMA DE RECOMENDAÇÃO (ABSTRACT FACTORY & ORQUESTRADOR)");
  console.log("--------------------------------------------------------------------------------");
  const sistema = new SistemaRecomendacao();
  const candidatos = criarBaseCandidatos();

  const solicitacoes = [
    {
      tipo: TipoProjeto.DOCUMENTARIO,
      titulo: "Série Documental: Vozes do Sertão",
      orcamento: 75000
    },
    {
      tipo: TipoProjeto.ANIMACAO,
      titulo: "Longa de Animação: O Segredo das Estrelas",
      orcamento: 180000
    },
    {
      tipo: TipoProjeto.PUBLICITARIO,
      titulo: "Campanha Black Friday 2026 - Varejo Express",
      orcamento: 110000
    }
  ];

  for (const sol of solicitacoes) {
    console.log(`\n>>> PROCESSANDO PROJETO: [${sol.tipo}] "${sol.titulo}"`);
    const resultado = sistema.processarSolicitacao(sol.tipo, sol.titulo, sol.orcamento, candidatos);

    console.log(`[Status de Validação]: ${resultado.validacao.valido ? "APROVADO (OK)" : "REPROVADO"}`);
    console.log(`[Membros Selecionados]: ${resultado.equipe.map(p => `${p.nome} (${p.papelPrincipal})`).join(" | ")}`);
    console.log("\n[Notificação Gerada pelo Notificador da Família]:");
    console.log(resultado.notificacao);
    console.log("--------------------------------------------------------------------------------");
  }

  console.log("\n================================================================================");
  console.log("   DEMONSTRAÇÃO CONCLUÍDA COM SUCESSO - TODOS OS PADRÕES OPERANDO EM HARMONIA   ");
  console.log("================================================================================");
}

// Executa caso o arquivo seja chamado diretamente via terminal
if (require.main === module) {
  executarDemonstracaoCLI();
}
