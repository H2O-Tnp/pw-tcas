import { db } from "#/lib/db";
import exp from "constants";
import { NextResponse } from "next/server";

// export async function GET() {
//     return NextResponse.json({success: true});
// }

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, name, surname, year, classroom } = body;
    // console.log("body : "+email);

    // check if email already exists
    const existingUserByEmail = await db.user.findUnique({
      where: { email: email }
    });
    if (existingUserByEmail) {
      return NextResponse.json({ user: null, message: "User with this email already exist" },
        { status: 409 })
    }

    // const newUser = await db.user.create({
    //     data: {
    //         email,
    //         name,
    //         surname,
    //         year,
    //         classroom
    //     }
    // })

    // return NextResponse.json({user: newUser, message: "User create successfilly"});
  } catch (error) {

  }
}