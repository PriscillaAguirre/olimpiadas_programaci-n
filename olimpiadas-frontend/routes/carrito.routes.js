const express = require('express');
const router = express.Router();
const carritoController = require('../controllers/carrito.controller');

// Obtener todos los ítems del carrito de un usuario
router.get('/:id_usuario', carritoController.obtenerCarritoPorUsuario);

// Obtener el carrito detallado (con info de los paquetes)
router.get('/detallado/:id_usuario', carritoController.obtenerCarritoDetallado);

// Agregar paquete al carrito
router.post('/agregar', carritoController.agregarAlCarrito);

// Actualizar cantidad
router.put('/:id', carritoController.actualizarCantidad);

// Eliminar ítem del carrito
router.delete('/:id', carritoController.eliminarDelCarrito);

module.exports = router;
