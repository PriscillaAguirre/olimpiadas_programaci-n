const db = require('../config/database');

const Pago = {

  // Registrar un nuevo pago
  crear: (datosPago, callback) => {
    const { id_usuario, id_reserva, metodo_pago, monto, fecha_pago, estado } = datosPago;

    const sql = `
      INSERT INTO pago (id_usuario, id_reserva, metodo_pago, monto, fecha_pago, estado)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [id_usuario, id_reserva, metodo_pago, monto, fecha_pago, estado], callback);
  },

  // Obtener todos los pagos
  obtenerTodos: (callback) => {
    const sql = `SELECT * FROM pago`;
    db.query(sql, callback);
  },

  // Obtener pagos por ID de usuario
  obtenerPorUsuario: (id_usuario, callback) => {
    const sql = `SELECT * FROM pago WHERE id_usuario = ?`;
    db.query(sql, [id_usuario], callback);
  },

  // Obtener pagos por ID de reserva
  obtenerPorReserva: (id_reserva, callback) => {
    const sql = `SELECT * FROM pago WHERE id_reserva = ?`;
    db.query(sql, [id_reserva], callback);
  }
};

module.exports = Pago;
