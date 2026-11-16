/**
 * JAVASCRIPT - Filtro Dinâmico de Grade de Horários (Tabelas)
 * Permite filtrar as linhas da tabela de aulas por turno (Manhã, Tarde, Noite ou Todos)
 */

document.addEventListener('DOMContentLoaded', () => {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const tableRows = document.querySelectorAll('#scheduleTableBody tr');
  const counterDisplay = document.getElementById('classesCount');

  if (!filterButtons.length || !tableRows.length) return;

  function updateCount(count) {
    if (counterDisplay) {
      counterDisplay.textContent = `${count} aula(s) encontrada(s)`;
    }
  }

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Atualiza estilo do botão ativo
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filterValue = button.getAttribute('data-filter');
      let visibleCount = 0;

      tableRows.forEach(row => {
        const period = row.getAttribute('data-period');

        if (filterValue === 'all' || period === filterValue) {
          row.style.display = '';
          visibleCount++;
        } else {
          row.style.display = 'none';
        }
      });

      updateCount(visibleCount);
    });
  });
});
