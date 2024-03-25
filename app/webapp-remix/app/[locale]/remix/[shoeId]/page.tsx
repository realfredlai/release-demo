'use client';
import { useEffect, useState } from 'react';

import { trpc } from '@/trpc';
import { RemixItem, ShoeModel, UVValues } from '@reebok/backend-libs';

import {
  useAIArtStateStore,
  useColorStateStore,
  useEditStateStore,
  usePlacementStateStore,
} from '@/app/store/ShoeRemixStore';

import { UnityProvider } from '@/app/providers/UnityProvider';

import { StartCustomiserCard } from '@/app/components/Remix/StartCustomiserCard';
import { RemixYourReebok } from '@/app/components/Remix/RemixYourReebok';
import UnsavedChangesBanner from '@/app/components/UnsavedChangesBanner/UnsavedChangesBanner';

import { useIsUnsavedChanges } from '@/app/hooks/useIsUnsavedChanges';
import { LoadingAnimation } from '@/app/components/LoadingAnimation';

export default function RemixPage({ params }: { params: { shoeId: string } }) {
  const { shoeId } = params;

  const { setOriginalRemix, selectedShoe, setSelectedShoe } =
    useEditStateStore();
  const { setDominantColor1, setDominantColor2 } = useColorStateStore();
  const { placementValues, replacePlacementValues } = usePlacementStateStore();
  const { replacePrompt, replaceSavedPrompt, isAIArtGenerating } =
    useAIArtStateStore();

  const [toggleModal, setToggleModal] = useState(true);

  const { isUnsavedChanges } = useIsUnsavedChanges();

  const { data } = trpc.getRemix.useQuery(shoeId, {
    suspense: true,
  });

  /**
   * Set zustand data store to shoe remix data
   * Shoe Model
   * Color
   * Placement
   * Prompt
   */
  useEffect(() => {
    if (data) {
      // Set original remix
      setOriginalRemix(data);

      // Select shoe model from db to let user know what the original remix shoetype was
      setSelectedShoe(data.shoe_model as ShoeModel);

      // Set top 2 dominant colors
      setDominantColor1(data.custom_colors[0]);
      setDominantColor2(data.custom_colors[1]);

      // Check existing shoe angles, else use default values
      const customRefinements = data.custom_refinements
        ? data.custom_refinements
        : placementValues;
      replacePlacementValues(customRefinements as UVValues);
      const newPrompt = {
        promptName: data.custom_prompt_name,
        promptId: data.custom_prompt_id,
      };
      // Set existing shoe prompt to both prompt states
      replacePrompt(newPrompt);
      replaceSavedPrompt(newPrompt);
    }
    // Only run on customizer first render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleShoeSelection = (shoeName: ShoeModel) => {
    setSelectedShoe(shoeName);
  };

  const handleModalToggle = () => {
    setToggleModal(!toggleModal);
  };

  return (
    <div className="flex flex-col justify-center h-full w-full">
      {toggleModal ? (
        <div className="bg-primary-bone">
          <div className="container grid-layout auto-rows-auto h-full w-full">
            <StartCustomiserCard
              currentSelectedShoe={selectedShoe}
              onShoeSelect={handleShoeSelection}
              btnClick={handleModalToggle}
            />
          </div>
        </div>
      ) : (
        <>
          {isAIArtGenerating && <LoadingAnimation />}
          <UnityProvider shoeType={selectedShoe} remix={data as RemixItem}>
            <RemixYourReebok />

            {isUnsavedChanges && (
              <UnsavedChangesBanner isBannerOpen={isUnsavedChanges} />
            )}
          </UnityProvider>
        </>
      )}
    </div>
  );
}
