/*
  Warnings:

  - The primary key for the `Student` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the `_GroupSubject` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_StudentSubject` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[sn]` on the table `Student` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "_GroupSubject" DROP CONSTRAINT "_GroupSubject_A_fkey";

-- DropForeignKey
ALTER TABLE "_GroupSubject" DROP CONSTRAINT "_GroupSubject_B_fkey";

-- DropForeignKey
ALTER TABLE "_StudentSubject" DROP CONSTRAINT "_StudentSubject_A_fkey";

-- DropForeignKey
ALTER TABLE "_StudentSubject" DROP CONSTRAINT "_StudentSubject_B_fkey";

-- DropIndex
DROP INDEX "Group_facultyId_idx";

-- DropIndex
DROP INDEX "Student_facultyId_idx";

-- DropIndex
DROP INDEX "Subject_facultyId_idx";

-- AlterTable
ALTER TABLE "Group" ADD COLUMN     "specializationId" INTEGER;

-- AlterTable
ALTER TABLE "Student" DROP CONSTRAINT "Student_pkey",
DROP COLUMN "id",
ADD COLUMN     "specializationId" INTEGER,
ALTER COLUMN "sn" DROP DEFAULT,
ADD CONSTRAINT "Student_pkey" PRIMARY KEY ("sn");

-- DropTable
DROP TABLE "_GroupSubject";

-- DropTable
DROP TABLE "_StudentSubject";

-- CreateTable
CREATE TABLE "Specialization" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255),
    "facultyId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Specialization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_SpecializationToSubject" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_StudentToSubject" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_GroupToSubject" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_SpecializationToSubject_AB_unique" ON "_SpecializationToSubject"("A", "B");

-- CreateIndex
CREATE INDEX "_SpecializationToSubject_B_index" ON "_SpecializationToSubject"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_StudentToSubject_AB_unique" ON "_StudentToSubject"("A", "B");

-- CreateIndex
CREATE INDEX "_StudentToSubject_B_index" ON "_StudentToSubject"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_GroupToSubject_AB_unique" ON "_GroupToSubject"("A", "B");

-- CreateIndex
CREATE INDEX "_GroupToSubject_B_index" ON "_GroupToSubject"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Student_sn_key" ON "Student"("sn");

-- AddForeignKey
ALTER TABLE "Specialization" ADD CONSTRAINT "Specialization_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "Faculty"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_specializationId_fkey" FOREIGN KEY ("specializationId") REFERENCES "Specialization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_specializationId_fkey" FOREIGN KEY ("specializationId") REFERENCES "Specialization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SpecializationToSubject" ADD CONSTRAINT "_SpecializationToSubject_A_fkey" FOREIGN KEY ("A") REFERENCES "Specialization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SpecializationToSubject" ADD CONSTRAINT "_SpecializationToSubject_B_fkey" FOREIGN KEY ("B") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StudentToSubject" ADD CONSTRAINT "_StudentToSubject_A_fkey" FOREIGN KEY ("A") REFERENCES "Student"("sn") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StudentToSubject" ADD CONSTRAINT "_StudentToSubject_B_fkey" FOREIGN KEY ("B") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GroupToSubject" ADD CONSTRAINT "_GroupToSubject_A_fkey" FOREIGN KEY ("A") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GroupToSubject" ADD CONSTRAINT "_GroupToSubject_B_fkey" FOREIGN KEY ("B") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;
