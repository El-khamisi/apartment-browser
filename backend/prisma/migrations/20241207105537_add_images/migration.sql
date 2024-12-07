-- AlterTable
ALTER TABLE "apartments" ADD COLUMN     "images" TEXT[] DEFAULT ARRAY[]::TEXT[];
