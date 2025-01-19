import prisma from "#/lib/db";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("Register API called with body:", body);

    await prisma.student.create({
      data: {
        name: body.name,
        surname: body.surname,
        email: body.email,
        class: "", // Placeholder
        academic_year: 0, // Placeholder
      },
    });

    return NextResponse.json({ message: "User successfully registered" });
  } catch (error) {
    console.error("Error in Register API:", error);
    return NextResponse.json(
      { error: "Failed to register user" },
      { status: 500 }
    );
  }
}
