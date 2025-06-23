const express = require('express');
const router = express.Router();
const detallesController = require('../controllers/detalles.controller');

// tener todos los detalles de reserva
router.get('/', detallesController.obtenerDetalles);

// tener detalles por ID de reserva
router.get('/:id_reserva', detallesController.obtenerPorReserva);

// Crear un nuevo detalle
router.post('/', detallesController.crearDetalle);

// Eliminar un detalle por id_reserva y id_paquete
router.delete('/:id_reserva/:id_paquete', detallesController.eliminarDetalle);

module.exports = router;
