import { create } from 'zustand';

export type ShoeDominantColorBrightness = 'light' | 'dark';
export type RemixType = 'originals' | 'collaborations' | 'collectibles';

export interface ShoeLockerStore {
  currentShoeBrightness: ShoeDominantColorBrightness;
  setCurrentShoeBrightness: (color: ShoeDominantColorBrightness) => void;
  isPFPUnityOpen: boolean;
  setPFPUnityOpen: (isOpen: boolean) => void;
}

export const useShoeLockerStore = create<ShoeLockerStore>((set) => ({
  currentShoeBrightness: 'light',
  setCurrentShoeBrightness: (color) =>
    set(() => ({ currentShoeBrightness: color })),
  isPFPUnityOpen: false,
  setPFPUnityOpen: (isOpen) => set(() => ({ isPFPUnityOpen: isOpen })),
}));
