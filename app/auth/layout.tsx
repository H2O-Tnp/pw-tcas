import '#/styles/globals.css';
import { AddressBar } from '#/ui/address-bar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // translate-y-1/2
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-4xl flex-col justify-center space-y-8 p-10 lg:w-2/5">
      <div className="w-full rounded-lg bg-vc-border-gradient p-px shadow-lg shadow-black/20">
        <div className="rounded-lg bg-black">
          <AddressBar />
        </div>
      </div>

      <div className="w-full rounded-lg bg-vc-border-gradient p-px shadow-lg shadow-black/20">
        <div
          className="items-center rounded-lg bg-black p-3.5 sm:items-start lg:p-6
                              
              "
        >
          {children}
        </div>
      </div>
      {/* <Byline /> */}
    </div>
  );
}
