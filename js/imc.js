/**
 * JAVASCRIPT - Calculadora de IMC (Índice de Massa Corporal)
 * Funcionalidade interativa para manipulação do DOM e exibição de dados dinâmicos
 */

document.addEventListener('DOMContentLoaded', () => {
  const formImc = document.getElementById('formImc');
  const btnLimpar = document.getElementById('btnLimparImc');

  if (!formImc) return;

  const pesoInput = document.getElementById('imcPeso');
  const alturaInput = document.getElementById('imcAltura');
  const imcValueDisplay = document.getElementById('imcValue');
  const imcStatusDisplay = document.getElementById('imcStatus');
  const imcTipDisplay = document.getElementById('imcTip');

  // Evento de cálculo ao submeter o formulário
  formImc.addEventListener('submit', (e) => {
    e.preventDefault();

    const peso = parseFloat(pesoInput.value);
    let altura = parseFloat(alturaInput.value);

    // Validação básica dos dados inseridos
    if (isNaN(peso) || peso <= 0 || peso > 400) {
      alert('Por favor, insira um peso válido (entre 1 e 400 kg).');
      pesoInput.focus();
      return;
    }

    if (isNaN(altura) || altura <= 0) {
      alert('Por favor, insira uma altura válida.');
      alturaInput.focus();
      return;
    }

    // Se o usuário digitou altura em centímetros (ex: 175), converte para metros (1.75)
    if (altura > 3) {
      altura = altura / 100;
    }

    // Cálculo do IMC: Peso / (Altura²)
    const imc = peso / (altura * altura);
    const imcFormatado = imc.toFixed(1);

    // Determina a classificação e a cor/mensagem de acordo com a OMS
    let status = '';
    let statusColor = '';
    let recomendacao = '';

    if (imc < 18.5) {
      status = 'Abaixo do peso';
      statusColor = '#f59e0b'; // Amarelo/Laranja
      recomendacao = 'Considere consultar um nutricionista para um plano de ganho de massa magra.';
    } else if (imc >= 18.5 && imc <= 24.9) {
      status = 'Peso ideal (Parabéns!)';
      statusColor = '#10b981'; // Verde
      recomendacao = 'Você está na faixa saudável! Mantenha uma rotina ativa e equilibrada.';
    } else if (imc >= 25.0 && imc <= 29.9) {
      status = 'Sobrepeso';
      statusColor = '#f59e0b'; // Laranja
      recomendacao = 'Exercícios aeróbicos e musculação podem ajudar a equilibrar sua composição corporal.';
    } else if (imc >= 30.0 && imc <= 34.9) {
      status = 'Obesidade Grau I';
      statusColor = '#ef4444'; // Vermelho
      recomendacao = 'Recomendamos acompanhamento com profissionais de saúde e treinos supervisionados.';
    } else {
      status = 'Obesidade Grau II / III';
      statusColor = '#b91c1c'; // Vermelho escuro
      recomendacao = 'Procure orientação médica e física especializada para sua segurança e bem-estar.';
    }

    // Manipulação do DOM para exibir o resultado dinâmico
    imcValueDisplay.textContent = imcFormatado;
    imcValueDisplay.style.color = statusColor;
    imcStatusDisplay.textContent = status;
    imcStatusDisplay.style.color = statusColor;
    imcTipDisplay.textContent = recomendacao;
  });

  // Botão para resetar a calculadora
  if (btnLimpar) {
    btnLimpar.addEventListener('click', () => {
      formImc.reset();
      imcValueDisplay.textContent = '--';
      imcValueDisplay.style.color = 'var(--primary-color)';
      imcStatusDisplay.textContent = 'Informe seus dados ao lado';
      imcStatusDisplay.style.color = 'var(--text-main)';
      imcTipDisplay.textContent = 'O resultado do seu IMC aparecerá aqui com recomendações personalizadas.';
    });
  }
});
