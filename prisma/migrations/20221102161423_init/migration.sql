/*
  Warnings:

  - You are about to drop the `Customer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Employee` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Invoice` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `InvoiceDetail` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Lot` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Product` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Unit` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Invoice` DROP FOREIGN KEY `Invoice_customerId_fkey`;

-- DropForeignKey
ALTER TABLE `Invoice` DROP FOREIGN KEY `Invoice_employeeId_fkey`;

-- DropForeignKey
ALTER TABLE `InvoiceDetail` DROP FOREIGN KEY `InvoiceDetail_invoiceId_fkey`;

-- DropForeignKey
ALTER TABLE `InvoiceDetail` DROP FOREIGN KEY `InvoiceDetail_lotId_fkey`;

-- DropForeignKey
ALTER TABLE `InvoiceDetail` DROP FOREIGN KEY `InvoiceDetail_unitId_fkey`;

-- DropForeignKey
ALTER TABLE `Lot` DROP FOREIGN KEY `Lot_productId_fkey`;

-- DropForeignKey
ALTER TABLE `Lot` DROP FOREIGN KEY `Lot_unitId_fkey`;

-- DropTable
DROP TABLE `Customer`;

-- DropTable
DROP TABLE `Employee`;

-- DropTable
DROP TABLE `Invoice`;

-- DropTable
DROP TABLE `InvoiceDetail`;

-- DropTable
DROP TABLE `Lot`;

-- DropTable
DROP TABLE `Product`;

-- DropTable
DROP TABLE `Unit`;

-- CreateTable
CREATE TABLE `customer` (
    `CID` INTEGER NOT NULL AUTO_INCREMENT,
    `CName` VARCHAR(30) NOT NULL,
    `CTel` VARCHAR(10) NOT NULL,

    UNIQUE INDEX `customer_CName_key`(`CName`),
    UNIQUE INDEX `customer_CTel_key`(`CTel`),
    PRIMARY KEY (`CID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `employee` (
    `EmpID` INTEGER NOT NULL AUTO_INCREMENT,
    `EmpName` VARCHAR(30) NOT NULL,
    `EmpPosition` VARCHAR(20) NOT NULL,
    `EmpTel` VARCHAR(10) NOT NULL,
    `EmpPassword` VARCHAR(20) NOT NULL,

    UNIQUE INDEX `employee_EmpName_key`(`EmpName`),
    UNIQUE INDEX `employee_EmpTel_key`(`EmpTel`),
    PRIMARY KEY (`EmpID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product` (
    `PID` INTEGER NOT NULL AUTO_INCREMENT,
    `PName` VARCHAR(120) NOT NULL,
    `PPrice` DOUBLE NOT NULL,
    `PDescription` TEXT NOT NULL,
    `PPicture` VARCHAR(512) NOT NULL,

    UNIQUE INDEX `product_PName_key`(`PName`),
    PRIMARY KEY (`PID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `unit` (
    `UID` INTEGER NOT NULL AUTO_INCREMENT,
    `UDetail` VARCHAR(20) NOT NULL,

    PRIMARY KEY (`UID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `invoice` (
    `IID` INTEGER NOT NULL AUTO_INCREMENT,
    `IStatus` VARCHAR(20) NOT NULL,
    `IDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `CID` INTEGER NOT NULL,
    `EmpID` INTEGER NOT NULL,

    PRIMARY KEY (`IID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `lot` (
    `LotID` INTEGER NOT NULL AUTO_INCREMENT,
    `LotDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `LotQty` DOUBLE NOT NULL,
    `UID` INTEGER NOT NULL,
    `PID` INTEGER NOT NULL,

    PRIMARY KEY (`LotID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `invoice_detail` (
    `INVQty` DOUBLE NOT NULL,
    `INVPrice` VARCHAR(6) NOT NULL,
    `UID` INTEGER NOT NULL,
    `IID` INTEGER NOT NULL,
    `LotID` INTEGER NOT NULL,

    PRIMARY KEY (`IID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `invoice` ADD CONSTRAINT `invoice_CID_fkey` FOREIGN KEY (`CID`) REFERENCES `customer`(`CID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `invoice` ADD CONSTRAINT `invoice_EmpID_fkey` FOREIGN KEY (`EmpID`) REFERENCES `employee`(`EmpID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `lot` ADD CONSTRAINT `lot_UID_fkey` FOREIGN KEY (`UID`) REFERENCES `unit`(`UID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `lot` ADD CONSTRAINT `lot_PID_fkey` FOREIGN KEY (`PID`) REFERENCES `product`(`PID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `invoice_detail` ADD CONSTRAINT `invoice_detail_UID_fkey` FOREIGN KEY (`UID`) REFERENCES `unit`(`UID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `invoice_detail` ADD CONSTRAINT `invoice_detail_IID_fkey` FOREIGN KEY (`IID`) REFERENCES `invoice`(`IID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `invoice_detail` ADD CONSTRAINT `invoice_detail_LotID_fkey` FOREIGN KEY (`LotID`) REFERENCES `lot`(`LotID`) ON DELETE RESTRICT ON UPDATE CASCADE;
