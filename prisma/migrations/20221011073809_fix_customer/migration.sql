/*
  Warnings:

  - You are about to alter the column `tel` on the `Customer` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(10)`.

*/
-- AlterTable
ALTER TABLE `Customer` MODIFY `tel` VARCHAR(10) NOT NULL;
