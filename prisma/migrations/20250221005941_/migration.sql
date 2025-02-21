-- CreateTable
CREATE TABLE "ALevel" (
    "score_id" SERIAL NOT NULL,
    "student_id" INTEGER NOT NULL,
    "subject_id" INTEGER NOT NULL,
    "score" DOUBLE PRECISION NOT NULL,
    "percentile" DOUBLE PRECISION,

    CONSTRAINT "ALevel_pkey" PRIMARY KEY ("score_id")
);

-- CreateTable
CREATE TABLE "ALevel_Subject" (
    "subject_id" SERIAL NOT NULL,
    "subject_name" TEXT NOT NULL,

    CONSTRAINT "ALevel_Subject_pkey" PRIMARY KEY ("subject_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ALevel_Subject_subject_name_key" ON "ALevel_Subject"("subject_name");

-- AddForeignKey
ALTER TABLE "ALevel" ADD CONSTRAINT "ALevel_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student"("student_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ALevel" ADD CONSTRAINT "ALevel_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "ALevel_Subject"("subject_id") ON DELETE CASCADE ON UPDATE CASCADE;
