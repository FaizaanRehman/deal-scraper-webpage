/*
  Warnings:

  - A unique constraint covering the columns `[url]` on the table `Deal` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Deal_url_key" ON "public"."Deal"("url");
