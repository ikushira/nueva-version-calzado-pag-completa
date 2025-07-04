// Funcionalidad global para el sidebar de filtros
document.addEventListener('DOMContentLoaded', function() {
  // Abrir/cerrar sidebar desde la izquierda con toggle y feedback visual
  var openFiltroBtn = document.getElementById('openFiltro');
  var filtroSidebar = document.getElementById('filtroSidebar');
  var filtroOverlay = document.getElementById('filtroOverlay');

  function openSidebar() {
    filtroSidebar.style.left = '0';
    filtroSidebar.style.zIndex = '1300';
    filtroOverlay.style.display = 'block';
    filtroOverlay.style.zIndex = '1200';
    document.body.style.overflow = 'hidden';
    openFiltroBtn.classList.add('active');
    // Enfocar el primer elemento del sidebar para accesibilidad
    setTimeout(function() {
      var firstInput = filtroSidebar.querySelector('input,button,select,textarea,a');
      if(firstInput) firstInput.focus();
    }, 200);
  }
  function closeSidebar() {
    filtroSidebar.style.left = '-100%';
    filtroSidebar.style.zIndex = '';
    filtroOverlay.style.display = 'none';
    filtroOverlay.style.zIndex = '';
    document.body.style.overflow = '';
    openFiltroBtn.classList.remove('active');
  }

  openFiltroBtn.onclick = function() {
    if (filtroSidebar.style.left === '0px' || filtroSidebar.style.left === '0') {
      closeSidebar();
    } else {
      openSidebar();
    }
  };
  document.getElementById('closeFiltro').onclick = closeSidebar;
  filtroOverlay.onclick = closeSidebar;
  
  // Función para desplegar/contraer submenús
  window.toggleFiltroSub = function(id) {
    var groupTitle = event.currentTarget;
    var el = document.getElementById('filtro-' + id);
    var icon = groupTitle.querySelector('i.fa-angle-down');
    
    if (el.style.display === 'none' || el.style.display === '') {
      el.style.display = 'block';
      groupTitle.classList.add('active');
      if (icon) icon.style.transform = 'rotate(180deg)';
    } else {
      el.style.display = 'none';
      groupTitle.classList.remove('active');
      if (icon) icon.style.transform = '';
    }
  };

  // Inicializar el primer grupo como activo (abierto)
  const primerGrupo = document.querySelector('.filtro-group-title-sketch');
  if (primerGrupo) {
    const primerGrupoId = primerGrupo.getAttribute('onclick').match(/toggleFiltroSub\('(.+?)'\)/)[1];
    document.getElementById('filtro-' + primerGrupoId).style.display = 'block';
    primerGrupo.classList.add('active');
    const icon = primerGrupo.querySelector('i.fa-angle-down');
    if (icon) icon.style.transform = 'rotate(180deg)';
  }

  // Funcionalidad para el botón de ordenamiento
  if(document.getElementById('ordenarDropdown')) {
    document.getElementById('ordenarDropdown').onclick = function(e) {
      e.stopPropagation();
      var options = document.getElementById('ordenarOptions');
      if (options.style.display === 'none' || options.style.display === '') {
        options.style.display = 'block';
      } else {
        options.style.display = 'none';
      }
    };

    // Cerrar el menú al hacer clic fuera
    document.addEventListener('click', function() {
      document.getElementById('ordenarOptions').style.display = 'none';
    });
    
    // Evitar que el clic en las opciones cierre el menú
    document.getElementById('ordenarOptions').onclick = function(e) {
      e.stopPropagation();
    };
    
    // Seleccionar opción de ordenamiento
    var ordenarOptions = document.querySelectorAll('.ordenar-option');
    ordenarOptions.forEach(function(option) {
      option.addEventListener('click', function() {
        // Eliminar selección actual
        ordenarOptions.forEach(o => o.classList.remove('selected'));
        // Marcar nueva selección
        this.classList.add('selected');
        // Actualizar texto del botón
        document.querySelector('#ordenarDropdown span').textContent = this.textContent;
        // Cerrar menú
        document.getElementById('ordenarOptions').style.display = 'none';
        
        // Aquí iría la lógica de ordenamiento real
        var ordenarPor = this.getAttribute('data-order');
        ordenarProductos(ordenarPor);
      });
    });
  }

  // Función para ordenar productos (simulada)
  function ordenarProductos(criterio) {
    console.log('Ordenando productos por: ' + criterio);
    // Aquí iría la implementación real del ordenamiento
    // que manipularía los elementos del DOM o haría una llamada al backend
  }

  // Redirección global al hacer click en cualquier filtro
  document.querySelectorAll('.filtro-link').forEach(function(label) {
    label.addEventListener('click', function(e) {
      if (e.target.tagName === 'INPUT') return;
      var filtro = label.getAttribute('data-filtro');
      var found = false;
      var nodes = document.querySelectorAll('.catalogo-container *');
      nodes.forEach(function(node) {
        if (!found && node.textContent && node.textContent.toLowerCase().includes(filtro.toLowerCase())) {
          node.scrollIntoView({behavior:'smooth', block:'center'});
          node.classList.add('filtro-highlight');
          setTimeout(function(){ node.classList.remove('filtro-highlight'); }, 1200);
          found = true;
        }
      });
      
      if (!found) {
        // Lógica de redirección global
        var secciones = [
          {nombre: 'hombres', archivo: 'hombres.html'},
          {nombre: 'mujeres', archivo: 'mujeres.html'},
          {nombre: 'ninas', archivo: 'ninas.html'},
          {nombre: 'ninos', archivo: 'ninos.html'},
          {nombre: 'colegiales', archivo: 'colegiales.html'},
          {nombre: 'dotacion', archivo: 'dotacion.html'},
          {nombre: 'nuevos', archivo: 'nuevos.html'},
          {nombre: 'ofertas', archivo: 'ofertas.html'},
          {nombre: 'marcas', archivo: 'marcas.html'}
        ];
        
        // Redirigir a la sección más probable según el filtro
        var destino = null;
        var f = filtro.toLowerCase();
        
        // Categorías principales
        if (["hombres","mujeres","niñas","niños","colegiales","dotación","nuevos","ofertas","marcas"].some(s=>f.includes(s.replace('ñ','n')))) {
          destino = secciones.find(s=>f.includes(s.nombre));
        } 
        // Subcategorías de productos
        else if (["tenis","sandalias","botas","casuales","formales","accesorios","guayos"].some(s=>f.includes(s))) {
          destino = secciones.find(s=>s.nombre==="hombres"||s.nombre==="mujeres"||s.nombre==="ninos"||s.nombre==="ninas");
        } 
        // Marcas
        else if (["24 walks","aldo masconi","rider","skechers","new balance","cartago","throwing","river creek","patrick","brahma","rockland"].some(m=>f.includes(m))) {
          destino = secciones.find(s=>s.nombre==="marcas");
        } 
        // Ofertas
        else if (["ofertas"].some(m=>f.includes(m))) {
          destino = secciones.find(s=>s.nombre==="ofertas");
        } 
        // Tallas
        else if (!isNaN(Number(f)) && Number(f)>=28 && Number(f)<=42) {
          var talla = Number(f);
          if (talla <= 34) {
            destino = secciones.find(s=>s.nombre==="ninos" || s.nombre==="ninas");
          } else if (talla >= 35 && talla <= 38) {
            destino = secciones.find(s=>s.nombre==="mujeres" || s.nombre==="ninas");
          } else {
            destino = secciones.find(s=>s.nombre==="hombres");
          }
        }
        
        if (destino && window.location.pathname.indexOf(destino.archivo)===-1) {
          window.location.href = destino.archivo + '?filtro=' + encodeURIComponent(filtro);
        }
      }
    });
  });

  // Verificar si hay parámetro de filtro en la URL
  function checkUrlFilterParam() {
    const urlParams = new URLSearchParams(window.location.search);
    const filtro = urlParams.get('filtro');
    if (filtro) {
      setTimeout(function() {
        document.querySelectorAll('.filtro-link').forEach(function(label) {
          if (label.getAttribute('data-filtro') === filtro) {
            const checkbox = label.querySelector('input[type="checkbox"]');
            if (checkbox) checkbox.checked = true;
            
            // Abrir el menú correspondiente
            const parentGroup = label.closest('.filtro-group-list-sketch');
            if (parentGroup && parentGroup.style.display === 'none') {
              const id = parentGroup.id.replace('filtro-', '');
              toggleFiltroSub(id);
            }
          }
        });
      }, 500);
    }
  }
  
  checkUrlFilterParam();
});

// Añadir estilos para resaltado de elementos
document.head.insertAdjacentHTML('beforeend', `
<style>
.filtro-highlight {
  background: rgba(37,99,235,0.15);
  box-shadow: 0 0 0 2px rgba(37,99,235,0.4);
  animation: pulse-highlight 1.2s ease-in-out;
}
@keyframes pulse-highlight {
  0% { background: rgba(37,99,235,0.15); }
  50% { background: rgba(37,99,235,0.3); }
  100% { background: rgba(37,99,235,0.05); }
}
</style>
`);
