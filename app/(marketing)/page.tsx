'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, Shield, Gift } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ProbabilityBar } from '@/components/markets/ProbabilityBar';
import { LocaleToggle } from '@/components/shared/LocaleToggle';
import { MOCK_MARKETS } from '@/lib/data/mock';
import { formatVolume } from '@/lib/utils/format';
import { useLocale } from '@/lib/hooks/useLocale';
import { cn } from '@/lib/utils/cn';

const featured = MOCK_MARKETS.find((m) => m.id === 'm11') ?? MOCK_MARKETS[0];
const previewMarkets = [...MOCK_MARKETS]
  .sort((a, b) => b.total_volume - a.total_volume)
  .slice(0, 6);

export default function LandingPage() {
  const { t, marketTitle, isKa } = useLocale();
  const featuredTitle = marketTitle(featured);

  return (
    <motion.div className="min-h-screen bg-base overflow-hidden">
      <nav className="flex items-center justify-between px-5 py-3 border-b border-gold/10 relative z-10">
        <span className="font-sora font-bold text-lg">
          🇬🇪 Pooly<span className="text-gold">market</span>
        </span>
        <div className="flex items-center gap-2">
          <LocaleToggle />
          <Link href="/markets">
            <Button size="sm" className={isKa ? 'font-georgian' : ''}>
              {t('browseMarkets')}
            </Button>
          </Link>
        </div>
      </nav>

      <section className="relative px-5 pt-12 pb-10 max-w-3xl mx-auto text-center">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-wine/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-gold/8 rounded-full blur-3xl" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative z-10"
        >
          <p
            className={cn(
              'text-xs font-medium uppercase tracking-widest text-gold/90 mb-5',
              isKa && 'font-georgian normal-case tracking-normal'
            )}
          >
            {MOCK_MARKETS.length} {t('landingBadge')}
          </p>

          <h1
            className={cn(
              'font-sora text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.1] mb-3',
              isKa && 'font-georgian'
            )}
          >
            {t('landingTitle1')}
            <br />
            <span className="text-gradient">{t('landingTitle2')}</span>
          </h1>

          <p className={cn('text-sm text-slate-500 mb-8', isKa && 'font-georgian')}>
            {t('landingTagline')}
          </p>

          <Link href="/markets">
            <Button size="lg" className={cn('gap-2 px-8', isKa && 'font-georgian')}>
              {t('browseMarkets')} <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="mt-10 max-w-md mx-auto glass-card p-4 text-left border-wine/20 relative z-10"
        >
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="min-w-0 flex-1">
              <p className="text-lg leading-none mb-2">{featured.image_url}</p>
              <p
                className={cn(
                  'text-sm font-semibold text-white line-clamp-2',
                  isKa && 'font-georgian'
                )}
              >
                {featuredTitle}
              </p>
            </div>
            <p className="font-sora text-2xl font-bold text-yes shrink-0">
              {Math.round(featured.yes_price * 100)}%
            </p>
          </div>
          <ProbabilityBar yesPrice={featured.yes_price} size="sm" showLabels={false} />
        </motion.div>

        <div className="mt-8 flex flex-wrap justify-center gap-2 relative z-10">
          {[
            { icon: TrendingUp, key: 'featureMechanics' as const },
            { icon: Shield, key: 'featureSoul' as const },
            { icon: Gift, key: 'featureRewards' as const },
          ].map(({ icon: Icon, key }) => (
            <span
              key={key}
              className={cn(
                'inline-flex items-center gap-1.5 rounded-full border border-gold/15 bg-white/5 px-3 py-1.5 text-xs text-slate-400',
                isKa && 'font-georgian'
              )}
            >
              <Icon className="h-3.5 w-3.5 text-gold" />
              {t(key)}
            </span>
          ))}
        </div>
      </section>

      <section className="px-5 pb-12 relative z-10">
        <div className="max-w-5xl mx-auto">
          <p
            className={cn(
              'text-xs uppercase tracking-wider text-slate-600 mb-4 text-center',
              isKa && 'font-georgian normal-case'
            )}
          >
            {t('sampleMarkets')}
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {previewMarkets.map((m, i) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
              >
                <Link
                  href={`/markets/${m.id}`}
                  className="flex items-center gap-3 rounded-xl border border-gold/10 bg-elevated/50 px-3 py-2.5 hover:border-wine/30 transition-colors"
                >
                  <span className="text-xl shrink-0">{m.image_url}</span>
                  <div className="min-w-0 flex-1">
                    <p
                      className={cn(
                        'text-sm text-white line-clamp-1',
                        isKa && 'font-georgian'
                      )}
                    >
                      {marketTitle(m)}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      <span className="text-yes font-semibold">
                        {Math.round(m.yes_price * 100)}%
                      </span>
                      {' · '}
                      {formatVolume(m.total_volume)}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <footer className="px-5 py-5 border-t border-gold/10 text-center text-xs text-slate-600 relative z-10">
        <p className={isKa ? 'font-georgian' : ''}>{t('footerTagline')}</p>
      </footer>
    </motion.div>
  );
}
