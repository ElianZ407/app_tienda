import express from 'express';
import productoRoutes from './src/routes/productoRoutes';

import dotenv from 'dotenv';
dotenv.config();
const app = express();
const port = 3000;

app.use(express.json());
app.use("/api/products", productoRoutes);

app.listen(port, () => {
  console.log(`Servidor Express corriendo en http://localhost:${port}`);
});
