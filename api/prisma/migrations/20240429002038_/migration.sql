-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `Name` VARCHAR(191) NULL,
    `LastName` VARCHAR(191) NULL,
    `Email` VARCHAR(191) NOT NULL,
    `Password` VARCHAR(191) NOT NULL,
    `Phone` VARCHAR(191) NULL,
    `Address` VARCHAR(191) NULL,
    `City` VARCHAR(191) NULL,
    `oper` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
