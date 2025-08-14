document.addEventListener('DOMContentLoaded', () => {

  const pages = Array.from(document.querySelectorAll('#book .page'));
  let current = 0;

  /** Sitúa cada página según el índice actual */
  function render() {
    pages.forEach((p, i) => {
      p.style.transform = `translateX(${(i - current) * 100}%)`;
    });
  }

  /** Avanza si no estamos al final */
  function next() {
    if (current < pages.length - 1) {
      current++;
      render();
    }
  }

  /** Retrocede si no estamos al inicio */
  function prev() {
    if (current > 0) {
      current--;
      render();
    }
  }

  /* Botones */
  document.getElementById('next').addEventListener('click', next);
  document.getElementById('prev').addEventListener('click', prev);

  /* Clic / tap en la mitad derecha para avanzar, izquierda para retroceder */
  document.getElementById('book').addEventListener('click', e => {
    const { left, width } = e.currentTarget.getBoundingClientRect();
    (e.clientX - left > width / 2) ? next() : prev();
  });

  /* Flechas del teclado */
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft')  prev();
  });

  /* Muestra la primera página */
  render();
});

