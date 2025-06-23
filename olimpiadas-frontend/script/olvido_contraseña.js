document.addEventListener('DOMContentLoaded', function() {
  const forgotPasswordForm = document.getElementById('forgotPasswordForm');
  const forgotMessage = document.getElementById('forgotMessage');

  forgotPasswordForm.addEventListener('submit', function(event) {
    event.preventDefault();

    forgotMessage.classList.add('d-none');
    forgotMessage.classList.remove('text-success', 'text-danger');
    forgotMessage.textContent = '';

    const emailOrUsername = document.getElementById('userEmail').value.trim();
    const phoneNumber = document.getElementById('userNumber').value.trim();

    if (!emailOrUsername && !phoneNumber) {
      showMessage('Por favor, ingrese su email/usuario o su número de teléfono.', 'danger');
      return;
    }

    showMessage('Enviando solicitud...', 'info');

    // Simular llamada a un backend para enviar email/SMS de recuperación
    setTimeout(() => {
      const isSuccess = Math.random() > 0.3; // 70% de éxito simulado

      if (isSuccess) {
        showMessage('Si la información proporcionada es correcta, recibirá un enlace de recuperación en su email o un código SMS.', 'success');
        forgotPasswordForm.reset();
        // Opcional: redirigir a una página de "Revisa tu bandeja de entrada"
        // setTimeout(() => { window.location.href = 'check_email.html'; }, 3000);
      } else {
        showMessage('No se pudo procesar la solicitud en este momento. Por favor, intente de nuevo.', 'danger');
      }
    }, 2000);
  });

  function showMessage(message, type) {
    forgotMessage.textContent = message;
    forgotMessage.classList.remove('d-none');
    forgotMessage.classList.add(`text-${type}`);
  }
});