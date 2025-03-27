require('dotenv').config();
const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();
app.use(express.json());

// Ruta de inicio
app.get('/', (req, res) => {
  res.send(`
    <h1>API Tienda</h1>
    <p>Endpoints disponibles:</p>
    <ul>
      <li><strong>Categorías:</strong> /categorias (GET, POST, PUT, DELETE)</li>
      <li><strong>Productos:</strong> /productos (GET, POST, PUT, DELETE)</li>
      <li><strong>Ventas:</strong> /ventas (GET, POST, PUT, DELETE)</li>
      <li><strong>Bitácora:</strong> /bitacora (GET, POST, PUT, DELETE)</li>
    </ul>
  `);
});

// ==============================================
// CRUD PARA CATEGORÍAS
// ==============================================

// Obtener todas las categorías
app.get('/categorias', async (req, res) => {
  try {
    const categorias = await prisma.categoria.findMany();
    res.json(categorias);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener categorías' });
  }
});

// Crear nueva categoría
app.post('/categorias', async (req, res) => {
  try {
    const { Nombre, Descripcion } = req.body;
    const nuevaCategoria = await prisma.categoria.create({
      data: { Nombre, Descripcion }
    });
    res.status(201).json(nuevaCategoria);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear categoría' });
  }
});

// Actualizar categoría
app.put('/categorias/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { Nombre, Descripcion } = req.body;
    const categoriaActualizada = await prisma.categoria.update({
      where: { Id_Categoria: parseInt(id) },
      data: { Nombre, Descripcion }
    });
    res.json(categoriaActualizada);
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar categoría' });
  }
});

// Eliminar categoría
app.delete('/categorias/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.categoria.delete({
      where: { Id_Categoria: parseInt(id) }
    });
    res.json({ message: 'Categoría eliminada correctamente' });
  } catch (error) {
    res.status(400).json({ error: 'Error al eliminar categoría' });
  }
});

// ==============================================
// CRUD PARA PRODUCTOS
// ==============================================

// Obtener todos los productos
app.get('/productos', async (req, res) => {
  try {
    const productos = await prisma.producto.findMany({
      include: { categoria: true }
    });
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener productos' });
  }
});

// Crear nuevo producto
app.post('/productos', async (req, res) => {
  try {
    const { Id_Categoria, Nombre, Foto, Precio, Cantidad, Descripción, Codigo_barras } = req.body;
    const nuevoProducto = await prisma.producto.create({
      data: {
        Id_Categoria: parseInt(Id_Categoria),
        Nombre,
        Foto: Foto || null,
        Precio: parseFloat(Precio),
        Cantidad: parseInt(Cantidad),
        Descripción,
        Codigo_barras,
        Fecha_Creacion: new Date()
      }
    });
    res.status(201).json(nuevoProducto);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear producto' });
  }
});

// Actualizar producto
app.put('/productos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { Id_Categoria, Nombre, Foto, Precio, Cantidad, Descripción, Codigo_barras } = req.body;
    const productoActualizado = await prisma.producto.update({
      where: { Id_Producto: parseInt(id) },
      data: {
        Id_Categoria: parseInt(Id_Categoria),
        Nombre,
        Foto: Foto || null,
        Precio: parseFloat(Precio),
        Cantidad: parseInt(Cantidad),
        Descripción,
        Codigo_barras
      }
    });
    res.json(productoActualizado);
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar producto' });
  }
});

// Eliminar producto
app.delete('/productos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.producto.delete({
      where: { Id_Producto: parseInt(id) }
    });
    res.json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    res.status(400).json({ error: 'Error al eliminar producto' });
  }
});

// ==============================================
// CRUD PARA VENTAS
// ==============================================

// Obtener todas las ventas
app.get('/ventas', async (req, res) => {
  try {
    const ventas = await prisma.ventas.findMany({
      include: { producto: true }
    });
    res.json(ventas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener ventas' });
  }
});

// Crear nueva venta
app.post('/ventas', async (req, res) => {
  try {
    const { Id_Producto, Cantidad, Precio, Numero_venta } = req.body;
    const nuevaVenta = await prisma.ventas.create({
      data: {
        Id_Producto: parseInt(Id_Producto),
        Cantidad: parseInt(Cantidad),
        Precio: parseFloat(Precio),
        Total: parseFloat(Precio) * parseInt(Cantidad),
        Fecha: new Date(),
        Numero_venta
      }
    });
    res.status(201).json(nuevaVenta);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear venta' });
  }
});

// ==============================================
// CRUD PARA BITÁCORA DE PRODUCTOS
// ==============================================

// Obtener todos los registros de bitácora
app.get('/bitacora', async (req, res) => {
  try {
    const bitacoras = await prisma.bitacora_productos.findMany({
      include: { producto: true }
    });
    res.json(bitacoras);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener bitácora' });
  }
});

// Crear nuevo registro en bitácora
app.post('/bitacora', async (req, res) => {
  try {
    const { Id_Producto, Cantidad, Fecha_Reabastecimiento, Fecha_Terminacion } = req.body;
    const nuevoRegistro = await prisma.bitacora_productos.create({
      data: {
        Id_Producto: parseInt(Id_Producto),
        Cantidad: parseInt(Cantidad),
        Fecha_Reabastecimiento: new Date(Fecha_Reabastecimiento),
        Fecha_Terminacion: Fecha_Terminacion ? new Date(Fecha_Terminacion) : null
      }
    });
    res.status(201).json(nuevoRegistro);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear registro en bitácora' });
  }
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});