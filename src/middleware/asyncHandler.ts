import { Request, Response, NextFunction } from "express";

// Middleware para manejar errores de funciones asíncronas
const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) => 
  (req: Request, res: Response, next: NextFunction) => {
    return fn(req, res, next).catch(next);  // Captura errores y pasa al siguiente middleware
};

export default asyncHandler;
