// Datos simulados para la búsqueda por DNI
const datosPersonas = {
    '12345678': {
        apellido: 'AGUILERA',
        nombre: 'JOSE MARIA',
        calle: 'CALLE',
        altura: '1324',
        localidad: 'SAN MARTIN',
        codigoPostal: '1213',
        ultimoTurno: '16/05/20',
        motivo: 'Vuelve a rendir teórica/prác'
    },
    '87654321': {
        apellido: 'GARCIA',
        nombre: 'MARIA ELENA',
        calle: 'AVENIDA',
        altura: '567',
        localidad: 'BUENOS AIRES',
        codigoPostal: '1000',
        ultimoTurno: '20/06/20',
        motivo: 'Renovación de licencia'
    },
    '11223344': {
        apellido: 'LOPEZ',
        nombre: 'CARLOS ALBERTO',
        calle: 'RIVADAVIA',
        altura: '1234',
        localidad: 'CORDOBA',
        codigoPostal: '5000',
        ultimoTurno: '15/07/20',
        motivo: 'Duplicado de licencia'
    }
};

// Función para generar número de trámite
function generarNumeroTramite() {
    const fecha = new Date();
    const año = fecha.getFullYear().toString().slice(-2);
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const dia = fecha.getDate().toString().padStart(2, '0');
    const hora = fecha.getHours().toString().padStart(2, '0');
    const minuto = fecha.getMinutes().toString().padStart(2, '0');
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    
    return `TR${año}${mes}${dia}${hora}${minuto}${random}`;
}

// Función para validar DNI
function validarDNI(dni) {
    const dniRegex = /^\d{7,8}$/;
    return dniRegex.test(dni);
}

// Función para validar teléfono
function validarTelefono(telefono) {
    const telefonoRegex = /^\d{8}$/;
    return telefonoRegex.test(telefono);
}

