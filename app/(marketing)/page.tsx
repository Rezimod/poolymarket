'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, Shield, Gift } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ProbabilityBar } from '@/components/markets/ProbabilityBar';
import { MOCK_MARKETS } from '@/lib/data/mock';

const featured = MOCK_MARKETS.find((m) => m.is_featured) ?? MOCK_MARKETS[0];

export default function LandingPage() {
  return (
    <motion.div className="min-h-screen bg-base overflow-hidden">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-white/8">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🇬🇪</span>
          <span className="font-sora font-bold text-xl">
            Pooly<span className="text-teal">market</span>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/markets" className="text-sm text-slate-400 hover:text-white transition-colors">
            Markets
          </Link>
          <Link href="/markets">
            <Button size="sm">Start Predicting</Button>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative px-6 pt-20 pb-32 max-w-6xl mx-auto text-center">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber/5 rounded-full blur-3xl" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-teal/30 bg-teal/10 px-4 py-1.5 text-sm text-teal mb-8">
            <span>🇬🇪</span>
            <span>Georgia&apos;s First Prediction Market</span>
          </div>

          <h1 className="font-sora text-5xl md:text-7xl font-bold leading-tight mb-6">
            Predict the Future of{' '}
            <span className="text-gradient">Georgia</span>
          </h1>

          <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-10">
            Trade YES/NO shares on politics, sports, economy and culture.
            Play-money with LARI Points — win Astroman vouchers and leaderboard glory.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/markets">
              <Button size="lg" className="gap-2">
                Start Trading Free <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/leaderboard">
              <Button variant="secondary" size="lg">
                View Leaderboard
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Featured market preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-16 max-w-lg mx-auto glass-card p-6 text-left"
        >
          <p className="text-xs text-teal font-medium mb-2">🔥 FEATURED MARKET</p>
          <h3 className="font-sora font-semibold text-white mb-4 line-clamp-2">{featured.title}</h3>
          <div className="flex items-end justify-between mb-3">
            <div>
              <p className="text-3xl font-sora font-bold text-yes">
                {Math.round(featured.yes_price * 100)}%
              </p>
              <p className="text-xs text-slate-500">YES probability</p>
            </div>
            <Link href={`/markets/${featured.id}`}>
              <Button size="sm" variant="secondary">Trade Now</Button>
            </Link>
          </div>
          <ProbabilityBar yesPrice={featured.yes_price} size="lg" />
        </motion.div>
      </section>

      {/* Features */}
      <section className="px-6 py-20 border-t border-white/8 bg-surface/30">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            {
              icon: TrendingUp,
              title: 'Real Georgian Events',
              desc: 'Politics, sports, economy, culture — markets that matter to Georgia.',
            },
            {
              icon: Shield,
              title: 'Play Money, Real Fun',
              desc: 'LARI Points only. No gambling license needed. Learn prediction markets risk-free.',
            },
            {
              icon: Gift,
              title: 'Win Real Rewards',
              desc: 'Top predictors earn Astroman store vouchers and leaderboard recognition.',
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
              <div className="h-10 w-10 rounded-lg bg-teal/15 flex items-center justify-center mb-4">
                <Icon className="h-5 w-5 text-teal" />
              </div>
              <h3 className="font-sora font-semibold text-white mb-2">{title}</h3>
              <p className="text-sm text-slate-400">{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-white/8 text-center text-sm text-slate-500">
        <p>Poolymarket.ge — Built for Georgia 🇬🇪 · Play-money only · Not financial advice</p>
        <p className="mt-1">Partnership with <span className="text-teal">Astroman.ge</span></p>
      </footer>
    </motion.div>
  );
}
