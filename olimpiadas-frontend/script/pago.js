// scripts/pago.js
document.addEventListener('DOMContentLoaded', function() {
  const paymentForm = document.getElementById('paymentForm');
  const paymentMessage = document.getElementById('paymentMessage');

  paymentForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Detener el envío tradicional del formulario

    // Ocultar mensajes anteriores
    paymentMessage.classList.add('d-none');
    paymentMessage.classList.remove('text-success', 'text-danger');
    paymentMessage.textContent = '';

    // Obtener datos del formulario
    const formData = new FormData(paymentForm);
    const data = Object.fromEntries(formData.entries());

    // Validaciones básicas del frontend
    // Aquí podrías añadir expresiones regulares más robustas
    if (!/^\d{13,19}$/.test(data.cardNumber.replace(/\s/g, ''))) {
      showMessage('Número de tarjeta inválido.', 'danger');
      return;
    }
    if (!/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(data.expiryDate)) {
      showMessage('Formato de fecha de vencimiento incorrecto (MM/AA).', 'danger');
      return;
    }
    if (!/^\d{3,4}$/.test(data.cvv)) {
      showMessage('CVV inválido.', 'danger');
      return;
    }
    if (data.paymentMethod === '') {
      showMessage('Seleccione un método de pago.', 'danger');
      return;
    }

    // --- SIMULACIÓN DE PROCESAMIENTO DE PAGO ---
    console.log('Procesando pago con los siguientes datos (simulados):', data);
    showMessage('Procesando su pago...', 'info');

    // Simular una llamada a un "backend" con un retraso
    // URL simulada: /api/process-payment
    setTimeout(() => {
      const isPaymentSuccessful = Math.random() > 0.3; // 70% de éxito, 30% de fallo simulado

      if (isPaymentSuccessful) {
        showMessage('¡Pago realizado con éxito! Redirigiendo...', 'success');
        paymentForm.reset(); // Limpiar el formulario
        // En un caso real, aquí redirigirías a una página de confirmación
        setTimeout(() => {
          window.location.href = 'confirmacion_pago.html'; // Redirigir a una página de confirmación
        }, 2000);
      } else {
        showMessage('Error en el pago. Por favor, verifique sus datos o intente con otra tarjeta.', 'danger');
      }
    }, 2000); // Simular 2 segundos de procesamiento
  });

  function showMessage(message, type) {
    paymentMessage.textContent = message;
    paymentMessage.classList.remove('d-none');
    paymentMessage.classList.add(`text-${type}`);
  }
});