/*
  Warnings:

  - Made the column `dokterId` on table `schedules` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `dokter` DROP FOREIGN KEY `DOKTER_userId_fkey`;

-- DropForeignKey
ALTER TABLE `konsultasi` DROP FOREIGN KEY `konsultasi_jadwalId_fkey`;

-- DropForeignKey
ALTER TABLE `konsultasi` DROP FOREIGN KEY `konsultasi_pasienId_fkey`;

-- DropForeignKey
ALTER TABLE `pasien` DROP FOREIGN KEY `PASIEN_userId_fkey`;

-- DropForeignKey
ALTER TABLE `schedules` DROP FOREIGN KEY `schedules_dokterId_fkey`;

-- AlterTable
ALTER TABLE `schedules` MODIFY `dokterId` INTEGER NOT NULL;