// Función para validar hora
function validarHora(hora, minutos) {
    const h = parseInt(hora);
    const m = parseInt(minutos);
    return h >= 0 && h <= 23 && m >= 0 && m <= 59;
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

// Función para buscar persona por DNI
function buscarPersona() {
    const numeroDocumento = document.getElementById('numeroDocumento').value.trim();
    const tipoDocumento = document.getElementById('tipoDocumento').value;
    
    if (!numeroDocumento) {
        mostrarError(document.getElementById('numeroDocumento'), 'Ingrese un número de documento');
        return;
    }
    
    if (tipoDocumento === 'DNI' && !validarDNI(numeroDocumento)) {
        mostrarError(document.getElementById('numeroDocumento'), 'El DNI debe tener 7 u 8 dígitos');
        return;
    }
    
    limpiarError(document.getElementById('numeroDocumento'));
    
    // Simular búsqueda
    setTimeout(() => {
        if (datosPersonas[numeroDocumento]) {
            const persona = datosPersonas[numeroDocumento];
            
            // Llenar campos con datos encontrados
            document.getElementById('apellido').value = persona.apellido;
            document.getElementById('nombre').value = persona.nombre;
            document.getElementById('calleNombre').value = persona.calle;
            document.getElementById('altura').value = persona.altura;
            document.getElementById('localidad').value = persona.localidad;
            document.getElementById('codigoPostal').value = persona.codigoPostal;
            document.getElementById('ultimoTurno').value = persona.ultimoTurno;
            document.getElementById('motivo').value = persona.motivo;
            
            // Generar número de trámite
            document.getElementById('numeroTramite').value = generarNumeroTramite();
            
            // Mostrar mensaje de éxito
            alert('Persona encontrada correctamente');
        } else {
            alert('No se encontró ninguna persona con ese número de documento');
            // Limpiar campos
            document.getElementById('apellido').value = '';
            document.getElementById('nombre').value = '';
            document.getElementById('calleNombre').value = '';
            document.getElementById('altura').value = '';
            document.getElementById('localidad').value = '';
            document.getElementById('codigoPostal').value = '';
            document.getElementById('ultimoTurno').value = '';
            document.getElementById('motivo').value = '';
            document.getElementById('numeroTramite').value = '';
        }
    }, 500);
}

// Función para validar formulario completo
function validarFormulario() {
    let esValido = true;
    
    // Validar número de documento
    const numeroDocumento = document.getElementById('numeroDocumento').value.trim();
    if (!numeroDocumento) {
        mostrarError(document.getElementById('numeroDocumento'), 'El número de documento es requerido');
        esValido = false;
    } else if (!validarDNI(numeroDocumento)) {
        mostrarError(document.getElementById('numeroDocumento'), 'El DNI debe tener 7 u 8 dígitos');
        esValido = false;
    } else {
        limpiarError(document.getElementById('numeroDocumento'));
    }
    
    // Validar apellido
    const apellido = document.getElementById('apellido').value.trim();
    if (!apellido) {
        mostrarError(document.getElementById('apellido'), 'El apellido es requerido');
        esValido = false;
    } else {
        limpiarError(document.getElementById('apellido'));
    }
    
    // Validar nombre
    const nombre = document.getElementById('nombre').value.trim();
    if (!nombre) {
        mostrarError(document.getElementById('nombre'), 'El nombre es requerido');
        esValido = false;
    } else {
        limpiarError(document.getElementById('nombre'));
    }
    
    // Validar teléfono
    const celular = document.getElementById('celular').value.trim();
    if (!celular) {
        mostrarError(document.getElementById('celular'), 'El número de celular es requerido');
        esValido = false;
    } else if (!validarTelefono(celular)) {
        mostrarError(document.getElementById('celular'), 'El celular debe tener exactamente 8 dígitos');
        esValido = false;
    } else {
        limpiarError(document.getElementById('celular'));
    }
    
    // Validar hora
    const hora = document.getElementById('hora').value.trim();
    const minutos = document.getElementById('minutos').value.trim();
    if (!hora || !minutos) {
        mostrarError(document.getElementById('hora'), 'La hora de atención es requerida');
        esValido = false;
    } else if (!validarHora(hora, minutos)) {
        mostrarError(document.getElementById('hora'), 'La hora debe ser válida (00:00 - 23:59)');
        esValido = false;
    } else {
        limpiarError(document.getElementById('hora'));
    }
    
    return esValido;
}

// Función para limpiar formulario
function limpiarFormulario() {
    const form = document.getElementById('recepcionForm');
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
    
    // Generar nuevo número de trámite
    document.getElementById('numeroTramite').value = generarNumeroTramite();
    
    alert('Formulario limpiado correctamente');
}

// Función para procesar recepción
function procesarRecepcion(event) {
    event.preventDefault();
    
    if (!validarFormulario()) {
        alert('Por favor, corrija los errores en el formulario');
        return;
    }
    
    // Recopilar datos del formulario
    const datosFormulario = {
        tipoDocumento: document.getElementById('tipoDocumento').value,
        numeroDocumento: document.getElementById('numeroDocumento').value,
        apellido: document.getElementById('apellido').value,
        nombre: document.getElementById('nombre').value,
        numeroCalle: document.getElementById('numeroCalle').value,
        calleNombre: document.getElementById('calleNombre').value,
        altura: document.getElementById('altura').value,
        piso: document.getElementById('piso').value,
        departamento: document.getElementById('departamento').value,
        localidad: document.getElementById('localidad').value,
        codigoPostal: document.getElementById('codigoPostal').value,
        motivo: document.getElementById('motivo').value,
        ultimoTurno: document.getElementById('ultimoTurno').value,
        informacionAdicional: document.getElementById('informacionAdicional').value,
        hora: document.getElementById('hora').value,
        minutos: document.getElementById('minutos').value,
        tramite: document.getElementById('tramite').value,
        categoria: document.getElementById('categoria').value,
        anosSolicitado: document.getElementById('anosSolicitado').value,
        celular: document.getElementById('celular').value,
        numeroTramite: document.getElementById('numeroTramite').value
    };
    
    // Simular envío
    console.log('Datos del formulario:', datosFormulario);
    
    // Mostrar confirmación
    const confirmacion = confirm(`¿Confirma la recepción del trámite ${datosFormulario.numeroTramite}?`);
    
    if (confirmacion) {
        alert('Trámite recepcionado correctamente');
        
        // Aquí se podría enviar los datos a un servidor
        // fetch('/api/recepcionar', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(datosFormulario)
        // });
        
        // Limpiar formulario después del envío exitoso
        limpiarFormulario();
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Generar número de trámite inicial
    document.getElementById('numeroTramite').value = generarNumeroTramite();
    
    // Botón buscar
    document.getElementById('buscarBtn').addEventListener('click', buscarPersona);
    
    // Botón limpiar
    document.getElementById('limpiarBtn').addEventListener('click', limpiarFormulario);
    
    // Envío del formulario
    document.getElementById('recepcionForm').addEventListener('submit', procesarRecepcion);
    
    // Validación en tiempo real para el teléfono
    document.getElementById('celular').addEventListener('input', function(e) {
        // Solo permitir números
        e.target.value = e.target.value.replace(/\D/g, '');
        
        if (e.target.value.length === 8) {
            limpiarError(e.target);
        }
    });
    
    // Validación en tiempo real para la hora
    document.getElementById('hora').addEventListener('input', function(e) {
        // Solo permitir números y limitar a 2 dígitos
        e.target.value = e.target.value.replace(/\D/g, '').slice(0, 2);
        
        if (e.target.value.length === 2) {
            const minutos = document.getElementById('minutos');
            if (minutos.value.length === 2) {
                if (validarHora(e.target.value, minutos.value)) {
                    limpiarError(e.target);
                } else {
                    mostrarError(e.target, 'Hora inválida');
                }
            }
        }
    });
    
    document.getElementById('minutos').addEventListener('input', function(e) {
        // Solo permitir números y limitar a 2 dígitos
        e.target.value = e.target.value.replace(/\D/g, '').slice(0, 2);
        
        if (e.target.value.length === 2) {
            const hora = document.getElementById('hora');
            if (hora.value.length === 2) {
                if (validarHora(hora.value, e.target.value)) {
                    limpiarError(e.target);
                } else {
                    mostrarError(e.target, 'Hora inválida');
                }
            }
        }
    });
    
    // Validación en tiempo real para el DNI
    document.getElementById('numeroDocumento').addEventListener('input', function(e) {
        // Solo permitir números
        e.target.value = e.target.value.replace(/\D/g, '');
        
        if (e.target.value.length >= 7 && e.target.value.length <= 8) {
            limpiarError(e.target);
        }
    });
    
    // Auto-completar hora actual al hacer clic en los campos de hora
    document.getElementById('hora').addEventListener('focus', function() {
        if (!this.value) {
            const ahora = new Date();
            this.value = ahora.getHours().toString().padStart(2, '0');
        }
    });
    
    document.getElementById('minutos').addEventListener('focus', function() {
        if (!this.value) {
            const ahora = new Date();
            this.value = ahora.getMinutes().toString().padStart(2, '0');
        }
    });
});
