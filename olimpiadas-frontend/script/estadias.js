document.addEventListener('DOMContentLoaded', async function() {
  const estadiasContainer = document.getElementById('estadiasContainer'); // Asume un contenedor
  const messageDiv = document.getElementById('estadiasMessage'); // Opcional

  if (!estadiasContainer) {
    console.error('Contenedor de estadías no encontrado.');
    return;
  }

  showMessage('Cargando estadías disponibles...', 'info');

  try {
    const response = await fetch('/api/estadias'); // Ruta a tu endpoint para obtener estadías
    const estadias = await response.json();

    if (response.ok && estadias.length > 0) {
      estadiasContainer.innerHTML = '';
      estadias.forEach(estadia => {
        const cardHtml = `
          <div class="col">
            <div class="card h-100 package-card">
              <img src="${estadia.imagenUrl}" class="card-img-top" alt="${estadia.nombre}">
              <div class="card-body">
                <p class="card-text fw-bold">${estadia.nombre}, ${estadia.destino}</p>
                <p class="card-text small">${estadia.descripcion}</p>
                <p class="card-text">Precio por noche: $${estadia.precioPorNoche.toFixed(2)}</p>
                <button class="btn btn-dark w-100" data-id="${estadia.id}">Ver detalles</button>
                <button class="btn btn-primary w-100 mt-2 add-to-cart" data-id="${estadia.id}" data-type="estadia">Agregar al Carrito</button>
              </div>
            </div>
          </div>
        `;
        estadiasContainer.insertAdjacentHTML('beforeend', cardHtml);
      });
      showMessage('', 'hidden');
      document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCart);
      });
    } else {
      showMessage(estadias.message || 'No se encontraron estadías disponibles.', 'warning');
    }
  } catch (error) {
    console.error('Error al cargar estadías:', error);
    showMessage('No se pudieron cargar las estadías. Intente de nuevo más tarde.', 'danger');
  }

  async function addToCart(event) {
    const itemId = event.target.dataset.id;
    const itemType = event.target.dataset.type;
    // ... (lógica similar a paquetes.js para agregar al carrito)
    console.log(`Agregando ${itemType} con ID: ${itemId} al carrito.`);
    try {
      const response = await fetch('/api/carrito/agregar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ itemId, itemType, cantidad: 1 })
      });
      const data = await response.json();
      if (response.ok) {
        alert('Estadía agregada al carrito con éxito!');
      } else {
        alert(data.message || 'Error al agregar la estadía al carrito.');
      }
    } catch (error) {
      console.error('Error al agregar al carrito:', error);
      alert('Error de conexión al agregar al carrito.');
    }
  }

  function showMessage(message, type) {
    if (messageDiv) {
      if (type === 'hidden') {
        messageDiv.classList.add('d-none');
      } else {
        messageDiv.textContent = message;
        messageDiv.className = `alert alert-${type}`;
        messageDiv.classList.remove('d-none');
      }
    }
  }
});