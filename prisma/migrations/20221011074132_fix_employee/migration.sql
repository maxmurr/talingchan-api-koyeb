/*
  Warnings:

  - A unique constraint covering the columns `[tel]` on the table `Employee` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Employee_tel_key` ON `Employee`(`tel`);
