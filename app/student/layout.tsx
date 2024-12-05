import '#/styles/globals.css';
import { AddressBar } from '#/ui/address-bar';
import Byline from '#/ui/byline';
import { GlobalNav } from '#/ui/global-nav';

import { auth } from '#/auth';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <>
      <GlobalNav session={session} />
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
    </>
  );
}
