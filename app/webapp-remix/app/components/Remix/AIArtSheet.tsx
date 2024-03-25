'use client';
import { trpc } from '@/trpc';

import { useEffect, useState } from 'react';

import Image from 'next/image';

import { useTranslations } from 'next-intl';

import { useUnityContext } from '@/app/hooks/useUnityContext';
import { useGetRemixById } from '@/app/hooks/useGetRemixById';
import { useBreakpoint } from '@/app/hooks/useBreakpoint';

import { ShoeArea } from '@/app/providers/UnityProvider';
import {
  useEditStateStore,
  useAIArtStateStore,
  useColorStateStore,
  usePlacementStateStore,
  LastUserAction,
} from '@/app/store/ShoeRemixStore';

import {
  CustomizationParams,
  GlobalUserItem,
  RGBColor,
} from '@reebok/backend-libs';

import { normaliseRGBA } from '@/app/utils/helpers';
import { RgbColor } from 'react-colorful';

import { Button } from '@reebok/frontend-components';
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from '@/app/components/Sheet/Sheet';
import { Text } from '@/app/components/Text/Text';
import { H6 } from '@/app/components/Text/H6';
import CreatableSelect from '@/app/components/Remix/CreatableSelect';
import SelectableChip from '@/app/components/Remix/SelectableChip';
import { LoadingAnimation } from '@/app/components/LoadingAnimation';
import { H5 } from '@/app/components/Text/H5';

import AIArtIcon from '@/public/images/icons/Remix/icon-aiart-bone.svg';
import useGetLastGeneratedRemix from '@/app/hooks/useGetLastGeneratedRemix';

import { getLogger } from '@reebok/shared';

const logger = getLogger('components.remix');

