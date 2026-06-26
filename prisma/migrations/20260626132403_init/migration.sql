/*
  Warnings:

  - You are about to drop the column `nama` on the `dokter` table. All the data in the column will be lost.
  - You are about to drop the column `scheduleId` on the `konsultasi` table. All the data in the column will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Dokter` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Dokter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jadwalId` to the `Konsultasi` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `konsultasi` DROP FOREIGN KEY `konsultasi_pasienId_fkey`;

-- DropForeignKey
ALTER TABLE `konsultasi` DROP FOREIGN KEY `konsultasi_scheduleId_fkey`;

-- DropForeignKey
ALTER TABLE `pasien` DROP FOREIGN KEY `pasien_userId_fkey`;

-- DropForeignKey
ALTER TABLE `schedule` DROP FOREIGN KEY `schedule_dokterId_fkey`;

-- AlterTable
ALTER TABLE `dokter` DROP COLUMN `nama`,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `konsultasi` DROP COLUMN `scheduleId`,
    ADD COLUMN `jadwalId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `users`;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` ENUM('ADMIN', 'DOKTER', 'PASIEN') NOT NULL,
    `refreshToken` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Dokter_userId_key` ON `Dokter`(`userId`);

-- AddForeignKey
ALTER TABLE `Dokter` ADD CONSTRAINT `Dokter_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pasien` ADD CONSTRAINT `Pasien_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Schedule` ADD CONSTRAINT `Schedule_dokterId_fkey` FOREIGN KEY (`dokterId`) REFERENCES `Dokter`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Konsultasi` ADD CONSTRAINT `Konsultasi_pasienId_fkey` FOREIGN KEY (`pasienId`) REFERENCES `Pasien`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Konsultasi` ADD CONSTRAINT `Konsultasi_jadwalId_fkey` FOREIGN KEY (`jadwalId`) REFERENCES `Schedule`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `pasien` RENAME INDEX `pasien_nik_key` TO `Pasien_nik_key`;

-- RenameIndex
ALTER TABLE `pasien` RENAME INDEX `pasien_userId_key` TO `Pasien_userId_key`;
