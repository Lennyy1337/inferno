/*
  Warnings:

  - You are about to drop the `Game` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
ALTER TYPE "roles" ADD VALUE 'NONE';

-- AlterTable
ALTER TABLE "Session" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "rId" TEXT;

-- DropTable
DROP TABLE "Game";

-- CreateTable
CREATE TABLE "pending_script" (
    "id" TEXT NOT NULL,
    "script" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "pending_script_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "apikey" (
    "key" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "roblox_ip" (
    "ip" TEXT NOT NULL,

    CONSTRAINT "roblox_ip_pkey" PRIMARY KEY ("ip")
);

-- CreateIndex
CREATE UNIQUE INDEX "apikey_key_key" ON "apikey"("key");

-- CreateIndex
CREATE UNIQUE INDEX "roblox_ip_ip_key" ON "roblox_ip"("ip");

-- AddForeignKey
ALTER TABLE "pending_script" ADD CONSTRAINT "pending_script_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