const AIArtSheet = () => {
  const t = useTranslations();
  const { isBelowMd } = useBreakpoint('md');

  const {
    toggleEditStateShow,
    selectedShoe,
    setLastGeneratedPhantomRemix,
    setLastUserCustomizationAction,
  } = useEditStateStore();
  const {
    currentPrompt,
    replacePrompt,
    savedPrompt,
    replaceSavedPrompt,
    setAIArtUnsavedChanges,
    isAIArtGenerating,
    setAIArtGenerating,
  } = useAIArtStateStore();
  const { placementValues } = usePlacementStateStore();
  const { dominantColor1, dominantColor2 } = useColorStateStore();

  const { changeViewTarget, changeShoePosition, updateShoeTexture } =
    useUnityContext();

  const lastGeneratedRemix = useGetLastGeneratedRemix();

  const userId = localStorage.getItem('userId') ?? '';

  const { data: userData } = trpc.getUserById.useQuery(userId);

  /**
   * Send off a full render job
   * Gets promptName from temp prompt selected, which becomes master prompt afterwards
   * If color/placement is changed, AI Art takes these changed colors/placements for AI Art Generation
   */
  const customParams: CustomizationParams = {
    renderJobType: 'STABLE_DIFFUSION',
    promptName: currentPrompt.promptName,
    promptId: currentPrompt.promptId,
    colors: [
      normaliseRGBA(dominantColor1 as RgbColor),
      normaliseRGBA(dominantColor2 as RgbColor),
    ] as RGBColor[],
    uvRefinements: placementValues,
    shoeModel: selectedShoe,
  };

  logger.info('AIArtSheet', 'customParams', customParams);

  const [phantomRemixId, setPhantomRemixId] = useState<string>('');
  const [generationState, setGenerationState] = useState<string>('NONE');
  const savePhantomRemixMutation = trpc.customizeShoe.useMutation();
  const remixQuery = useGetRemixById(phantomRemixId, {
    enabled: !!phantomRemixId && generationState === 'REQUESTED',
  });

  /**
   * useEffect to handle change in remix query data
   * Checks if remixQuery has polled for successful CUSTOMIZATION_ASSETS_GENERATED
   */
  useEffect(() => {
    if (
      remixQuery.isSuccess &&
      remixQuery.data?.state === 'CUSTOMIZATION_ASSETS_GENERATED'
    ) {
      logger.info(
        'AIArtSheet',
        'useEffect - remixQuery.data - remixQuery.data?.state',
        {
          remixQueryData: remixQuery.data,
          remixQueryDataState: remixQuery.data?.state,
        }
      );
      setGenerationState('GENERATED');

      const originalPhoto = remixQuery.data.image_original_url as string;
      const generatedPhoto = remixQuery.data.image_texture_url as string;
      logger.info('AIArtSheet', 'useEffect: originalPhoto - generatedPhoto:', {
        originalPhoto: originalPhoto,
        generatedPhoto: generatedPhoto,
      });
      updateShoeTexture(originalPhoto, generatedPhoto);

      // AI Art always produces unique shoe
      setAIArtUnsavedChanges(true);

      // Replace master prompt
      replaceSavedPrompt(currentPrompt);

      // Set phantom remix
      setLastGeneratedPhantomRemix(remixQuery.data);

      setAIArtGenerating(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remixQuery.data]);

  /**
   * useEffect to handle change in phantom remix mutation
   * Checks if phantom remix geneation is successful and sets image generation state to REQUESTED
   */
  useEffect(() => {
    if (
      savePhantomRemixMutation.isSuccess &&
      savePhantomRemixMutation.data?.remix_id
    ) {
      logger.info(
        'AIArtSheet',
        'useEffect - savePhantomRemixMutation',
        savePhantomRemixMutation.data.remix_id
      );
      setPhantomRemixId(savePhantomRemixMutation.data.remix_id);
      setGenerationState('REQUESTED');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [savePhantomRemixMutation.data]);

  const { data: prompts, error: promptsError } = trpc.getPrompts.useQuery();

  if (promptsError) {
    return <div>Error Loading</div>;
  }

  if (!prompts) {
    return <LoadingAnimation />;
  }

  const customizationPayload = {
    user: userData as GlobalUserItem,
    parentRemix: lastGeneratedRemix,
    customParams: customParams,
  };

  const handleChipSelect = (promptName: string, promptId: string, selected: boolean) => {
    const newPrompt = {
      promptName,
      promptId
    }
    // Replace prompt in store if selected, else fallback to master prompt on badge deselect
    replacePrompt(selected ? newPrompt : savedPrompt);
  };

  const handleOnOpenChange = (open: boolean) => {
    toggleEditStateShow();

    // If mobile/tablet, adjust shoe view
    const newShoePosition =
      open && isBelowMd ? { x: 0, y: 1.5, z: 2 } : { x: 0, y: 0, z: 0 };
    changeShoePosition(newShoePosition);
    changeViewTarget('Null' as ShoeArea);

    logger.info(
      'AIArtSheet',
      'handleOnOpenChange - savedPrompt  - currentPrompt',
      { savedPromptId: savedPrompt.promptId, savedPromptName: savedPrompt.promptName, currentPromptId: currentPrompt.promptId, currentPromptName: currentPrompt.promptName }
    );
    /**
     * Temp prompt will be set to master prompt
     * If user didn't click GENERATE, prompt will be cleared to old master prompt
     * If user clicked GENERATE, temp prompt in-line with master
     */
    if (!open) {
      replacePrompt(savedPrompt);
    }
  };

  // handle user clicking 'Generate'
  const handleGenerateClick = async () => {
    try {
      setAIArtGenerating(true);

      // Set the master prompt to temp prompt
      replaceSavedPrompt(currentPrompt);
      // Set last user action to AIArt
      setLastUserCustomizationAction('AIArt' as LastUserAction);

      logger.info(
        'AIArtSheet',
        'handleGenerateClick - customizationPayload',
        customizationPayload
      );
      savePhantomRemixMutation.mutate(customizationPayload);
    } catch (error) {
      // TODO: Display something went wrong modal
      logger.error('AIArtSheet', 'handleGenerateClick error', error);
      setAIArtGenerating(false); // Enable the button in case of an error
      return; // Exit the function in case of an error
    }
  };

  const deconstructedPromptNames = prompts.map((prompt) => ({ promptName: prompt.name, promptId: prompt.prompt_id }));
  const uniquePromptNames = Array.from(new Set(deconstructedPromptNames));
  const filteredPromptsWithoutCurrent = uniquePromptNames.filter(
    (prompt) => prompt.promptName !== currentPrompt.promptName
  );

  logger.info(
    'AIArtSheet',
    'filteredPromptsWithoutCurrent',
    filteredPromptsWithoutCurrent
  );

  // Include only the currentPrompt once in the reordered array
  const reorderedPrompts = [currentPrompt, ...filteredPromptsWithoutCurrent];

  logger.info('AIArtSheet', 'reorderedPrompts', reorderedPrompts);
  return (
    <div className="flex flex-col items-center gap-2 lg:gap-3">
      <Sheet onOpenChange={handleOnOpenChange}>
        <SheetTrigger asChild>
          <Button variant="primary" size="customizerIcon">
            <Image src={AIArtIcon} alt="AI Art Icon" />
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" onOpenAutoFocus={(e) => e.preventDefault()}>
          <SheetHeader className="text-primary-bone space-y-2">
            <H6> {t('customizer_aiart_label')}</H6>
            <Text variant="body">{t('customizer_aiart_subheading')}</Text>
          </SheetHeader>

          <CreatableSelect options={reorderedPrompts} />

          <div className="h-full flex flex-col justify-between gap-8">
            <div className="flex flex-row justify-start flex-wrap gap-2">
              {reorderedPrompts.slice(0, 10).map((prompt) => {
                return (
                  <SelectableChip
                    label={prompt.promptName}
                    onSelect={(selected) =>
                      handleChipSelect(prompt.promptName, prompt.promptId, selected)
                    }
                    key={prompt.promptName}
                  />
                );
              })}
            </div>
          </div>
          <SheetFooter>
            <div className="flex w-full bottom-0 inset-x-0">
              <Button
                size="xlg"
                className="w-full justify-center"
                onClick={() => handleGenerateClick()}
                disabled={isAIArtGenerating || !currentPrompt.promptName}
              >
                {t('customizer_aiart_generate')}
              </Button>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
      <H5 variant="h5BoldC">{t('customizer_aiart_label')}</H5>
    </div>
  );
};

export default AIArtSheet;
