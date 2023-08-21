/*
  Warnings:

  - A unique constraint covering the columns `[whatsapp]` on the table `orgs` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "pets_city_key";

-- CreateIndex
CREATE UNIQUE INDEX "orgs_whatsapp_key" ON "orgs"("whatsapp");
