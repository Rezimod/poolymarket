'use client';

import { useQuery } from '@tanstack/react-query';
import type { Market } from '@/types';

export function useMarket(id: string) {
  return useQuery<Market | null>({
    queryKey: ['market', id],
    queryFn: async () => {
      const res = await fetch(`/api/markets?q=`);
      const markets: Market[] = await res.json();
      return markets.find((m) => m.id === id) ?? null;
    },
    enabled: Boolean(id),
  });
}
