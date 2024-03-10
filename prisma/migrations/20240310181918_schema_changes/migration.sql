/*
  Warnings:

  - A unique constraint covering the columns `[sn]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - Made the column `abbreviation` on table `Faculty` required. This step will fail if there are existing NULL values in that column.
  - Made the column `title` on table `Group` required. This step will fail if there are existing NULL values in that column.
  - Made the column `facultyId` on table `Group` required. This step will fail if there are existing NULL values in that column.
  - Made the column `specializationId` on table `Group` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `abbreviation` to the `Specialization` table without a default value. This is not possible if the table is not empty.
  - Made the column `title` on table `Specialization` required. This step will fail if there are existing NULL values in that column.
  - Made the column `facultyId` on table `Specialization` required. This step will fail if there are existing NULL values in that column.
  - Made the column `facultyId` on table `Student` required. This step will fail if there are existing NULL values in that column.
  - Made the column `specializationId` on table `Student` required. This step will fail if there are existing NULL values in that column.
  - Made the column `title` on table `Subject` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `Subject` required. This step will fail if there are existing NULL values in that column.
  - Made the column `file` on table `Subject` required. This step will fail if there are existing NULL values in that column.
  - Made the column `facultyId` on table `Subject` required. This step will fail if there are existing NULL values in that column.
  - Made the column `abbreviation` on table `Subject` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Group" DROP CONSTRAINT "Group_facultyId_fkey";

-- DropForeignKey
ALTER TABLE "Group" DROP CONSTRAINT "Group_specializationId_fkey";

-- DropForeignKey
ALTER TABLE "Specialization" DROP CONSTRAINT "Specialization_facultyId_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_facultyId_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_specializationId_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_userId_fkey";

-- DropForeignKey
ALTER TABLE "Subject" DROP CONSTRAINT "Subject_facultyId_fkey";

-- AlterTable
ALTER TABLE "Faculty" ALTER COLUMN "abbreviation" SET NOT NULL;

-- AlterTable
ALTER TABLE "Group" ALTER COLUMN "title" SET NOT NULL,
ALTER COLUMN "facultyId" SET NOT NULL,
ALTER COLUMN "specializationId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Specialization" ADD COLUMN     "abbreviation" VARCHAR(10) NOT NULL,
ALTER COLUMN "title" SET NOT NULL,
ALTER COLUMN "facultyId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Student" ALTER COLUMN "sn" DROP DEFAULT,
ALTER COLUMN "facultyId" SET NOT NULL,
ALTER COLUMN "specializationId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Subject" ALTER COLUMN "title" SET NOT NULL,
ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "file" SET NOT NULL,
ALTER COLUMN "facultyId" SET NOT NULL,
ALTER COLUMN "abbreviation" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Student_sn_key" ON "Student"("sn");

-- AddForeignKey
ALTER TABLE "Subject" ADD CONSTRAINT "Subject_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "Faculty"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Specialization" ADD CONSTRAINT "Specialization_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "Faculty"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "Faculty"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_specializationId_fkey" FOREIGN KEY ("specializationId") REFERENCES "Specialization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "Faculty"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_specializationId_fkey" FOREIGN KEY ("specializationId") REFERENCES "Specialization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
