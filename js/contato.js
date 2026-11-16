/**
 * JAVASCRIPT - Validação de Formulário com Manipulação do DOM
 * Página: contato.html
 * Recursos:
 * - Validação de campos obrigatórios
 * - Validação de formato de e-mail por Regex
 * - Máscara automática de telefone (XX) XXXXX-XXXX
 * - Exibição dinâmica de mensagens de erro
 * - Resumo dinâmico dos dados submetidos sem recarregar a página
 */

document.addEventListener('DOMContentLoaded', () => {
  const formContato = document.getElementById('formContato');
  if (!formContato) return;

  const nomeInput = document.getElementById('nome');
  const emailInput = document.getElementById('email');
  const telefoneInput = document.getElementById('telefone');
  const unidadeSelect = document.getElementById('unidade');
  const planoSelect = document.getElementById('plano');
  const termosCheckbox = document.getElementById('termos');
  const successCard = document.getElementById('successCard');
  const summaryBox = document.getElementById('submissionSummary');

  // Máscara dinâmica para o telefone enquanto o usuário digita
  telefoneInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, ''); // Remove não números
    if (value.length > 11) value = value.slice(0, 11);

    if (value.length > 6) {
      value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
    } else if (value.length > 2) {
      value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    } else if (value.length > 0) {
      value = `(${value}`;
    }

    e.target.value = value;
  });

  // Funções auxiliares de exibição e limpeza de erros
  function showError(inputElement, errorElementId, message) {
    const errorElement = document.getElementById(errorElementId);
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.style.display = 'block';
    }
    inputElement.classList.add('error');
    inputElement.classList.remove('success');
  }

  function clearError(inputElement, errorElementId) {
    const errorElement = document.getElementById(errorElementId);
    if (errorElement) {
      errorElement.textContent = '';
      errorElement.style.display = 'none';
    }
    inputElement.classList.remove('error');
    inputElement.classList.add('success');
  }

  // Remove o estado de erro ao digitar
  [nomeInput, emailInput, telefoneInput, unidadeSelect, planoSelect].forEach(input => {
    input.addEventListener('input', () => {
      const errorId = `erro-${input.id}`;
      clearError(input, errorId);
    });
  });

  // Validação ao enviar o formulário
  formContato.addEventListener('submit', (e) => {
    e.preventDefault(); // Impede o recarregamento padrão da página
    let isValid = true;

    // 1. Validação do Nome
    const nomeValor = nomeInput.value.trim();
    if (nomeValor.length < 3) {
      showError(nomeInput, 'erro-nome', 'Informe seu nome completo (mínimo 3 caracteres).');
      isValid = false;
    } else {
      clearError(nomeInput, 'erro-nome');
    }

    // 2. Validação do E-mail
    const emailValor = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailValor)) {
      showError(emailInput, 'erro-email', 'Informe um endereço de e-mail válido (exemplo@dominio.com).');
      isValid = false;
    } else {
      clearError(emailInput, 'erro-email');
    }

    // 3. Validação do Telefone
    const telNumeros = telefoneInput.value.replace(/\D/g, '');
    if (telNumeros.length < 10 || telNumeros.length > 11) {
      showError(telefoneInput, 'erro-telefone', 'Informe um telefone válido com DDD (10 ou 11 dígitos).');
      isValid = false;
    } else {
      clearError(telefoneInput, 'erro-telefone');
    }

    // 4. Validação da Unidade
    if (!unidadeSelect.value) {
      showError(unidadeSelect, 'erro-unidade', 'Por favor, selecione uma unidade.');
      isValid = false;
    } else {
      clearError(unidadeSelect, 'erro-unidade');
    }

    // 5. Validação do Plano
    if (!planoSelect.value) {
      showError(planoSelect, 'erro-plano', 'Por favor, selecione o plano desejado.');
      isValid = false;
    } else {
      clearError(planoSelect, 'erro-plano');
    }

    // 6. Validação dos Termos
    const termosErro = document.getElementById('erro-termos');
    if (!termosCheckbox.checked) {
      if (termosErro) {
        termosErro.textContent = 'Você deve aceitar a política de privacidade.';
        termosErro.style.display = 'block';
      }
      isValid = false;
    } else {
      if (termosErro) termosErro.style.display = 'none';
    }

    // Se tudo estiver correto, exibe o resumo dinâmico e mensagem de sucesso
    if (isValid) {
      // Oculta o formulário ou limpa os campos e exibe o feedback
      successCard.style.display = 'block';
      
      summaryBox.innerHTML = `
        <p><strong>Nome:</strong> ${nomeValor}</p>
        <p><strong>E-mail:</strong> ${emailValor}</p>
        <p><strong>Telefone:</strong> ${telefoneInput.value}</p>
        <p><strong>Unidade:</strong> ${unidadeSelect.options[unidadeSelect.selectedIndex].text}</p>
        <p><strong>Plano Escolhido:</strong> ${planoSelect.options[planoSelect.selectedIndex].text}</p>
        <p><strong>Data da Solicitação:</strong> ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR')}</p>
      `;

      // Rola a página suavemente até o card de sucesso
      successCard.scrollIntoView({ behavior: 'smooth' });

      // Limpa os campos do formulário
      formContato.reset();
      [nomeInput, emailInput, telefoneInput, unidadeSelect, planoSelect].forEach(input => {
        input.classList.remove('success');
      });
    }
  });

  // =========================================================================
  // SISTEMA DE PERGUNTAS FREQUENTES (FAQ) & ACCORDION COM ROLAGEM SUAVE
  // =========================================================================
  const faqItems = document.querySelectorAll('.faq-item');
  const faqTriggers = document.querySelectorAll('.faq-trigger');

  // 1. Função para abrir um item específico do FAQ e destacar visualmente
  function openFaqItem(targetId) {
    const targetItem = document.getElementById(targetId);
    if (!targetItem) return;

    // Abre o item alvo
    targetItem.classList.add('active');
    const trigger = targetItem.querySelector('.faq-trigger');
    if (trigger) trigger.setAttribute('aria-expanded', 'true');

    // Rola suavemente até a resposta
    targetItem.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // Adiciona efeito visual de destaque (glow/pulse)
    targetItem.classList.remove('highlight');
    void targetItem.offsetWidth; // Força reflow para reiniciar animação CSS
    targetItem.classList.add('highlight');
    setTimeout(() => {
      targetItem.classList.remove('highlight');
    }, 2000);
  }

  // 2. Clique manual na pergunta do accordion
  faqTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const parentItem = trigger.closest('.faq-item');
      const isCurrentlyActive = parentItem.classList.contains('active');

      // Alterna o estado do item clicado
      if (isCurrentlyActive) {
        parentItem.classList.remove('active');
        trigger.setAttribute('aria-expanded', 'false');
      } else {
        // Fecha os outros para foco limpo
        faqItems.forEach(item => {
          item.classList.remove('active');
          const btn = item.querySelector('.faq-trigger');
          if (btn) btn.setAttribute('aria-expanded', 'false');
        });
        parentItem.classList.add('active');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // 3. Clique nos atalhos de dúvidas comuns (chips e links de FAQ)
  const faqLinks = document.querySelectorAll('a[href^="#faq-"]');
  faqLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      openFaqItem(targetId);
      history.pushState(null, null, `#${targetId}`);
    });
  });

  // 4. Detecção automática de âncora ao carregar a página (ex: vindo de outra página)
  if (window.location.hash && window.location.hash.startsWith('#faq-')) {
    const targetId = window.location.hash.substring(1);
    setTimeout(() => {
      openFaqItem(targetId);
    }, 350);
  }
});
