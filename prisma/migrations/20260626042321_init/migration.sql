-- DropIndex
DROP INDEX `konsultasi_jadwalId_fkey` ON `konsultasi`;

-- DropIndex
DROP INDEX `konsultasi_pasienId_fkey` ON `konsultasi`;

-- DropIndex
DROP INDEX `schedules_dokterId_key` ON `schedules`;

-- AlterTable
ALTER TABLE `konsultasi` MODIFY `status` ENUM('Menunggu', 'Dikonfirmasi', 'Selesai', 'Dibatalkan') NOT NULL DEFAULT 'Menunggu';

-- AddForeignKey
ALTER TABLE `Dokter` ADD CONSTRAINT `Dokter_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pasien` ADD CONSTRAINT `Pasien_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `schedules` ADD CONSTRAINT `schedules_dokterId_fkey` FOREIGN KEY (`dokterId`) REFERENCES `Dokter`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `konsultasi` ADD CONSTRAINT `konsultasi_pasienId_fkey` FOREIGN KEY (`pasienId`) REFERENCES `Pasien`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `konsultasi` ADD CONSTRAINT `konsultasi_jadwalId_fkey` FOREIGN KEY (`jadwalId`) REFERENCES `schedules`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `dokter` RENAME INDEX `DOKTER_userId_key` TO `Dokter_userId_key`;

-- RenameIndex
ALTER TABLE `pasien` RENAME INDEX `PASIEN_nik_key` TO `Pasien_nik_key`;

-- RenameIndex
ALTER TABLE `pasien` RENAME INDEX `PASIEN_userId_key` TO `Pasien_userId_key`;
