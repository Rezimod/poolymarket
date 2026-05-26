'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, Shield, Gift, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ProbabilityBar } from '@/components/markets/ProbabilityBar';
import { MOCK_MARKETS } from '@/lib/data/mock';
import { formatVolume } from '@/lib/utils/format';

const featured = MOCK_MARKETS.find((m) => m.id === 'm11') ?? MOCK_MARKETS[0];
const previewMarkets = [...MOCK_MARKETS]
  .sort((a, b) => b.total_volume - a.total_volume)
  .slice(0, 6);

export default function LandingPage() {
  return (
    <motion.div className="min-h-screen bg-base overflow-hidden">
      <nav className="flex items-center justify-between px-6 py-4 border-b border-gold/10 relative z-10">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-wine/20 text-xl border border-wine/30">
            🇬🇪
          </span>
          <span className="font-sora font-bold text-xl">
            Pooly<span className="text-gold">market</span>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/markets" className="text-sm text-slate-400 hover:text-gold transition-colors">
            Markets
          </Link>
          <Link href="/markets">
            <Button size="sm">Start Predicting</Button>
          </Link>
        </div>
      </nav>

      <section className="relative px-6 pt-16 pb-24 max-w-6xl mx-auto text-center">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-wine/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold/8 rounded-full blur-3xl" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-sm text-gold mb-8">
            <Sparkles className="h-4 w-4" />
            <span>{MOCK_MARKETS.length} markets · Play-money · Georgian culture</span>
          </div>

          <h1 className="font-sora text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
            Predict Georgia.
            <br />
            <span className="text-gradient">From politics to marshrutka AC.</span>
          </h1>

          <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-10">
            Binary YES/NO markets on everything Georgian — serious elections, wild hypotheticals,
            and supra logic. LARI Points only. Not Polymarket. Better jokes.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/markets">
              <Button size="lg" className="gap-2">
                Browse {MOCK_MARKETS.length} Markets <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/leaderboard">
              <Button variant="secondary" size="lg">
                Leaderboard
              </Button>
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-14 max-w-lg mx-auto glass-card p-6 text-left border-wine/20 relative z-10"
        >
          <p className="text-xs text-wine font-bold uppercase tracking-wider mb-2">
            🔥 {featured.image_url} Trending
          </p>
          <h3 className="font-sora font-semibold text-white mb-4 line-clamp-2">{featured.title}</h3>
          <div className="flex items-end justify-between mb-3">
            <div>
              <p className="text-3xl font-sora font-bold text-yes">
                {Math.round(featured.yes_price * 100)}%
              </p>
              <p className="text-xs text-slate-500">YES chance</p>
            </div>
            <Link href={`/markets/${featured.id}`}>
              <Button size="sm" variant="secondary">Trade</Button>
            </Link>
          </div>
          <ProbabilityBar yesPrice={featured.yes_price} size="lg" />
        </motion.div>
      </section>

      <section className="px-6 py-12 border-t border-gold/10 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-sora text-2xl font-bold text-white mb-6 text-center">
            Sample markets
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {previewMarkets.map((m, i) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  href={`/markets/${m.id}`}
                  className="block rounded-xl border border-gold/10 bg-elevated/60 p-4 hover:border-wine/30 transition-colors h-full"
                >
                  <span className="text-2xl">{m.image_url}</span>
                  <p className="font-medium text-white text-sm mt-2 line-clamp-2">{m.title}</p>
                  <div className="flex justify-between mt-3 text-xs">
                    <span className="text-yes font-bold">{Math.round(m.yes_price * 100)}% YES</span>
                    <span className="text-slate-500">{formatVolume(m.total_volume)}</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 border-t border-gold/10 bg-surface/40 relative z-10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            {
              icon: TrendingUp,
              title: 'Polymarket mechanics',
              desc: 'YES/NO shares, live odds, order book, charts — the model you know.',
            },
            {
              icon: Shield,
              title: 'Georgian soul',
              desc: 'Wine-red UI, 45 local markets, ქართული copy. Zero Silicon Valley clone energy.',
            },
            {
              icon: Gift,
              title: 'Win real rewards',
              desc: 'Top predictors earn Astroman vouchers and leaderboard glory.',
            },
          ].map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-6"
            >
              <div className="h-10 w-10 rounded-lg bg-wine/15 flex items-center justify-center mb-4">
                <Icon className="h-5 w-5 text-gold" />
              </div>
              <h3 className="font-sora font-semibold text-white mb-2">{title}</h3>
              <p className="text-sm text-slate-400">{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <footer className="px-6 py-8 border-t border-gold/10 text-center text-sm text-slate-500 relative z-10">
        <p>Poolymarket.ge — Built for Georgia 🇬🇪 · Play-money only</p>
        <p className="mt-1">
          Partner · <span className="text-gold">Astroman.ge</span>
        </p>
      </footer>
    </motion.div>
  );
}
