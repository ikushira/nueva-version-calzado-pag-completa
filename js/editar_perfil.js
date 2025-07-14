// Validaciones y funcionalidad de edición de perfil

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('formEditarPerfil');
    const msg = document.getElementById('msg-editar');
    const btnJuridica = document.getElementById('btnJuridica');
    const camposJuridica = document.getElementById('campos-juridica');

    // Precargar datos si existen
    const datosGuardados = localStorage.getItem('perfilUsuario');
    if (datosGuardados) {
        try {
            const datos = JSON.parse(datosGuardados);
            if (datos.nombre) form.nombre.value = datos.nombre;
            if (datos.apellido) form.apellido.value = datos.apellido;
            if (datos.email) form.email.value = datos.email;
            if (datos.cedula) form.cedula.value = datos.cedula;
            if (datos.telefono) form.telefono.value = datos.telefono;
            if (datos.genero) form.genero.value = datos.genero;
            if (datos.fecha) form.fecha.value = datos.fecha;
            if (typeof datos.boletin !== 'undefined') form.boletin.checked = datos.boletin;
            if ((datos.nit && datos.nit.length > 0) || (datos.razon && datos.razon.length > 0)) {
                camposJuridica.classList.remove('campos-juridica-oculto');
                if (datos.nit) form.nit.value = datos.nit;
                if (datos.razon) form.razon.value = datos.razon;
            }
        } catch (e) { /* ignorar error de parseo */ }
    }

    btnJuridica.addEventListener('click', function(e) {
        e.preventDefault();
        if (camposJuridica.classList.contains('campos-juridica-oculto')) {
            camposJuridica.classList.remove('campos-juridica-oculto');
        } else {
            camposJuridica.classList.add('campos-juridica-oculto');
        }
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        msg.style.display = 'none';
        let errores = [];
        if (!form.nombre.value.trim()) errores.push('El nombre es obligatorio.');
        if (!form.apellido.value.trim()) errores.push('El apellido es obligatorio.');
        if (!form.cedula.value.match(/^[0-9]{6,10}$/)) errores.push('La cédula debe tener entre 6 y 10 dígitos.');
        if (form.telefono.value && !form.telefono.value.match(/^[0-9]{7,10}$/)) errores.push('El teléfono debe tener entre 7 y 10 dígitos.');
        if (!camposJuridica.classList.contains('campos-juridica-oculto')) {
            if (!form.nit.value.match(/^[0-9]{9,12}$/)) errores.push('El NIT debe tener entre 9 y 12 dígitos.');
            if (!form.razon.value.trim()) errores.push('La razón social es obligatoria.');
        }
        if (errores.length > 0) {
            msg.style.display = 'block';
            msg.style.color = '#d21c32';
            msg.textContent = errores.join(' ');
            return;
        }
        // Guardar datos en localStorage (simulación de guardado)
        const datosPerfil = {
            nombre: form.nombre.value,
            apellido: form.apellido.value,
            email: form.email.value,
            cedula: form.cedula.value,
            telefono: form.telefono.value,
            genero: form.genero.value,
            fecha: form.fecha.value,
            boletin: form.boletin.checked,
            nit: form.nit ? form.nit.value : '',
            razon: form.razon ? form.razon.value : ''
        };
        localStorage.setItem('perfilUsuario', JSON.stringify(datosPerfil));

        // Guardar en archivo de usuarios (simulado en localStorage)
        let usuarios = JSON.parse(localStorage.getItem('usuariosRegistrados') || '[]');
        // Si el usuario ya existe (por email), actualizarlo; si no, agregarlo
        const idx = usuarios.findIndex(u => u.email === datosPerfil.email);
        if (idx >= 0) {
            usuarios[idx] = datosPerfil;
        } else {
            usuarios.push(datosPerfil);
        }
        // Ordenar alfabéticamente por nombre
        usuarios.sort((a, b) => a.nombre.localeCompare(b.nombre));
        localStorage.setItem('usuariosRegistrados', JSON.stringify(usuarios));

        // Confirmación visual
        msg.style.display = 'block';
        msg.style.color = '#1a8cff';
        msg.textContent = 'Datos Actualizados';
        setTimeout(() => {
            window.location.href = 'cuenta.html';
        }, 1800);
    });
});
