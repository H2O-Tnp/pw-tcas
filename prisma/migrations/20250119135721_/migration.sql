/*
  Warnings:

  - You are about to drop the `Score` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Student` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Subject` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Univisity` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Score" DROP CONSTRAINT "Score_student_id_fkey";

-- DropForeignKey
ALTER TABLE "Score" DROP CONSTRAINT "Score_subject_id_fkey";

-- DropForeignKey
ALTER TABLE "Univisity" DROP CONSTRAINT "Univisity_student_id_fkey";

-- DropTable
DROP TABLE "Score";

-- DropTable
DROP TABLE "Student";

-- DropTable
DROP TABLE "Subject";

-- DropTable
DROP TABLE "Univisity";
