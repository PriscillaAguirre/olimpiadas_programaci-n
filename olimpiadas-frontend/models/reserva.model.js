const db = require('../config/database');

// Obtener todas las reservas de un usuario
exports.obtenerPorUsuario = (id_usuario, callback) => {
  const sql = 'SELECT * FROM reserva WHERE id_usuario = ?';
  db.query(sql, [id_usuario], callback);
};

// Crear reserva
exports.crear = (reserva, callback) => {
  const { id_usuario, fecha_reserva, estado } = reserva;
  const sql = 'INSERT INTO reserva (id_usuario, fecha_reserva, estado) VALUES (?, ?, ?)';
  db.query(sql, [id_usuario, fecha_reserva, estado], callback);
};

// Actualizar reserva
exports.actualizarEstado = (id_reserva, estado, callback) => {
  const sql = 'UPDATE reserva SET estado = ? WHERE id_reserva = ?';
  db.query(sql, [estado, id_reserva], callback);
};

// Eliminar reserva
exports.eliminar = (id_reserva, callback) => {
  const sql = 'DELETE FROM reserva WHERE id_reserva = ?';
  db.query(sql, [id_reserva], callback);
};
