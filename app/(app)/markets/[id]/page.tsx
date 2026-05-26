'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { ChevronDown, ExternalLink } from 'lucide-react';
import { TopBar } from '@/components/layout/TopBar';
import { CategoryBadge } from '@/components/shared/CategoryBadge';
import { CountUp } from '@/components/shared/CountUp';
import { ProbabilityBar } from '@/components/markets/ProbabilityBar';
import { PriceChart } from '@/components/markets/PriceChart';
import { TradePanel } from '@/components/markets/TradePanel';
import { OrderBook, generateMockOrderBook } from '@/components/markets/OrderBook';
import { RecentTrades } from '@/components/markets/RecentTrades';
import { MarketComments } from '@/components/markets/MarketComments';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { MOCK_MARKETS, MOCK_TRADES, getMockPriceHistory, MOCK_COMMENTS } from '@/lib/data/mock';
import { formatVolume, formatDate } from '@/lib/utils/format';
import { useLocale } from '@/lib/hooks/useLocale';
import { useMarketStore } from '@/stores/marketStore';
import type { Market } from '@/types';
import { cn } from '@/lib/utils/cn';

export default function MarketDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { locale, marketTitle, isKa, t } = useLocale();
  const { activeMarket, setActiveMarket, recentTrades, addTrade } = useMarketStore();
  const [criteriaOpen, setCriteriaOpen] = useState(false);
  const [market, setMarket] = useState<Market | null>(null);

  useEffect(() => {
    const m = MOCK_MARKETS.find((mk) => mk.id === id) ?? null;
    setMarket(m);
    if (m) setActiveMarket(m);
  }, [id, setActiveMarket]);

  const priceHistory = getMockPriceHistory(id);
  const trades = recentTrades.length > 0 ? recentTrades : MOCK_TRADES.filter((t) => t.market_id === id);
  const comments = MOCK_COMMENTS.filter((c) => c.market_id === id);
  const orderBook = generateMockOrderBook(market?.yes_price ?? 0.5);

  const displayMarket = activeMarket ?? market;

  if (!displayMarket) {
    return (
      <>
        <TopBar />
        <LoadingSpinner />
      </>
    );
  }

  const title = marketTitle(displayMarket);

  const handleTrade = async () => {
    addTrade({
      id: `t-${Date.now()}`,
      market_id: displayMarket.id,
      buyer_id: 'demo-user',
      seller_id: 'market',
      side: 'yes',
      price: displayMarket.yes_price,
      shares: 10,
      maker_order_id: null,
      taker_order_id: null,
      created_at: new Date().toISOString(),
    });
  };

  return (
    <>
      <TopBar />
      <motion.main
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-1 p-4 lg:p-6"
      >
        <div className="max-w-7xl mx-auto grid lg:grid-cols-5 gap-6">
          {/* Left column */}
          <div className="lg:col-span-3 space-y-4">
            {displayMarket.category && <CategoryBadge category={displayMarket.category} />}
            <h1
              className={cn(
                'font-sora text-2xl md:text-3xl font-bold text-white leading-tight',
                isKa && 'font-georgian'
              )}
            >
              {title}
            </h1>

            <div className="glass-card p-6">
              <div className="flex items-end justify-between mb-4">
                <div>
                  <p className="text-sm text-slate-500 mb-1">{t('chance')}</p>
                  <p className="font-sora text-5xl font-bold text-yes">
                    <CountUp value={displayMarket.yes_price * 100} decimals={0} />
                    <span className="text-2xl ml-1">{t('yesLabel')}</span>
                  </p>
                </div>
                <div className="text-right text-sm text-slate-400 space-y-1">
                  <p>
                    {isKa ? 'მოცულობა' : 'Vol'}: {formatVolume(displayMarket.total_volume)}
                  </p>
                  <p>
                    {isKa ? 'ვადა' : 'Ends'}: {formatDate(displayMarket.end_date, locale)}
                  </p>
                </div>
              </div>
              <ProbabilityBar yesPrice={displayMarket.yes_price} size="lg" />
            </div>

            <PriceChart data={priceHistory} />

            <div className="glass-card overflow-hidden">
              <button
                onClick={() => setCriteriaOpen(!criteriaOpen)}
                className="w-full flex items-center justify-between p-4 text-sm font-medium text-slate-300 hover:bg-white/5"
              >
                Resolution Criteria
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${criteriaOpen ? 'rotate-180' : ''}`}
                />
              </button>
              {criteriaOpen && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  className="px-4 pb-4 text-sm text-slate-400 border-t border-white/5"
                >
                  <p className="pt-3">{displayMarket.resolution_criteria}</p>
                  {displayMarket.resolution_source && (
                    <a
                      href={displayMarket.resolution_source}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 mt-2 text-teal hover:underline"
                    >
                      Source <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </motion.div>
              )}
            </div>

            <RecentTrades trades={trades} />
            <MarketComments comments={comments} marketId={id} />
          </div>

          {/* Right column */}
          <div className="lg:col-span-2 space-y-4">
            <TradePanel market={displayMarket} onTrade={handleTrade} />
            <OrderBook yesBids={orderBook.yesBids} noAsks={orderBook.noAsks} />

            <div className="glass-card p-4 grid grid-cols-2 gap-3 text-sm">
              {[
                { label: 'Volume', value: formatVolume(displayMarket.total_volume) },
                { label: 'Liquidity', value: formatVolume(displayMarket.liquidity) },
                { label: isKa ? 'ვადა' : 'End Date', value: formatDate(displayMarket.end_date, locale) },
                { label: 'Status', value: displayMarket.status },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="text-slate-500 text-xs">{label}</p>
                  <p className="text-white font-medium capitalize">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.main>
    </>
  );
}
