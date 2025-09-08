// Tarifas por categoría y tipo de trámite
const tarifas = {
    'A-Mot-Tric-Cuatric-Clicion': {
        'Ampliacion': { base: 31360, derechos: 0, sellado: 0, antecedentes: 0 },
        'Renovacion': { base: 25000, derechos: 0, sellado: 0, antecedentes: 0 },
        'Duplicado': { base: 15000, derechos: 0, sellado: 0, antecedentes: 0 }
    },
    'B-Automovil': {
        'Ampliacion': { base: 45000, derechos: 0, sellado: 0, antecedentes: 0 },
        'Renovacion': { base: 35000, derechos: 0, sellado: 0, antecedentes: 0 },
        'Duplicado': { base: 20000, derechos: 0, sellado: 0, antecedentes: 0 }
    },
    'C-Camion': {
        'Ampliacion': { base: 60000, derechos: 0, sellado: 0, antecedentes: 0 },
        'Renovacion': { base: 50000, derechos: 0, sellado: 0, antecedentes: 0 },
        'Duplicado': { base: 30000, derechos: 0, sellado: 0, antecedentes: 0 }
    },
    'D-Omnibus': {
        'Ampliacion': { base: 80000, derechos: 0, sellado: 0, antecedentes: 0 },
        'Renovacion': { base: 70000, derechos: 0, sellado: 0, antecedentes: 0 },
        'Duplicado': { base: 40000, derechos: 0, sellado: 0, antecedentes: 0 }
    }
};

// Función para formatear moneda
function formatearMoneda(valor) {
    return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 2
    }).format(valor);
}

// Función para calcular importes
function calcularImportes() {
    const categoria = document.getElementById('categoriaFacturar').value;
    const tipoTramite = document.getElementById('tipoTramite').value;
    const anos = parseInt(document.getElementById('anos').value);
    
    // Obtener tarifas base
    const tarifa = tarifas[categoria]?.[tipoTramite] || tarifas['A-Mot-Tric-Cuatric-Clicion']['Ampliacion'];
    
    // Calcular valor base (puede variar según años)
    let valorBase = tarifa.base;
    if (anos > 5) {
        valorBase = Math.round(valorBase * (1 + (anos - 5) * 0.1)); // 10% adicional por año extra
    }
    
    const derechosOficina = tarifa.derechos;
    const selladoProvincia = tarifa.sellado;
    const antecedentesProvincia = tarifa.antecedentes;
    const antecedentesNacion = 0; // Siempre 0 según el ejemplo
    const descuento = 0; // Siempre 0 según el ejemplo
    
    const importeTotal = valorBase + derechosOficina + selladoProvincia + antecedentesProvincia + antecedentesNacion - descuento;
    
    // Actualizar la interfaz
    document.getElementById('valorRegistro').textContent = formatearMoneda(valorBase);
    document.getElementById('derechosOficina').textContent = formatearMoneda(derechosOficina);
    document.getElementById('selladoProvincia').textContent = formatearMoneda(selladoProvincia);
    document.getElementById('antecedentesProvincia').textContent = formatearMoneda(antecedentesProvincia);
    document.getElementById('antecedentesNacion').textContent = formatearMoneda(antecedentesNacion);
    document.getElementById('descuento').textContent = formatearMoneda(descuento);
    document.getElementById('importeTotal').textContent = formatearMoneda(importeTotal);
    
    return {
        valorBase,
        derechosOficina,
        selladoProvincia,
        antecedentesProvincia,
        antecedentesNacion,
        descuento,
        importeTotal
    };
}

