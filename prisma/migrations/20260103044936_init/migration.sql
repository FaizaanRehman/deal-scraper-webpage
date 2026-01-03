-- CreateEnum
CREATE TYPE "InstagramMediaType" AS ENUM ('IMAGE', 'VIDEO', 'CAROUSEL');

-- CreateTable
CREATE TABLE "Deal" (
    "id" SERIAL NOT NULL,
    "owner" TEXT NOT NULL DEFAULT 'unknown',
    "caption" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL DEFAULT '',
    "mediaType" "InstagramMediaType" NOT NULL DEFAULT 'IMAGE',
    "startsAt" TIMESTAMP(3),
    "endsAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Deal_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Deal_url_key" ON "Deal"("url");
