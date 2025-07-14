// carrito.js - Lógica del carrito de compras

const btnCarrito = document.getElementById('btn-carrito');
const modalCarrito = document.getElementById('modal-carrito');
const cerrarCarrito = document.getElementById('cerrar-carrito');
const carritoLista = document.getElementById('carrito-lista');
const carritoVacio = document.getElementById('carrito-vacio');
const carritoTotal = document.getElementById('carrito-total');
const carritoTotalPrecio = document.getElementById('carrito-total-precio');
const carritoCantidad = document.getElementById('carrito-cantidad');
const btnElegirProductos = document.getElementById('btn-elegir-productos');
const btnFinalizarCompra = document.getElementById('btn-finalizar-compra');

let carrito = [];

// Cargar carrito desde localStorage
function cargarCarrito() {
  const guardado = localStorage.getItem('carrito');
  carrito = guardado ? JSON.parse(guardado) : [];
}

// Guardar carrito en localStorage
function guardarCarrito() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Actualizar cantidad en el icono
function actualizarCantidad() {
  carritoCantidad.textContent = carrito.reduce((acc, prod) => acc + prod.cantidad, 0);
}

// Renderizar productos en el modal
function renderizarCarrito() {
  if (carrito.length === 0) {
    carritoLista.innerHTML = '';
    carritoVacio.style.display = 'block';
    carritoTotal.classList.add('oculto');
  } else {
    carritoVacio.style.display = 'none';
    carritoLista.innerHTML = carrito.map((prod, idx) => `
      <div class="carrito-item">
        <span>${prod.nombre}</span>
        <span>x${prod.cantidad}</span>
        <span>$${prod.precio * prod.cantidad}</span>
        <button class="eliminar-item" data-idx="${idx}">&times;</button>
      </div>
    `).join('');
    carritoTotal.classList.remove('oculto');
    carritoTotalPrecio.textContent = carrito.reduce((acc, prod) => acc + prod.precio * prod.cantidad, 0);
  }
  actualizarCantidad();
}

// Abrir y cerrar modal
btnCarrito.addEventListener('click', () => {
  modalCarrito.classList.remove('oculto');
  renderizarCarrito();
});
cerrarCarrito.addEventListener('click', () => {
  modalCarrito.classList.add('oculto');
});

// Eliminar producto del carrito
carritoLista.addEventListener('click', (e) => {
  if (e.target.classList.contains('eliminar-item')) {
    const idx = e.target.getAttribute('data-idx');
    carrito.splice(idx, 1);
    guardarCarrito();
    renderizarCarrito();
  }
});

// Botón elegir productos
btnElegirProductos.addEventListener('click', () => {
  modalCarrito.classList.add('oculto');
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Finalizar compra (puedes personalizar esta acción)
if (btnFinalizarCompra) {
  btnFinalizarCompra.addEventListener('click', () => {
    alert('¡Gracias por tu compra!');
    carrito = [];
    guardarCarrito();
    renderizarCarrito();
    modalCarrito.classList.add('oculto');
  });
}

// Función global para agregar productos al carrito
window.agregarAlCarrito = function(producto) {
  const idx = carrito.findIndex(p => p.id === producto.id);
  if (idx > -1) {
    carrito[idx].cantidad += producto.cantidad;
  } else {
    carrito.push(producto);
  }
  guardarCarrito();
  renderizarCarrito();
};

// Inicializar
// Inicializar y enlazar botones "Añadir al carrito"
// Inicialización y enlace global de botones "Añadir al carrito" en todas las páginas y carruseles
cargarCarrito();
actualizarCantidad();

function obtenerDatosProducto(boton) {
  // Buscar el contenedor del producto
  const card = boton.closest('.producto-card, .product-card, .card-producto, .carrusel-item, .carousel-slide');
  if (!card) return null;
  // Extraer datos del producto
  const id = card.getAttribute('data-id') || card.id || boton.getAttribute('data-id') || Date.now();
  const nombre = card.querySelector('.producto-nombre, .product-name, .nombre-producto, .titulo-producto, .nombre-carrusel')?.textContent?.trim() || 'Producto';
  const precioTxt = card.querySelector('.producto-precio, .product-price, .precio-producto, .precio-carrusel')?.textContent?.replace(/[^\d]/g, '') || '0';
  const precio = parseInt(precioTxt, 10) || 0;
  // Talla seleccionada
  let talla = '';
  // Buscar botón/talla seleccionada
  const btnTalla = card.querySelector('.talla-btn.selected, .talla-btn.active');
  if (btnTalla) {
    talla = btnTalla.textContent.trim();
  }
  return { id, nombre, precio, talla };
}

function enlazarBotonesAgregarGlobal() {
  // Selecciona todos los botones de añadir al carrito en productos y carruseles
  const botones = document.querySelectorAll('.btn-agregar-carrito, .btn-add-cart, .btn-anadir-carrito, .btn-añadir-carrito, .agregar-carrito, .add-to-cart, .btn-cart');
  botones.forEach(boton => {
    // Evita doble registro
    if (boton.dataset.carritoEnlazado) return;
    boton.addEventListener('click', function() {
      const datos = obtenerDatosProducto(boton);
      if (!datos) return;
      // Si requiere talla y no está seleccionada
      if (!datos.talla) {
        alert('Por favor selecciona una talla antes de añadir al carrito.');
        return;
      }
      window.agregarAlCarrito({
        id: datos.id + '-' + datos.talla,
        nombre: datos.nombre + ' Talla ' + datos.talla,
        precio: datos.precio,
        cantidad: 1,
        talla: datos.talla
      });
    });
    boton.dataset.carritoEnlazado = 'true';
  });
}

// Ejecutar al cargar y cada vez que se agreguen productos/carruseles dinámicamente
document.addEventListener('DOMContentLoaded', enlazarBotonesAgregarGlobal);
setInterval(enlazarBotonesAgregarGlobal, 2000); // Por si se agregan productos/carruseles dinámicamente
