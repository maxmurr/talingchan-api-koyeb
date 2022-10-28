/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Customer` table. All the data in the column will be lost.
  - You are about to alter the column `name` on the `Customer` table. The data in that column could be lost. The data in that column will be cast from `VarChar(50)` to `VarChar(30)`.

*/
-- AlterTable
ALTER TABLE `Customer` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`,
    MODIFY `name` VARCHAR(30) NOT NULL;

-- CreateTable
CREATE TABLE `Employee` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(30) NOT NULL,
    `position` VARCHAR(20) NOT NULL,
    `tel` VARCHAR(10) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Invoice` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `status` VARCHAR(20) NOT NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `customer_id` INTEGER NULL,
    `employee_id` INTEGER NULL,

    UNIQUE INDEX `Invoice_customer_id_key`(`customer_id`),
    UNIQUE INDEX `Invoice_employee_id_key`(`employee_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Customer` ADD CONSTRAINT `Customer_id_fkey` FOREIGN KEY (`id`) REFERENCES `Invoice`(`customer_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Employee` ADD CONSTRAINT `Employee_id_fkey` FOREIGN KEY (`id`) REFERENCES `Invoice`(`employee_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
