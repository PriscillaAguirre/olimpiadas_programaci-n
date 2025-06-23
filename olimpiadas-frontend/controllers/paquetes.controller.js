const Paquete = require('../models/paquete.model');

// Obtener todos los paquetes turísticos
exports.obtenerPaquetes = (req, res) => {
  Paquete.obtenerTodos((err, resultados) => {
    if (err) {
      console.error('❌ Error al obtener paquetes:', err);
      return res.status(500).json({ error: 'Error al obtener paquetes turísticos' });
    }
    res.json(resultados);
  });
};

// Obtener un paquete por ID
exports.obtenerPaquetePorId = (req, res) => {
  const { id } = req.params;

  Paquete.obtenerPorId(id, (err, resultado) => {
    if (err) {
      console.error('❌ Error al obtener paquete:', err);
      return res.status(500).json({ error: 'Error al obtener el paquete turístico' });
    }
    if (resultado.length === 0) {
      return res.status(404).json({ mensaje: 'Paquete no encontrado' });
    }
    res.json(resultado[0]);
  });
};

// Crear nuevo paquete turístico
exports.crearPaquete = (req, res) => {
  const nuevoPaquete = req.body;

  const camposObligatorios = ['nombre', 'destino', 'descripcion', 'precio', 'duracion', 'tipo'];
  const faltanCampos = camposObligatorios.some(campo => !nuevoPaquete[campo]);

  if (faltanCampos) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }

  Paquete.crear(nuevoPaquete, (err, resultado) => {
    if (err) {
      console.error('❌ Error al crear paquete:', err);
      return res.status(500).json({ error: 'Error al crear el paquete turístico' });
    }
    res.status(201).json({ mensaje: 'Paquete creado correctamente', id: resultado.insertId });
  });
};

// Actualizar paquete
exports.actualizarPaquete = (req, res) => {
  const { id } = req.params;
  const paqueteActualizado = req.body;

  Paquete.actualizar(id, paqueteActualizado, (err) => {
    if (err) {
      console.error('❌ Error al actualizar paquete:', err);
      return res.status(500).json({ error: 'Error al actualizar el paquete' });
    }
    res.json({ mensaje: 'Paquete actualizado correctamente' });
  });
};

// Eliminar paquete
exports.eliminarPaquete = (req, res) => {
  const { id } = req.params;

  Paquete.eliminar(id, (err) => {
    if (err) {
      console.error('❌ Error al eliminar paquete:', err);
      return res.status(500).json({ error: 'Error al eliminar el paquete' });
    }
    res.json({ mensaje: 'Paquete eliminado correctamente' });
  });
};
