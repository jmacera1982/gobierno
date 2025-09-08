// Datos simulados para el examen médico
const datosExamenMedico = {
    tramite: '826688',
    documento: 'DNI 12345678',
    contribuyente: 'AGUILERA, JOSE MARIA',
    grupoSanguineo: '0',
    factorRh: '+',
    agudezaVisualOD: '',
    agudezaVisualOI: '',
    visionCromatica: 'NO',
    agudezaAuditiva: 'SI',
    campoVisual: 'SI',
    examenClinico: 'NO',
    psicodiagnostico: 'SI',
    condiciones: {
        anteojos: false,
        audifono: false,
        cAdaptado: false,
        vMonocular: false,
        lContacto: false
    },
    otorgaNuevoPlazo: '',
    otorgaAnos: '5',
    comentario: ''
};

// Función para validar agudeza visual
function validarAgudezaVisual(valor) {
    if (!valor) return true; // Campo opcional
    
    // Patrones válidos: 20/20, 20/40, 6/6, etc.
    const patron = /^(\d{1,2}\/\d{1,2}|6\/6|20\/20|20\/40|20\/60|20\/80|20\/100)$/i;
    return patron.test(valor);
}

// Función para mostrar error
function mostrarError(elemento, mensaje) {
    const formGroup = elemento.closest('.form-group');
    formGroup.classList.add('error');
    formGroup.classList.remove('success');
    
    let errorMsg = formGroup.querySelector('.error-message');
    if (!errorMsg) {
        errorMsg = document.createElement('div');
        errorMsg.className = 'error-message';
        formGroup.appendChild(errorMsg);
    }
    errorMsg.textContent = mensaje;
}

// Función para limpiar error
function limpiarError(elemento) {
    const formGroup = elemento.closest('.form-group');
    formGroup.classList.remove('error');
    formGroup.classList.add('success');
    
    const errorMsg = formGroup.querySelector('.error-message');
    if (errorMsg) {
        errorMsg.remove();
    }
}

// Función para validar formulario
function validarFormulario() {
    let esValido = true;
    
    // Validar agudeza visual OD
    const agudezaOD = document.getElementById('agudezaVisualOD').value.trim();
    if (agudezaOD && !validarAgudezaVisual(agudezaOD)) {
        mostrarError(document.getElementById('agudezaVisualOD'), 'Formato inválido. Use formato como 20/20 o 6/6');
        esValido = false;
    } else {
        limpiarError(document.getElementById('agudezaVisualOD'));
    }
    
    // Validar agudeza visual OI
    const agudezaOI = document.getElementById('agudezaVisualOI').value.trim();
    if (agudezaOI && !validarAgudezaVisual(agudezaOI)) {
        mostrarError(document.getElementById('agudezaVisualOI'), 'Formato inválido. Use formato como 20/20 o 6/6');
        esValido = false;
    } else {
        limpiarError(document.getElementById('agudezaVisualOI'));
    }
    
    return esValido;
}

// Función para recopilar datos del formulario
function recopilarDatosFormulario() {
    return {
        tramite: document.querySelector('.tramite-number').textContent,
        documento: document.querySelector('.doc-value').textContent,
        contribuyente: document.querySelector('.contributor-value').textContent,
        grupoSanguineo: document.getElementById('grupoSanguineo').value,
        factorRh: document.getElementById('factorRh').value,
        agudezaVisualOD: document.getElementById('agudezaVisualOD').value,
        agudezaVisualOI: document.getElementById('agudezaVisualOI').value,
        visionCromatica: document.getElementById('visionCromatica').value,
        agudezaAuditiva: document.getElementById('agudezaAuditiva').value,
        campoVisual: document.getElementById('campoVisual').value,
        examenClinico: document.getElementById('examenClinico').value,
        psicodiagnostico: document.getElementById('psicodiagnostico').value,
        condiciones: {
            anteojos: document.getElementById('anteojos').checked,
            audifono: document.getElementById('audifono').checked,
            cAdaptado: document.getElementById('cAdaptado').checked,
            vMonocular: document.getElementById('vMonocular').checked,
            lContacto: document.getElementById('lContacto').checked
        },
        otorgaNuevoPlazo: document.getElementById('otorgaNuevoPlazo').value,
        otorgaAnos: document.getElementById('otorgaAnos').value,
        comentario: document.getElementById('comentario').value,
        fechaExamen: new Date().toLocaleDateString('es-ES'),
        horaExamen: new Date().toLocaleTimeString('es-ES', {hour: '2-digit', minute: '2-digit'})
    };
}

// Función para procesar aprobación
function procesarAprobacion() {
    if (!validarFormulario()) {
        alert('Por favor, corrija los errores en el formulario');
        return;
    }
    
    const datos = recopilarDatosFormulario();
    const confirmacion = confirm(`¿Confirma la APROBACIÓN del examen médico para ${datos.contribuyente}?`);
    
    if (confirmacion) {
        console.log('Examen APROBADO:', datos);
        alert('Examen médico APROBADO correctamente');
        
        // Aquí se podría enviar los datos a un servidor
        // fetch('/api/examen-medico/aprobar', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(datos)
        // });
        
        // Limpiar formulario después del envío
        limpiarFormulario();
    }
}

