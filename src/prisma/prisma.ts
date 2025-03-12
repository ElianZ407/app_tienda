import { PrismaClient } from '@prisma/client';
// Crear una instancia de PrismaClient
const prisma = new PrismaClient();

// Exportar la instancia
export { prisma };
