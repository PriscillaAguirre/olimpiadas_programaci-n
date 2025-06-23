const db = require('../config/database');

// Obtener todos los detalles de reserva
exports.obtenerDetalles = (req, res) => {
  const sql = `
    SELECT d.id_reserva, d.id_paquete, d.id_usuario, d.total,
           p.nombre AS nombre_paquete, u.nombre AS nombre_usuario
    FROM detalles_reserva d
    JOIN paquete_turistico p ON d.id_paquete = p.id_paquete
    JOIN usuario u ON d.id_usuario = u.id_usuario
  `;
  db.query(sql, (err, results) => {
    if (err) {
      console.error('❌ Error al obtener los detalles:', err);
      return res.status(500).json({ error: 'Error al obtener los detalles' });
    }
    res.json(results);
  });
};

// Obtener detalles por id_reserva
exports.obtenerPorReserva = (req, res) => {
  const { id_reserva } = req.params;

  const sql = `
    SELECT d.id_paquete, d.total, p.nombre AS nombre_paquete
    FROM detalles_reserva d
    JOIN paquete_turistico p ON d.id_paquete = p.id_paquete
    WHERE d.id_reserva = ?
  `;

  db.query(sql, [id_reserva], (err, results) => {
    if (err) {
      console.error('❌ Error al obtener detalles por reserva:', err);
      return res.status(500).json({ error: 'Error al obtener los detalles' });
    }
    res.json(results);
  });
};

// Crear un nuevo detalle de reserva
exports.crearDetalle = (req, res) => {
  const { id_reserva, id_paquete, id_usuario, total } = req.body;

  if (!id_reserva || !id_paquete || !id_usuario || !total) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }

  const sql = `INSERT INTO detalles_reserva (id_reserva, id_paquete, id_usuario, total)
               VALUES (?, ?, ?, ?)`;

  db.query(sql, [id_reserva, id_paquete, id_usuario, total], (err, result) => {
    if (err) {
      console.error('❌ Error al crear el detalle de reserva:', err);
      return res.status(500).json({ error: 'Error al crear el detalle' });
    }
    res.status(201).json({ mensaje: 'Detalle creado', id: result.insertId });
  });
};

// Eliminar un detalle de reserva
exports.eliminarDetalle = (req, res) => {
  const { id_reserva, id_paquete } = req.params;

  const sql = `DELETE FROM detalles_reserva WHERE id_reserva = ? AND id_paquete = ?`;

  db.query(sql, [id_reserva, id_paquete], (err, result) => {
    if (err) {
      console.error('❌ Error al eliminar detalle de reserva:', err);
      return res.status(500).json({ error: 'Error al eliminar el detalle' });
    }
    res.json({ mensaje: 'Detalle eliminado correctamente' });
  });
};
