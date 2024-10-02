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
  title: 'Lembranças de 6 meses',
  description:
    'Um slide de fotos com um player mostrando um pouco dos nossos 6 meses',
  icons: {
    icon: '/favicon.svg'
  }
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
