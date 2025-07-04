// Carrusel exclusivo para la sección de novedades

document.addEventListener('DOMContentLoaded', function() {
  const carousel = document.getElementById('novedades-carousel');
  const prevBtn = document.getElementById('novedades-carousel-prev');
  const nextBtn = document.getElementById('novedades-carousel-next');
  const indicators = document.getElementById('novedades-carousel-indicators');

  if (!carousel) return;

  // Array de productos (fácil de modificar)
  const productosNovedades = [];
  for (let i = 2; i <= 34; i++) {
    productosNovedades.push({
      img: `assets/img/${i}.jpeg`,
      nombre: `Producto ${i}`,
      precio: 129900
    });
  }

  // Renderizar los slides
  productosNovedades.forEach(producto => {
    const slide = document.createElement('div');
    slide.className = 'novedades-carousel-slide';
    slide.innerHTML = `
      <img src="${producto.img}" alt="${producto.nombre}" loading="lazy">
      <div class="novedades-carousel-caption">
        <h3>${producto.nombre}</h3>
        <span>$${producto.precio.toLocaleString('es-CO')}</span>
        <button class="btn-blue">Añadir al carrito</button>
      </div>
    `;
    carousel.appendChild(slide);
  });

  let current = 0;
  const slides = carousel.querySelectorAll('.novedades-carousel-slide');
  const visible = 4; // Mostrar 4 productos a la vez

  let autoplayInterval = null;
  let isPaused = false;
  const AUTOPLAY_TIME = 3000;

  function update() {
    slides.forEach((slide, idx) => {
      slide.style.display = (idx >= current && idx < current + visible) ? 'flex' : 'none';
    });
    if (indicators) {
      indicators.innerHTML = '';
      for (let i = 0; i <= slides.length - visible; i++) {
        const dot = document.createElement('span');
        dot.className = 'novedades-carousel-indicator' + (i === current ? ' active' : '');
        dot.onclick = () => {
          current = i;
          update();
          pauseAutoplay();
        };
        indicators.appendChild(dot);
      }
    }
    if (prevBtn) prevBtn.disabled = (current === 0);
    if (nextBtn) nextBtn.disabled = (current >= slides.length - visible);
  }

  function nextSlide() {
    if (current < slides.length - visible) {
      current++;
    } else {
      current = 0;
    }
    update();
  }

  function startAutoplay() {
    if (autoplayInterval) clearInterval(autoplayInterval);
    autoplayInterval = setInterval(() => {
      if (!isPaused) nextSlide();
    }, AUTOPLAY_TIME);
  }

  function pauseAutoplay() {
    isPaused = true;
    if (autoplayInterval) clearInterval(autoplayInterval);
  }

  function resumeAutoplay() {
    isPaused = false;
    startAutoplay();
  }

  if (prevBtn) prevBtn.onclick = function() {
    if (current > 0) {
      current--;
    } else {
      current = slides.length - visible;
    }
    update();
    pauseAutoplay();
  };
  if (nextBtn) nextBtn.onclick = function() {
    nextSlide();
    pauseAutoplay();
  };

  // Pausar autoplay al interactuar y reanudar al retirar el cursor
  [carousel, prevBtn, nextBtn, indicators].forEach(el => {
    if (el) {
      el.addEventListener('mouseenter', pauseAutoplay);
      el.addEventListener('mouseleave', resumeAutoplay);
    }
  });

  update();
  startAutoplay();

  // Exponer el array para fácil edición desde consola
  window.productosNovedades = productosNovedades;
});
