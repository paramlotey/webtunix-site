/*
  Warnings:

  - You are about to drop the column `status` on the `Category` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Category" DROP COLUMN "status";

-- AlterTable
ALTER TABLE "public"."FAQ" ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT false;
