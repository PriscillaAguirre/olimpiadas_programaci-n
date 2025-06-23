const express = require('express');
const router = express.Router();
const reservasController = require('../controllers/reservas.controller');

// Obtener todas las reservas
router.get('/', reservasController.obtenerReservas);

// Obtener reservas por usuario
router.get('/:id_usuario', reservasController.obtenerReservasPorUsuario);

// Crear nueva reserva
router.post('/', reservasController.crearReserva);

// Cancelar reserva (eliminar)
router.delete('/:id_reserva', reservasController.eliminarReserva);

module.exports = router;