import '#/styles/globals.css';
import { AddressBar } from '#/ui/address-bar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="max-w-4xl space-y-8 p-10 lg:w-2/5">
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
