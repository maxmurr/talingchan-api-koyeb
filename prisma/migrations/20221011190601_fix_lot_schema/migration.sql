/*
  Warnings:

  - You are about to drop the column `unit_id` on the `Lot` table. All the data in the column will be lost.
  - Made the column `customerId` on table `Invoice` required. This step will fail if there are existing NULL values in that column.
  - Made the column `employeeId` on table `Invoice` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `unitId` to the `Lot` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Invoice` DROP FOREIGN KEY `Invoice_customerId_fkey`;

-- DropForeignKey
ALTER TABLE `Invoice` DROP FOREIGN KEY `Invoice_employeeId_fkey`;

-- DropForeignKey
ALTER TABLE `Lot` DROP FOREIGN KEY `Lot_unit_id_fkey`;

-- AlterTable
ALTER TABLE `Invoice` MODIFY `customerId` INTEGER NOT NULL,
    MODIFY `employeeId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Lot` DROP COLUMN `unit_id`,
    ADD COLUMN `unitId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Invoice` ADD CONSTRAINT `Invoice_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Invoice` ADD CONSTRAINT `Invoice_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `Employee`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Lot` ADD CONSTRAINT `Lot_unitId_fkey` FOREIGN KEY (`unitId`) REFERENCES `Unit`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
