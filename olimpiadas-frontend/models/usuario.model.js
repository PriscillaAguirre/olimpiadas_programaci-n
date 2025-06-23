const db = require('../config/database');

// Obtener todos los usuarios
exports.obtenerTodos = (callback) => {
  const sql = 'SELECT id_usuario, nombre, apellido, email, telefono FROM usuario';
  db.query(sql, callback);
};

// Buscar usuario por email
exports.buscarPorEmail = (email, callback) => {
  const sql = 'SELECT * FROM usuario WHERE email = ?';
  db.query(sql, [email], callback);
};

// Crear usuario
exports.crear = (usuario, callback) => {
  const { nombre, apellido, email, contraseña, telefono } = usuario;
  const sql = 'INSERT INTO usuario (nombre, apellido, email, contraseña, telefono) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [nombre, apellido, email, contraseña, telefono], callback);
};
