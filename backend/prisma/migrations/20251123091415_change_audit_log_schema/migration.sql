/*
  Warnings:

  - A unique constraint covering the columns `[idempotencyKey]` on the table `AuditLog` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `idempotencyKey` to the `AuditLog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AuditLog" ADD COLUMN     "idempotencyKey" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "AuditLog_idempotencyKey_key" ON "AuditLog"("idempotencyKey");
