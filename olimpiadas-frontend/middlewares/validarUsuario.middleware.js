module.exports = (req, res, next) => {
    const { nombre, apellido, email, contraseña } = req.body;

    if(!nombre || !apellido || !email || !contraseña){
        return res.status(400).json({ error: 'Faltan campos obligatorios para el registro de usuario'});
    }

    //Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'El email no tiene un formato válido' });
  }

  // Validar que la contraseña tenga al menos 6 caracteres
  if (contraseña.length < 6) {
    return res.status(400).json({ error: 'La contraseña debe tener al menos 6 caracteres' });
  }

  next(); // si todo está bien, sigue al controlador
};