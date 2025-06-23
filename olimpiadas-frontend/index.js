const app = require('./app');
const db = require('./config/database');

const PORT = process.env.PORT || 3000;

// Verificamos conexión a la base de datos
db.connect((err) => {
  if (err) {
    console.error('❌ Error al conectar con la base de datos:', err.message);
    process.exit(1); // Corta la ejecución si no hay conexión
  } else {
    console.log('✅ Conectado a la base de datos MySQL');

    app.listen(PORT, () => {
      console.log(`✅ Servidor escuchando en http://localhost:${PORT}`);
    });
  }
});
