/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `invoiceId` to the `InvoiceDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `Lot` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `InvoiceDetail` ADD COLUMN `invoiceId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Lot` ADD COLUMN `productId` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Product_name_key` ON `Product`(`name`);

-- AddForeignKey
ALTER TABLE `Lot` ADD CONSTRAINT `Lot_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InvoiceDetail` ADD CONSTRAINT `InvoiceDetail_invoiceId_fkey` FOREIGN KEY (`invoiceId`) REFERENCES `Invoice`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
