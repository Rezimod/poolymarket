import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Profile } from '@/types';
import type { Locale } from '@/lib/i18n/messages';
import { MOCK_USER } from '@/lib/data/mock';

interface UserState {
  profile: Profile | null;
  locale: Locale;
  setProfile: (profile: Profile | null) => void;
  updateBalance: (amount: number) => void;
  setLocale: (locale: Locale) => void;
  initDemoUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      profile: null,
      locale: 'ka',
      setProfile: (profile) => set({ profile }),
      updateBalance: (amount) =>
        set((state) => ({
          profile: state.profile
            ? { ...state.profile, lari_points: state.profile.lari_points + amount }
            : null,
        })),
      setLocale: (locale) => set({ locale }),
      initDemoUser: () => set({ profile: MOCK_USER }),
    }),
    {
      name: 'poolymarket-user',
      partialize: (state) => ({ profile: state.profile, locale: state.locale }),
    }
  )
);
