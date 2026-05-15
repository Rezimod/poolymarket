'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { MOCK_CATEGORIES } from '@/lib/data/mock';

export default function AdminMarketsPage() {
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const body = {
      title: form.get('title'),
      title_ka: form.get('title_ka'),
      description: form.get('description'),
      resolution_criteria: form.get('resolution_criteria'),
      resolution_source: form.get('resolution_source'),
      end_date: form.get('end_date'),
      yes_price: Number(form.get('yes_price')) / 100,
      no_price: 1 - Number(form.get('yes_price')) / 100,
      liquidity: Number(form.get('liquidity')),
      is_featured: form.get('is_featured') === 'on',
      status: 'open',
    };

    const res = await fetch('/api/markets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      setStatus('Market created!');
      e.currentTarget.reset();
    } else {
      const data = await res.json();
      setStatus(data.error ?? 'Demo mode — connect Supabase to persist');
    }
  };

  return (
    <div>
      <h1 className="font-sora text-2xl font-bold text-white mb-6">Create Market</h1>
      {status && (
        <div className="mb-4 rounded-lg bg-teal/10 border border-teal/30 p-3 text-sm text-teal">
          {status}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4 glass-card p-6">
        <Field label="Title (EN)" name="title" required />
        <Field label="Title (KA)" name="title_ka" />
        <Field label="Description" name="description" textarea required />
        <Field label="Resolution Criteria" name="resolution_criteria" textarea required />
        <Field label="Resolution Source URL" name="resolution_source" />
        <div>
          <label className="text-xs text-slate-500 mb-1.5 block">Category</label>
          <select name="category_id" className="w-full rounded-lg bg-elevated border border-white/10 px-4 py-2.5 text-white">
            {MOCK_CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
        <Field label="End Date" name="end_date" type="datetime-local" required />
        <Field label="Starting YES % (default 50)" name="yes_price" type="number" defaultValue="50" />
        <Field label="Initial Liquidity (₾P)" name="liquidity" type="number" defaultValue="10000" />
        <label className="flex items-center gap-2 text-sm text-slate-300">
          <input type="checkbox" name="is_featured" className="accent-teal" />
          Featured market
        </label>
        <Button type="submit" size="lg">Create Market</Button>
      </form>
    </div>
  );
}

function Field({
  label,
  name,
  type = 'text',
  textarea,
  required,
  defaultValue,
}: {
  label: string;
  name: string;
  type?: string;
  textarea?: boolean;
  required?: boolean;
  defaultValue?: string;
}) {
  const cls =
    'w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2.5 text-white focus:border-teal/50 focus:outline-none';
  return (
    <div>
      <label className="text-xs text-slate-500 mb-1.5 block">{label}</label>
      {textarea ? (
        <textarea name={name} required={required} rows={3} className={cls} />
      ) : (
        <input name={name} type={type} required={required} defaultValue={defaultValue} className={cls} />
      )}
    </div>
  );
}
