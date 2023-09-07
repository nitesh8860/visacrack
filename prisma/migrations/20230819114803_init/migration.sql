/*
  Warnings:

  - Added the required column `contact` to the `Addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contact` to the `Orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Addresses" ADD COLUMN     "contact" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Orders" ADD COLUMN     "contact" TEXT NOT NULL;
