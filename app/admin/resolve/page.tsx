'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { MOCK_MARKETS } from '@/lib/data/mock';

export default function AdminResolvePage() {
  const [selected, setSelected] = useState('');
  const [outcome, setOutcome] = useState<'yes' | 'no' | 'cancel'>('yes');
  const [status, setStatus] = useState('');
  const [preview, setPreview] = useState('');

  const openMarkets = MOCK_MARKETS.filter((m) => m.status === 'open');

  const handlePreview = () => {
    const market = openMarkets.find((m) => m.id === selected);
    if (!market) return;
    setPreview(
      `Resolving "${market.title}" as ${outcome.toUpperCase()}. Winning YES holders receive shares × 100 ₾P.`
    );
  };

  const handleResolve = async () => {
    const res = await fetch('/api/resolve', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-key': process.env.NEXT_PUBLIC_ADMIN_KEY ?? 'demo',
      },
      body: JSON.stringify({ marketId: selected, outcome }),
    });
    const data = await res.json();
    setStatus(data.success ? `Resolved as ${outcome}` : data.error ?? 'Set ADMIN_SECRET_KEY in .env');
  };

  return (
    <div>
      <h1 className="font-sora text-2xl font-bold text-white mb-6">Resolve Markets</h1>
      <div className="glass-card p-6 space-y-4">
        <div>
          <label className="text-xs text-slate-500 mb-1.5 block">Select Market</label>
          <select
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            className="w-full rounded-lg bg-elevated border border-white/10 px-4 py-2.5 text-white"
          >
            <option value="">Choose market...</option>
            {openMarkets.map((m) => (
              <option key={m.id} value={m.id}>{m.title}</option>
            ))}
          </select>
        </div>

        <div className="flex gap-2">
          {(['yes', 'no', 'cancel'] as const).map((o) => (
            <button
              key={o}
              type="button"
              onClick={() => setOutcome(o)}
              className={`flex-1 rounded-lg py-2 text-sm font-semibold capitalize transition-colors ${
                outcome === o
                  ? o === 'yes'
                    ? 'bg-yes text-white'
                    : o === 'no'
                    ? 'bg-no text-white'
                    : 'bg-amber/20 text-amber'
                  : 'bg-white/5 text-slate-400'
              }`}
            >
              {o}
            </button>
          ))}
        </div>

        {preview && (
          <div className="rounded-lg bg-white/5 p-3 text-sm text-slate-300">{preview}</div>
        )}

        <div className="flex gap-3">
          <Button variant="secondary" onClick={handlePreview} disabled={!selected}>
            Preview Payout
          </Button>
          <Button
            variant={outcome === 'cancel' ? 'danger' : outcome === 'yes' ? 'yes' : 'no'}
            onClick={handleResolve}
            disabled={!selected}
          >
            Confirm Resolution
          </Button>
        </div>

        {status && <p className="text-teal text-sm">{status}</p>}
      </div>
    </div>
  );
}
