/*
  Warnings:

  - You are about to drop the column `nextAllowedBirthdayChange` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "nextAllowedBirthdayChange";

-- CreateIndex
CREATE INDEX "validFrom_validUntil_userId_index" ON "Coupon"("validFrom", "validUntil", "userId");

-- CreateIndex
CREATE INDEX "dateOfBirth_email_index" ON "User"("dateOfBirth", "email");
