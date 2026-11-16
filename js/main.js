/**
 * JAVASCRIPT GLOBAL - FitLife
 * Funcionalidades:
 * 1. Controle do Menu Hambúrguer (Mobile) com ícones vetoriais
 * 2. Alternador de Tema Escuro/Claro (Dark/Light Mode) com LocalStorage e SVGs
 * 3. Ano dinâmico no Rodapé
 */

document.addEventListener('DOMContentLoaded', () => {
  // Ícones SVG minimalistas (Padrão profissional, sem emojis)
  const iconSun = `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
  const iconMoon = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
  const iconMenu = `<svg viewBox="0 0 24 24" aria-hidden="true"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
  const iconClose = `<svg viewBox="0 0 24 24" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;

  // 1. Menu Mobile (Hambúrguer)
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');

  if (menuToggle && navMenu) {
    menuToggle.innerHTML = iconMenu;

    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      menuToggle.setAttribute('aria-expanded', isOpen);
      menuToggle.innerHTML = isOpen ? iconClose : iconMenu;
    });

    // Fechar menu ao clicar em qualquer link (útil no mobile)
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        menuToggle.innerHTML = iconMenu;
      });
    });
  }

  // 2. Dark Mode / Light Mode
  const themeToggle = document.getElementById('themeToggle');
  const currentTheme = localStorage.getItem('fitlife-theme');

  // Verifica preferência salva
  if (currentTheme === 'dark') {
    document.body.classList.add('dark-mode');
    if (themeToggle) themeToggle.innerHTML = `${iconSun} <span>Claro</span>`;
  } else {
    if (themeToggle) themeToggle.innerHTML = `${iconMoon} <span>Escuro</span>`;
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      const isDark = document.body.classList.contains('dark-mode');

      if (isDark) {
        localStorage.setItem('fitlife-theme', 'dark');
        themeToggle.innerHTML = `${iconSun} <span>Claro</span>`;
      } else {
        localStorage.setItem('fitlife-theme', 'light');
        themeToggle.innerHTML = `${iconMoon} <span>Escuro</span>`;
      }
    });
  }

  // 3. Atualizar Ano no Rodapé Dinamicamente
  const yearElement = document.getElementById('currentYear');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});
