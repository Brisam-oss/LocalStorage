/*import botones from './botones.js';

let productos = [];
let filaEditando = null;

document.addEventListener("DOMContentLoaded", function () {
    productos = JSON.parse(localStorage.getItem('productos')) || [];
    if (productos.length === 0) {
        ocultarTablaProductos();
    } else {
        mostrarProductos(productos);
    }

    const form = document.getElementById("productoForm");
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        if (agregarProducto()) {
            form.reset();
            document.getElementById("cantidadValor").textContent = "0";
        }
    });

    document.getElementById("btnEliminarBD").addEventListener("click", function () {
        localStorage.removeItem("productos");
        productos = [];
        mostrarProductos(productos);
    });

    document.getElementById("btnBuscar").addEventListener("click", function () {
        const buscarId = document.getElementById("buscarId").value.trim();
        const resultadoDiv = document.getElementById("resultadoBusqueda");
        resultadoDiv.innerHTML = "";
        if (buscarId === "") {
            resultadoDiv.textContent = "Por favor ingresa un ID.";
            return;
        }
        const encontrado = productos.find(p => p.nombre === buscarId);
        if (encontrado) {
            resultadoDiv.innerHTML = `<div class="alert alert-info">Producto encontrado: ${encontrado.descripcion}, Marca: ${encontrado.marca}</div>`;
        } else {
            resultadoDiv.innerHTML = `<div class="alert alert-warning">No se encontró ningún producto con el ID proporcionado.</div>`;
        }
    });
});

function validacionText(texto) {
    return /^[A-Za-zÁÉÍÓÚáéíóúÑñ\\s]+$/.test(texto.trim());
}

function validacionPrecio(precio) {
    return !isNaN(precio) && parseFloat(precio) >= 0;
}

function validacionId(id) {
    return /^[0-9]+$/.test(id);
}

function mostrarError(input, mensaje) {
    input.classList.add("is-invalid");
    input.nextElementSibling.textContent = mensaje;
}

function limpiarErrores(inputs) {
    inputs.forEach(input => {
        input.classList.remove("is-invalid");
        input.nextElementSibling.textContent = "";
    });
}

function agregarProducto() {
    const nombreInput = document.getElementById("nombre");
    const marcaInput = document.getElementById("marca");
    const descripcionInput = document.getElementById("descripcion");
    const precioInput = document.getElementById("precio");
    const texturaInput = document.getElementById("textura");
    const cantidadInput = document.getElementById("cantidad");
    const fechaInput = document.getElementById("fecha");
    const categoriaInput = document.getElementById("categoria");

    const nombre = nombreInput.value.trim();
    const marca = marcaInput.value.trim();
    const descripcion = descripcionInput.value.trim();
    const precio = precioInput.value.trim();
    const textura = texturaInput.value.trim();
    const cantidad = cantidadInput.value;
    const fecha = fechaInput.value;
    const tipoVenta = document.querySelector('input[name="tipoVenta"]:checked')?.value || "";
    const categoria = categoriaInput.value;

    let esValido = true;

    limpiarErrores([nombreInput, marcaInput, descripcionInput, precioInput, texturaInput, categoriaInput]);

    if (!validacionId(nombre)) {
        mostrarError(nombreInput, "El ID debe ser un número entero.");
        esValido = false;
    }

    const productoExistente = productos.some(p => p.nombre === nombre);

    if (productoExistente) {
        mostrarError(nombreInput, "Ya existe un producto con este ID.");
        esValido = false;
    }

    if (!validacionText(marca)) {
        mostrarError(marcaInput, "Solo se permiten letras y espacios.");
        esValido = false;
    }
    if (!validacionText(descripcion)) {
        mostrarError(descripcionInput, "Solo se permiten letras y espacios.");
        esValido = false;
    }
    if (!validacionText(textura)) {
        mostrarError(texturaInput, "Solo se permiten letras y espacios.");
        esValido = false;
    }
    if (!validacionPrecio(precio)) {
        mostrarError(precioInput, "El precio debe ser un número positivo.");
        esValido = false;
    }
    if (!validacionPrecio(cantidad)) {
        mostrarError(cantidadInput, "Solo se aceptan valores numéricos positivos.");
        esValido = false;
    }
    if (!categoria) {
        mostrarError(categoriaInput, "Selecciona una categoría.");
        esValido = false;
    }

    if (!esValido) return false;

    productos.push({ nombre, marca, descripcion, precio, textura, cantidad, fecha, tipoVenta, categoria });
    localStorage.setItem('productos', JSON.stringify(productos));
    mostrarProductos(productos);
    mostrarNotificacion("Producto agregado correctamente", "success");
    return true;
}

function mostrarProductos(lista) {
    const tbody = document.querySelector("#productTable tbody");
    const productTable = document.getElementById("productTable");
    tbody.innerHTML = "";

    const mensajeVacio = document.getElementById("mensajeVacio");

    if (lista.length === 0) {
        productTable.style.display = "none";
        mensajeVacio.style.display = "block";
    } else {
        productTable.style.display = "table";
        mensajeVacio.style.display = "none";

        lista.forEach((p, index) => {
            const row = tbody.insertRow();
            row.dataset.index = index;

            row.innerHTML = `
                <td>${p.nombre}</td>
                <td>${p.marca}</td>
                <td>${p.descripcion}</td>
                <td>${p.precio}</td>
                <td>${p.textura}</td>
                <td>${p.cantidad}</td>
                <td>${p.fecha}</td>
                <td>${p.tipoVenta}</td>
                <td>${p.categoria}</td>
                <td class="acciones"></td>
            `;

            const accionesCell = row.querySelector('.acciones');
            const btnEditarImg = botones.crearBotonImagen(botones.botones.btnEditar);
            const btnEliminarImg = botones.crearBotonImagen(botones.botones.btnDelete);
            accionesCell.appendChild(btnEditarImg);
            accionesCell.appendChild(btnEliminarImg);

            btnEditarImg.addEventListener('click', () => editarProducto(index, row));
            btnEliminarImg.addEventListener('click', () => eliminarProducto(index));
        });
    }
}

function ocultarTablaProductos() {
    document.getElementById("productTable").style.display = "none";
    document.getElementById("mensajeVacio").style.display = "block";
}

function mostrarNotificacion(mensaje, tipo) {
    const notiContainer = document.getElementById("notificaciones");
    const alert = document.createElement("div");
    alert.className = `alert alert-${tipo} alert-dismissible fade show`;
    alert.role = "alert";
    alert.innerHTML = `
        ${mensaje}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    notiContainer.appendChild(alert);
    setTimeout(() => alert.remove(), 4000);
}*/