// Función para validar formulario
function validarFormulario() {
    let esValido = true;
    
    // Validar número de documento
    const numeroDocumento = document.getElementById('numeroDocumento').value.trim();
    if (!numeroDocumento) {
        mostrarError(document.getElementById('numeroDocumento'), 'El número de documento es requerido');
        esValido = false;
    } else if (!/^\d{7,8}$/.test(numeroDocumento)) {
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
    
    return esValido;
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

// Función para recopilar datos del formulario
function recopilarDatosFormulario() {
    const importes = calcularImportes();
    
    return {
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
        tipoTramite: document.getElementById('tipoTramite').value,
        anos: document.getElementById('anos').value,
        categoriaFacturar: document.getElementById('categoriaFacturar').value,
        tipoFactura: document.getElementById('tipoFactura').value,
        facturaSellados: document.getElementById('facturaSellados').value,
        imagenArchivo: document.getElementById('imagenArchivo').files[0]?.name || null,
        importes: importes,
        fechaFacturacion: new Date().toLocaleDateString('es-ES'),
        horaFacturacion: new Date().toLocaleTimeString('es-ES', {hour: '2-digit', minute: '2-digit'})
    };
}

// Función para nueva llamada
function nuevaLlamada() {
    const datos = recopilarDatosFormulario();
    const confirmacion = confirm(`¿Desea realizar una nueva llamada para ${datos.apellido}, ${datos.nombre}?`);
    
    if (confirmacion) {
        console.log('Nueva llamada iniciada:', datos);
        alert(`Llamando a ${datos.apellido}, ${datos.nombre}...`);
        
        // Aquí se podría integrar con un sistema de llamadas
        // fetch('/api/llamadas/nueva', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(datos)
        // });
    }
}

// Función para generar factura
function generarFactura() {
    if (!validarFormulario()) {
        alert('Por favor, corrija los errores en el formulario');
        return;
    }
    
    const datos = recopilarDatosFormulario();
    const confirmacion = confirm(`¿Desea generar la factura por ${formatearMoneda(datos.importes.importeTotal)}?`);
    
    if (confirmacion) {
        console.log('Factura generada:', datos);
        alert(`Factura generada correctamente por ${formatearMoneda(datos.importes.importeTotal)}`);
        
        // Aquí se podría enviar los datos a un servidor para generar la factura
        // fetch('/api/facturacion/generar', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(datos)
        // });
    }
}

// Función para procesar facturación
function procesarFacturacion() {
    if (!validarFormulario()) {
        alert('Por favor, corrija los errores en el formulario');
        return;
    }
    
    const datos = recopilarDatosFormulario();
    const confirmacion = confirm(`¿Confirma el procesamiento de la facturación por ${formatearMoneda(datos.importes.importeTotal)}?`);
    
    if (confirmacion) {
        console.log('Facturación procesada:', datos);
        alert('Facturación procesada correctamente');
        
        // Aquí se podría enviar los datos a un servidor
        // fetch('/api/facturacion/procesar', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(datos)
        // });
        
        // Limpiar formulario después del procesamiento exitoso
        limpiarFormulario();
    }
}

// Función para limpiar formulario
function limpiarFormulario() {
    const form = document.getElementById('facturacionForm');
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
    document.getElementById('tipoDocumento').value = 'DNI';
    document.getElementById('numeroDocumento').value = '12345678';
    document.getElementById('apellido').value = 'AGUILERA';
    document.getElementById('nombre').value = 'JOSE MARIA';
    document.getElementById('numeroCalle').value = '0';
    document.getElementById('calleNombre').value = 'CALLE';
    document.getElementById('altura').value = '1324';
    document.getElementById('localidad').value = 'SAN MARTIN';
    document.getElementById('codigoPostal').value = '1213';
    document.getElementById('tipoTramite').value = 'Ampliacion';
    document.getElementById('anos').value = '5';
    document.getElementById('categoriaFacturar').value = 'A-Mot-Tric-Cuatric-Clicion';
    document.getElementById('tipoFactura').value = 'Comun';
    document.getElementById('facturaSellados').value = 'NO';
    
    // Limpiar archivo seleccionado
    document.getElementById('archivoSeleccionado').textContent = 'Sin archivos seleccionados';
    document.getElementById('imagenSubida').style.display = 'none';
    
    // Recalcular importes
    calcularImportes();
    
    console.log('Formulario limpiado');
    alert('Formulario limpiado correctamente');
}

// Función para manejar selección de archivo
function manejarSeleccionArchivo() {
    const input = document.getElementById('imagenArchivo');
    const archivoSeleccionado = document.getElementById('archivoSeleccionado');
    
    if (input.files.length > 0) {
        const archivo = input.files[0];
        archivoSeleccionado.textContent = `Archivo seleccionado: ${archivo.name}`;
        archivoSeleccionado.style.color = '#27ae60';
    } else {
        archivoSeleccionado.textContent = 'Sin archivos seleccionados';
        archivoSeleccionado.style.color = '#7f8c8d';
    }
}

// Función para subir imagen
function subirImagen() {
    const input = document.getElementById('imagenArchivo');
    const imagenSubida = document.getElementById('imagenSubida');
    
    if (input.files.length === 0) {
        alert('Por favor, seleccione un archivo antes de subir');
        return;
    }
    
    // Simular subida de archivo
    const archivo = input.files[0];
    console.log('Subiendo archivo:', archivo.name);
    
    // Mostrar indicador de carga
    imagenSubida.innerHTML = '<span>⏳ Subiendo imagen...</span>';
    imagenSubida.style.display = 'block';
    
    // Simular tiempo de subida
    setTimeout(() => {
        imagenSubida.innerHTML = '<span>✓ Imagen subida correctamente</span>';
        imagenSubida.style.color = '#27ae60';
        alert('Imagen subida correctamente');
    }, 2000);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Botones de acción
    document.getElementById('nuevaLlamadaBtn').addEventListener('click', nuevaLlamada);
    document.getElementById('facturaBtn').addEventListener('click', generarFactura);
    document.getElementById('procesarBtn').addEventListener('click', procesarFacturacion);
    document.getElementById('limpiarBtn').addEventListener('click', limpiarFormulario);
    
    // Manejo de archivos
    document.getElementById('seleccionarArchivoBtn').addEventListener('click', function() {
        document.getElementById('imagenArchivo').click();
    });
    
    document.getElementById('imagenArchivo').addEventListener('change', manejarSeleccionArchivo);
    document.getElementById('subirImagenBtn').addEventListener('click', subirImagen);
    
    // Recalcular importes cuando cambien los valores relevantes
    document.getElementById('categoriaFacturar').addEventListener('change', calcularImportes);
    document.getElementById('tipoTramite').addEventListener('change', calcularImportes);
    document.getElementById('anos').addEventListener('change', calcularImportes);
    
    // Validación en tiempo real para el DNI
    document.getElementById('numeroDocumento').addEventListener('input', function(e) {
        // Solo permitir números
        e.target.value = e.target.value.replace(/\D/g, '');
        
        if (e.target.value.length >= 7 && e.target.value.length <= 8) {
            limpiarError(e.target);
        }
    });
    
    // Calcular importes iniciales
    calcularImportes();
    
    console.log('Formulario de Facturación cargado correctamente');
});
