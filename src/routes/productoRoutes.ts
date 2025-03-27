import express from "express";
import { createProduct, getProducts, createVenta } from "../controllers/productos";
import asyncHandler from "../middleware/asyncHandler";

const router = express.Router();


router.post("/insertproductos", asyncHandler(createProduct)); // Crear producto
router.get("/productos", getProducts); // Obtener productos

router.post("/ventas", asyncHandler(createVenta)); // Registrar venta

export default router;