import botones from './botones.js';

let productos = [];
let filaEditando = null;

document.addEventListener("DOMContentLoaded", function () {
    productos = JSON.parse(localStorage.getItem('productos')) || [];
    if (productos.length === 0) {
        ocultarTablaProductos();
    } else {
        mostrarProductos(productos);
    }
});


function validacionText(texto) {
    return /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(texto.trim());
}

function validacionPrecio(precio) {
    return !isNaN(precio) && parseFloat(precio) >= 0;
}

function validacionId(id) {
    return /^[0-9]+$/.test(id);
}

function mostrarError(input, mensaje) {
    input.classList.add("is-invalid");
    input.nextElementSibling.textContent = mensaje;
}

function limpiarErrores(inputs) {
    inputs.forEach(input => {
        input.classList.remove("is-invalid");
        input.nextElementSibling.textContent = "";
    });
}

function agregarProducto() {
    const nombreInput = document.getElementById("nombre");
    const marcaInput = document.getElementById("marca");
    const descripcionInput = document.getElementById("descripcion");
    const precioInput = document.getElementById("precio");
    const texturaInput = document.getElementById("textura");
    const cantidadInput = document.getElementById("cantidad");
    const fechaInput = document.getElementById("fecha");
    const categoriaInput = document.getElementById("categoria");

    const nombre = nombreInput.value.trim();
    const marca = marcaInput.value.trim();
    const descripcion = descripcionInput.value.trim();
    const precio = precioInput.value.trim();
    const textura = texturaInput.value.trim();
    const cantidad = cantidadInput.value;
    const fecha = fechaInput.value;
    const tipoVenta = document.querySelector('input[type="radio"]:checked')?.value || "";
    const categoria = categoriaInput.value;

    let esValido = true;

    limpiarErrores([nombreInput, marcaInput, descripcionInput, precioInput, texturaInput, categoriaInput]);

    if (!validacionId(nombre)) {
        mostrarError(nombreInput, "El ID debe ser un número entero.");
        esValido = false;
    }

    const productoExistente = productos.some(p => p.nombre === nombre);

    if (productoExistente) {
        mostrarError(nombreInput, "Ya existe un producto con este ID.");
        esValido = false;
    }

    if (!validacionText(marca)) {
        mostrarError(marcaInput, "Solo se permiten letras y espacios.");
        esValido = false;
    }
    if (!validacionText(descripcion)) {
        mostrarError(descripcionInput, "Solo se permiten letras y espacios.");
        esValido = false;
    }
    if (!validacionText(textura)) {
        mostrarError(texturaInput, "Solo se permiten letras y espacios.");
        esValido = false;
    }
    if (!validacionPrecio(precio)) {
        mostrarError(precioInput, "El precio debe ser un número positivo.");
        esValido = false;
    }
    if (!validacionPrecio(cantidad)) {
        mostrarError(cantidadInput, "Solo se aceptan valores numéricos positivos");
        esValido = false;
    }
    if (!categoria) {
        mostrarError(categoriaInput, "Selecciona una categoría.");
        esValido = false;
    }

    if (!esValido) return false;
    productos.push({ nombre, marca, descripcion, precio, textura, cantidad, fecha, tipoVenta, categoria });
    localStorage.setItem('productos', JSON.stringify(productos));
    mostrarProductos(productos);
    return true;

}

