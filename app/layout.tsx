import '#/styles/globals.css';
import { Metadata } from 'next';
import { noto } from '#/ui/fonts';

export const metadata: Metadata = {
  title: {
    default: 'PW TCAS',
    template: '%s | PW TCAS',
  },
  metadataBase: new URL('https://pw-tcas.vercel.app'),
  description:
    '...',
  openGraph: {
    title: 'เก็บข้อมูล TCAS ประจวบวิทยาลัย',
    description:
      '...',
    // images: [`/public/PW-TCAS.png`],
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="[color-scheme:dark]">
      {/* <body className={` bg-gray-1100 bg-[url('/grid.svg')] antialiased overflow-hidden`}> */}
      <body className={` bg-gray-1000 bg-[url('/grid.svg')] antialiased overflow-y-auto`}>
        {/* <div className={ubuntu.className}> */}
        <div className={noto.className}>
          {children}
        </div>
      </body>
    </html>
  );
}

