-- AlterTable
ALTER TABLE `doctornote` ADD COLUMN `doctorId` INTEGER NULL,
    ADD COLUMN `userId` INTEGER NULL;

-- AlterTable
ALTER TABLE `healthrecord` ADD COLUMN `user_id` INTEGER NULL,
    MODIFY `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AddForeignKey
ALTER TABLE `HealthRecord` ADD CONSTRAINT `HealthRecord_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DoctorNote` ADD CONSTRAINT `DoctorNote_doctorId_fkey` FOREIGN KEY (`doctorId`) REFERENCES `Doctor`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DoctorNote` ADD CONSTRAINT `DoctorNote_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
