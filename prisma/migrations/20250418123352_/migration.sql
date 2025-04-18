/*
  Warnings:

  - The primary key for the `Alevel` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `percentile` on the `Alevel` table. All the data in the column will be lost.
  - You are about to drop the column `score` on the `Alevel` table. All the data in the column will be lost.
  - You are about to drop the column `score_id` on the `Alevel` table. All the data in the column will be lost.
  - You are about to drop the column `subject_id` on the `Alevel` table. All the data in the column will be lost.
  - Added the required column `alevel_score` to the `Alevel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `alevel_subject_id` to the `Alevel` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Alevel" DROP CONSTRAINT "Alevel_subject_id_fkey";

-- AlterTable
ALTER TABLE "Alevel" DROP CONSTRAINT "Alevel_pkey",
DROP COLUMN "percentile",
DROP COLUMN "score",
DROP COLUMN "score_id",
DROP COLUMN "subject_id",
ADD COLUMN     "alevel_percentile" DOUBLE PRECISION,
ADD COLUMN     "alevel_score" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "alevel_score_id" SERIAL NOT NULL,
ADD COLUMN     "alevel_subject_id" INTEGER NOT NULL,
ADD CONSTRAINT "Alevel_pkey" PRIMARY KEY ("alevel_score_id");

-- AddForeignKey
ALTER TABLE "Alevel" ADD CONSTRAINT "Alevel_alevel_subject_id_fkey" FOREIGN KEY ("alevel_subject_id") REFERENCES "Alevel_Subject"("subject_id") ON DELETE CASCADE ON UPDATE CASCADE;
