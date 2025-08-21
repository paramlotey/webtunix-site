/*
  Warnings:

  - A unique constraint covering the columns `[category_name]` on the table `Category` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."Blogs" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "public"."Category" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "public"."Contact" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- CreateIndex
CREATE INDEX "Admin_email_idx" ON "public"."Admin"("email");

-- CreateIndex
CREATE INDEX "Blogs_slug_idx" ON "public"."Blogs"("slug");

-- CreateIndex
CREATE INDEX "Blogs_show_idx" ON "public"."Blogs"("show");

-- CreateIndex
CREATE INDEX "Blogs_createdAt_idx" ON "public"."Blogs"("createdAt");

-- CreateIndex
CREATE INDEX "Blogs_show_createdAt_idx" ON "public"."Blogs"("show", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "Category_category_name_key" ON "public"."Category"("category_name");

-- CreateIndex
CREATE INDEX "Category_category_name_idx" ON "public"."Category"("category_name");

-- CreateIndex
CREATE INDEX "Contact_email_idx" ON "public"."Contact"("email");

-- CreateIndex
CREATE INDEX "Contact_createdAt_idx" ON "public"."Contact"("createdAt");

-- CreateIndex
CREATE INDEX "SEO_route_idx" ON "public"."SEO"("route");
