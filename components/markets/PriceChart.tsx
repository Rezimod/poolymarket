'use client';

import { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import type { PriceHistoryPoint } from '@/types';
import { cn } from '@/lib/utils/cn';

type Timeframe = '1H' | '1D' | '1W' | 'ALL';

interface PriceChartProps {
  data: PriceHistoryPoint[];
}

export function PriceChart({ data }: PriceChartProps) {
  const [timeframe, setTimeframe] = useState<Timeframe>('ALL');

  const filtered = (() => {
    const now = Date.now();
    const limits: Record<Timeframe, number> = {
      '1H': 3600000,
      '1D': 86400000,
      '1W': 604800000,
      ALL: Infinity,
    };
    return data.filter(
      (d) => now - new Date(d.recorded_at).getTime() <= limits[timeframe]
    );
  })();

  const chartData = filtered.map((d) => ({
    time: new Date(d.recorded_at).toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit' }),
    price: +(d.yes_price * 100).toFixed(1),
    volume: d.volume,
  }));

  return (
    <div className="glass-card p-4">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-sora text-sm font-semibold text-slate-300">Price History</h3>
        <div className="flex gap-1">
          {(['1H', '1D', '1W', 'ALL'] as Timeframe[]).map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={cn(
                'rounded-md px-2.5 py-1 text-xs font-medium transition-colors',
                timeframe === tf
                  ? 'bg-teal/20 text-teal'
                  : 'text-slate-500 hover:text-white'
              )}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="yesGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="time" tick={{ fill: '#475569', fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis
            domain={[0, 100]}
            tick={{ fill: '#475569', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `${v}%`}
          />
          <Tooltip
            contentStyle={{
              background: '#1A2234',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '8px',
              color: '#F8FAFC',
            }}
            formatter={(value) => [`${value}%`, 'YES']}
          />
          <Area
            type="monotone"
            dataKey="price"
            stroke="#10B981"
            strokeWidth={2}
            fill="url(#yesGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
