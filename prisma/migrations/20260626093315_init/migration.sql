/*
  Warnings:

  - You are about to drop the column `refreshToken` on the `dokter` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `dokter` table. All the data in the column will be lost.
  - You are about to drop the column `jadwalId` on the `konsultasi` table. All the data in the column will be lost.
  - You are about to alter the column `status` on the `konsultasi` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(1))` to `Enum(EnumId(1))`.
  - You are about to drop the `schedules` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `nama` to the `dokter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `scheduleId` to the `konsultasi` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `konsultasi` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `dokter` DROP FOREIGN KEY `Dokter_userId_fkey`;

-- DropForeignKey
ALTER TABLE `konsultasi` DROP FOREIGN KEY `konsultasi_jadwalId_fkey`;

-- DropForeignKey
ALTER TABLE `pasien` DROP FOREIGN KEY `Pasien_userId_fkey`;

-- DropForeignKey
ALTER TABLE `schedules` DROP FOREIGN KEY `schedules_dokterId_fkey`;

-- DropIndex
DROP INDEX `Dokter_userId_key` ON `dokter`;

-- AlterTable
ALTER TABLE `dokter` DROP COLUMN `refreshToken`,
    DROP COLUMN `userId`,
    ADD COLUMN `nama` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `konsultasi` DROP COLUMN `jadwalId`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `scheduleId` INTEGER NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    MODIFY `status` ENUM('MENUNGGU', 'DIKONFIRMASI', 'SELESAI', 'DIBATALKAN') NOT NULL DEFAULT 'MENUNGGU';

-- DropTable
DROP TABLE `schedules`;

-- DropTable
DROP TABLE `user`;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` ENUM('PASIEN') NOT NULL DEFAULT 'PASIEN',
    `refreshToken` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `schedule` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `dokterId` INTEGER NOT NULL,
    `hari` VARCHAR(191) NOT NULL,
    `jamMulai` VARCHAR(191) NOT NULL,
    `jamSelesai` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `pasien` ADD CONSTRAINT `pasien_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `schedule` ADD CONSTRAINT `schedule_dokterId_fkey` FOREIGN KEY (`dokterId`) REFERENCES `dokter`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `konsultasi` ADD CONSTRAINT `konsultasi_scheduleId_fkey` FOREIGN KEY (`scheduleId`) REFERENCES `schedule`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `pasien` RENAME INDEX `Pasien_nik_key` TO `pasien_nik_key`;

-- RenameIndex
ALTER TABLE `pasien` RENAME INDEX `Pasien_userId_key` TO `pasien_userId_key`;
