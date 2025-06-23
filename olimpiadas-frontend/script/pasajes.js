document.addEventListener('DOMContentLoaded', function() {
  const idaVueltaRadio = document.getElementById('idaVuelta');
  const soloIdaRadio = document.getElementById('soloIda');
  const fechaRegresoContainer = document.getElementById('fechaRegresoContainer');
  const fechaRegresoInput = document.getElementById('fechaRegreso');

  // Función para controlar la visibilidad del campo de fecha de regreso
  function toggleFechaRegreso() {
    if (soloIdaRadio.checked) {
      fechaRegresoContainer.style.display = 'none';
      fechaRegresoInput.removeAttribute('required');
      fechaRegresoInput.value = ''; // Opcional: limpiar el valor si se oculta
    } else {
      fechaRegresoContainer.style.display = 'block'; // O 'flex' o 'grid'
      fechaRegresoInput.setAttribute('required', 'required');
    }
  }

  // Event Listeners para los radio buttons
  idaVueltaRadio.addEventListener('change', toggleFechaRegreso);
  soloIdaRadio.addEventListener('change', toggleFechaRegreso);

  // Llamar la función al cargar la página para establecer el estado inicial
  toggleFechaRegreso();

  // Manejo del envío del formulario con Fetch
  const pasajesForm = document.getElementById('pasajesForm');
  pasajesForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(pasajesForm);
    const data = Object.fromEntries(formData.entries());

    // Si es solo ida, elimina la fecha de regreso de los datos a enviar
    if (data.tipoViaje === 'soloIda') {
      delete data.fechaRegreso;
    }

    console.log('Datos a enviar:', data);

    fetch('/api/procesar_pasaje', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al procesar el pasaje: ' + response.statusText);
      }
      return response.json();
    })
    .then(result => {
      console.log('Pasaje procesado con éxito:', result);
      alert('Pasaje enviado para procesamiento con éxito!');
      pasajesForm.reset();
      // Redirigir o mostrar mensaje
    })
    .catch(error => {
      console.error('Error al enviar el pasaje:', error);
      alert('Hubo un error al procesar el pasaje. Por favor, intente de nuevo.');
    });
  });
});