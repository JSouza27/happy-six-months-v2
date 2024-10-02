import '@/styles/globals.css';

import type { Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';
import { Inconsolata, Patrick_Hand } from 'next/font/google';

const inconsolata = Inconsolata({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '600'],
  variable: '--font-inconsolata'
});

const patrickHand = Patrick_Hand({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400'],
  variable: '--font-patrick-hand'
});

export const metadata: Metadata = {
  title: 'Boilerplate NextJS',
  description: 'Boilerplate usando React, Typescript, Tailwind e NextJS'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <html
        lang="en"
        className={`${inconsolata.variable} ${patrickHand.variable}`}
      >
        <body>{children}</body>
      </html>
    </SessionProvider>
  );
}
