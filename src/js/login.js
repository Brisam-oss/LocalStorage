
const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const btnPopup = document.querySelector('.btnLogin-poup');
const iconClose = document.querySelector('.icon-close');


registerLink.addEventListener('click', () => {
    wrapper.classList.add('active');
});

loginLink.addEventListener('click', () => {
    wrapper.classList.remove('active');
});

btnPopup.addEventListener('click', () => {
    wrapper.classList.add('active-popup');
});

iconClose.addEventListener('click', () => {
    wrapper.classList.remove('active-popup');
});




/// Validación de formulario de registro

const registerForm = document.querySelector('.form-box.register form');
const checkboxTerminos = document.getElementById('terminos');

registerForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Evita que se recargue la página

    // Obtener valores de los inputs
    const email = registerForm.querySelector('input[type="email"]').value;
    const password = registerForm.querySelector('input[type="password"]').value;
    const username = registerForm.querySelector('input[type="text"]').value;

    // Validar checkbox
    if (!checkboxTerminos.checked) {
        alert("Debes aceptar los Términos y Condiciones para registrarte.");
        return;
    }

    // Obtener lista de usuarios almacenados
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Verificar si el correo ya está registrado
    const exists = users.find(user => user.email === email);
    if (exists) {
        alert("Este correo ya está registrado.");
        return;
    }

    // Guardar nuevo usuario
    users.push({ username, email, password });
    localStorage.setItem('users', JSON.stringify(users));

    alert("Registro exitoso. Ahora puedes iniciar sesión.");
    wrapper.classList.remove('active'); // Cambiar de Registro a Login
});







//validación de formulario de inicio de sesión

const loginForm = document.querySelector('.form-box.login form');
const checkboxRecordar = document.getElementById('recordar');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = loginForm.querySelector('input[type="email"]').value;
    const password = loginForm.querySelector('input[type="password"]').value;

    // Validar checkbox si quieres que sea obligatorio
    if (!checkboxRecordar.checked) {
        alert("Debes marcar 'Recordar' para continuar.");
        return;
    }

    // Buscar usuario registrado
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const validUser = users.find(user => user.email === email && user.password === password);

    if (validUser) {
        alert("Login exitoso");
        localStorage.setItem('loggedIn', 'true');
        // Redirigir al usuario a la página de productos
        window.location.href = "producto.html";
    } else {
        alert("Correo o contraseña incorrectos");
    }
});


// Lógica para mostrar el menú de navegación

function showMenu() {
    const menu = document.getElementById('navigation');
    menu.style.display = 'block';
}

// Mostrar menú si el usuario ya está logueado
if (localStorage.getItem('loggedIn') === 'true') {
    showMenu();
}

/*Lógica para cerrar sesión

function logout() {
    localStorage.removeItem('loggedIn');
    location.reload(); // Recarga para esconder menú
}
*/
