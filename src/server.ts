import express from "express";
import productoRoutes from "./routes/productoRoutes";



 // Para TypeScript

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/api/products", productoRoutes);

app.listen(PORT, () => {
  console.log(`Servidor Express corriendo en http://localhost:${PORT}`);
});
