document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.getElementById('registerForm');
  const registerMessage = document.getElementById('registerMessage');

  registerForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const nombre = document.getElementById('reg_name').value.trim();
    const apellido = document.getElementById('reg_lastname').value.trim();
    const email = document.getElementById('reg_email').value.trim();
    const contraseña = document.getElementById('reg_password').value.trim();
    const telefono = document.getElementById('reg_user').value.trim(); // Puedes usar esto como "usuario" o teléfono

    const termsAccepted = document.getElementById('accept_terms').checked;

    // Validaciones básicas
    if (!nombre || !apellido || !email || !contraseña || !telefono) {
      return mostrarMensaje('⚠️ Todos los campos son obligatorios.', 'danger');
    }

    if (!termsAccepted) {
      return mostrarMensaje('⚠️ Debes aceptar los términos y condiciones.', 'danger');
    }

    if (contraseña.length < 6) {
      return mostrarMensaje('⚠️ La contraseña debe tener al menos 6 caracteres.', 'danger');
    }

    const datos = {
      nombre,
      apellido,
      email,
      contraseña,
      telefono
    };

    try {
      const response = await fetch('http://localhost:3000/api/usuarios/registro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
      });

      const result = await response.json();

      if (response.ok) {
        mostrarMensaje('✅ Usuario registrado correctamente. Redirigiendo al login...', 'success');
        registerForm.reset();
        setTimeout(() => {
          window.location.href = 'inicio_sesion.html';
        }, 2000);
      } else {
        mostrarMensaje(`❌ ${result.error || 'Error al registrar el usuario.'}`, 'danger');
      }

    } catch (error) {
      console.error('❌ Error de red:', error);
      mostrarMensaje('❌ Error de conexión con el servidor.', 'danger');
    }
  });

  function mostrarMensaje(msg, tipo) {
    registerMessage.textContent = msg;
    registerMessage.className = `fw-bold text-${tipo}`;
    registerMessage.classList.remove('d-none');
  }
});