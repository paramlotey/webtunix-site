/*
  Warnings:

  - You are about to drop the column `bot` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `user` on the `Message` table. All the data in the column will be lost.
  - Added the required column `sender` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `text` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Message" DROP COLUMN "bot",
DROP COLUMN "user",
ADD COLUMN     "sender" TEXT NOT NULL,
ADD COLUMN     "text" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "public"."Session" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "cookieId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionId_key" ON "public"."Session"("sessionId");

-- AddForeignKey
ALTER TABLE "public"."Session" ADD CONSTRAINT "Session_cookieId_fkey" FOREIGN KEY ("cookieId") REFERENCES "public"."Cookies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Message" ADD CONSTRAINT "Message_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "public"."Session"("sessionId") ON DELETE CASCADE ON UPDATE CASCADE;
