/*
  Warnings:

  - You are about to drop the column `customer_id` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `employee_id` on the `Invoice` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Employee` will be added. If there are existing duplicate values, this will fail.
  - Made the column `name` on table `Customer` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Invoice` DROP FOREIGN KEY `Invoice_customer_id_fkey`;

-- DropForeignKey
ALTER TABLE `Invoice` DROP FOREIGN KEY `Invoice_employee_id_fkey`;

-- AlterTable
ALTER TABLE `Customer` MODIFY `name` VARCHAR(30) NOT NULL;

-- AlterTable
ALTER TABLE `Invoice` DROP COLUMN `customer_id`,
    DROP COLUMN `employee_id`,
    ADD COLUMN `customerId` INTEGER NULL,
    ADD COLUMN `employeeId` INTEGER NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Customer_name_key` ON `Customer`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `Employee_name_key` ON `Employee`(`name`);

-- AddForeignKey
ALTER TABLE `Invoice` ADD CONSTRAINT `Invoice_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Customer`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Invoice` ADD CONSTRAINT `Invoice_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `Employee`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
