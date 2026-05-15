import type { Metadata } from 'next';
import { Sora, Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Poolymarket — Georgia\'s Prediction Market',
  description:
    'Predict outcomes of Georgian politics, sports, economy and more. Play-money platform with LARI Points.',
  keywords: ['prediction market', 'Georgia', 'Polymarket', 'Poolymarket'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sora.variable} ${inter.variable}`}>
      <body className="font-inter antialiased bg-base text-slate-100">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
