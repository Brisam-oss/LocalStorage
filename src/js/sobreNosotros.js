document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelectorAll('.content-box'); // Selecciona los swiper-slide

    slides.forEach(slide => {
        slide.addEventListener('mouseover', function () {
            this.style.backgroundColor = 'rgb(238, 196, 232)'; // Cambia el color de fondo del swiper-slide
        });

        slide.addEventListener('mouseout', function () {
            this.style.backgroundColor = 'rgb(224, 185, 163)'; // Restaura el color de fondo original
        });
    });
});