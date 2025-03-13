import { Request, Response } from "express";
import { PrismaClient } from '@prisma/client';
import { prisma } from "../prisma/prisma";



export const getProducts = async (req: Request, res: Response) => {
  try {
    // Obtener todos los productos de la base de datos
    const productos = await prisma.producto.findMany();

    // Enviar los productos como respuesta en formato JSON
    res.json(productos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los productos' });
  }
};

export const createProduct = (req: Request, res: Response) => {
  const newProduct = req.body;
  res.status(201).json({ message: "Producto creado", product: newProduct });
};
