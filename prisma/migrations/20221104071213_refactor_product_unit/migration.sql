-- CreateTable
CREATE TABLE `customer` (
    `CID` INTEGER NOT NULL AUTO_INCREMENT,
    `CName` VARCHAR(30) NOT NULL,
    `CTel` VARCHAR(10) NOT NULL,

    UNIQUE INDEX `customer_CName_key`(`CName`),
    UNIQUE INDEX `customer_CTel_key`(`CTel`),
    PRIMARY KEY (`CID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `employee` (
    `EmpID` INTEGER NOT NULL AUTO_INCREMENT,
    `EmpName` VARCHAR(30) NOT NULL,
    `EmpPosition` VARCHAR(20) NOT NULL,
    `EmpTel` VARCHAR(10) NOT NULL,
    `EmpPassword` VARCHAR(20) NOT NULL,

    UNIQUE INDEX `employee_EmpName_key`(`EmpName`),
    UNIQUE INDEX `employee_EmpTel_key`(`EmpTel`),
    PRIMARY KEY (`EmpID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product` (
    `PID` INTEGER NOT NULL AUTO_INCREMENT,
    `PName` VARCHAR(120) NOT NULL,
    `PPrice` DOUBLE NOT NULL,
    `PDescription` TEXT NOT NULL,
    `PPicture` VARCHAR(512) NOT NULL,
    `PInStock` INTEGER NOT NULL DEFAULT 0,
    `UID` INTEGER NOT NULL,

    UNIQUE INDEX `product_PName_key`(`PName`),
    PRIMARY KEY (`PID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `unit` (
    `UID` INTEGER NOT NULL AUTO_INCREMENT,
    `UDetail` VARCHAR(20) NOT NULL,

    PRIMARY KEY (`UID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `invoice` (
    `IID` INTEGER NOT NULL AUTO_INCREMENT,
    `IStatus` VARCHAR(20) NOT NULL,
    `IDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `CID` INTEGER NOT NULL,
    `EmpID` INTEGER NOT NULL,

    PRIMARY KEY (`IID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `invoice_detail` (
    `INVID` INTEGER NOT NULL AUTO_INCREMENT,
    `INVQty` DOUBLE NOT NULL,
    `INVPrice` VARCHAR(6) NOT NULL,
    `UID` INTEGER NOT NULL,
    `IID` INTEGER NOT NULL,

    PRIMARY KEY (`INVID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
