/*
  Warnings:

  - You are about to drop the column `name` on the `schedules` table. All the data in the column will be lost.
  - You are about to alter the column `role` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `Enum(EnumId(0))`.
  - A unique constraint covering the columns `[dokterId]` on the table `schedules` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `schedules` DROP COLUMN `name`,
    ADD COLUMN `dokterId` INTEGER NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `role` ENUM('ADMIN', 'DOKTER', 'PASIEN') NOT NULL DEFAULT 'PASIEN';

-- CreateTable
CREATE TABLE `dokters` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `noHP` VARCHAR(191) NOT NULL,
    `spesialis` VARCHAR(191) NOT NULL,
    `refreshToken` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `dokters_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pasiens` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `nik` VARCHAR(191) NOT NULL,
    `tanggalLahir` DATETIME(3) NOT NULL,
    `alamat` VARCHAR(191) NOT NULL,
    `noHP` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `pasiens_userId_key`(`userId`),
    UNIQUE INDEX `pasiens_nik_key`(`nik`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `konsultasi` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pasienId` INTEGER NOT NULL,
    `jadwalId` INTEGER NOT NULL,
    `tanggal` DATETIME(3) NOT NULL,
    `keluhan` VARCHAR(191) NOT NULL,
    `nomorAntrian` INTEGER NOT NULL,
    `status` ENUM('Menunggu', 'Dikonfirmasi', 'Selesai', 'Dibatalkan') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `schedules_dokterId_key` ON `schedules`(`dokterId`);

-- AddForeignKey
ALTER TABLE `dokters` ADD CONSTRAINT `dokters_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pasiens` ADD CONSTRAINT `pasiens_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `schedules` ADD CONSTRAINT `schedules_dokterId_fkey` FOREIGN KEY (`dokterId`) REFERENCES `dokters`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `konsultasi` ADD CONSTRAINT `konsultasi_pasienId_fkey` FOREIGN KEY (`pasienId`) REFERENCES `pasiens`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `konsultasi` ADD CONSTRAINT `konsultasi_jadwalId_fkey` FOREIGN KEY (`jadwalId`) REFERENCES `schedules`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
