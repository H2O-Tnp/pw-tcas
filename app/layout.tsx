import '#/styles/globals.css';
import { Metadata } from 'next';
import { ubuntu } from '#/ui/fonts';

export const metadata: Metadata = {
  title: {
    default: 'Next.js App Router',
    template: '%s | Next.js App Router',
  },
  metadataBase: new URL('https://app-router.vercel.app'),
  description:
    'A playground to explore new Next.js App Router features such as nested layouts, instant loading states, streaming, and component level data fetching.',
  openGraph: {
    title: 'Next.js App Router Playground',
    description:
      'A playground to explore new Next.js App Router features such as nested layouts, instant loading states, streaming, and component level data fetching.',
    images: [`/api/og?title=Next.js App Router`],
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
      {/* <body className="overflow-y-scroll bg-gray-1100 bg-[url('/grid.svg')] pb-36"></body> */}
      <body
        className={`${ubuntu.className} overflow-y-scroll bg-gray-1100 bg-[url('/grid.svg')] pb-36 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
