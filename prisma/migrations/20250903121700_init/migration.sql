/*
  Warnings:

  - You are about to drop the column `content` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the `ChatSession` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `bot` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."ChatSession" DROP CONSTRAINT "ChatSession_cookiesId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Message" DROP CONSTRAINT "Message_sessionId_fkey";

-- AlterTable
ALTER TABLE "public"."Message" DROP COLUMN "content",
DROP COLUMN "role",
ADD COLUMN     "bot" TEXT NOT NULL,
ADD COLUMN     "user" TEXT NOT NULL;

-- DropTable
DROP TABLE "public"."ChatSession";
