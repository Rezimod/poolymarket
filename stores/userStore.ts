import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Profile } from '@/types';
import { MOCK_USER } from '@/lib/data/mock';

interface UserState {
  profile: Profile | null;
  /** UI is English-only; Georgian market titles use NPLG lexicon when exposed via API */
  locale: 'en';
  setProfile: (profile: Profile | null) => void;
  updateBalance: (amount: number) => void;
  initDemoUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      profile: null,
      locale: 'en',
      setProfile: (profile) => set({ profile }),
      updateBalance: (amount) =>
        set((state) => ({
          profile: state.profile
            ? { ...state.profile, lari_points: state.profile.lari_points + amount }
            : null,
        })),
      initDemoUser: () => set({ profile: MOCK_USER }),
    }),
    {
      name: 'poolymarket-user',
      partialize: (state) => ({ profile: state.profile }),
    }
  )
);
