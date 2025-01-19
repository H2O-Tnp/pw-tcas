// 'use client'

import Form from 'next/form'
import { db } from "#/lib/db";
import { StudentForm } from './scoreForm';
import { auth } from '#/auth';

export default async function Page() {
  // query currnt user student id
  const session = await auth();
  const email = session?.user?.email!;
  const QueryStudentId = await db.student.findUnique({
    where: { email },
    select: { student_id: true }
  });
  const StudentId: number = QueryStudentId?.student_id || 99;
  // console.log(StudentId);

  return (
    <div>
      <StudentForm session={StudentId}/>
    </div>
  );
}