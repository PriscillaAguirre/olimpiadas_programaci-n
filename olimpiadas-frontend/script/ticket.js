// scripts/ticket.jsAdd commentMore actions

document.addEventListener('DOMContentLoaded', function() {
  const ticketIdaVueltaRadio = document.getElementById('ticketIdaVuelta');
  const ticketSoloIdaRadio = document.getElementById('ticketSoloIda');
  const ticketFechaRegresoContainer = document.getElementById('ticketFechaRegresoContainer');
  const ticketFechaRegresoInput = document.getElementById('ticketFechaRegreso');

  // Función para controlar la visibilidad del campo de fecha de regreso
  function toggleTicketFechaRegreso() {
    if (ticketSoloIdaRadio.checked) {
      ticketFechaRegresoContainer.style.display = 'none';
      ticketFechaRegresoInput.removeAttribute('required');
      ticketFechaRegresoInput.value = ''; // Opcional: limpiar el valor si se oculta
    } else {
      ticketFechaRegresoContainer.style.display = 'block'; // O 'flex' o 'grid' dependiendo de tu layout
      ticketFechaRegresoInput.setAttribute('required', 'required');
    }
  }

  // Event Listeners para los radio buttons
  ticketIdaVueltaRadio.addEventListener('change', toggleTicketFechaRegreso);
  ticketSoloIdaRadio.addEventListener('change', toggleTicketFechaRegreso);

  // Llamar la función al cargar la página para establecer el estado inicial
  toggleTicketFechaRegreso();

  // Manejo del envío del formulario con Fetch
  const ticketForm = document.getElementById('ticketForm');
  ticketForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Evita el envío tradicional del formulario

    const formData = new FormData(ticketForm);
    const data = Object.fromEntries(formData.entries());

    // Si es solo ida, elimina la fecha de regreso de los datos a enviar
    if (data.tipoViaje === 'soloIda') {
      delete data.fechaRegreso;
    }

    console.log('Datos a enviar (Ticket):', data);

    // Aquí simularías el envío a un backend para tickets
    fetch('/api/procesar_ticket', { // Esta URL debería apuntar a tu backend de tickets
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al procesar el ticket: ' + response.statusText);
      }
      return response.json();
    })
    .then(result => {
      console.log('Ticket procesado con éxito:', result);
      alert('Ticket enviado para procesamiento con éxito!');
      ticketForm.reset(); // Limpiar el formulario
      // Redirigir o mostrar mensaje
      // window.location.href = 'carrito_compras.html'; // Ejemplo
    })
    .catch(error => {
      console.error('Error al enviar el ticket:', error);
      alert('Hubo un error al procesar el ticket. Por favor, intente de nuevo.'); //Add commentMore actions
    });
  });
});