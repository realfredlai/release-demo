'use client';
import { trpc } from '@/trpc';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { useQueryClient } from '@tanstack/react-query';

import { RgbColor } from 'react-colorful';

import { Button, cn } from '@reebok/frontend-components';
import { Text } from '@/app/components/Text/Text';
import ReadyToWalkAwayModal from '@/app/components/Modals/ReadyToWalkAwayModal';
import SomethingWentWrongModal from '@/app/components/Modals/SomethingWentWrongModal';

import {
  useAIArtStateStore,
  useColorStateStore,
  useEditStateStore,
  usePlacementStateStore,
} from '@/app/store/ShoeRemixStore';

import {
  CustomizationParams,
  GlobalUserItem,
  RGBColor,
  RemixItem,
} from '@reebok/backend-libs';
import useGetLastGeneratedRemix from '@/app/hooks/useGetLastGeneratedRemix';
import { useGetRemixById } from '@/app/hooks/useGetRemixById';
import { useBreakpoint } from '@/app/hooks/useBreakpoint';

import { normaliseRGBA } from '@/app/utils/helpers';
import { getLogger } from '@reebok/shared';

const logger = getLogger('components.UnsavedChangesBanner');

type unsavedChangesBannerProps = {
  isBannerOpen: boolean;
};

