/*
  Warnings:

  - You are about to drop the column `lot_id` on the `InvoiceDetail` table. All the data in the column will be lost.
  - You are about to drop the column `unit_id` on the `InvoiceDetail` table. All the data in the column will be lost.
  - Added the required column `lotId` to the `InvoiceDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unitId` to the `InvoiceDetail` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `InvoiceDetail` DROP FOREIGN KEY `InvoiceDetail_lot_id_fkey`;

-- DropForeignKey
ALTER TABLE `InvoiceDetail` DROP FOREIGN KEY `InvoiceDetail_unit_id_fkey`;

-- AlterTable
ALTER TABLE `InvoiceDetail` DROP COLUMN `lot_id`,
    DROP COLUMN `unit_id`,
    ADD COLUMN `lotId` INTEGER NOT NULL,
    ADD COLUMN `unitId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `InvoiceDetail` ADD CONSTRAINT `InvoiceDetail_unitId_fkey` FOREIGN KEY (`unitId`) REFERENCES `Unit`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InvoiceDetail` ADD CONSTRAINT `InvoiceDetail_lotId_fkey` FOREIGN KEY (`lotId`) REFERENCES `Lot`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
