document.addEventListener('DOMContentLoaded', function() {
  const resetPasswordForm = document.getElementById('resetPasswordForm');
  const resetMessage = document.getElementById('resetMessage');

  resetPasswordForm.addEventListener('submit', function(event) {
    event.preventDefault();

    resetMessage.classList.add('d-none');
    resetMessage.classList.remove('text-success', 'text-danger');
    resetMessage.textContent = '';

    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (newPassword !== confirmPassword) {
      showMessage('Las contraseñas no coinciden.', 'danger');
      return;
    }
    if (newPassword.length < 6) {
      showMessage('La contraseña debe tener al menos 6 caracteres.', 'danger');
      return;
    }

    showMessage('Restableciendo contraseña...', 'info');

    // Simular llamada a un backend para restablecer la contraseña
    // En un escenario real, aquí se enviarían la nueva contraseña y un token de restablecimiento
    setTimeout(() => {
      const isSuccess = Math.random() > 0.2; // 80% de éxito simulado

      if (isSuccess) {
        showMessage('¡Contraseña restablecida con éxito! Ya puedes iniciar sesión con tu nueva contraseña.', 'success');
        resetPasswordForm.reset();
        // Opcional: redirigir al login después de un tiempo
        setTimeout(() => { window.location.href = 'login.html'; }, 3000);
      } else {
        showMessage('No se pudo restablecer la contraseña. El enlace podría haber caducado o hubo un error.', 'danger');
      }
    }, 2000);
  });

  function showMessage(message, type) {
    resetMessage.textContent = message;
    resetMessage.classList.remove('d-none');
    resetMessage.classList.add(`text-${type}`);
  }
});