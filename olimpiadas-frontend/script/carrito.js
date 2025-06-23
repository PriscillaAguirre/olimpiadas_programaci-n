document.addEventListener('DOMContentLoaded', async function() {
  const carritoItemsContainer = document.getElementById('carritoItemsContainer'); // Contenedor para mostrar ítems
  const resumenCarritoContainer = document.getElementById('resumenCarritoContainer'); // Contenedor para el resumen
  const realizarCompraBtn = document.getElementById('realizarCompraBtn'); // Botón de "Realizar Compra"
  const messageDiv = document.getElementById('carritoMessage'); // Para mensajes

  if (!carritoItemsContainer || !resumenCarritoContainer || !realizarCompraBtn) {
    console.error('Elementos del DOM del carrito no encontrados.');
    return;
  }

  // Función para cargar los ítems del carrito
  async function cargarCarrito() {
    showMessage('Cargando carrito...', 'info');
    try {
      const response = await fetch('/api/carrito'); // Endpoint para obtener ítems del carrito
      const carrito = await response.json();

      if (response.ok && carrito.items && carrito.items.length > 0) {
        carritoItemsContainer.innerHTML = '';
        let total = 0;
        carrito.items.forEach(item => {
          const itemHtml = `
            <div class="d-flex justify-content-between align-items-center border-bottom py-2">
              <span>${item.cantidad} x ${item.nombre}</span>
              <span>$${(item.cantidad * item.precio).toFixed(2)}</span>
              <button class="btn btn-sm btn-danger eliminar-item" data-id="${item.id}" data-type="${item.tipo}">Eliminar</button>
            </div>
          `;
          carritoItemsContainer.insertAdjacentHTML('beforeend', itemHtml);
          total += item.cantidad * item.precio;
        });

        resumenCarritoContainer.innerHTML = `
          <h5>Total de la compra: $${total.toFixed(2)}</h5>
          `;
        showMessage('', 'hidden');

        document.querySelectorAll('.eliminar-item').forEach(button => {
          button.addEventListener('click', eliminarItemDelCarrito);
        });
      } else {
        carritoItemsContainer.innerHTML = '<p class="text-center">Tu carrito está vacío.</p>';
        resumenCarritoContainer.innerHTML = '<h5>Total de la compra: $0.00</h5>';
        showMessage('', 'hidden');
      }
    } catch (error) {
      console.error('Error al cargar el carrito:', error);
      showMessage('No se pudo cargar el carrito. Intente de nuevo más tarde.', 'danger');
    }
  }

  // Función para eliminar un ítem del carrito
  async function eliminarItemDelCarrito(event) {
    const itemId = event.target.dataset.id;
    const itemType = event.target.dataset.type;
    if (!confirm(`¿Estás seguro de que quieres eliminar este ${itemType} del carrito?`)) {
      return;
    }

    showMessage('Eliminando ítem...', 'info');
    try {
      const response = await fetch(`/api/carrito/eliminar/${itemId}`, { // Endpoint para eliminar
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
          // 'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ itemType: itemType }) // Puedes enviar el tipo para mayor control
      });

      const data = await response.json();

      if (response.ok) {
        showMessage(data.message || 'Ítem eliminado con éxito.', 'success');
        cargarCarrito(); // Recargar el carrito para actualizar la vista
      } else {
        showMessage(data.message || 'Error al eliminar el ítem.', 'danger');
      }
    } catch (error) {
      console.error('Error al eliminar del carrito:', error);
      showMessage('Error de conexión al eliminar del carrito.', 'danger');
    }
  }


  // Event listener para el botón de "Realizar Compra"
  realizarCompraBtn.addEventListener('click', async function() {
    showMessage('Procesando compra...', 'info');
    try {
      const response = await fetch('/api/procesar_compra', { // Endpoint para procesar la compra
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
          // 'Authorization': `Bearer ${localStorage.getItem('token')}` // Si se requiere autenticación
        },
        // Aquí podrías enviar datos adicionales del pago si no se hace a través de un tercero directo
        body: JSON.stringify({ /* data de la compra */ })
      });

      const data = await response.json();

      if (response.ok) {
        showMessage('¡Compra realizada con éxito! Redirigiendo a confirmación.', 'success');
        // Aquí puedes redirigir a una página de confirmación o de pago con terceros
        setTimeout(() => {
          window.location.href = 'confirmacion_compra.html'; // O a pagos.html si es el siguiente paso
        }, 2000);
      } else {
        showMessage(data.message || 'Error al procesar la compra. Intente de nuevo.', 'danger');
      }
    } catch (error) {
      console.error('Error al procesar la compra:', error);
      showMessage('No se pudo completar la compra. Intente de nuevo más tarde.', 'danger');
    }
  });

  // Cargar el carrito al inicio
  cargarCarrito();

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