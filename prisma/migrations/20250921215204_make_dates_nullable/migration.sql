-- AlterTable
ALTER TABLE "public"."Deal" ALTER COLUMN "startsAt" DROP NOT NULL,
ALTER COLUMN "endsAt" DROP NOT NULL;
