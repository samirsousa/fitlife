# FitLife - Trabalho Prático de Desenvolvimento de Site

> **Projeto Prático Acadêmico** desenvolvido com **HTML5**, **CSS3** e **JavaScript** puro (Vanilla JS), focado em semântica, responsividade e interatividade.

---

## Tema Escolhido: FitLife (Academia & Bem-Estar)
Um portal web moderno para uma academia de alta performance, contendo apresentação institucional, comparativo de planos e grade de aulas, ferramentas interativas de saúde e formulário de pré-matrícula com validações completas.

---

## 📂 Estrutura do Projeto
```text
trabaho js/
│
├── index.html          # Página 1: Início, modalidades, diferenciais e Calculadora de IMC interativa
├── planos.html         # Página 2: Comparativo de planos (tabela) e grade de horários com filtro JS
├── contato.html        # Página 3: Informações, FAQ e formulário de matrícula com validações
│
├── css/
│   └── style.css       # Estilização completa: Flexbox, CSS Grid, Variáveis, Dark Mode e Responsividade
│
├── assets/
│   ├── favicon.svg     # Ícone vetorial da marca (haltere + raio de energia) e favicon do navegador
│   └── logo.svg        # Logotipo vetorial SVG completo em alta resolução
│
├── js/
│   ├── main.js         # Menu mobile (hambúrguer), alternador de tema claro/escuro e ano dinâmico
│   ├── imc.js          # Lógica da calculadora interativa de IMC com classificação da OMS
│   ├── quiz.js         # Quiz interativo com barra de progresso e recomendação de modalidade por pontuação
│   ├── planos.js       # Filtro dinâmico da grade de horários da tabela
│   └── contato.js      # Validações do formulário em tempo real (Regex, máscara e resumo dinâmico)
│
└── README.md           # Documentação do trabalho prático
```

---

## 📋 Atendimento aos Requisitos Técnicos

### 1. HTML5 (Semântica e Estrutura)
- **Estrutura semântica completa:** Uso de `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>` e `<footer>`.
- **Cabeçalhos e Parágrafos:** Hierarquia correta de títulos (`<h1>`, `<h2>`, `<h3>`, `<h4>`) e parágrafos estruturados (`<p>`).
- **Listas:** 
  - Listas não ordenadas (`<ul>` e `<li>`) nos diferenciais da academia e menus de navegação.
  - Listas ordenadas (`<ol>` e `<li>`) na seção de Perguntas Frequentes (FAQ em `contato.html`).
- **Links:** Navegação fluida entre todas as páginas internas (`index.html`, `planos.html`, `contato.html`) e links de ação.
- **Imagens:** Imagens com tags `alt` descritivas para acessibilidade e `loading="lazy"` para otimização.
- **Tabelas (`<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, `<td>`):**
  - Tabela comparativa de planos e benefícios em `planos.html`.
  - Tabela de grade semanal de horários de aulas em `planos.html`.
- **Incorporação Multimídia com `<iframe>`:**
  - Mapa interativo do Google Maps em `contato.html` com localização simulada da unidade integrada ao campus **UniLaSalle - RJ** (Rua Gastão Gonçalves, 79 - Santa Rosa, Niterói - RJ), com atributos modernos de acessibilidade e desempenho (`loading="lazy"` e `allowfullscreen`).

### 2. CSS3 (Design, Layout e Responsividade)
- **Flexbox & CSS Grid:** 
  - **Flexbox:** Cabeçalho de navegação (`.nav-container`), alinhamento da hero section, cartões de estatísticas e rodapé.
  - **CSS Grid:** Grid responsivo de modalidades (`.features-grid`), formulário em duas colunas e layout de contato (`.contact-layout`).
- **Cores, Fontes e Variáveis (`:root`):** Paleta moderna baseada em variáveis CSS com suporte nativo a **Modo Escuro (Dark Mode)** e tipografia importada via Google Fonts (*Poppins* e *Inter*).
- **Responsividade (Mobile Friendly):**
  - `@media (max-width: 992px)` e `@media (max-width: 768px)` adaptando colunas, textos e imagens.
  - Menu hambúrguer deslizante para telas de smartphones.
  - Tabelas envoltas em contêiner com rolagem horizontal suave (`.table-responsive`) para não quebrar a visualização em telas pequenas.

### 3. JavaScript (Interatividade e Manipulação do DOM)
1. **Menu Hambúrguer Responsivo (`js/main.js`):** Abertura e fechamento interativo do menu de navegação no mobile.
2. **Alternador de Tema Dark/Light (`js/main.js`):** Troca dinâmica do tema da página com persistência das preferências do usuário no `localStorage`.
3. **Calculadora de IMC Interativa (`js/imc.js`):**
   - Captura os valores de peso e altura informados pelo usuário.
   - Trata conversão automática caso a altura seja digitada em metros ou centímetros.
   - Aplica a fórmula do IMC e manipula elementos do DOM (`textContent`, `style.color`) para exibir a classificação oficial da OMS e orientações.
4. **Quiz Interativo: "Qual Modalidade Combina com Você?" (`js/quiz.js`):**
   - Sistema de perguntas em etapas com **barra de progresso animada** manipulada via DOM.
   - Algoritmo de pontuação em JavaScript que analisa as preferências do visitante (foco, ambiente de treino e tempo disponível).
   - Apresenta o resultado com alta precisão, afinidade (ex: 98%), tags e link direto para agendamento da aula experimental.
5. **Filtro Dinâmico da Tabela de Horários (`js/planos.js`):**
   - Botões interativos que filtram as linhas da tabela em tempo real pelo turno (Manhã, Tarde, Noite ou Todos) e atualizam o contador de aulas encontradas.
6. **Validação Completa de Formulário (`js/contato.js`):**
   - Prevenção do recarregamento padrão da página (`e.preventDefault()`).
   - Máscara automática de telefone/WhatsApp `(XX) XXXXX-XXXX` enquanto o usuário digita.
   - Validação de endereço de e-mail através de Expressão Regular (Regex).
   - Exibição de mensagens de erro específicas em vermelho abaixo de cada campo inválido.
   - Geração de um resumo dinâmico com os dados informados após o envio bem-sucedido.
7. **Sistema de Dúvidas Frequentes (FAQ) com Navegação Suave e Accordion (`js/contato.js`):**
   - Ao clicar em qualquer dúvida comum (seja nos atalhos/chips rápidos, seja nos links do rodapé de qualquer página), a página desliza suavemente até a resposta.
   - O item abre a resposta automaticamente no accordion.
   - Um efeito visual de destaque luminoso temporário (`highlight pulse`) sinaliza visualmente onde está a resposta procurada.

---

## Como Executar o Projeto

1. Não é necessário instalar nenhum pacote, biblioteca externa ou servidor Node.js.
2. Basta abrir qualquer um dos arquivos HTML (recomendado iniciar por `index.html`) diretamente em seu navegador web (Google Chrome, Microsoft Edge, Firefox, etc.) com dois cliques.
3. Se estiver utilizando o Visual Studio Code, você também pode utilizar a extensão **Live Server** para testar as páginas em tempo real.
