const express = require('express');
const router = express.Router();
const db = require('../config/database');
const bcrypt = require('bcrypt');

// POST /api/login
router.post('/', (req, res) => {
  const { email, contraseña } = req.body;

  if (!email || !contraseña) {
    return res.status(400).json({ error: 'Email y contraseña obligatorios' });
  }

  const sql = 'SELECT * FROM usuario WHERE email = ?';

  db.query(sql, [email], async (err, results) => {
    if (err) {
      console.error('❌ Error al buscar usuario:', err);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: 'Usuario no encontrado' });
    }

    const usuario = results[0];

    const esValida = await bcrypt.compare(contraseña, usuario.contraseña);

    if (!esValida) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    // Éxito
    res.json({
      mensaje: 'Inicio de sesión exitoso',
      usuario: {
        id: usuario.id_usuario,
        nombre: usuario.nombre,
        email: usuario.email
      }
    });
  });
});

module.exports = router;
