import prisma from "#/lib/db";
import { NextResponse, NextRequest } from "next/server";

import { db } from "#/lib/db";
import { auth } from '#/auth';

export async function GET() {
  // hard code
  // query current user student id
  const session = await auth();
  const email = session?.user?.email!;
  
  const QueryStudentId = await db.student.findUnique({
    where: { email },
    select: { student_id: true }
  });
  const StudentId: number = QueryStudentId?.student_id || 99;
  // hard code

  const scoresFromDB = await db.score.findMany({
    where: {
      student_id: StudentId
    },
    select: {
      score: true,
      subject_id: true,
    }
  })
  return NextResponse.json({result:scoresFromDB});
}

export async function POST(req: NextRequest) {
  // console.log("this is score api");

  // data from form
  const body = await req.json();
  const SubjectId = body.index + 1; // 1-8
  const newScore = body.score;
  // console.log(SubjectId);
  // console.log(newScore);

  // hard code
  // query currnt user student id
  const session = await auth();
  const email = session?.user?.email!;
  const QueryStudentId = await db.student.findUnique({
    where: { email },
    select: { student_id: true }
  });
  const StudentId: number = QueryStudentId?.student_id || 99;
  console.log(StudentId);
  // hard code

  // check if exist
  const existingScore = await prisma.score.findFirst({
    where: {
      student_id: StudentId,
      subject_id: SubjectId
    },
  });
  console.log(existingScore);

  try {
    let result;
    if (existingScore) {
      // If the record exists, update it
      result = await prisma.score.update({
        where: {
          score_id: existingScore.score_id,
        },
        data: {
          score: newScore,
        },
      });
      // console.log('Score updated');
      console.log('Updated Score:', result);
      return result;
    } else {
      // If the record doesn't exist, create it
      result = await prisma.score.create({
        data: {
          student_id: StudentId,
          subject_id: SubjectId,
          score: newScore,
          percentile: 0
        },
      });
      console.log('Score created:', result);
    }
    return NextResponse.json({ message: 'Success', result: result }, { status: 200 });

  } catch (error) {
    console.error('Error upserting score:', error);
    return NextResponse.json({ message: 'Error upserting score', error: error }, { status: 500 });
  }
}