/*
  Warnings:

  - A unique constraint covering the columns `[tel]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Customer_tel_key` ON `Customer`(`tel`);
