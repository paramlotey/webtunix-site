-- CreateEnum
CREATE TYPE "public"."Job_type" AS ENUM ('FULL_TIME', 'PART_TIME', 'CONTRACT', 'FREELANCE', 'INTERNSHIP');

-- CreateEnum
CREATE TYPE "public"."Status" AS ENUM ('pending', 'accepted', 'rejected');

-- CreateTable
CREATE TABLE "public"."Blogs" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "content" TEXT,
    "thumbnailImg" TEXT NOT NULL,
    "images" TEXT[],
    "tags" TEXT[],
    "category" TEXT[],
    "show" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "slug" TEXT NOT NULL,
    "authorName" TEXT NOT NULL,

    CONSTRAINT "Blogs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Admin" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "resetOtp" TEXT,
    "otpExpiry" TIMESTAMP(3),
    "access_token" TEXT,
    "refresh_token" TEXT,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Contact" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."SEO" (
    "id" SERIAL NOT NULL,
    "route" TEXT NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "keywords" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SEO_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."FAQ" (
    "id" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "FAQ_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Vacancies" (
    "id" SERIAL NOT NULL,
    "JobTitle" TEXT NOT NULL,
    "Job_Description" TEXT NOT NULL,
    "Min_exp" INTEGER NOT NULL,
    "Max_exp" INTEGER NOT NULL,
    "Job_type" "public"."Job_type" NOT NULL,
    "Salary" TEXT,
    "Primary_Skills" TEXT[],
    "Secondary_Skills" TEXT[],
    "Show" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Vacancies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Applications" (
    "id" SERIAL NOT NULL,
    "applicantName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNo" INTEGER NOT NULL,
    "applied_for" INTEGER NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "qualification" TEXT[],
    "cover_letter" TEXT,
    "resume" TEXT NOT NULL,
    "status" "public"."Status" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Applications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Skills" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Skills_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Category" (
    "id" SERIAL NOT NULL,
    "category_name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Cookies" (
    "id" UUID NOT NULL,
    "ip" TEXT,
    "location" JSONB,
    "browser" JSONB,
    "os" JSONB,
    "device" JSONB,
    "cpu" JSONB,
    "engine" JSONB,
    "ua" TEXT,
    "isBot" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cookies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ChatSession" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "cookiesId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChatSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Message" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Blogs_title_key" ON "public"."Blogs"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Blogs_slug_key" ON "public"."Blogs"("slug");

-- CreateIndex
CREATE INDEX "Blogs_slug_idx" ON "public"."Blogs"("slug");

-- CreateIndex
CREATE INDEX "Blogs_show_idx" ON "public"."Blogs"("show");

-- CreateIndex
CREATE INDEX "Blogs_createdAt_idx" ON "public"."Blogs"("createdAt");

-- CreateIndex
CREATE INDEX "Blogs_show_createdAt_idx" ON "public"."Blogs"("show", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "public"."Admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_resetOtp_key" ON "public"."Admin"("resetOtp");

-- CreateIndex
CREATE INDEX "Admin_email_idx" ON "public"."Admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Contact_email_key" ON "public"."Contact"("email");

-- CreateIndex
CREATE INDEX "Contact_email_idx" ON "public"."Contact"("email");

-- CreateIndex
CREATE INDEX "Contact_createdAt_idx" ON "public"."Contact"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "SEO_route_key" ON "public"."SEO"("route");

-- CreateIndex
CREATE INDEX "SEO_route_idx" ON "public"."SEO"("route");

-- CreateIndex
CREATE INDEX "FAQ_createdAt_idx" ON "public"."FAQ"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "Skills_name_key" ON "public"."Skills"("name");

-- CreateIndex
CREATE INDEX "Skills_name_idx" ON "public"."Skills"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Category_category_name_key" ON "public"."Category"("category_name");

-- CreateIndex
CREATE INDEX "Category_category_name_idx" ON "public"."Category"("category_name");

-- AddForeignKey
ALTER TABLE "public"."Applications" ADD CONSTRAINT "Applications_applied_for_fkey" FOREIGN KEY ("applied_for") REFERENCES "public"."Vacancies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ChatSession" ADD CONSTRAINT "ChatSession_cookiesId_fkey" FOREIGN KEY ("cookiesId") REFERENCES "public"."Cookies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Message" ADD CONSTRAINT "Message_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "public"."ChatSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
