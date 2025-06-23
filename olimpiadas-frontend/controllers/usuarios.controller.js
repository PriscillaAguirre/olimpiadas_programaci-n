const db = require('../config/database');
const bcrypt = require('bcrypt');

// Obtener todos los usuarios
exports.obtenerUsuarios = (req, res) => {
  db.query('SELECT id_usuario, nombre, apellido, email, telefono FROM usuario', (err, results) => {
    if (err) {
      console.error('❌ Error al obtener usuarios:', err);
      return res.status(500).json({ error: 'Error al obtener usuarios' });
    }
    res.json(results);
  });
};

// Registrar un nuevo usuario
exports.registrarUsuario = async (req, res) => {
  const { nombre, apellido, email, contraseña, telefono } = req.body;

  if (!nombre || !apellido || !email || !contraseña) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }

  try {
    const hashedPassword = await bcrypt.hash(contraseña, 10);
    const sql = `INSERT INTO usuario (nombre, apellido, email, contraseña, telefono)
                 VALUES (?, ?, ?, ?, ?)`;

    db.query(sql, [nombre, apellido, email, hashedPassword, telefono], (err, result) => {
      if (err) {
        console.error('❌ Error al registrar usuario:', err);
        return res.status(500).json({ error: 'Error al registrar usuario' });
      }
      res.status(201).json({ mensaje: 'Usuario registrado correctamente', id: result.insertId });
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al encriptar la contraseña' });
  }
};

// Iniciar sesión
exports.loginUsuario = async (req, res) => {
  const { email, contraseña } = req.body;

  if (!email || !contraseña) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }

  db.query('SELECT * FROM usuario WHERE email = ?', [email], async (err, results) => {
    if (err) {
      console.error('❌ Error al buscar el usuario:', err);
      return res.status(500).json({ error: 'Error del servidor' });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: 'Usuario no encontrado' });
    }

    const usuario = results[0];
    const match = await bcrypt.compare(contraseña, usuario.contraseña);

    if (!match) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    res.json({ mensaje: 'Inicio de sesión exitoso', usuario: { id: usuario.id_usuario, nombre: usuario.nombre } });
  });
};
