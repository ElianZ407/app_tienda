import express from 'express';
import formidable from 'formidable'; // Importa formidable directamente
import path from 'path';
import dotenv from 'dotenv';
import productoRoutes from './src/routes/productoRoutes';

dotenv.config();
const app = express();
const port = 3000;

// Middleware para procesar JSON
app.use(express.json());

app.use("/api", productoRoutes);

// Endpoint para subir imágenes
app.post('/upload', (req, res) => {
  const form = formidable({}); // Usar formidable directamente sin el constructor

  // Configuración de formidable (para manejar archivos subidos)
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(500).send('Error al procesar el archivo.');
    }

    // Verificar si el archivo existe y si es un array
    const file = Array.isArray(files.image) ? files.image[0] : files.image;

    if (!file) {
      return res.status(400).send('No se ha subido ninguna imagen.');
    }

    // Generar la URL de la imagen subida
    const imageUrl = `http://localhost:3000/images/${path.basename(file.filepath || '')}`;

    // Responder con la URL de la imagen
    return res.json({ imageUrl });
  });
});

// Servir imágenes estáticas desde la carpeta 'public/images'
app.use("/images", express.static(path.join(__dirname, "public", "images")));

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor Express corriendo en http://localhost:${port}`);
});
