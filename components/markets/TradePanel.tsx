'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import type { Market, OrderSide, OrderType } from '@/types';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Card } from '@/components/ui/Card';
import { sharesFromAmount, estimatedPayout } from '@/lib/utils/probability';
import { formatLariPoints } from '@/lib/utils/format';
import { useUserStore } from '@/stores/userStore';
import { useLocale } from '@/lib/hooks/useLocale';
import { cn } from '@/lib/utils/cn';

interface TradePanelProps {
  market: Market;
  onTrade?: (params: {
    side: OrderSide;
    orderType: OrderType;
    amount: number;
    price: number | null;
  }) => Promise<void>;
}

export function TradePanel({ market, onTrade }: TradePanelProps) {
  const profile = useUserStore((s) => s.profile);
  const updateBalance = useUserStore((s) => s.updateBalance);
  const initDemoUser = useUserStore((s) => s.initDemoUser);
  const { locale, t, isKa } = useLocale();

  const [side, setSide] = useState<OrderSide>('yes');
  const [orderType, setOrderType] = useState<OrderType>('market');
  const [amount, setAmount] = useState('');
  const [limitPrice, setLimitPrice] = useState(50);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const currentPrice = side === 'yes' ? market.yes_price : market.no_price;
  const effectivePrice = orderType === 'limit' ? limitPrice / 100 : currentPrice;
  const numAmount = parseInt(amount) || 0;
  const shares = sharesFromAmount(numAmount, effectivePrice);
  const payout = estimatedPayout(shares, effectivePrice);

  const handleSubmit = async () => {
    if (!profile) {
      initDemoUser();
      return;
    }
    setLoading(true);
    try {
      await onTrade?.({
        side,
        orderType,
        amount: numAmount,
        price: orderType === 'limit' ? limitPrice / 100 : null,
      });
      updateBalance(-numAmount);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setConfirmOpen(false);
        setAmount('');
      }, 2000);
    } finally {
      setLoading(false);
    }
  };

  const sideLabel = (s: OrderSide) => (s === 'yes' ? t('yesLabel') : t('noLabel'));

  return (
    <Card className="sticky top-4">
      <div className="flex rounded-lg bg-white/5 p-1 mb-4">
        {(['yes', 'no'] as OrderSide[]).map((s) => (
          <button
            key={s}
            onClick={() => setSide(s)}
            className={cn(
              'flex-1 rounded-md py-2 text-sm font-semibold transition-all',
              isKa && 'font-georgian',
              side === s
                ? s === 'yes'
                  ? 'bg-yes text-white'
                  : 'bg-no text-white'
                : 'text-slate-400 hover:text-white'
            )}
          >
            {s === 'yes' ? t('buyYes') : t('buyNo')}
          </button>
        ))}
      </div>

      <div className="flex gap-2 mb-4">
        {(['market', 'limit'] as OrderType[]).map((ot) => (
          <button
            key={ot}
            onClick={() => setOrderType(ot)}
            className={cn(
              'flex-1 rounded-md py-1.5 text-xs font-medium transition-colors',
              isKa && 'font-georgian',
              orderType === ot ? 'bg-teal/20 text-teal' : 'text-slate-500 hover:text-white'
            )}
          >
            {ot === 'market' ? t('marketOrder') : t('limitOrder')}
          </button>
        ))}
      </div>

      {orderType === 'limit' && (
        <div className="mb-4">
          <label className={cn('text-xs text-slate-500 mb-2 block', isKa && 'font-georgian')}>
            {t('limitPrice')}: {limitPrice}%
          </label>
          <input
            type="range"
            min={1}
            max={99}
            value={limitPrice}
            onChange={(e) => setLimitPrice(Number(e.target.value))}
            className="w-full accent-teal"
          />
        </div>
      )}

      <div className="mb-4">
        <label className={cn('text-xs text-slate-500 mb-1.5 block', isKa && 'font-georgian')}>
          {t('amount')}
        </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0"
          className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-lg font-semibold text-white placeholder:text-slate-600 focus:border-teal/50 focus:outline-none focus:ring-1 focus:ring-teal/30"
        />
        {profile && (
          <p className={cn('text-xs text-slate-500 mt-1', isKa && 'font-georgian')}>
            {t('balance')}: {formatLariPoints(profile.lari_points, locale)}
          </p>
        )}
      </div>

      {numAmount > 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mb-4 rounded-lg bg-white/5 p-3 text-sm space-y-1"
        >
          <div className="flex justify-between text-slate-400">
            <span className={isKa ? 'font-georgian' : ''}>{t('shares')}</span>
            <span className="text-white font-medium">{shares}</span>
          </div>
          <div className="flex justify-between text-slate-400">
            <span className={isKa ? 'font-georgian' : ''}>{t('price')}</span>
            <span className="text-white font-medium">{(effectivePrice * 100).toFixed(1)}%</span>
          </div>
          <div className="flex justify-between text-slate-400">
            <span className={isKa ? 'font-georgian' : ''}>{t('ifCorrectWins')}</span>
            <span className="text-teal font-semibold">{formatLariPoints(payout, locale)}</span>
          </div>
        </motion.div>
      )}

      <Button
        variant={side === 'yes' ? 'yes' : 'no'}
        size="lg"
        className={cn('w-full', isKa && 'font-georgian')}
        disabled={!numAmount}
        onClick={() => (profile ? setConfirmOpen(true) : initDemoUser())}
      >
        {profile
          ? `${side === 'yes' ? t('buyYes') : t('buyNo')}`
          : t('signInToTrade')}
      </Button>

      <Modal
        open={confirmOpen}
        onClose={() => !loading && setConfirmOpen(false)}
        title={t('confirmOrder')}
      >
        <div className="space-y-4">
          <p className={cn('text-slate-400 text-sm', isKa && 'font-georgian')}>
            {isKa ? (
              <>
                <span className="text-white font-semibold">{shares}</span> {sideLabel(side)}{' '}
                აქციის ყიდვა{' '}
                <span className="text-white font-semibold">{formatLariPoints(numAmount, locale)}</span>
                -ად
              </>
            ) : (
              <>
                Buy <span className="text-white font-semibold">{shares}</span>{' '}
                {side.toUpperCase()} shares for{' '}
                <span className="text-white font-semibold">{formatLariPoints(numAmount, locale)}</span>
              </>
            )}
          </p>
          <Button
            variant={side === 'yes' ? 'yes' : 'no'}
            size="lg"
            className="w-full"
            loading={loading}
            onClick={handleSubmit}
          >
            <AnimatePresence mode="wait">
              {success ? (
                <motion.span
                  key="success"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex items-center gap-2"
                >
                  <Check className="h-5 w-5" /> {t('orderPlaced')}
                </motion.span>
              ) : (
                <motion.span key="confirm">{t('confirmOrder')}</motion.span>
              )}
            </AnimatePresence>
          </Button>
        </div>
      </Modal>
    </Card>
  );
}
