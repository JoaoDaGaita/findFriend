/*
  Warnings:

  - A unique constraint covering the columns `[city]` on the table `pets` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `city` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "city" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "pets_city_key" ON "pets"("city");
