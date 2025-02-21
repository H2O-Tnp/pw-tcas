/*
  Warnings:

  - You are about to drop the `ALevel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ALevel_Subject` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ALevel" DROP CONSTRAINT "ALevel_student_id_fkey";

-- DropForeignKey
ALTER TABLE "ALevel" DROP CONSTRAINT "ALevel_subject_id_fkey";

-- DropTable
DROP TABLE "ALevel";

-- DropTable
DROP TABLE "ALevel_Subject";

-- CreateTable
CREATE TABLE "Alevel" (
    "score_id" SERIAL NOT NULL,
    "student_id" INTEGER NOT NULL,
    "subject_id" INTEGER NOT NULL,
    "score" DOUBLE PRECISION NOT NULL,
    "percentile" DOUBLE PRECISION,

    CONSTRAINT "Alevel_pkey" PRIMARY KEY ("score_id")
);

-- CreateTable
CREATE TABLE "Alevel_Subject" (
    "subject_id" SERIAL NOT NULL,
    "subject_name" TEXT NOT NULL,

    CONSTRAINT "Alevel_Subject_pkey" PRIMARY KEY ("subject_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Alevel_Subject_subject_name_key" ON "Alevel_Subject"("subject_name");

-- AddForeignKey
ALTER TABLE "Alevel" ADD CONSTRAINT "Alevel_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student"("student_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Alevel" ADD CONSTRAINT "Alevel_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "Alevel_Subject"("subject_id") ON DELETE CASCADE ON UPDATE CASCADE;
