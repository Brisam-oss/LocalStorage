// botones.js
const botones = {
    btnEditar: {
        'id': 'btnEditar',
        'className': 'btn-img',
        'ruta': '../assets/icon/edit.png',
        'title': 'Editar',
        'alt': 'Editar',
    },
    btnDelete: {
        'id': 'btnEliminar',
        'className': 'btn-img',
        'ruta': '../assets/icon/delete.png',
        'title': 'Eliminar',
        'alt': 'Eliminar',
    },
    btnSave: {
        'id': 'btnSave',
        'className': 'btn-img',
        'ruta': '../assets/icon/Update.png',
        'title': 'guardar',
        'alt': 'guardar',
    },
    btnCancel: {
        'id': 'btnCancelar',
        'className': 'btn-img',
        'ruta': '../assets/icon/cancel.png',
        'title': 'Cancelar',
        'alt': 'Cancelar',
    }
};

// Función para crear solo la imagen del botón
function crearBotonImagen(boton) {
    const nuevoBoton = document.createElement('img');
    nuevoBoton.id = boton.id;
    nuevoBoton.src = boton.ruta;
    nuevoBoton.title = boton.title;
    nuevoBoton.alt = boton.alt;
    nuevoBoton.className = boton.className;
    return nuevoBoton;
}

function changeButtonEvent(event, nuevoId, nuevaRuta, nuevoTitulo) {
    if (event.target) {
        event.target.id = nuevoId
        event.target.src = nuevaRuta;
        event.target.title = nuevoTitulo;
        event.target.alt = nuevoTitulo;
    }
}

// Función para cambiar la imagen y el título de un botón sin eventos 
function changeButtonNoEvent(boton, nuevoId, nuevaRuta, nuevoTitulo) {
    if (boton) {
        boton.id = nuevoId;
        boton.src = nuevaRuta;
        boton.title = nuevoTitulo;
        boton.alt = nuevoTitulo;
    }
}

export default { botones, crearBotonImagen, changeButtonEvent, changeButtonNoEvent };