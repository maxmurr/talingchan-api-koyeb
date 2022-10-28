-- DropForeignKey
ALTER TABLE `Invoice` DROP FOREIGN KEY `Invoice_customer_id_fkey`;

-- AlterTable
ALTER TABLE `Customer` MODIFY `name` VARCHAR(30) NULL;

-- AlterTable
ALTER TABLE `Invoice` MODIFY `customer_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Invoice` ADD CONSTRAINT `Invoice_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `Customer`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