const UnsavedChangesBanner = ({ isBannerOpen }: unsavedChangesBannerProps) => {
  const { showEditState, selectedShoe, lastUserCustomizationAction } =
    useEditStateStore();
  const { dominantColor1, dominantColor2 } = useColorStateStore();
  const { placementValues } = usePlacementStateStore();
  const { setAIArtGenerating } = useAIArtStateStore();

  const lastGeneratedRemix = useGetLastGeneratedRemix();

  const router = useRouter();

  const t = useTranslations();
  const { isBelowLg } = useBreakpoint('lg');

  const [isWalkAwayModalOpen, setWalkAwayModalOpen] = useState(false);
  const [isSomethingWrongModalOpen, setIsSomethingWrongModalOpen] =
    useState(false);

  const userId = localStorage.getItem('userId') ?? '';

  const { data: userData } = trpc.getUserById.useQuery(userId);

  const [phantomRemixId, setPhantomRemixId] = useState<string>('');
  const [generationState, setGenerationState] = useState<string>('NONE');

  const customizeRemixMutation = trpc.customizeShoe.useMutation();
  const saveCustomization = trpc.saveCustomization.useMutation();

  const remixQuery = useGetRemixById(phantomRemixId, {
    enabled: !!phantomRemixId && generationState === 'REQUESTED',
  });

  const queryClient = useQueryClient();

  /**
   * useEffect to handle change in remix query data
   * Checks if remixQuery has polled for successful CUSTOMIZATION_ASSETS_GENERATED
   */
  useEffect(() => {
    if (remixQuery.isSuccess && remixQuery.data?.image_combined_url) {
      logger.info(
        'UnsavedChangesBanner',
        'useEffect - remixQuery.data - remixQuery.data.state - pfp(remixQuery.data.image_combined_url)',
        {
          remixQueryData: remixQuery.data,
          remixQueryDataState: remixQuery.data?.state,
          pfp: remixQuery.data.image_combined_url,
        }
      );

      setGenerationState('GENERATED');

      queryClient.invalidateQueries({ queryKey: ['getLatestUserCollabs'] });
      router.push('/closet');
      setAIArtGenerating(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remixQuery.data]);

  /**
   * useEffect to handle change in phantom remix mutation
   * Checks if phantom remix geneation is successful and sets image generation state to REQUESTED
   */
  useEffect(() => {
    if (customizeRemixMutation.data?.remix_id) {
      logger.info(
        'UnsavedChangesBanner',
        'useEffect - savePhantomRemixMutation: customizeRemixMutation.data.remix_id',
        customizeRemixMutation.data.remix_id
      );
      setPhantomRemixId(customizeRemixMutation.data.remix_id);
      setGenerationState('REQUESTED');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customizeRemixMutation.data]);

  /**
   * Unsaved changes assumes changes so either color/placement/ai art has been changed
   * Returns true if the last customization action done by user is Color or Placement
   * If null, that means only shoe model change and trigger unity
   * Returns false if last customization action was AI Art
   */
  const isColorOrPlacementLastAction =
    lastUserCustomizationAction === 'Color' ||
    lastUserCustomizationAction === 'Placement' ||
    lastUserCustomizationAction === null;

  logger.info(
    'UnsavedChangesBanner',
    'last user action is:',
    lastUserCustomizationAction
  );

  const handleAIArtSaveCustomization = () => {
    const parentPhantomRemix = lastGeneratedRemix as RemixItem;

    logger.info(
      'UnsavedChangesBanner',
      'handleAIArtSaveCustomization - [parentPhantomRemix] - [userId]',
      { parentPhantomRemix: parentPhantomRemix, userId: userId }
    );

    try {
      const savedCustomisation = saveCustomization.mutate({
        userId,
        parentRemix: parentPhantomRemix,
      });
      logger.info(
        'UnsavedChangesBanner',
        'handleAIArtSaveCustomization - Saved custom remix',
        savedCustomisation
      );

      queryClient.invalidateQueries({ queryKey: ['getLatestUserCollabs'] });
      router.push('/closet');
      setAIArtGenerating(false);
    } catch (err) {
      setIsSomethingWrongModalOpen(true);
    }
  };

  const handleSaveRemixClick = () => {
    setAIArtGenerating(true);

    logger.info(
      'UnsavedChangesBanner',
      'handleSaveRemixClick - last user action on btn click is:',
      lastUserCustomizationAction
    );

    if (isColorOrPlacementLastAction) {
      /**
       * Send off unity job to generate a new pfp render
       * Poll for requested assets
       */
      const customParams: CustomizationParams = {
        renderJobType: 'UNITY',
        colors: [
          normaliseRGBA(dominantColor1 as RgbColor),
          normaliseRGBA(dominantColor2 as RgbColor),
        ] as RGBColor[],
        uvRefinements: placementValues,
        shoeModel: selectedShoe,
      };

      const customizationPayload = {
        user: userData as GlobalUserItem,
        parentRemix: lastGeneratedRemix,
        customParams: customParams,
      };
      logger.info(
        'UnsavedChangesBanner',
        '[unity custom params payload]:',
        customizationPayload
      );

      customizeRemixMutation.mutate(customizationPayload);
    } else {
      handleAIArtSaveCustomization();
    }
  };

  return (
    <>
      <div
        className={cn(
          'bg-primary-bone w-full h-fit absolute pointer-events-auto transition-all duration-300',
          {
            'opacity-100 bottom-0': isBannerOpen && !showEditState,
            'opacity-0 -bottom-16': !isBannerOpen || showEditState,
          }
        )}
      >
        <div className="container py-4 sm:max-sm:px-6 gap-3 text-primary-navy flex flex-col lg:flex-row justify-center lg:justify-between items-center">
          <Text variant="body" className="w-fit">
            {t('customizer_unsaved_changes')}
          </Text>
          <div className="flex space-x-4">
            <Button
              variant="secondaryOutline"
              className="lg:w-[15.9375rem]"
              onClick={() => setWalkAwayModalOpen(!isWalkAwayModalOpen)}
            >
              {t('customizer_cancel_changes')}
            </Button>
            <Button
              variant="primary"
              className="lg:w-[15.9375rem]"
              onClick={handleSaveRemixClick}
            >
              {isBelowLg
                ? t('customizer_save_creation')
                : t('customizer_save_this_remix')}
            </Button>
          </div>
        </div>
      </div>
      <ReadyToWalkAwayModal
        open={isWalkAwayModalOpen}
        setOpen={setWalkAwayModalOpen}
      />
      <SomethingWentWrongModal
        open={isSomethingWrongModalOpen}
        setOpen={setIsSomethingWrongModalOpen}
      />
    </>
  );
};

export default UnsavedChangesBanner;