// Función para procesar no aprobación
function procesarNoAprobacion() {
    if (!validarFormulario()) {
        alert('Por favor, corrija los errores en el formulario');
        return;
    }
    
    const datos = recopilarDatosFormulario();
    const razon = prompt('Ingrese la razón de la no aprobación:');
    
    if (razon) {
        datos.razonNoAprobacion = razon;
        const confirmacion = confirm(`¿Confirma la NO APROBACIÓN del examen médico para ${datos.contribuyente}?\n\nRazón: ${razon}`);
        
        if (confirmacion) {
            console.log('Examen NO APROBADO:', datos);
            alert('Examen médico NO APROBADO correctamente');
            
            // Aquí se podría enviar los datos a un servidor
            // fetch('/api/examen-medico/no-aprobar', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(datos)
            // });
            
            // Limpiar formulario después del envío
            limpiarFormulario();
        }
    }
}

// Función para descartar examen
function descartarExamen() {
    const confirmacion = confirm('¿Está seguro de que desea descartar este examen médico?');
    
    if (confirmacion) {
        console.log('Examen descartado');
        alert('Examen médico descartado');
        limpiarFormulario();
    }
}

// Función para llamar
function llamarPaciente() {
    const datos = recopilarDatosFormulario();
    const confirmacion = confirm(`¿Desea llamar al paciente ${datos.contribuyente}?`);
    
    if (confirmacion) {
        console.log('Llamando al paciente:', datos.contribuyente);
        alert(`Llamando al paciente ${datos.contribuyente}...`);
        
        // Aquí se podría integrar con un sistema de llamadas
        // o mostrar información de contacto
    }
}

// Función para actualizar información
function actualizarInformacion() {
    const nuevoTramite = prompt('Ingrese el nuevo número de trámite:', document.querySelector('.tramite-number').textContent);
    if (nuevoTramite) {
        document.querySelector('.tramite-number').textContent = nuevoTramite;
    }
    
    const nuevoDocumento = prompt('Ingrese el nuevo documento:', document.querySelector('.doc-value').textContent);
    if (nuevoDocumento) {
        document.querySelector('.doc-value').textContent = nuevoDocumento;
    }
    
    const nuevoContribuyente = prompt('Ingrese el nuevo contribuyente:', document.querySelector('.contributor-value').textContent);
    if (nuevoContribuyente) {
        document.querySelector('.contributor-value').textContent = nuevoContribuyente;
    }
    
    console.log('Información actualizada');
    alert('Información actualizada correctamente');
}

// Función para limpiar formulario
function limpiarFormulario() {
    const form = document.getElementById('examenMedicoForm');
    form.reset();
    
    // Limpiar todos los errores
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach(group => {
        group.classList.remove('error', 'success');
        const errorMsg = group.querySelector('.error-message');
        if (errorMsg) {
            errorMsg.remove();
        }
    });
    
    // Restaurar valores por defecto
    document.getElementById('grupoSanguineo').value = '0';
    document.getElementById('factorRh').value = '+';
    document.getElementById('visionCromatica').value = 'NO';
    document.getElementById('agudezaAuditiva').value = 'SI';
    document.getElementById('campoVisual').value = 'SI';
    document.getElementById('examenClinico').value = 'NO';
    document.getElementById('psicodiagnostico').value = 'SI';
    document.getElementById('otorgaAnos').value = '5';
    
    console.log('Formulario limpiado');
}

// Función para auto-completar con datos de ejemplo
function cargarDatosEjemplo() {
    // Cargar datos de ejemplo para demostración
    document.getElementById('agudezaVisualOD').value = '20/20';
    document.getElementById('agudezaVisualOI').value = '20/20';
    document.getElementById('otorgaNuevoPlazo').value = 'Licencia renovada por 5 años';
    document.getElementById('comentario').value = 'Paciente en buen estado de salud general. Agudeza visual normal. Sin condiciones especiales.';
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Botón actualizar
    document.getElementById('actualizarBtn').addEventListener('click', actualizarInformacion);
    
    // Botones de acción
    document.getElementById('aprobadoBtn').addEventListener('click', procesarAprobacion);
    document.getElementById('noAprobadoBtn').addEventListener('click', procesarNoAprobacion);
    document.getElementById('descartarBtn').addEventListener('click', descartarExamen);
    document.getElementById('llamarBtn').addEventListener('click', llamarPaciente);
    
    // Validación en tiempo real para agudeza visual
    document.getElementById('agudezaVisualOD').addEventListener('input', function(e) {
        if (e.target.value && !validarAgudezaVisual(e.target.value)) {
            mostrarError(e.target, 'Formato inválido. Use formato como 20/20 o 6/6');
        } else {
            limpiarError(e.target);
        }
    });
    
    document.getElementById('agudezaVisualOI').addEventListener('input', function(e) {
        if (e.target.value && !validarAgudezaVisual(e.target.value)) {
            mostrarError(e.target, 'Formato inválido. Use formato como 20/20 o 6/6');
        } else {
            limpiarError(e.target);
        }
    });
    
    // Auto-completar con datos de ejemplo al cargar (opcional)
    // Descomenta la siguiente línea si quieres cargar datos de ejemplo automáticamente
    // cargarDatosEjemplo();
    
    // Validación de checkboxes - mostrar alerta si se selecciona V.Monocular
    document.getElementById('vMonocular').addEventListener('change', function(e) {
        if (e.target.checked) {
            const confirmacion = confirm('¿El paciente tiene visión monocular? Esto puede afectar la aprobación de la licencia.');
            if (!confirmacion) {
                e.target.checked = false;
            }
        }
    });
    
    // Validación de checkboxes - mostrar alerta si se selecciona C.Adaptado
    document.getElementById('cAdaptado').addEventListener('change', function(e) {
        if (e.target.checked) {
            const confirmacion = confirm('¿El paciente requiere vehículo adaptado? Esto requiere documentación adicional.');
            if (!confirmacion) {
                e.target.checked = false;
            }
        }
    });
    
    console.log('Formulario de Examen Médico cargado correctamente');
});
