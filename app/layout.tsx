import type { Metadata } from 'next';
import { Sora, Inter, Noto_Sans_Georgian } from 'next/font/google';
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

const notoGeorgian = Noto_Sans_Georgian({
  subsets: ['georgian'],
  variable: '--font-noto-georgian',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Poolymarket — Georgia\'s Prediction Market',
  description:
    'Predict Georgian politics, sports, memes, and wild hypotheticals. Play-money with LARI Points.',
  keywords: ['prediction market', 'Georgia', 'Poolymarket', 'პროგნოზი'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sora.variable} ${inter.variable} ${notoGeorgian.variable}`}>
      <body className="font-inter antialiased bg-base text-slate-100 relative">
        <Providers>
          <div className="relative z-10">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
