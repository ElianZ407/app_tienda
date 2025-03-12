import { Router } from "express";
import { getProducts, createProduct } from "../controllers/productos";

const router = Router();

router.get("/", getProducts);
router.post("/", createProduct);

export default router;
