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
