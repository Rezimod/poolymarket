'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ProbabilityBar } from '@/components/markets/ProbabilityBar';
import { CategoryBadge } from '@/components/shared/CategoryBadge';
import { LocaleToggle } from '@/components/shared/LocaleToggle';
import { MOCK_MARKETS } from '@/lib/data/mock';
import { filterSeriousMarkets, getPrimaryFeaturedMarket } from '@/lib/data/market-tiers';
import { formatVolume } from '@/lib/utils/format';
import { useLocale } from '@/lib/hooks/useLocale';
import { cn } from '@/lib/utils/cn';

const seriousMarkets = filterSeriousMarkets(MOCK_MARKETS);
const featured = getPrimaryFeaturedMarket(MOCK_MARKETS);
const previewMarkets = [...seriousMarkets]
  .sort((a, b) => b.total_volume - a.total_volume)
  .slice(0, 6);

export default function LandingPage() {
  const { t, marketTitle, isKa } = useLocale();
  const featuredTitle = marketTitle(featured);

  return (
    <motion.div className="min-h-screen bg-base overflow-hidden">
      <nav className="flex items-center justify-between px-6 py-4 border-b border-white/5 relative z-10">
        <span className="font-sora font-semibold text-base tracking-tight text-white/90">
          Pooly<span className="text-gold">market</span>
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

      <section className="relative px-6 pt-16 pb-12 max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="relative z-10"
        >
          <p
            className={cn(
              'text-[10px] uppercase tracking-[0.25em] text-gold/70 mb-6',
              isKa && 'font-georgian normal-case tracking-normal text-xs'
            )}
          >
            {t('landingBadge')}
          </p>

          <h1
            className={cn(
              'font-sora text-3xl sm:text-4xl md:text-5xl font-medium leading-tight text-white/95 mb-2',
              isKa && 'font-georgian font-normal'
            )}
          >
            {t('landingTitle1')}
          </h1>
          <p
            className={cn(
              'font-sora text-xl sm:text-2xl text-gradient font-medium mb-4',
              isKa && 'font-georgian font-normal'
            )}
          >
            {t('landingTitle2')}
          </p>

          <p className={cn('text-xs text-slate-600 mb-10 tracking-wide', isKa && 'font-georgian')}>
            {t('landingTagline')}
          </p>

          <Link href="/markets">
            <Button size="lg" className={cn('gap-2 px-8', isKa && 'font-georgian')}>
              {t('browseMarkets')} <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="mt-12 max-w-md mx-auto premium-card p-5 text-left relative z-10"
        >
          {featured.category && (
            <div className="mb-3">
              <CategoryBadge category={featured.category} />
            </div>
          )}
          <p
            className={cn(
              'text-sm font-medium text-white/90 line-clamp-2 mb-4 leading-snug',
              isKa && 'font-georgian font-normal'
            )}
          >
            {featuredTitle}
          </p>
          <div className="flex items-end justify-between mb-3">
            <p className="font-sora text-3xl font-semibold text-yes tabular-nums">
              {Math.round(featured.yes_price * 100)}%
            </p>
            <p className="text-[11px] text-slate-600 tabular-nums">{formatVolume(featured.total_volume)}</p>
          </div>
          <ProbabilityBar yesPrice={featured.yes_price} size="sm" showLabels={false} />
        </motion.div>
      </section>

      <section className="px-6 pb-14 relative z-10 max-w-3xl mx-auto">
        <p
          className={cn(
            'text-[10px] uppercase tracking-[0.2em] text-slate-600 mb-4 text-center',
            isKa && 'font-georgian normal-case'
          )}
        >
          {t('sampleMarkets')}
        </p>
        <div className="space-y-2">
          {previewMarkets.map((m, i) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
            >
              <Link
                href={`/markets/${m.id}`}
                className="flex items-center justify-between gap-4 rounded-lg border border-white/5 bg-surface/40 px-4 py-3 hover:border-gold/15 transition-colors"
              >
                <p className={cn('text-sm text-white/90 line-clamp-1 flex-1', isKa && 'font-georgian')}>
                  {marketTitle(m)}
                </p>
                <span className="text-sm font-medium text-yes tabular-nums shrink-0">
                  {Math.round(m.yes_price * 100)}%
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <footer className="px-6 py-6 border-t border-white/5 text-center text-[11px] text-slate-600 relative z-10">
        <p className={isKa ? 'font-georgian' : ''}>{t('footerTagline')}</p>
      </footer>
    </motion.div>
  );
}
