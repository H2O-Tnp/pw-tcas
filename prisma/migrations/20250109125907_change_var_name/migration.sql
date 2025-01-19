/*
  Warnings:

  - You are about to drop the column `student_name` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `student_surname` on the `Student` table. All the data in the column will be lost.
  - Added the required column `name` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `surname` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Student" DROP COLUMN "student_name",
DROP COLUMN "student_surname",
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "surname" TEXT NOT NULL;
