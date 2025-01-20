import '#/styles/globals.css';
import { AddressBar } from '#/ui/address-bar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="min-w-96 space-y-8 p-10 w-3/5 lg:w-1/2">
        <div className="rounded-lg bg-vc-border-gradient p-px shadow-lg shadow-black/20">
          <div className="rounded-lg bg-black">
            <AddressBar />
          </div>
        </div>

        <div className="rounded-lg bg-vc-border-gradient p-px shadow-lg shadow-black/20">
          <div className="items-center rounded-lg bg-black p-3.5 sm:items-start lg:p-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
