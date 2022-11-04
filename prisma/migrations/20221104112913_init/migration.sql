/*
  Warnings:

  - You are about to drop the column `UID` on the `invoice_detail` table. All the data in the column will be lost.
  - Added the required column `PID` to the `invoice_detail` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `invoice_detail` DROP COLUMN `UID`,
    ADD COLUMN `PID` INTEGER NOT NULL;
