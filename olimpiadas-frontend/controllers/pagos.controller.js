const Pago = require('../models/pago.model');

// Crear nuevo pago (simulado)
exports.crearPago = (req, res) => {
  const { id_usuario, id_reserva, metodo_pago, monto, fecha_pago, estado } = req.body;

  if (!id_usuario || !id_reserva || !metodo_pago || !monto || !fecha_pago || !estado) {
    return res.status(400).json({ error: 'Faltan campos obligatorios para el pago' });
  }

  Pago.crear({ id_usuario, id_reserva, metodo_pago, monto, fecha_pago, estado }, (err, result) => {
    if (err) {
      console.error('❌ Error al registrar el pago:', err);
      return res.status(500).json({ error: 'Error al registrar el pago' });
    }
    res.status(201).json({
      mensaje: 'Pago registrado correctamente (simulado)',
      id_pago: result.insertId
    });
  });
};

// Obtener todos los pagos
exports.obtenerTodosLosPagos = (req, res) => {
  Pago.obtenerTodos((err, results) => {
    if (err) {
      console.error('❌ Error al obtener pagos:', err);
      return res.status(500).json({ error: 'Error al obtener los pagos' });
    }
    res.json(results);
  });
};

// Obtener pagos por ID de usuario
exports.obtenerPagosPorUsuario = (req, res) => {
  const { id_usuario } = req.params;

  Pago.obtenerPorUsuario(id_usuario, (err, results) => {
    if (err) {
      console.error('❌ Error al obtener pagos por usuario:', err);
      return res.status(500).json({ error: 'Error al obtener pagos del usuario' });
    }
    res.json(results);
  });
};

// Obtener pagos por ID de reserva
exports.obtenerPagosPorReserva = (req, res) => {
  const { id_reserva } = req.params;

  Pago.obtenerPorReserva(id_reserva, (err, results) => {
    if (err) {
      console.error('❌ Error al obtener pagos por reserva:', err);
      return res.status(500).json({ error: 'Error al obtener pagos de la reserva' });
    }
    res.json(results);
  });
};