function mostrarProductos(lista) {
    const tbody = document.querySelector("#productTable tbody");
    const productTable = document.getElementById("productTable");
    tbody.innerHTML = "";

    const mensajeVacio = document.getElementById("mensajeVacio");

    if (lista.length === 0) {
        productTable.style.display = "none";
        mensajeVacio.style.display = "block"; // mostrar el mensaje
    } else {
        productTable.style.display = "table";
        mensajeVacio.style.display = "none";

        lista.forEach((p, index) => {
            const row = tbody.insertRow();
            row.dataset.index = index; // Almacenar el índice del producto

            let cell = row.insertCell();
            cell.textContent = p.nombre;
            cell = row.insertCell();
            cell.textContent = p.marca;
            cell = row.insertCell();
            cell.textContent = p.descripcion;
            cell = row.insertCell();
            cell.textContent = p.precio;
            cell = row.insertCell();
            cell.textContent = p.textura;
            cell = row.insertCell();
            cell.textContent = p.cantidad;
            cell = row.insertCell();
            cell.textContent = p.fecha;
            cell = row.insertCell();
            cell.textContent = p.tipoVenta;
            cell = row.insertCell();
            cell.textContent = p.categoria;

            const accionesCell = row.insertCell();
            accionesCell.classList.add('acciones');

            // Crear y agregar botones de acción
            const btnEditarImg = botones.crearBotonImagen(botones.botones.btnEditar);
            const btnEliminarImg = botones.crearBotonImagen(botones.botones.btnDelete);

            accionesCell.appendChild(btnEditarImg);
            accionesCell.appendChild(btnEliminarImg);

            // Agregar event listeners a los botones creados
            btnEditarImg.addEventListener('click', () => editarProducto(index, row));
            btnEliminarImg.addEventListener('click', () => eliminarProducto(index));
        });
    }
}

function editarProducto(index, row) {
    if (filaEditando) {
        restaurarFila(filaEditando); // Restaurar la fila previamente editada
    }
    filaEditando = row;
    const producto = productos[index];
    const celdas = row.querySelectorAll('td:not(.acciones)');

    // Convertir celdas a inputs
    celdas.forEach((celda, i) => {
        const valor = celda.textContent;
        celda.innerHTML = `<input type="text" class="form-control form-control-sm" value="${valor}">`;
    });

    // Reemplazar botones de Editar y Eliminar con Guardar y Cancelar
    const accionesCell = row.querySelector('.acciones');
    accionesCell.innerHTML = '';
    const btnGuardarImg = botones.crearBotonImagen(botones.botones.btnSave);
    const btnCancelarImg = botones.crearBotonImagen(botones.botones.btnCancel);
    accionesCell.appendChild(btnGuardarImg);
    accionesCell.appendChild(btnCancelarImg);

    btnGuardarImg.addEventListener('click', () => guardarProducto(index, row));
    btnCancelarImg.addEventListener('click', () => cancelarEdicion(row, producto));
}

function guardarProducto(index, row) {
    const inputs = row.querySelectorAll('td:not(.acciones) input');
    const productoEditado = {
        nombre: inputs[0].value.trim(),
        marca: inputs[1].value.trim(),
        descripcion: inputs[2].value.trim(),
        precio: inputs[3].value.trim(),
        textura: inputs[4].value.trim(),
        cantidad: inputs[5].value,
        fecha: inputs[6].value,
        tipoVenta: inputs[7].value,
        categoria: inputs[8].value
    };

    productos[index] = productoEditado;
    localStorage.setItem('productos', JSON.stringify(productos));
    mostrarProductos(productos);
    filaEditando = null;
    mostrarNotificacion("Producto editado correctamente", "success");

}

