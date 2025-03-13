import { Request, Response } from "express";
import { PrismaClient } from '@prisma/client';
import { Prisma } from "@prisma/client";

const prisma = new PrismaClient(); 

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
        Foto: true,
        Precio: true,
        Cantidad: true,
        Descripci_n: true,
        Codigo_barras: true,
        
      }


    })

    
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
