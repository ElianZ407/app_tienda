declare namespace Express {
    interface Request {
      file?: Express.Multer.File; // Esto le indica a TypeScript que el 'file' en 'req' puede ser un archivo de Multer
    }
  }
  