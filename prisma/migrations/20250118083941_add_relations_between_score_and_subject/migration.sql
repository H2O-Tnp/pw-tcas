/*
  Warnings:

  - A unique constraint covering the columns `[student_id,subject_id]` on the table `Score` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Score_student_id_subject_id_key" ON "Score"("student_id", "subject_id");
