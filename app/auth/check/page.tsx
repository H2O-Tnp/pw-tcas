import { db } from "#/lib/db";
import { auth } from '#/auth';
import Link from 'next/link';
import { redirect } from "next/navigation";


export default async function LoginPage() {
  const session = await auth();
  const email = session?.user?.email!;
  const nameFromGmail = session?.user?.name!;
  const cleanedName = nameFromGmail.replace(/^(นาย|นาง|นางสาว|เด็กชาย|เด็กหญิง)\s*/, '');
  const firstname = cleanedName?.split(' ').slice(0, -1).join(' ');
  const lastName = cleanedName.split(' ').slice(-1).join(' ');

  const existingUserByEmail = await db.student.findUnique({
    where: { email: email }
  });

  if (existingUserByEmail) {
    console.log("user already in db");
  }
  else {
    console.log("create new user");
    const user_id = email?.slice(0, 5);
    const isNumeric = (string: any) => /^[+-]?\d+(\.\d+)?$/.test(string)
    const isStudent = isNumeric(user_id)
    // console.log(isNumeric(user_id));
    if (isStudent) {
      console.log("register student");
      const submitData = async () => {
        const webUrl = String(process.env.NEXT_PUBLIC_API_URL);
        let response = await fetch(webUrl + '/api/register', {
          method: 'POST',
          body: JSON.stringify({
            type: "student",
            name: firstname,
            surname: lastName,
            email: email
            // class: class,
            // academic_year: academic_year,
          }),
        })
      }
      submitData();
    }
    else {
      console.log("register teacher");
      const submitData = async () => {
        const webUrl = String(process.env.NEXT_PUBLIC_API_URL);
        let response = await fetch(webUrl + '/api/register', {
          method: 'POST',
          body: JSON.stringify({
            type: "teacher",
            name: firstname,
            surname: lastName,
            email: email
            // class: class,
            // academic_year: academic_year,
          }),
        })
      }
      submitData();
    }
  }
  redirect('/main/home');
}
