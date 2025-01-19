import { db } from "#/lib/db";
import { auth } from '#/auth';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const email = session?.user?.email!;
  const existingUserByEmail = await db.student.findUnique({
    where: { email: email }
  });

  if (existingUserByEmail) {
    return (
      <div className="">
        {children}
      </div>
    )
  }

  return ( // warning with red
    <div className="text-red-400">
      <p>สามารถบันทึกข้อมูลได้เฉพาะนักเรียนชั้นม.6 ในปีการศึกษานี้เท่านั้น</p>
    </div>
  );
}
