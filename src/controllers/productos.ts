import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { Buffer } from "buffer";
import { v4 as uuidv4 } from "uuid";
import { randomUUID } from "crypto";


const prisma = new PrismaClient();

// Obtener productos con imagen en Base64
export const getProducts = async (req: Request, res: Response) => {
  try {
    const productos = await prisma.producto.findMany({
      select: {
        Nombre: true,
        categoria: {
          select: {
            Nombre: true,
            Descripcion: true
          }
        },
        Foto: true, // Ahora se devuelve la URL de la imagen
        Precio: true,
        Cantidad: true,
        Descripci_n: true,
        Codigo_barras: true,
      }
    });

    res.json(productos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los productos" });
  }
};


// Crear producto con imagen en Base64
export const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { Nombre, Precio, Cantidad, Descripci_n, Codigo_barras, Id_Categoria, Foto } = req.body;

    // Crear el producto en la base de datos
    const newProduct = await prisma.producto.create({
      data: {
        Nombre,
        Precio: parseFloat(Precio),
        Cantidad: parseInt(Cantidad),
        Descripci_n,
        Codigo_barras,
        Foto,  // Ahora Foto almacena una URL en formato String
        Fecha_Creacion: new Date(),
        categoria: {
          connect: {
            Id_Categoria: parseInt(Id_Categoria)
          }
        }
      }
    });

    res.status(201).json({ message: "Producto creado", product: newProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear el producto" });
  }
};


export const createVenta = async (req: Request, res: Response): Promise<void> => {
  try {
    const { Id_Producto, Cantidad, Precio } = req.body;

    // Verificar que el producto existe
    const producto = await prisma.producto.findUnique({
      where: { Id_Producto: Number(Id_Producto) },
      select: { Cantidad: true }
    });

    if (!producto) {
      res.status(404).json({ message: "Producto no encontrado" });
      return;
    }

    const cantidadVenta = parseInt(Cantidad, 10);
    const cantidadProducto = producto.Cantidad.toNumber(); // Conversión necesaria

    if (cantidadProducto < cantidadVenta) {
      res.status(400).json({ message: "Stock insuficiente" });
      return;
    }

    // Calcular total de la venta
    const totalVenta = cantidadVenta * parseFloat(Precio);

    const fechaHoy = new Date().toISOString().split("T")[0].replace(/-/g, "");
    const Numero_venta = `VENTA-${fechaHoy}-${randomUUID().slice(0, 8)}`;

    // Crear la venta en la base de datos
    const nuevaVenta = await prisma.ventas.create({
      data: {
        Id_Producto: Number(Id_Producto),
        Cantidad: cantidadVenta,
        Precio: parseFloat(Precio),
        Total: totalVenta,
        Fecha: new Date(),
        Numero_venta
      }
    });
    
    await prisma.producto.update({
      where: { Id_Producto: Number(Id_Producto) },
      data: { Cantidad: cantidadProducto - cantidadVenta } 
    });

    res.status(201).json({ message: "Venta registrada con éxito", venta: nuevaVenta });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al registrar la venta" });
  }
};