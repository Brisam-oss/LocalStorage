document.getElementById('form-contacto').addEventListener('submit', function (e) {
    e.preventDefault();

    const correo = document.getElementById('exampleFormControlInput1').value.trim();
    const comentarios = document.getElementById('exampleFormControlTextarea1').value.trim();

    // Validar correo
    const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
    if (!correoValido) {
        alert("Por favor, ingresa un correo válido.");
        return;
    }

    // Validar cantidad de palabras en comentarios
    const palabras = comentarios.split(/\s+/).filter(p => p.length > 0);
    if (palabras.length > 2000) {
        alert(`Tu comentario tiene ${palabras.length} palabras. El máximo permitido es 2000.`);
        return;
    }

    // Si todo es válido
    console.log('Correo:', correo);
    console.log('Comentarios:', comentarios);
    alert('Gracias por contactarnos 😄');

    this.reset();
});

