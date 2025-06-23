const db = require('../config/database');

// Obtener todas las reservas
exports.obtenerReservas = (req, res) => {
  const sql = `
    SELECT r.id_reserva, r.fecha_reserva, r.estado, r.total_pagar, r.id_usuario,
           u.nombre, u.apellido
    FROM reserva r
    JOIN usuario u ON r.id_usuario = u.id_usuario
  `;
  db.query(sql, (err, results) => {
    if (err) {
      console.error('❌ Error al obtener reservas:', err);
      return res.status(500).json({ error: 'Error al obtener reservas' });
    }
    res.json(results);
  });
};

// Obtener reservas por usuario
exports.obtenerReservasPorUsuario = (req, res) => {
  const { id_usuario } = req.params;

  const sql = `
    SELECT * FROM reserva
    WHERE id_usuario = ?
  `;

  db.query(sql, [id_usuario], (err, results) => {
    if (err) {
      console.error('❌ Error al obtener reservas por usuario:', err);
      return res.status(500).json({ error: 'Error al obtener reservas del usuario' });
    }
    res.json(results);
  });
};


// Crear una nueva reserva
exports.crearReserva = (req, res) => {
  const { fecha_reserva, estado, total_pagar, id_usuario } = req.body;

  if (!fecha_reserva || !estado || !total_pagar || !id_usuario) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }

  const sql = `INSERT INTO reserva (fecha_reserva, estado, total_pagar, id_usuario)
               VALUES (?, ?, ?, ?)`;

  db.query(sql, [fecha_reserva, estado, total_pagar, id_usuario], (err, result) => {
    if (err) {
      console.error('❌ Error al crear reserva:', err);
      return res.status(500).json({ error: 'Error al crear reserva' });
    }
    res.status(201).json({ mensaje: 'Reserva creada', id: result.insertId });
  });
};

// Actualizar una reserva
exports.actualizarReserva = (req, res) => {
  const { id } = req.params;
  const { estado, total_pagar } = req.body;

  const sql = `UPDATE reserva SET estado = ?, total_pagar = ? WHERE id_reserva = ?`;

  db.query(sql, [estado, total_pagar, id], (err, result) => {
    if (err) {
      console.error('❌ Error al actualizar reserva:', err);
      return res.status(500).json({ error: 'Error al actualizar reserva' });
    }
    res.json({ mensaje: 'Reserva actualizada correctamente' });
  });
};

// Eliminar una reserva
exports.eliminarReserva = (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM reserva WHERE id_reserva = ?', [id], (err, result) => {
    if (err) {
      console.error('❌ Error al eliminar reserva:', err);
      return res.status(500).json({ error: 'Error al eliminar reserva' });
    }
    res.json({ mensaje: 'Reserva eliminada correctamente' });
  });
};
