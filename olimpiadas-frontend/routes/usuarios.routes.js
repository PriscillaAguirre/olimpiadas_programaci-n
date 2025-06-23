const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuarios.controller');
const validarUsuario = require('../middlewares/validarUsuario.middleware');
const validarLogin = require('../middlewares/validarLogin.middleware');

// Obtener todos los usuarios
router.get('/', usuariosController.obtenerUsuarios);

// Registrar nuevo usuario
router.post('/registro', validarUsuario, usuariosController.registrarUsuario);

// Iniciar sesión
router.post('/login', validarLogin, usuariosController.loginUsuario);

module.exports = router;
