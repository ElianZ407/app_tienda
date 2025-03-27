-- CreateTable
CREATE TABLE `bitacora_productos` (
    `Id_Bitacora` INTEGER NOT NULL AUTO_INCREMENT,
    `Id_Producto` INTEGER NOT NULL,
    `Cantidad` DECIMAL(10, 0) NOT NULL,
    `Fecha_Reabastecimiento` DATE NOT NULL,
    `Fecha_Terminacion` INTEGER NOT NULL,

    INDEX `fk_Reporte_Producto`(`Id_Producto`),
    PRIMARY KEY (`Id_Bitacora`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `categoria` (
    `Id_Categoria` INTEGER NOT NULL AUTO_INCREMENT,
    `Nombre` VARCHAR(20) NOT NULL,
    `Descripcion` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`Id_Categoria`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `producto` (
    `Id_Producto` INTEGER NOT NULL AUTO_INCREMENT,
    `Id_Categoria` INTEGER NOT NULL,
    `Nombre` VARCHAR(150) NOT NULL,
    `Foto` TEXT NULL,
    `Precio` DECIMAL(10, 0) NOT NULL,
    `Cantidad` DECIMAL(10, 0) NOT NULL,
    `Descripción` VARCHAR(150) NOT NULL,
    `Codigo_barras` VARCHAR(30) NOT NULL,
    `Fecha_Creacion` DATE NOT NULL,

    INDEX `fk_producto_categoria`(`Id_Categoria`),
    PRIMARY KEY (`Id_Producto`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ventas` (
    `Id_Venta` INTEGER NOT NULL AUTO_INCREMENT,
    `Id_Producto` INTEGER NOT NULL,
    `Cantidad` DECIMAL(10, 0) NOT NULL,
    `Precio` DECIMAL(10, 0) NOT NULL,
    `Total` DECIMAL(10, 0) NOT NULL,
    `Fecha` DATE NOT NULL,
    `Numero_venta` VARCHAR(20) NOT NULL,

    INDEX `fk_Ventas_Productos`(`Id_Producto`),
    PRIMARY KEY (`Id_Venta`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `bitacora_productos` ADD CONSTRAINT `fk_Reporte_Producto` FOREIGN KEY (`Id_Producto`) REFERENCES `producto`(`Id_Producto`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `producto` ADD CONSTRAINT `fk_producto_categoria` FOREIGN KEY (`Id_Categoria`) REFERENCES `categoria`(`Id_Categoria`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ventas` ADD CONSTRAINT `fk_Ventas_Productos` FOREIGN KEY (`Id_Producto`) REFERENCES `producto`(`Id_Producto`) ON DELETE NO ACTION ON UPDATE NO ACTION;
