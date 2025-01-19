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
  // console.log(firstname);
  // console.log(lastName);

  const existingUserByEmail = await db.student.findUnique({
    where: { email: email }
  });

  if (existingUserByEmail) {
    console.log("user already in db");
  }
  else {
    console.log("create new user in db");
    const user_id = email?.slice(0, 5);
    const isNumeric = (string: any) => /^[+-]?\d+(\.\d+)?$/.test(string)
    // console.log(isNumeric(user_id));
    if (isNumeric(user_id)) {
      console.log("register student");
      const submitData = async () => {
        // let response = await fetch('http://localhost:3000/api/register', {
        let response = await fetch('https://pw-tcas.vercel.app/api/register', {
          method: 'POST',
          body: JSON.stringify({
            name: firstname,
            surname: lastName,
            email: email
            // class: class,
            // academic_year: academic_year,
          }),
          // headers: {
          //   'Content-type': 'application/json'
          // }
        })

        // response = await response.json()

        // alert(JSON.stringify(response))
      }
      submitData();
    }
    else {
      console.log("teacher");

    }
  }
  redirect('/student/home');
}
