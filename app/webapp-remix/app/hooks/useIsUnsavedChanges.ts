import { isEqual } from 'lodash';
import {
  useEditStateStore,
  useColorStateStore,
  usePlacementStateStore,
  useAIArtStateStore,
} from '@/app/store/ShoeRemixStore';

import { getLogger } from '@reebok/shared';

const logger = getLogger('webapp-remix.hooks');
/**
 * Hook to check for unsaved changes for each of the customizer
 * If any one of these are unsaved, shoe is unsaved
 * @returns isSelectedShoeChanged, isAIArtUnsaved, isColorUnsaved, isPlacementUnsaved, isUnsavedChanges
 */
export function useIsUnsavedChanges() {
  const { originalRemix, selectedShoe } = useEditStateStore();
  const { isAIArtUnsaved } = useAIArtStateStore();
  const { dominantColor1, dominantColor2 } = useColorStateStore();
  const { placementValues } = usePlacementStateStore();

  const isSelectedShoeChanged = originalRemix?.shoe_model !== selectedShoe;

  const isColorUnsaved = !isEqual(originalRemix?.custom_colors.slice(0, 2), [
    dominantColor1,
    dominantColor2,
  ]);

  const isPlacementUnsaved = !isEqual(
    originalRemix?.custom_refinements,
    placementValues
  );

  const isUnsavedChanges =
    isSelectedShoeChanged ||
    isAIArtUnsaved ||
    isColorUnsaved ||
    isPlacementUnsaved;

  logger.info(
    'useIsUnsavedChanges',
    'isSelectedShoeChanged - isAIArtUnsaved - isColorUnsaved - isPlacementUnsaved - isUnsavedChanges:',
    {
      isSelectedShoeChanged: isSelectedShoeChanged,
      isAIArtUnsaved: isAIArtUnsaved,
      isColorUnsaved: isColorUnsaved,
      isPlacementUnsaved: isPlacementUnsaved,
      isUnsavedChanges: isUnsavedChanges,
    }
  );

  return {
    isSelectedShoeChanged,
    isAIArtUnsaved,
    isColorUnsaved,
    isPlacementUnsaved,
    isUnsavedChanges,
  };
}
