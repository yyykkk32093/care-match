/*
  Warnings:

  - You are about to drop the column `retryInterval` on the `OutboxRetryPolicy` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "OutboxRetryPolicy" DROP COLUMN "retryInterval",
ADD COLUMN     "baseInterval" INTEGER NOT NULL DEFAULT 3000;
