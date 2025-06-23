const express = require('express');
const router = express.Router();
const pagosController = require('../controllers/pagos.controller');

// Crear pago
router.post('/', pagosController.crearPago);

// Obtener todos los pagos
router.get('/', pagosController.obtenerTodosLosPagos);

// Obtener pagos por usuario
router.get('/usuario/:id_usuario', pagosController.obtenerPagosPorUsuario);

// Obtener pagos por reserva
router.get('/reserva/:id_reserva', pagosController.obtenerPagosPorReserva);

module.exports = router;
