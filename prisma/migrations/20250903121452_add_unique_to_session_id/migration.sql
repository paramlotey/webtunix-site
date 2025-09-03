/*
  Warnings:

  - A unique constraint covering the columns `[sessionId]` on the table `ChatSession` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ChatSession_sessionId_key" ON "public"."ChatSession"("sessionId");
