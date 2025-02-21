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

  const scoresFromDB = await db.alevel.findMany({
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
  try {
    const body = await req.json();
    const SubjectId = body.index + 1; // 1-8
    const newScore = body.score;

    // Get the current user's student id
    const session = await auth();
    const email = session?.user?.email!;
    const QueryStudentId = await db.student.findUnique({
      where: { email },
      select: { student_id: true },
    });
    const StudentId: number = QueryStudentId?.student_id || 99;

    // Check if score exists for the student
    const existingScore = await prisma.alevel.findFirst({
      where: {
        student_id: StudentId,
        subject_id: SubjectId,
      },
    });

    let result;
    if (existingScore) {
      // If the record exists, update it
      result = await prisma.alevel.update({
        where: {
          score_id: existingScore.score_id,
        },
        data: {
          score: newScore,
        },
      });
      console.log("Updated Score:", result);
    } else {
      // If the record doesn't exist, create it
      result = await prisma.alevel.create({
        data: {
          student_id: StudentId,
          subject_id: SubjectId,
          score: newScore,
          percentile: 0,
        },
      });
      console.log("Created Score:", result);
    }

    // Return a success response
    return NextResponse.json(
      { message: "Score upserted successfully" },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Error upserting alevel:", error);

    // Type guard to check if error is an instance of Error
    if (error instanceof Error) {
      return NextResponse.json(
        { message: "Error upserting alevel", error: error.message },
        { status: 500 }
      );
    } else {
      // Handle unexpected error type
      return NextResponse.json(
        { message: "An unexpected error occurred", error: String(error) },
        { status: 500 }
      );
    }
  }
}