import prisma from "#/lib/db";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest){
  const body = await req.json();
  console.log("this is register api");
  console.log(body);
  await prisma.student.create({
    data: {
      name: body.name,
      surname: body.surname,
      email: body.email,
      class: "",
      academic_year: 0
    }
  })
  return NextResponse.json({body});
}