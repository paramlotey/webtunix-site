/*
  Warnings:

  - Made the column `title` on table `Blogs` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."Blogs" ALTER COLUMN "title" SET NOT NULL;
