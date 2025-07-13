// Generador de catálogo para páginas de productos
// Reutiliza las imágenes del carrusel y muestra cards con descripción y precio

document.addEventListener('DOMContentLoaded', function() {
  // Configuración de catálogos para todas las páginas
  const catalogos = [
    { id: 'catalogo-hombres', nombre: 'Zapato Hombre', precio: 75000 },
    { id: 'catalogo-mujeres', nombre: 'Zapato Mujer', precio: 75000, imagenes: [
      ...Array.from({length: 66}, (_, i) => `assets/img/calzmujeres/m${i+1}.jpeg`)
    ] },
    { id: 'catalogo-colegiales', nombre: 'Zapato Colegial', precio: 75000 },
    { id: 'catalogo-dotacion', nombre: 'Zapato Dotación', precio: 75000, imagenes: [
      'assets/img/dotacion/dot1.webp',
      'assets/img/dotacion/dot2.webp',
      'assets/img/dotacion/dot3.webp',
      'assets/img/dotacion/dot4.webp',
      'assets/img/dotacion/dot5.webp',
      'assets/img/dotacion/dot6.webp',
      'assets/img/dotacion/dot7.webp',
    ] },
{ id: 'catalogo-ninas', nombre: 'Zapato Niña', precio: 75000, imagenes: [
  'assets/img/calzninas/n1.jpeg',
  'assets/img/calzninas/n2.jpeg',
  'assets/img/calzninas/n3.jpeg',
  'assets/img/calzninas/n4.jpeg',
  'assets/img/calzninas/n5.jpeg',
  'assets/img/calzninas/n6.jpeg',
  'assets/img/calzninas/n7.jpeg',
  'assets/img/calzninas/n8.jpeg',
  'assets/img/calzninas/n9.jpeg',
  'assets/img/calzninas/n10.jpeg',
  'assets/img/calzninas/n11.jpeg',
  'assets/img/calzninas/n12.jpeg',
] },
{ id: 'catalogo-ninos', nombre: 'Zapato Niño', precio: 75000, imagenes: [
  'assets/img/calzninos/n1.jpeg',
  'assets/img/calzninos/n2.jpeg',
  'assets/img/calzninos/n3.jpeg',
  'assets/img/calzninos/n4.jpeg',
  'assets/img/calzninos/n5.jpeg',
  'assets/img/calzninos/n6.jpeg',
  'assets/img/calzninos/n7.jpeg',
  'assets/img/calzninos/n8.jpeg',
  'assets/img/calzninos/n9.jpeg',
  'assets/img/calzninos/n10.jpeg',
  'assets/img/calzninos/n11.jpeg',
  'assets/img/calzninos/n12.jpeg',
] },
    { id: 'catalogo-ofertas', nombre: 'Zapato Oferta', precio: 75000 },
    { id: 'catalogo-marcas', nombre: 'Marca', precio: null, imagenes: [
      { src: 'assets/img/marcas/newbalance.png', nombre: 'New Balance' },
      { src: 'assets/img/marcas/skechers.png', nombre: 'Skechers' },
      { src: 'assets/img/marcas/rivercreek.png', nombre: 'River Creek' },
      { src: 'assets/img/marcas/brahma.png', nombre: 'Brahma' },
      { src: 'assets/img/marcas/throwing.png', nombre: 'Throwing' },
      { src: 'assets/img/marcas/verlon.png', nombre: 'Verlon' },
      { src: 'assets/img/marcas/troya.png', nombre: 'Troya' },
      { src: 'assets/img/marcas/stardus.png', nombre: 'Stardus' },
      { src: 'assets/img/marcas/piccadilly.png', nombre: 'Piccadilly' },
      { src: 'assets/img/marcas/patrick.png', nombre: 'Patrick' },
      { src: 'assets/img/marcas/moleca.png', nombre: 'Moleca' },
      { src: 'assets/img/marcas/ipanema.png', nombre: 'Ipanema' },
      { src: 'assets/img/marcas/gumball.png', nombre: 'Gumball' },
      { src: 'assets/img/marcas/frattini.png', nombre: 'Frattini' },
      { src: 'assets/img/marcas/croydon.png', nombre: 'Croydon' },
      { src: 'assets/img/marcas/cartago.png', nombre: 'Cartago' },
      { src: 'assets/img/marcas/bubblegummers.png', nombre: 'Bubblegummers' },
      { src: 'assets/img/marcas/24walks.png', nombre: '24 Walks' },
    ] },
    { id: 'catalogo-accesorios', nombre: 'Accesorio', precio: 29900, imagenes: [
      'assets/img/complementos/bolso1.webp',
      'assets/img/complementos/bolso2.webp',
      'assets/img/complementos/bolso3.webp',
      'assets/img/complementos/medias1.webp',
      'assets/img/complementos/medias2.webp',
      'assets/img/complementos/medias3.webp',
      'assets/img/complementos/medias4.webp',
    ] },
  ];

  // Detectar si estamos en la página de nuevos o marcas
  const esNuevos = window.location.pathname.includes('nuevos.html');
  const esMarcas = window.location.pathname.includes('marcas.html');

  catalogos.forEach(catalogo => {
    const contenedor = document.getElementById(catalogo.id);
    if (contenedor) {
      // Si el catálogo tiene imágenes personalizadas (dotación o accesorios)
      if (catalogo.imagenes) {
        catalogo.imagenes.forEach((imgObj, idx) => {
          const card = document.createElement('div');
          // Tarjeta especial para marcas: más compacta
          card.className = catalogo.id === 'catalogo-marcas' ? 'producto-card producto-card-marca' : 'producto-card';
          let etiquetas = '';
          if (esNuevos) etiquetas += '<span class="etiqueta-nuevo">NUEVOS</span>';
          // Si es la sección de marcas, solo muestra la imagen y el nombre personalizado
          if (catalogo.id === 'catalogo-marcas') {
            card.innerHTML = `
              <img src="${imgObj.src}" alt="${imgObj.nombre}" loading="lazy" class="marca-img" />
              <div class="producto-info">
                <h3 class="marca-nombre">${imgObj.nombre}</h3>
              </div>
            `;
          } else {
            if (!esMarcas && catalogo.id !== 'catalogo-marcas' && catalogo.id !== 'catalogo-accesorios') etiquetas += '<span class="etiqueta-envio">*ENVÍO GRATIS <i class="fa-solid fa-rocket"></i></span>';
            if (catalogo.id === 'catalogo-accesorios') {
              card.innerHTML = `
                ${etiquetas}
                <img src="${imgObj}" alt="${catalogo.nombre} ${idx+1}" loading="lazy" />
                <div class="producto-info">
                  <h3>${catalogo.nombre} ${idx+1}</h3>
                  ${catalogo.precio ? `<p class="producto-precio">$${catalogo.precio.toLocaleString('es-CO')}</p>` : ''}
                  <button class="btn-add-cart">Añadir al carrito</button>
                </div>
              `;
            } else {
              card.innerHTML = `
                ${etiquetas}
                <img src="${imgObj}" alt="${catalogo.nombre} ${idx+1}" loading="lazy" />
                <div class="producto-info">
                  <h3>${catalogo.nombre} ${idx+1}</h3>
                  ${catalogo.precio ? `<p class="producto-precio">$${catalogo.precio.toLocaleString('es-CO')}</p>` : ''}
                  <div class="producto-tallas">
                    <div class="tallas-label">Selecciona tu talla:</div>
                    <div class="tallas-list">
                      <button type="button" class="talla-btn">35</button>
                      <button type="button" class="talla-btn">36</button>
                      <button type="button" class="talla-btn">37</button>
                      <button type="button" class="talla-btn">38</button>
                      <button type="button" class="talla-btn">39</button>
                      <button type="button" class="talla-btn">40</button>
                      <button type="button" class="talla-btn">41</button>
                      <button type="button" class="talla-btn">42</button>
                    </div>
                    <button type="button" class="btn-guia-tallas">Guía de tallas</button>
                  </div>
                  <button class="btn-add-cart">Añadir al carrito</button>
                </div>
              `;
            }
          }
          contenedor.appendChild(card);
        });
      } else {
        for (let i = 2; i <= 34; i++) {
          const card = document.createElement('div');
          card.className = 'producto-card';
          let etiquetas = '';
          if (esNuevos) etiquetas += '<span class="etiqueta-nuevo">NUEVOS</span>';
          if (!esMarcas && catalogo.id !== 'catalogo-marcas') etiquetas += '<span class="etiqueta-envio">*ENVÍO GRATIS <i class="fa-solid fa-rocket"></i></span>';
          card.innerHTML = `
            ${etiquetas}
            <img src="assets/img/${i}.jpeg" alt="${catalogo.nombre} ${i}" loading="lazy" />
            <div class="producto-info">
              <h3>${catalogo.nombre} ${i}</h3>
              ${catalogo.precio ? `<p class="producto-precio">$${catalogo.precio.toLocaleString('es-CO')}</p>` : ''}
              <div class="producto-tallas">
                <div class="tallas-label">Selecciona tu talla:</div>
                <div class="tallas-list">
                  <button type="button" class="talla-btn">35</button>
                  <button type="button" class="talla-btn">36</button>
                  <button type="button" class="talla-btn">37</button>
                  <button type="button" class="talla-btn">38</button>
                  <button type="button" class="talla-btn">39</button>
                  <button type="button" class="talla-btn">40</button>
                  <button type="button" class="talla-btn">41</button>
                  <button type="button" class="talla-btn">42</button>
                </div>
                <button type="button" class="btn-guia-tallas">Guía de tallas</button>
              </div>
              <button class="btn-add-cart">Añadir al carrito</button>
            </div>
          `;
          contenedor.appendChild(card);
        }
      }
      // Lógica para el botón "Añadir al carrito" en cada catálogo
      contenedor.addEventListener('click', function(e) {
        if (e.target.classList.contains('btn-add-cart')) {
          e.preventDefault();
          alert('Producto añadido al carrito!');
        }
        if (e.target.classList.contains('btn-guia-tallas')) {
          e.preventDefault();
          var modal = document.getElementById('modal-guia-tallas');
          if (modal) {
            modal.style.display = 'flex';
            document.getElementById('modal-gt-select').value = 'medida';
            if (typeof mostrarPanelGuiaTallas === 'function') mostrarPanelGuiaTallas('medida');
            if (typeof cambiarImagenGuiaTallas === 'function') cambiarImagenGuiaTallas('medida');
          }
        }
      });
    }
  });
});
