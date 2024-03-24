/*
  Warnings:

  - You are about to drop the column `specializationId` on the `Group` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Group" DROP CONSTRAINT "Group_specializationId_fkey";

-- AlterTable
ALTER TABLE "Group" DROP COLUMN "specializationId";

-- CreateTable
CREATE TABLE "_GroupToSpecialization" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_GroupToSpecialization_AB_unique" ON "_GroupToSpecialization"("A", "B");

-- CreateIndex
CREATE INDEX "_GroupToSpecialization_B_index" ON "_GroupToSpecialization"("B");

-- AddForeignKey
ALTER TABLE "_GroupToSpecialization" ADD CONSTRAINT "_GroupToSpecialization_A_fkey" FOREIGN KEY ("A") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GroupToSpecialization" ADD CONSTRAINT "_GroupToSpecialization_B_fkey" FOREIGN KEY ("B") REFERENCES "Specialization"("id") ON DELETE CASCADE ON UPDATE CASCADE;
