/*
  Warnings:

  - You are about to drop the column `maxInterval` on the `OutboxEvent` table. All the data in the column will be lost.
  - You are about to drop the column `maxRetries` on the `OutboxEvent` table. All the data in the column will be lost.
  - You are about to drop the column `retryInterval` on the `OutboxEvent` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "OutboxEvent" DROP COLUMN "maxInterval",
DROP COLUMN "maxRetries",
DROP COLUMN "retryInterval";

-- CreateTable
CREATE TABLE "OutboxRetryPolicy" (
    "routingKey" TEXT NOT NULL,
    "maxRetries" INTEGER NOT NULL DEFAULT 5,
    "retryInterval" INTEGER NOT NULL DEFAULT 3000,
    "maxInterval" INTEGER NOT NULL DEFAULT 60000,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OutboxRetryPolicy_pkey" PRIMARY KEY ("routingKey")
);
