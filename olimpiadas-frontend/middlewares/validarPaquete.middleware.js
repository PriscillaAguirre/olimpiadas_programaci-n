module.exports = (req, res, next) => {
  const { nombre, destino, descripcion, precio, duracion, tipo } = req.body;

  if (!nombre || !destino || !descripcion || !precio || !duracion || !tipo) {
    return res.status(400).json({ error: 'Faltan campos obligatorios del paquete' });
  }

  if (typeof precio !== 'number' || precio <= 0) {
    return res.status(400).json({ error: 'El precio debe ser un número positivo' });
  }

  const tiposValidos = ['vuelo', 'todo incluido', 'alquiler de auto'];
  if (!tiposValidos.includes(tipo)) {
    return res.status(400).json({ error: `El tipo debe ser uno de: ${tiposValidos.join(', ')}` });
  }

  next(); // Si todo está bien, continúa con el controlador
};