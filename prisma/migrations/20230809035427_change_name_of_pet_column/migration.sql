/*
  Warnings:

  - You are about to drop the column `environment` on the `pets` table. All the data in the column will be lost.
  - The `size` column on the `pets` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `petPlace` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `age` on the `pets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "SIZE" AS ENUM ('SMALL', 'MEDIUM', 'LARGE');

-- AlterTable
ALTER TABLE "pets" DROP COLUMN "environment",
ADD COLUMN     "petPlace" TEXT NOT NULL,
DROP COLUMN "age",
ADD COLUMN     "age" INTEGER NOT NULL,
DROP COLUMN "size",
ADD COLUMN     "size" "SIZE" NOT NULL DEFAULT 'MEDIUM';