function cancelarEdicion(row, productoOriginal) {
    const celdas = row.querySelectorAll('td:not(.acciones)');
    celdas.forEach((celda, i) => {
        switch (i) {
            case 0: celda.textContent = productoOriginal.nombre; break;
            case 1: celda.textContent = productoOriginal.marca; break;
            case 2: celda.textContent = productoOriginal.descripcion; break;
            case 3: celda.textContent = productoOriginal.precio; break;
            case 4: celda.textContent = productoOriginal.textura; break;
            case 5: celda.textContent = productoOriginal.cantidad; break;
            case 6: celda.textContent = productoOriginal.fecha; break;
            case 7: celda.textContent = productoOriginal.tipoVenta; break;
            case 8: celda.textContent = productoOriginal.categoria; break;
        }
    });

    const accionesCell = row.querySelector('.acciones');
    accionesCell.innerHTML = '';
    const btnEditarImg = botones.crearBotonImagen(botones.botones.btnEditar);
    const btnEliminarImg = botones.crearBotonImagen(botones.botones.btnDelete);
    accionesCell.appendChild(btnEditarImg);
    accionesCell.appendChild(btnEliminarImg);

    btnEditarImg.addEventListener('click', () => editarProducto(parseInt(row.dataset.index), row));

    btnEliminarImg.addEventListener('click', () => eliminarProducto(parseInt(row.dataset.index)));

    filaEditando = null;
}

function restaurarFila(row) {
    const index = parseInt(row.dataset.index);
    const productoOriginal = productos[index];
    cancelarEdicion(row, productoOriginal);
}


function eliminarProducto(index) {
    const productoEliminado = productos[index];
    if (confirm(`¿Estás seguro de que deseas eliminar el producto "${productoEliminado.nombre}"?`)) {
        productos.splice(index, 1);
        localStorage.setItem('productos', JSON.stringify(productos));
        mostrarProductos(productos);
        mostrarNotificacion(`Producto "${productoEliminado.nombre}" eliminado.`, "error");

    }
}

function filterTable(categoria) {
    const tbody = document.querySelector("#productTable tbody");
    tbody.innerHTML = ""; // Limpiar la tabla antes de mostrar los productos filtrados

    if (categoria === 'tablaOriginal') {
        mostrarProductos(productos);
    } else {
        const filtrados = productos.filter(p => p.categoria === categoria);
        mostrarProductos(filtrados);
    }
}

document.getElementById("productoForm").addEventListener("submit", function (event) {
    event.preventDefault();
    event.stopPropagation();

    const form = this;

    if (!form.checkValidity()) {
        form.classList.add("was-validated");
        return;
    }

    const agregado = agregarProducto();
    if (agregado) {
        form.classList.remove("was-validated");
        form.reset(); // Limpiar el formulario después de agregar el producto
    }
});

function ocultarTablaProductos() {
    const productTable = document.getElementById("productTable");
    const mensajeVacio = document.getElementById("mensajeVacio");
    productTable.style.display = "none";
    mensajeVacio.style.display = "block";
}

document.getElementById("btnEliminarBD").addEventListener("click", function () {
    if (productos.length === 0) {
        mostrarAlerta("La base de datos ya está vacía, no hay productos que eliminar.", "warning");
        return;
    }

    const confirmacion = confirm("¿Estás seguro de que deseas borrar toda la base de datos?");
    if (confirmacion) {
        productos = [];
        localStorage.setItem('productos', JSON.stringify(productos));
        mostrarProductos(productos);
        mostrarAlerta("La base de datos se ha eliminado correctamente.", "success");

    }
});

function mostrarAlerta(mensaje, tipo) {
    const alerta = document.getElementById("alerta");
    alerta.innerHTML = `<div class="alert alert-${tipo}" role="alert">${mensaje}</div>`;
    setTimeout(() => {
        alerta.innerHTML = "";
    }, 3000);
}

document.getElementById("btnBuscar").addEventListener("click", function () {
    const idBuscado = document.getElementById("buscarId").value.trim();
    const resultadoDiv = document.getElementById("resultadoBusqueda");

    if (!idBuscado) {
        resultadoDiv.innerHTML = `<div class="alert alert-warning">Por favor ingrese un ID.</div>`;
        return;
    }

    const producto = productos.find(p => p.nombre === idBuscado);

    if (!producto) {
        resultadoDiv.innerHTML = `<div class="alert alert-danger">No se ha encontrado el producto en la lista de productos.</div>`;
        mostrarProductos([]);
    } else {
        resultadoDiv.innerHTML = "";
        mostrarProductos([producto]);
    }
});


function mostrarNotificacion(mensaje, tipo = "success") {
    const notificacionesDiv = document.getElementById("notificaciones");
    const notificacion = document.createElement("div");
    notificacion.className = `notificacion ${tipo} mostrar`;
    notificacion.textContent = mensaje;

    notificacionesDiv.appendChild(notificacion);

    setTimeout(() => {
        notificacion.classList.remove("mostrar");
        setTimeout(() => notificacion.remove(), 300);
    }, 3000);
}

document.getElementById("productoForm").addEventListener("submit", function (e) {
    e.preventDefault();
    if (agregarProducto()) {
        this.reset();
        document.getElementById('cantidadValor').textContent = "0";
        mostrarNotificacion("Producto agregado correctamente", "success");
    }
});

export { filterTable };
window.filterTable = filterTable;
