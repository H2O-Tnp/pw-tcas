import '#/styles/globals.css';
import { AddressBar } from '#/ui/address-bar';
import { GlobalNav } from '#/ui/global-nav';

import { auth } from '#/auth';
import { db } from "#/lib/db";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const email = session?.user?.email!;
  const isTeacher = await db.teacher.findUnique({
    where: { email: email }
  });

  return (
    <div className='overflow-y-scroll'>
      <GlobalNav session={session} isTeacher={isTeacher} />
      <div className="lg:pl-72">
        <div className="mx-auto max-w-4xl space-y-8 px-2 pt-20 lg:px-8 lg:py-8">
          <div className="rounded-lg bg-vc-border-gradient p-px shadow-lg shadow-black/20">
            <div className="rounded-lg bg-black">
              <AddressBar />
            </div>
          </div>
          <div className="rounded-lg bg-vc-border-gradient p-px shadow-lg shadow-black/20">
            <div className="rounded-lg bg-black p-3.5 lg:p-6">{children}</div>
          </div>
          {/* <Byline /> */}
        </div>
      </div>
    </div>
  );
}
