import { create } from 'zustand';
import type { Market, Trade } from '@/types';

interface MarketState {
  activeMarket: Market | null;
  recentTrades: Trade[];
  setActiveMarket: (market: Market | null) => void;
  addTrade: (trade: Trade) => void;
  updateMarketPrice: (yesPrice: number) => void;
}

export const useMarketStore = create<MarketState>((set) => ({
  activeMarket: null,
  recentTrades: [],
  setActiveMarket: (market) => set({ activeMarket: market, recentTrades: [] }),
  addTrade: (trade) =>
    set((state) => ({
      recentTrades: [trade, ...state.recentTrades].slice(0, 50),
    })),
  updateMarketPrice: (yesPrice) =>
    set((state) => ({
      activeMarket: state.activeMarket
        ? {
            ...state.activeMarket,
            yes_price: yesPrice,
            no_price: 1 - yesPrice,
          }
        : null,
    })),
}));
