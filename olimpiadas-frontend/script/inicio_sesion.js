document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.getElementById('loginForm'); // Asegúrate de que tu formulario tenga este ID
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');
  const messageDiv = document.getElementById('loginMessage'); // Div para mostrar mensajes

  loginForm.addEventListener('submit', async function(event) {
    event.preventDefault(); // Evita el envío tradicional del formulario

    const username = usernameInput.value.trim();
    const password = passwordInput.value;

    if (!username || !password) { 
      showMessage('Por favor, ingrese su usuario y contraseña.', 'danger');
      return;
    }

    showMessage('Iniciando sesión...', 'info');

    try { 
      const response = await fetch('/api/login', { // Ruta a tu endpoint de login
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (response.ok) {
        showMessage('Inicio de sesión exitoso. Redirigiendo...', 'success');
        // Guarda el token de autenticación (si lo hay) y redirige
        // localStorage.setItem('token', data.token);
        setTimeout(() => {
          window.location.href = 'viajeros.html'; // Redirige a la página principal
        }, 1500);
      } else {
        // Mensaje de error desde el backend (ej. credenciales inválidas)
        showMessage(data.message || 'Error en el inicio de sesión. Verifique sus credenciales.', 'danger');
      }
    } catch (error) {
      console.error('Error de red o del servidor:', error);
      showMessage('No se pudo conectar con el servidor. Intente de nuevo más tarde.', 'danger');
    }
  });

  function showMessage(message, type) {
    if (messageDiv) {
      messageDiv.textContent = message;
      messageDiv.className = `alert alert-${type}`; // Clases de Bootstrap para estilo
      messageDiv.classList.remove('d-none');
    }
  }
});