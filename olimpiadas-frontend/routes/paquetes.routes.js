const express = require('express');
const router = express.Router();
const paquetesController = require('../controllers/paquetes.controller');
const validarPaquete = require('../middlewares/validarPaquete.middleware');

// Obtener todos los paquetes
router.get('/', paquetesController.obtenerPaquetes);

// Crear nuevo paquete turístico
router.post('/', validarPaquete, paquetesController.crearPaquete);

// (opcional) Actualizar un paquete existente
router.put('/:id_paquete', validarPaquete, paquetesController.actualizarPaquete);

// Eliminar un paquete
router.delete('/:id_paquete', paquetesController.eliminarPaquete);

module.exports = router;
