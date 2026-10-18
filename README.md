# 🎬 CineBridge Platform — ATVII: Arquitetura de Microsserviços Audiovisuais

[![Node.js](https://img.shields.io/badge/Node.js-v20%2B-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-v5.7%2B-blue.svg)](https://www.typescriptlang.org/)
[![Jest](https://img.shields.io/badge/Jest-Tested-orange.svg)](https://jestjs.io/)
[![Design Patterns](https://img.shields.io/badge/GoF-Creational%20%26%20Behavioral-purple.svg)](https://en.wikipedia.org/wiki/Design_Patterns)
[![Cross-Platform](https://img.shields.io/badge/Platform-Windows%2010%2B%20%7C%20Ubuntu%2024.04-informational.svg)]()

> **Atividade Prática ATVII**  
> **Disciplina:** Técnicas de Programação II  
> **Docente:** Prof. Dr. Eng. Gerson Penha  
> **Discente / Engenheiro Responsável:** Gabriel Guimarães  
> **Repositório Oficial:** [https://github.com/gabrielbguimaraes/tec2-atvii.git](https://github.com/gabrielbguimaraes/tec2-atvii.git)  
> **Easter Egg Científico:** `rho_P=c^5/(hbar*G^2)` (20 caracteres — Densidade de Planck frente à singularidade gravitacional)

---

## 📑 Sumário Executivo

1. [Diagnóstico de Arquitetura e Riscos Estruturais](#1-diagnóstico-de-arquitetura-e-riscos-estruturais)
2. [Solução com Padrões de Projeto (GoF Criacionais e Comportamentais)](#2-solução-com-padrões-de-projeto-gof-criacionais-e-comportamentais)
3. [Estrutura da Base de Código (Clean Architecture)](#3-estrutura-da-base-de-código-clean-architecture)
4. [Diagrama de Classes UML Oficial (Mermaid)](#4-diagrama-de-classes-uml-oficial-mermaid)
5. [Unificação dos Padrões Comportamentais (ATVI) com Produtos da Fábrica (ATVII)](#5-unificação-dos-padrões-comportamentais-atvi-com-produtos-da-fábrica-atvii)
6. [Hierarquia Projeto: Prototype & Factory Method](#6-hierarquia-projeto-prototype--factory-method)
7. [Template Method: OrquestradorEquipe e OrquestradorPadrao](#7-template-method-orquestradorequipe-e-orquestradorpadrao)
8. [Easter Egg Científico](#8-easter-egg-científico)
9. [Instruções de Instalação, Compilação e Execução Multiplataforma](#9-instruções-de-instalação-compilação-e-execução-multiplataforma)
10. [Suíte de Testes Automatizados (Jest)](#10-suíte-de-testes-automatizados-jest)

---

## 1. Diagnóstico de Arquitetura e Riscos Estruturais

A construção de um sistema corporativo para a indústria criativa audiovisual independente assemelha-se à engenharia estrutural de uma grande edificação. A ausência de fundações sólidas e padrões arquiteturais consolidados desencadeia três patologias clássicas de projeto que geram acentuada dívida técnica:

* **Rigidez (*Rigidity*):** Qualquer nova demanda — como suportar produções de animação 3D ou campanhas publicitárias — exigia a modificação de múltiplos pontos espalhados no código (especialmente condicionais em orquestradores e algoritmos de recomendação), tornando a evolução lenta e custosa.
* **Fragilidade (*Fragility*):** A alteração de regras orçamentárias ou papéis de um gênero específico quebrava silenciosamente o comportamento de outros tipos de produção, gerando efeitos colaterais imprevisíveis e regressões em produção.
* **Imobilidade (*Immobility*):** Módulos de validação e notificação encontravam-se acoplados às classes de projeto concretas, impossibilitando a reutilização de algoritmos e forçando desenvolvedores a reinventar a roda a cada novo formato audiovisual.

A **ATVII da Plataforma CineBridge** resolve integralmente essas deficiências eliminando todas as condicionais de tipo no núcleo do sistema e unificando os padrões comportamentais da ATVI (Visitor, Strategy, Observer, Template Method) aos produtos da **Abstract Factory** e ao padrão **Prototype**.

---

## 2. Solução com Padrões de Projeto (GoF Criacionais e Comportamentais)

| Padrão | Classificação | Responsabilidade no Domínio CineBridge |
| :--- | :--- | :--- |
| **Prototype** | Criacional | Permite clonagem profunda (*deep copy*) de instâncias complexas de projetos (`ProjetoDocumentario`, `ProjetoAnimacao`, `ProjetoPublicitario`) e seus agregados (`papeis`, `restricoes`, `metricasEspecificas`, `prazo: Date`, `entrevistados`, `softwareModelagem3D`, `canaisVeiculacao`), viabilizando um registro de modelos pré-configurados (*Prototype Registry*). |
| **Factory Method** | Criacional | Cada subclasse de `Projeto` instancia sua respectiva fábrica concreta através do método `criarFabrica(): FabricaProjeto`, permitindo resolução dinâmica de família a partir da entidade. |
| **Abstract Factory** | Criacional | Fornece uma interface unificada (`FabricaProjeto`) para criar famílias completas e consistentes de objetos que cooperam entre si (`VisitanteProjeto`, `RecomendacaoStrategy`, `Observador` e `Projeto`) sem acoplamento a classes concretas. |
| **Strategy (ATVI)** | Comportamental | Modela algoritmos intercambiáveis de recomendação de profissionais (`RecomendacaoStrategy`), retornando alocações no formato `Map<Papel, Profissional[]>`. |
| **Template Method (ATVI & ATVII)** | Comportamental | `OrquestradorEquipe` define o algoritmo invariante de orquestração (`orquestrar`), delegando os passos primitivos (`validarRestricoes`, `normalizarDados`, `posProcessar`) para `OrquestradorPadrao`. |
| **Observer (ATVI)** | Comportamental | Notifica observadores (`Observador`) sobre o término de recomendações através de instâncias de `EventoRecomendacao`, desacoplando a geração de relatórios e auditoria. |
| **Visitor (ATVI)** | Comportamental | `VisitanteProjeto` visita instâncias de `Projeto` e `Profissional` (`visitarProjeto`, `visitarProfissional`), permitindo validação e auditoria externa sem violar o encapsulamento. |

---

## 3. Estrutura da Base de Código (Clean Architecture)

```
cinebridge-atvii/
├── package.json                          # Metadados, scripts multiplataforma e Easter Egg
├── tsconfig.json                         # Configurações estritas do TypeScript (noImplicitAny, etc.)
├── jest.config.js                        # Configuração de suíte de testes com ts-jest
├── .gitignore                            # Exclusão de node_modules, dist e relatórios
├── README.md                             # Documentação técnica completa e diagrama Mermaid
├── src/
│   ├── index.ts                          # Ponto de entrada CLI, constantes e demonstração completa
│   ├── easterEgg.ts                      # Constante do Easter Egg científico (Densidade de Planck)
│   ├── models/                           # Entidades de domínio e objetos agregados
│   │   ├── Tipos.ts                      # Enums (TipoProjeto, NivelExperiencia, SeveridadeRestricao)
│   │   ├── PapelProjeto.ts               # Papel agregado com clonagem profunda (alias Papel)
│   │   ├── Papel.ts                      # Re-export de Papel e PapelProjeto
│   │   ├── Equipe.ts                     # Entidade de equipe (Map<Papel, Profissional[]>, getters e métodos)
│   │   ├── Profissional.ts               # Candidato audiovisual (habilidades, custo/hora, portfolio)
│   │   ├── RestricaoProjeto.ts           # Regra de produção agregada com clonagem profunda
│   │   └── ResultadoValidacao.ts         # Value object com status, mensagens, erros e avisos
│   ├── patterns/
│   │   ├── prototype/                    # Padrão Prototype & Registry
│   │   │   ├── Prototipo.ts              # Interface genérica Prototipo<T>
│   │   │   ├── Projeto.ts                # Classe abstrata Projeto (getters/setters, deep copy, factory method)
│   │   │   ├── ProjetoDocumentario.ts    # Subclasse concreta (tema, entrevistados, criarFabrica)
│   │   │   ├── ProjetoAnimacao.ts        # Subclasse concreta (estiloAnimacao, softwareModelagem3D, criarFabrica)
│   │   │   ├── ProjetoPublicitario.ts    # Subclasse concreta (marcaCliente, canaisVeiculacao, criarFabrica)
│   │   │   └── RegistroPrototiposProjeto.ts # Registry de protótipos pré-configurados
│   │   ├── factory/                      # Padrão Abstract Factory & Factory Method
│   │   │   ├── FabricaProjeto.ts         # Interface Abstract Factory (Visitor, Strategy, Observer)
│   │   │   ├── FabricaDocumentario.ts    # Fábrica concreta da família Documentário
│   │   │   ├── FabricaAnimacao.ts        # Fábrica concreta da família Animação
│   │   │   └── FabricaPublicitario.ts    # Fábrica concreta da família Publicitário
│   │   ├── products/                     # Produtos da Abstract Factory implementando padrões ATVI
│   │   │   ├── validadores/              # Validadores implementando VisitanteProjeto
│   │   │   │   ├── ValidadorProjeto.ts
│   │   │   │   ├── ValidadorDocumentario.ts
│   │   │   │   ├── ValidadorAnimacao.ts
│   │   │   │   └── ValidadorPublicitario.ts
│   │   │   ├── recomendadores/           # Recomendadores implementando RecomendacaoStrategy
│   │   │   │   ├── RecomendadorProfissionais.ts
│   │   │   │   ├── RecomendadorBase.ts
│   │   │   │   ├── RecomendadorDocumentario.ts
│   │   │   │   ├── RecomendadorAnimacao.ts
│   │   │   │   └── RecomendadorPublicitario.ts
│   │   │   └── notificadores/            # Notificadores implementando Observador
│   │   │       ├── NotificadorEquipe.ts
│   │   │       ├── NotificadorDocumentario.ts
│   │   │       ├── NotificadorAnimacao.ts
│   │   │       └── NotificadorPublicitario.ts
│   │   └── atvi_patterns/                # Padrões comportamentais herdados e integrados
│   │       ├── strategy/                 # RecomendacaoStrategy e EstrategiaPontuacao
│   │       │   ├── RecomendacaoStrategy.ts
│   │       │   ├── EstrategiaPontuacao.ts
│   │       │   └── EstrategiasConcretas.ts
│   │       ├── template_method/          # Template Method de validação
│   │       │   └── ProcessadorValidacaoTemplate.ts
│   │       ├── observer/                 # Observador, EventoRecomendacao e SujeitoEventos
│   │       │   ├── Observador.ts
│   │       │   ├── EventoRecomendacao.ts
│   │       │   └── ObservadorEvento.ts
│   │       └── visitor/                  # VisitanteProjeto e VisitanteCalculoCustos
│   │           ├── VisitanteProjeto.ts
│   │           └── VisitanteCalculoCustos.ts
│   └── services/                         # Orquestrador e Fachada Desacoplada
│       ├── OrquestradorEquipe.ts         # Template Method abstrato e OrquestradorPadrao concreto
│       └── SistemaRecomendacao.ts        # Dispatcher com injeção dinâmica e Factory Method
└── tests/                                # Suíte completa de testes de integração automatizados
    ├── prototype.test.ts                 # Teste 1: Prototype, Deep Copy e Factory Method
    ├── abstractFactory.test.ts           # Teste 2: Abstract Factory, Contratos e OrquestradorPadrao
    ├── extensibility.test.ts             # Teste 3: Extensibilidade OCP com 4ª família (VR / XR)
    └── atvi_patterns.test.ts             # Teste 4: Integração Strategy, Observer e Visitor
```

---

## 4. Diagrama de Classes UML Oficial (Mermaid)

O diagrama a seguir reflete **fielmente e estritamente** o Diagrama de Classes oficial da disciplina de Técnicas de Programação II do **Prof. Dr. Eng. Gerson Penha**, integrando os produtos da Abstract Factory aos padrões comportamentais Visitor, Strategy e Observer:

```mermaid
classDiagram
    direction TB

    %% --- PADRÕES COMPORTAMENTAIS (ATVI) COMO PRODUTOS DA FÁBRICA (ATVII) ---
    class VisitanteProjeto {
        <<interface>>
        +visitarProjeto(projeto: Projeto) boolean
        +visitarProfissional(profissional: Profissional) boolean
    }

    class RecomendacaoStrategy {
        <<interface>>
        +recomendar(projeto: Projeto, profissionais: Profissional[]) Map~Papel, Profissional[]~
    }

    class Observador {
        <<interface>>
        +atualizar(evento: EventoRecomendacao) void
    }

    class ValidadorDocumentario {
        +visitarProjeto(projeto: Projeto) boolean
        +visitarProfissional(profissional: Profissional) boolean
    }

    class ValidadorAnimacao {
        +visitarProjeto(projeto: Projeto) boolean
        +visitarProfissional(profissional: Profissional) boolean
    }

    class ValidadorPublicitario {
        +visitarProjeto(projeto: Projeto) boolean
        +visitarProfissional(profissional: Profissional) boolean
    }

    VisitanteProjeto <|.. ValidadorDocumentario
    VisitanteProjeto <|.. ValidadorAnimacao
    VisitanteProjeto <|.. ValidadorPublicitario

    class RecomendadorDocumentario {
        +recomendar(projeto: Projeto, profissionais: Profissional[]) Map~Papel, Profissional[]~
    }

    class RecomendadorAnimacao {
        +recomendar(projeto: Projeto, profissionais: Profissional[]) Map~Papel, Profissional[]~
    }

    class RecomendadorPublicitario {
        +recomendar(projeto: Projeto, profissionais: Profissional[]) Map~Papel, Profissional[]~
    }

    RecomendacaoStrategy <|.. RecomendadorDocumentario
    RecomendacaoStrategy <|.. RecomendadorAnimacao
    RecomendacaoStrategy <|.. RecomendadorPublicitario

    class NotificadorDocumentario {
        +atualizar(evento: EventoRecomendacao) void
    }

    class NotificadorAnimacao {
        +atualizar(evento: EventoRecomendacao) void
    }

    class NotificadorPublicitario {
        +atualizar(evento: EventoRecomendacao) void
    }

    Observador <|.. NotificadorDocumentario
    Observador <|.. NotificadorAnimacao
    Observador <|.. NotificadorPublicitario

    %% --- PADRÃO ABSTRACT FACTORY (CRIACIONAL) ---
    class FabricaProjeto {
        <<interface>>
        +criarProjeto(dados: any) Projeto
        +criarValidador() VisitanteProjeto
        +criarRecomendador() RecomendacaoStrategy
        +criarNotificador() Observador
    }

    class FabricaDocumentario {
        +criarProjeto(dados: any) ProjetoDocumentario
        +criarValidador() VisitanteProjeto
        +criarRecomendador() RecomendacaoStrategy
        +criarNotificador() Observador
    }

    class FabricaAnimacao {
        +criarProjeto(dados: any) ProjetoAnimacao
        +criarValidador() VisitanteProjeto
        +criarRecomendador() RecomendacaoStrategy
        +criarNotificador() Observador
    }

    class FabricaPublicitario {
        +criarProjeto(dados: any) ProjetoPublicitario
        +criarValidador() VisitanteProjeto
        +criarRecomendador() RecomendacaoStrategy
        +criarNotificador() Observador
    }

    FabricaProjeto <|.. FabricaDocumentario
    FabricaProjeto <|.. FabricaAnimacao
    FabricaProjeto <|.. FabricaPublicitario

    FabricaDocumentario ..> ValidadorDocumentario : cria
    FabricaDocumentario ..> RecomendadorDocumentario : cria
    FabricaDocumentario ..> NotificadorDocumentario : cria

    FabricaAnimacao ..> ValidadorAnimacao : cria
    FabricaAnimacao ..> RecomendadorAnimacao : cria
    FabricaAnimacao ..> NotificadorAnimacao : cria

    FabricaPublicitario ..> ValidadorPublicitario : cria
    FabricaPublicitario ..> RecomendadorPublicitario : cria
    FabricaPublicitario ..> NotificadorPublicitario : cria

    %% --- PADRÕES PROTOTYPE + FACTORY METHOD ---
    class Projeto {
        <<abstract>>
        #id: string
        #genero: string
        #duracao: number
        #orcamento: number
        #prazo: Date
        #papeis: Papel[]
        #equipe: Map~Papel, Profissional[]~
        #fabrica: FabricaProjeto
        +getId() string
        +getGenero() string
        +getDuracao() number
        +getOrcamento() number
        +getPrazo() Date
        +getPapeis() Papel[]
        +getEquipe() Map~Papel, Profissional[]~
        +getFabrica() FabricaProjeto
        +aceitarRecomendacao(papel: Papel, profissional: Profissional) void
        +substituirMembro(papel: Papel, profissional: Profissional) void
        +solicitarReavaliacao() void
        +clonar()* Projeto
        +criarFabrica()* FabricaProjeto
    }

    class ProjetoDocumentario {
        +tema: string
        +entrevistados: string[]
        +clonar() ProjetoDocumentario
        +criarFabrica() FabricaProjeto
    }

    class ProjetoAnimacao {
        +estiloAnimacao: string
        +softwareModelagem3D: string[]
        +clonar() ProjetoAnimacao
        +criarFabrica() FabricaProjeto
    }

    class ProjetoPublicitario {
        +marcaCliente: string
        +canaisVeiculacao: string[]
        +clonar() ProjetoPublicitario
        +criarFabrica() FabricaProjeto
    }

    Projeto <|-- ProjetoDocumentario
    Projeto <|-- ProjetoAnimacao
    Projeto <|-- ProjetoPublicitario

    Projeto o-- "0..1" FabricaProjeto : contem
    ProjetoDocumentario ..> FabricaDocumentario : instancia
    ProjetoAnimacao ..> FabricaAnimacao : instancia
    ProjetoPublicitario ..> FabricaPublicitario : instancia

    %% --- PADRÃO TEMPLATE METHOD: ORQUESTRADOR ---
    class OrquestradorEquipe {
        <<abstract>>
        #fabrica: FabricaProjeto
        +orquestrar(projeto: Projeto, estrategia: RecomendacaoStrategy) Equipe
        #validarRestricoes(projeto: Projeto)* boolean
        #normalizarDados(projeto: Projeto, profissionais: Profissional[])* Profissional[]
        #posProcessar(recomendacoes: Map~Papel, Profissional[]~)* Map~Papel, Profissional[]~
    }

    class OrquestradorPadrao {
        #validarRestricoes(projeto: Projeto) boolean
        #normalizarDados(projeto: Projeto, profissionais: Profissional[]) Profissional[]
        #posProcessar(recomendacoes: Map~Papel, Profissional[]~) Map~Papel, Profissional[]~
    }

    OrquestradorEquipe <|-- OrquestradorPadrao
    OrquestradorEquipe --> "1" FabricaProjeto : depende

    class SistemaRecomendacao {
        -fabricas: Map~string, FabricaProjeto~
        +processarSolicitacao(tipoOuProjeto, tituloOuEstrategia, orcamento, candidatos) Equipe
        +registrarFabrica(tipo: string, fabrica: FabricaProjeto) void
        +obterFabrica(tipo: string) FabricaProjeto
    }

    SistemaRecomendacao ..> OrquestradorPadrao : instancia

    %% --- MODELOS E ENTIDADES DE DOMÍNIO ---
    class Papel {
        +id: string
        +nome: string
        +nivelMinimo: NivelExperiencia
        +habilidadesExigidas: string[]
        +quantidade: number
        +clonar() Papel
    }

    class Profissional {
        +id: string
        +nome: string
        +papelPrincipal: string
        +nivel: NivelExperiencia
        +habilidades: string[]
        +custoHora: number
        +disponivel: boolean
    }

    class Equipe {
        +membros: Map~Papel, Profissional[]~
        +projeto: Projeto
        +validacao: ResultadoValidacao
        +notificacao: string
        +obterTodosProfissionais() Profissional[]
    }

    class EventoRecomendacao {
        +tipo: string
        +projeto: Projeto
        +equipe: Map~Papel, Profissional[]~
        +mensagem: string
        +timestamp: Date
    }

    Projeto *-- Papel : agrega
    Equipe o-- Profissional : compoe
    Equipe o-- Papel : mapeia
    Observador ..> EventoRecomendacao : recebe
```

---

## 5. Unificação dos Padrões Comportamentais (ATVI) com Produtos da Fábrica (ATVII)

No diagrama oficial, a interface `FabricaProjeto` não retorna contratos isolados ou redundantes, mas sim os próprios componentes comportamentais da arquitetura:

1. **Visitor (`VisitanteProjeto`):**
   * Contrato: `visitarProjeto(projeto: Projeto): boolean` e `visitarProfissional(profissional: Profissional): boolean`.
   * Implementado por `ValidadorDocumentario`, `ValidadorAnimacao` e `ValidadorPublicitario`.
2. **Strategy (`RecomendacaoStrategy`):**
   * Contrato: `recomendar(projeto: Projeto, profissionais: Profissional[]): Map<Papel, Profissional[]>`.
   * Implementado por `RecomendadorDocumentario`, `RecomendadorAnimacao` e `RecomendadorPublicitario`.
3. **Observer (`Observador`):**
   * Contrato: `atualizar(evento: EventoRecomendacao): void`.
   * Implementado por `NotificadorDocumentario`, `NotificadorAnimacao` e `NotificadorPublicitario`.

---

## 6. Hierarquia Projeto: Prototype & Factory Method

A classe base abstrata `Projeto` e suas subclasses garantem encapsulamento rigoroso e recursos avançados de ciclo de vida:

* **Atributos protegidos com getters e setters:** `id`, `genero`, `duracao`, `orcamento`, `prazo: Date`, `papeis: Papel[]`, `equipe: Map<Papel, Profissional[]>`, `fabrica?: FabricaProjeto`.
* **Métodos de Gestão de Equipe:**
  * `aceitarRecomendacao(papel: Papel, profissional: Profissional): void`: vincula o profissional ao papel na equipe do projeto.
  * `substituirMembro(papel: Papel, profissional: Profissional): void`: substitui alocação anterior por novo candidato.
  * `solicitarReavaliacao(): void`: limpa a equipe para novo ciclo de recomendação.
* **Cópia Profunda Real (`clonar(): Projeto`):**
  * Clona data (`new Date(this.prazo.getTime())`), papéis agregados (`p.clonar()`), restrições (`r.clonar()`), mapa de equipe e atributos especializados:
    * `ProjetoDocumentario`: deep copy de `entrevistados: string[]` e `tema: string`.
    * `ProjetoAnimacao`: deep copy de `softwareModelagem3D: string[]` e `estiloAnimacao: string`.
    * `ProjetoPublicitario`: deep copy de `canaisVeiculacao: string[]` e `marcaCliente: string`.
* **Factory Method (`criarFabrica(): FabricaProjeto`):**
  * Cada subclasse concreta instancia sua família coesa (`new FabricaDocumentario()`, `new FabricaAnimacao()`, `new FabricaPublicitario()`).

---

## 7. Template Method: OrquestradorEquipe e OrquestradorPadrao

A classe abstrata `OrquestradorEquipe` implementa o esqueleto algorítmico inviolável:

```typescript
public orquestrar(projeto: Projeto, estrategia?: RecomendacaoStrategy): Equipe {
  // 1. Passo abstrato: validação de restrições via Validador da Fábrica (VisitanteProjeto)
  this.validarRestricoes(projeto);

  // 2. Passo abstrato: normalização e filtragem de candidatos
  const profs = this.normalizarDados(projeto, candidatos);

  // 3. Recomendação via Strategy fornecida ou da Fábrica
  const mapa = (estrategia ?? this.fabrica.criarRecomendador()).recomendar(projeto, profs);

  // 4. Passo abstrato: pós-processamento de conflitos
  const recomendacoes = this.posProcessar(mapa);

  // 5. Notificação via Observer da Fábrica
  this.fabrica.criarNotificador().atualizar(new EventoRecomendacao(...));

  return new Equipe(recomendacoes, projeto, validacao, notificacao);
}
```

A classe concreta `OrquestradorPadrao` estende `OrquestradorEquipe` e implementa os três métodos protegidos primitivos. O sistema cumpre o **Princípio Aberto/Fechado (OCP)** com louvor: novas mídias (como Realidade Virtual / XR) são plugadas sem que nenhuma linha do orquestrador seja alterada.

---

## 8. Easter Egg Científico

Conforme os critérios de avaliação acadêmica do **Prof. Dr. Eng. Gerson Penha**, o projeto traz como assinatura de autoria única o limite superior da **Densidade de Planck** frente à singularidade teórica de buracos negros:

$$\rho_P = \frac{c^5}{\hbar G^2}$$

* **Constante Exata (20 caracteres):** `rho_P=c^5/(hbar*G^2)`
* **Localização 1 (Configuração):** Propriedade customizada no [package.json](file:///c:/Users/Biel_/tec2-atvii/package.json):
  ```json
  "easterEgg": "rho_P=c^5/(hbar*G^2)"
  ```
* **Localização 2 (Código-Fonte):** Comentário de cabeçalho e constante exportada em [src/index.ts](file:///c:/Users/Biel_/tec2-atvii/src/index.ts) e [src/easterEgg.ts](file:///c:/Users/Biel_/tec2-atvii/src/easterEgg.ts):
  ```typescript
  // EasterEgg: rho_P=c^5/(hbar*G^2)
  export const EASTER_EGG = "rho_P=c^5/(hbar*G^2)";
  ```

---

## 9. Instruções de Instalação, Compilação e Execução Multiplataforma

O projeto foi construído para execução consistente em **Windows 10/11** e **Linux Ubuntu 24.04 LTS (ou superior)**, utilizando scripts NPM universais e TypeScript estrito.

### 9.1. Pré-requisitos
* Node.js v20.x ou superior (testado em Node.js v24.19.0)
* NPM v10.x ou superior (testado em NPM v11.17.0)

### 9.2. Instalação das Dependências
```bash
npm install
```

### 9.3. Compilação TypeScript (Type-Check & Build)
```bash
npm run build
```
*(Gera os arquivos `.js`, `.d.ts` e `.js.map` estritamente tipados no diretório `dist/`).*

### 9.4. Execução dos Testes Automatizados (Jest)
```bash
npm test
```
Para relatório de cobertura de código:
```bash
npm run test:coverage
```

### 9.5. Execução da Demonstração no Console (CLI)
```bash
npm start
```
*(Ou, alternativamente, executando o bundle compilado via `node dist/index.js`).*

---

## 10. Suíte de Testes Automatizados (Jest)

A cobertura de testes é composta por 4 suítes abrangentes executadas sequencialmente com 100% de aprovação (26 testes unitários e integrados):

1. **`tests/prototype.test.ts` (Teste 1 - Prototype, Deep Copy & Factory Method):**
   * Valida a clonagem profunda independente em `ProjetoDocumentario` (incluindo `entrevistados`), `ProjetoAnimacao` (incluindo `softwareModelagem3D`) e `ProjetoPublicitario` (incluindo `canaisVeiculacao` e `prazo`).
   * Testa o método fábrica `criarFabrica()` em cada subclasse.
   * Valida os métodos `aceitarRecomendacao`, `substituirMembro` e `solicitarReavaliacao`.
2. **`tests/abstractFactory.test.ts` (Teste 2 - Abstract Factory, Contratos & OrquestradorPadrao):**
   * Comprova que `FabricaDocumentario`, `FabricaAnimacao` e `FabricaPublicitario` implementam os contratos oficiais retornando `VisitanteProjeto`, `RecomendacaoStrategy` e `Observador`.
   * Executa `OrquestradorPadrao` e `OrquestradorEquipe` garantindo coesão total entre as famílias de produtos.
3. **`tests/extensibility.test.ts` (Teste 3 - Extensibilidade OCP com 4ª Família VR/XR):**
   * Declara uma 4ª família completa simulada: `ProjetoRealidadeVirtual`, `ValidadorRealidadeVirtual`, `RecomendadorRealidadeVirtual`, `NotificadorRealidadeVirtual` e `FabricaRealidadeVirtual`.
   * Executa a orquestração via `OrquestradorPadrao` e registra dinamicamente em `SistemaRecomendacao` sem alterar uma única linha de código do núcleo.
4. **`tests/atvi_patterns.test.ts` (Teste 4 - Integração de Padrões Comportamentais ATVI):**
   * Valida `EstrategiaPontuacao` e `RecomendacaoStrategy` retornando `Map<Papel, Profissional[]>`.
   * Valida `SujeitoEventos`, `HistoricoAuditoriaObservador` e o método `atualizar(evento: EventoRecomendacao)` da interface `Observador`.
   * Valida `VisitanteProjeto` e `VisitanteCalculoCustos` com `visitarProjeto` e `visitarProfissional`.

---

© 2026 Plataforma CineBridge — Técnicas de Programação II. Todos os direitos reservados.