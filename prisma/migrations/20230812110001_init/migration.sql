/*
  Warnings:

  - Added the required column `passportFront` to the `Applications` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Applications" ADD COLUMN     "passportFront" TEXT NOT NULL;
