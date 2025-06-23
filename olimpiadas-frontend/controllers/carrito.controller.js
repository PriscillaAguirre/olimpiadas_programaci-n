const db = require('../config/database');

// Obtener todos los elementos del carrito de un usuario
exports.obtenerCarritoPorUsuario = (req, res) => {
  const { id_usuario } = req.params;

  const query = `SELECT * FROM carrito WHERE id_usuario = ?`;
  db.query(query, [id_usuario], (err, results) => {
    if (err) {
      console.error('❌ Error al obtener el carrito:', err);
      return res.status(500).json({ error: 'Error al obtener el carrito del usuario' });
    }
    res.json(results);
  });
};

// Obtener carrito con detalle de los paquetes
exports.obtenerCarritoDetallado = (req, res) => {
  const { id_usuario } = req.params;

  const query = `
    SELECT c.id_carrito, c.cantidad, c.fecha_creacion,
           p.nombre AS nombre_paquete, p.destino, p.precio, p.tipo
    FROM carrito c
    JOIN paquete_turistico p ON c.id_paquete = p.id_paquete
    WHERE c.id_usuario = ?
  `;
  db.query(query, [id_usuario], (err, results) => {
    if (err) {
      console.error('❌ Error al obtener el carrito detallado:', err);
      return res.status(500).json({ error: 'Error al obtener el carrito detallado' });
    }
    res.json(results);
  });
};

// Agregar paquete al carrito
exports.agregarAlCarrito = (req, res) => {
  const { id_usuario, id_paquete, fecha_creacion, cantidad } = req.body;

  if (!id_usuario || !id_paquete || !fecha_creacion || !cantidad) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }

  const query = `
    INSERT INTO carrito (id_usuario, id_paquete, fecha_creacion, cantidad)
    VALUES (?, ?, ?, ?)
  `;

  db.query(query, [id_usuario, id_paquete, fecha_creacion, cantidad], (err, result) => {
    if (err) {
      console.error('❌ Error al agregar al carrito:', err);
      return res.status(500).json({ error: 'Error al agregar al carrito' });
    }
    res.status(201).json({ mensaje: 'Paquete agregado al carrito', id: result.insertId });
  });
};

// Actualizar cantidad de un ítem
exports.actualizarCantidad = (req, res) => {
  const { id } = req.params;
  const { cantidad } = req.body;

  const query = `UPDATE carrito SET cantidad = ? WHERE id_carrito = ?`;
  db.query(query, [cantidad, id], (err, result) => {
    if (err) {
      console.error('❌ Error al actualizar carrito:', err);
      return res.status(500).json({ error: 'Error al actualizar el carrito' });
    }
    res.json({ mensaje: 'Carrito actualizado correctamente' });
  });
};

// Eliminar ítem del carrito
exports.eliminarDelCarrito = (req, res) => {
  const { id } = req.params;

  const query = `DELETE FROM carrito WHERE id_carrito = ?`;
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('❌ Error al eliminar del carrito:', err);
      return res.status(500).json({ error: 'Error al eliminar del carrito' });
    }
    res.json({ mensaje: 'Paquete eliminado del carrito' });
  });

exports.agregarAlCarrito = (req, res) => {
  const { id_paquete, cantidad } = req.body;

  if (!id_paquete || !cantidad) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }

  const sql = `
    INSERT INTO carrito (id_paquete, cantidad)
    VALUES (?, ?)
  `;

  db.query(sql, [id_paquete, cantidad], (err, result) => {
    if (err) {
      console.error('❌ Error al agregar al carrito:', err);
      return res.status(500).json({ error: 'Error al agregar al carrito' });
    }

    res.status(201).json({ message: 'Paquete agregado al carrito correctamente' });
  });
};
};
