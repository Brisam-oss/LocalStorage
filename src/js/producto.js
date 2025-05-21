const swiper1 = new Swiper(".mySwiper-1 ", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: "swiper-button-prev"
    }
});


const swiper2 = new Swiper(".mySwiper-2", {
    slidesPerView: 2,
    spaceBetween: 180,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
    }
});


function mostrarInformacion(elemento) {
    const infoAdicional = elemento.querySelector('.info-adicional');
    if (infoAdicional) {
        infoAdicional.style.display = 'block';
    }
}

function ocultarInformacion(elemento) {
    const infoAdicional = elemento.querySelector('.info-adicional');
    if (infoAdicional) {
        infoAdicional.style.display = 'none';
    }
}




//el evento mouseover para cambiar el color de fondo de un producto y mouseout para volver al color original.
document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelectorAll('.swiper-slide'); // Selecciona los swiper-slide

    slides.forEach(slide => {
        slide.addEventListener('mouseover', function () {
            this.style.backgroundColor = '#DEAA79'; // Cambia el color de fondo del swiper-slide
        });

        slide.addEventListener('mouseout', function () {
            this.style.backgroundColor = '#F2E2B1'; // Restaura el color de fondo original
        });
    });
});


//  capturar las pulsaciones de teclas en cualquier parte de la página.


document.addEventListener('DOMContentLoaded', function () {
    document.addEventListener('keydown', function (event) {
        console.log('Tecla presionada: ' + event.key);
        // Puedes agregar aquí la lógica que quieras ejecutar al presionar una tecla
        if (event.key === "a") {
            console.log("Se presiono la tecla a")
        }
    });

    document.addEventListener('keyup', function (event) {
        console.log('Tecla liberada: ' + event.key);
        // Puedes agregar aquí la lógica que quieras ejecutar al liberar una tecla
    });
});



// Formulario

document.addEventListener('DOMContentLoaded', function () {
    const formulario = document.getElementById('miFormulario');
    const mensajeDiv = document.getElementById('mensaje');

    formulario.addEventListener('submit', function (event) {
        event.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;

        //mensajeDiv.textContent = `Nombre: ${nombre}, Correo Electrónico: ${email}`;
        alert(`Nombre: ${nombre}\nCorreo Electrónico: ${email}`);

    });
});