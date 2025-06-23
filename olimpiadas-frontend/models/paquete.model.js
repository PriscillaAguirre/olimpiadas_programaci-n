const db = require('../config/database');

// Obtener todos los paquetes
exports.obtenerTodos = (callback) => {
  db.query('SELECT * FROM paquete_turistico', callback);
};

// Obtener paquete por ID
exports.obtenerPorId = (id, callback) => {
  db.query('SELECT * FROM paquete_turistico WHERE id_paquete = ?', [id], callback);
};

// Crear nuevo paquete
exports.crear = (paquete, callback) => {
  const { nombre, destino, descripcion, precio, duracion, tipo } = paquete;
  const sql = `
    INSERT INTO paquete_turistico (nombre, destino, descripcion, precio, duracion, tipo)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  db.query(sql, [nombre, destino, descripcion, precio, duracion, tipo], callback);
};

// Actualizar paquete
exports.actualizar = (id, paquete, callback) => {
  const { nombre, destino, descripcion, precio, duracion, tipo } = paquete;
  const sql = `
    UPDATE paquete_turistico
    SET nombre = ?, destino = ?, descripcion = ?, precio = ?, duracion = ?, tipo = ?
    WHERE id_paquete = ?
  `;
  db.query(sql, [nombre, destino, descripcion, precio, duracion, tipo, id], callback);
};

// Eliminar paquete
exports.eliminar = (id, callback) => {
  db.query('DELETE FROM paquete_turistico WHERE id_paquete = ?', [id], callback);
};
