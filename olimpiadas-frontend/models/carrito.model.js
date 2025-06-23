const db = require('../config/database');

// Obtener carrito por usuario
exports.obtenerPorUsuario = (id_usuario, callback) => {
  const sql = 'SELECT * FROM carrito WHERE id_usuario = ?';
  db.query(sql, [id_usuario], callback);
};

// Obtener carrito detallado
exports.obtenerDetallado = (id_usuario, callback) => {
  const sql = `
    SELECT c.id_carrito, c.cantidad, c.fecha_creacion,
           p.nombre AS nombre_paquete, p.destino, p.precio, p.tipo
    FROM carrito c
    JOIN paquete_turistico p ON c.id_paquete = p.id_paquete
    WHERE c.id_usuario = ?
  `;
  db.query(sql, [id_usuario], callback);
};

// Agregar ítem al carrito
exports.agregar = (carrito, callback) => {
  const { id_usuario, id_paquete, fecha_creacion, cantidad } = carrito;
  const sql = 'INSERT INTO carrito (id_usuario, id_paquete, fecha_creacion, cantidad) VALUES (?, ?, ?, ?)';
  db.query(sql, [id_usuario, id_paquete, fecha_creacion, cantidad], callback);
};

// Actualizar cantidad
exports.actualizarCantidad = (id_carrito, cantidad, callback) => {
  const sql = 'UPDATE carrito SET cantidad = ? WHERE id_carrito = ?';
  db.query(sql, [cantidad, id_carrito], callback);
};

// Eliminar ítem
exports.eliminar = (id_carrito, callback) => {
  const sql = 'DELETE FROM carrito WHERE id_carrito = ?';
  db.query(sql, [id_carrito], callback);
};
