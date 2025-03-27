import { PrismaClient } from '@prisma/client';

// Inicializa el cliente de Prisma
const prisma = new PrismaClient();

// Función para actualizar un producto
async function actualizarProducto(
  Id_Producto: number,
  datosActualizados: {
    Nombre?: string;
    Id_Categoria?: number;
    Foto?: Buffer;
    Precio?: number;
    Cantidad?: number;
    Descripción?: string;
    Codigo_barras?: string;
  }
) {
  try {
    const productoActualizado = await prisma.producto.update({
      where: { Id_Producto }, // Filtra por el ID del producto
      data: datosActualizados, // Datos a actualizar
    });
    console.log('Producto actualizado:', productoActualizado);
    return productoActualizado;
  } catch (error) {
    console.error('Error al actualizar el producto:', error);
    throw error;
  } finally {
    await prisma.$disconnect(); // Cierra la conexión de Prisma
  }
}

// Función para eliminar un producto
async function eliminarProducto(Id_Producto: number) {
  try {
    const productoEliminado = await prisma.producto.delete({
      where: { Id_Producto }, // Filtra por el ID del producto
    });
    console.log('Producto eliminado:', productoEliminado);
    return productoEliminado;
  } catch (error) {
    console.error('Error al eliminar el producto:', error);
    throw error;
  } finally {
    await prisma.$disconnect(); // Cierra la conexión de Prisma
  }
}

// Ejemplo de uso de las funciones
(async () => {
  try {
    // Actualizar un producto con ID 1
    const productoActualizado = await actualizarProducto(1, {
      Nombre: 'Nuevo Nombre',
      Precio: 29.99,
      Cantidad: 100,
    });
    console.log('Producto actualizado:', productoActualizado);

    // Eliminar un producto con ID 2
    const productoEliminado = await eliminarProducto(2);
    console.log('Producto eliminado:', productoEliminado);
  } catch (error) {
    console.error('Error en el proceso:', error);
  }
})();