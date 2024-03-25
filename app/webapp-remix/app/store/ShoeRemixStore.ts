import {
  RemixItem,
  ShoeModel,
  UVValues,
  defaultUVValues,
} from '@reebok/backend-libs';
import { create } from 'zustand';
import { RgbColor } from 'react-colorful';

export type LastUserAction = 'AIArt' | 'Color' | 'Placement';

interface EditStateStore {
  showEditState: boolean;
  toggleEditStateShow: () => void;
  originalRemix: RemixItem | null;
  setOriginalRemix: (userRemix: RemixItem) => void;
  lastGeneratedPhantomRemix: Partial<RemixItem> | null;
  setLastGeneratedPhantomRemix: (phantomRemix: Partial<RemixItem>) => void;
  lastUserCustomizationAction: LastUserAction | null;
  setLastUserCustomizationAction: (lastUserAction: LastUserAction) => void;
  selectedShoe: ShoeModel;
  setSelectedShoe: (shoeModel: ShoeModel) => void;
  currentPhantomRemix: Partial<RemixItem> | null;
  setCurrentPhantomRemix: (phantomRemix: Partial<RemixItem>) => void;
}

export const useEditStateStore = create<EditStateStore>((set) => ({
  showEditState: false,
  toggleEditStateShow: () =>
    set((state) => ({ showEditState: !state.showEditState })),
  originalRemix: null,
  setOriginalRemix: (userRemix) => set(() => ({ originalRemix: userRemix })),
  lastGeneratedPhantomRemix: null,
  setLastGeneratedPhantomRemix: (newRemix) =>
    set(() => ({
      lastGeneratedPhantomRemix: newRemix,
    })),
  lastUserCustomizationAction: null,
  setLastUserCustomizationAction: (lastUserAction) =>
    set(() => ({
      lastUserCustomizationAction: lastUserAction,
    })),
  selectedShoe: 'ThePump',
  setSelectedShoe: (shoeModel) => set(() => ({ selectedShoe: shoeModel })),
  currentPhantomRemix: null,
  setCurrentPhantomRemix: (newRemix) =>
    set(() => ({
      currentPhantomRemix: newRemix,
    })),
}));

type Prompt = {
  promptName: string;
  promptId: string;
};
interface AIArtStateStore {
  savedPrompt: Prompt;
  replaceSavedPrompt: (newPrompt: Prompt) => void;
  currentPrompt: Prompt;
  replacePrompt: (newPrompt: Prompt) => void;
  isAIArtUnsaved: boolean;
  setAIArtUnsavedChanges: (hasAIArtUnsavedChanges: boolean) => void;
  isAIArtGenerating: boolean;
  setAIArtGenerating: (isAIArtGenerating: boolean) => void;
}

export const useAIArtStateStore = create<AIArtStateStore>((set) => ({
  savedPrompt: { promptName: '', promptId: '' },
  replaceSavedPrompt: (newPrompt) =>
    set(() => ({
      savedPrompt: newPrompt,
    })),
  currentPrompt: { promptName: '', promptId: '' },
  replacePrompt: (newPrompt) =>
    set(() => ({
      currentPrompt: newPrompt,
    })),
  isAIArtUnsaved: false,
  setAIArtUnsavedChanges: (hasAIArtUnsavedChanges) =>
    set(() => ({
      isAIArtUnsaved: hasAIArtUnsavedChanges,
    })),
  isAIArtGenerating: false,
  setAIArtGenerating: (isAIArtGenerating) =>
    set(() => ({
      isAIArtGenerating: isAIArtGenerating,
    })),
}));

interface ColorStateStore {
  dominantColor1: RgbColor | null;
  dominantColor2: RgbColor | null;
  setDominantColor1: (newColor: RgbColor) => void;
  setDominantColor2: (newColor: RgbColor) => void;
}

export const useColorStateStore = create<ColorStateStore>((set) => ({
  dominantColor1: null,
  dominantColor2: null,
  setDominantColor1: (newColor: RgbColor) =>
    set(() => ({
      dominantColor1: newColor,
    })),
  setDominantColor2: (newColor: RgbColor) =>
    set(() => ({
      dominantColor2: newColor,
    })),
}));

interface PlacementStateStore {
  placementValues: UVValues;
  replacePlacementValues: (newValues: UVValues) => void;
}

export const usePlacementStateStore = create<PlacementStateStore>((set) => ({
  placementValues: defaultUVValues(),
  replacePlacementValues: (newValues: UVValues) =>
    set({ placementValues: newValues }),
}));
