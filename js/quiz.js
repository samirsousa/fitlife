/**
 * JAVASCRIPT - Quiz Interativo de Recomendação de Modalidade
 * Página: index.html
 * Funcionalidade:
 * - Sistema de perguntas sequenciais com barra de progresso dinâmica
 * - Cálculo de afinidade e recomendação personalizada
 * - Manipulação dinâmica de classes, texto e elementos do DOM
 */

document.addEventListener('DOMContentLoaded', () => {
  const quizSteps = document.querySelectorAll('.quiz-step');
  const progressFill = document.getElementById('quizProgressFill');
  const optionButtons = document.querySelectorAll('.quiz-option-btn');
  const btnRestart = document.getElementById('quizRestart');

  if (!quizSteps.length || !optionButtons.length) return;

  // Pontuação acumulada por categoria
  const scores = {
    musculacao: 0,
    spinning: 0,
    cross: 0,
    pilates: 0
  };

  let currentStepIndex = 0;

  // Banco de dados dos resultados (Ícones vetoriais SVG monocromáticos)
  const resultados = {
    musculacao: {
      icone: `<svg viewBox="0 0 24 24"><path d="M6 5v14M18 5v14M3 9v6M21 9v6M6 12h12M4 7h2M4 17h2M18 7h2M18 17h2"></path></svg>`,
      titulo: 'Musculação de Alta Performance',
      afinidade: '98% de compatibilidade',
      descricao: 'Seu perfil valoriza progressão consistente de cargas, controle do próprio ritmo e foco total em hipertrofia e definição corporal. Nossa sala de musculação climatizada com biomecânica importada é o ambiente perfeito para você atingir seus objetivos.',
      tags: ['#Hipertrofia', '#Definição', '#TreinoNoSeuRitmo', '#AcompanhamentoProfissional'],
      planoSugerido: 'fit'
    },
    spinning: {
      icone: `<svg viewBox="0 0 24 24"><circle cx="5.5" cy="17.5" r="3.5"></circle><circle cx="18.5" cy="17.5" r="3.5"></circle><path d="M15 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-3 11.5L9 12l3-3 3 4.5M12 9l4-3h3"></path></svg>`,
      titulo: 'Spinning Indoor & Ritmos',
      afinidade: '96% de compatibilidade',
      descricao: 'Você busca queima calórica acelerada, motivação coletiva e adora treinar com música contagiante e iluminação dinâmica! As aulas de bike indoor vão elevar seu condicionamento cardiovascular sem deixar o treino ficar monótono.',
      tags: ['#AltaQueimaCalorica', '#CardioIntenso', '#EnergiaColetiva', '#MusicaContagiante'],
      planoSugerido: 'fit'
    },
    cross: {
      icone: `<svg viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>`,
      titulo: 'Cross Training & Funcional',
      afinidade: '97% de compatibilidade',
      descricao: 'Você gosta de superar desafios diários, testar seus limites em circuitos dinâmicos e sentir a energia de uma comunidade que vibra junto. O Box Funcional da FitLife foi desenhado exatamente para o seu espírito determinado.',
      tags: ['#AltaIntensidade', '#AgilidadeEForça', '#SuperacaoDeLimites', '#EspiritoDeEquipe'],
      planoSugerido: 'vip'
    },
    pilates: {
      icone: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"></circle><path d="M12 7v10M8 12h8"></path></svg>`,
      titulo: 'Pilates de Solo & Yoga Integrativo',
      afinidade: '95% de compatibilidade',
      descricao: 'Seu foco principal está na qualidade de vida, alívio de tensões diárias, correção postural e fortalecimento profundo do core. Nossas salas zen proporcionam a conexão perfeita entre respiração, equilíbrio e mobilidade articular.',
      tags: ['#PosturaEColuna', '#MenosEstresse', '#Flexibilidade', '#FortalecimentoDoCore'],
      planoSugerido: 'basic'
    }
  };

  function updateProgress() {
    if (!progressFill) return;
    const progressMap = { 0: '33%', 1: '66%', 2: '100%', 3: '100%' };
    progressFill.style.width = progressMap[currentStepIndex] || '100%';
  }

  function showStep(index) {
    quizSteps.forEach((step, idx) => {
      step.classList.toggle('active', idx === index);
    });
    currentStepIndex = index;
    updateProgress();
  }

  function calculateResult() {
    // Encontra a modalidade com maior pontuação
    let bestMatch = 'musculacao';
    let highestScore = -1;

    for (const [modalidade, score] of Object.entries(scores)) {
      if (score > highestScore) {
        highestScore = score;
        bestMatch = modalidade;
      }
    }

    const data = resultados[bestMatch];

    // Injeta os dados no DOM
    const iconElem = document.getElementById('resultIcon');
    const titleElem = document.getElementById('resultTitle');
    const badgeElem = document.getElementById('resultBadge');
    const descElem = document.getElementById('resultDesc');
    const tagsElem = document.getElementById('resultTags');
    const ctaBtn = document.getElementById('resultCtaBtn');

    if (iconElem) iconElem.innerHTML = data.icone;
    if (titleElem) titleElem.textContent = data.titulo;
    if (badgeElem) badgeElem.textContent = data.afinidade;
    if (descElem) descElem.textContent = data.descricao;

    if (tagsElem) {
      tagsElem.innerHTML = data.tags.map(tag => `<span class="badge badge-primary">${tag}</span>`).join(' ');
    }

    if (ctaBtn) {
      ctaBtn.href = `contato.html?modalidade=${bestMatch}`;
    }

    // Exibe o passo de resultado
    showStep(3);
  }

  // Evento de clique nas opções
  optionButtons.forEach(button => {
    button.addEventListener('click', () => {
      const category = button.getAttribute('data-score');
      if (category && scores.hasOwnProperty(category)) {
        scores[category] += 1;
      }

      if (currentStepIndex < 2) {
        showStep(currentStepIndex + 1);
      } else {
        calculateResult();
      }
    });
  });

  // Botão para reiniciar o quiz
  if (btnRestart) {
    btnRestart.addEventListener('click', () => {
      // Zera pontuações
      for (const key in scores) {
        scores[key] = 0;
      }
      showStep(0);
    });
  }
});
