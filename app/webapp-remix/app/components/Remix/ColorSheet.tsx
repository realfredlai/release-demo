'use client';
import Image from 'next/image';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { RemixItem } from '@reebok/backend-libs';
import { RgbColor } from 'react-colorful';
import {
  convertRGBAToRGB,
  denormaliseRGBA,
  isRGBDecimal,
  normaliseRGBA,
} from '@/app/utils/helpers';

import {
  ColorTarget,
  ShoeArea,
  ShoeColor,
} from '@/app/providers/UnityProvider';
import {
  LastUserAction,
  useColorStateStore,
  useEditStateStore,
} from '@/app/store/ShoeRemixStore';

import { useUnityContext } from '@/app/hooks/useUnityContext';
import { useBreakpoint } from '@/app/hooks/useBreakpoint';

import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from '@/app/components/Sheet/Sheet';
import { Button } from '@reebok/frontend-components';
import { Text } from '@/app/components/Text/Text';
import { H5 } from '@/app/components/Text/H5';
import { H6 } from '@/app/components/Text/H6';
import ColorPicker from '@/app/components/ColorPicker/ColorPicker';
import SelectedColors, {
  ColorOption,
} from '@/app/components/Remix/SelectedColors';

import ColorIcon from '@/public/images/icons/Remix/icon-color-bone.svg';

import { getLogger } from '@reebok/shared';

const logger = getLogger('components.remix');

export const ColorSheet = () => {
  const { originalRemix, toggleEditStateShow, setLastUserCustomizationAction } =
    useEditStateStore();
  const {
    dominantColor1,
    dominantColor2,
    setDominantColor1,
    setDominantColor2,
  } = useColorStateStore();

  const { changeViewTarget, changeColor, changeShoePosition } =
    useUnityContext();

  const t = useTranslations();
  const { isBelowMd } = useBreakpoint('md');

  const userRemix = originalRemix as RemixItem;

  const [currentSelectedColorOption, setCurrentSelectedColorOption] =
    useState<ColorOption>('primary');

  const [currentPrimaryPickerColor, setCurrentPrimaryPickerColor] = useState(
    denormaliseRGBA(convertRGBAToRGB(userRemix.custom_colors[0]))
  );

  const [currentSecondaryPickerColor, setCurrentSecondaryPickerColor] =
    useState(denormaliseRGBA(convertRGBAToRGB(userRemix.custom_colors[1])));

  logger.info(
    'ColorSheet',
    'currentPrimaryPickerColor - currentSecondaryPickerColor',
    {
      currentPrimaryPickerColor: currentPrimaryPickerColor,
      currentSecondaryPickerColor: currentSecondaryPickerColor,
    }
  );

  const [isColorSheetButtonDisabled, setIsColorSheetButtonDisabled] =
    useState(false);

  const updateUnityShoeColors = (color1: ShoeColor, color2: ShoeColor) => {
    changeColor('A' as ColorTarget, normaliseRGBA(color1));
    changeColor('B' as ColorTarget, normaliseRGBA(color2));
  };

  const handleOnOpenChange = (open: boolean) => {
    toggleEditStateShow();

    // If mobile/tablet, adjust shoe view
    const newShoePosition =
      open && isBelowMd ? { x: 0, y: 1.5, z: 2 } : { x: 0, y: 0, z: 0 };
    changeShoePosition(newShoePosition);
    changeViewTarget('Null' as ShoeArea);

    /**
     * Check if colors is in 0-1 format
     * Reset temp color states to master color states on sheet close
     * If save colors button was clicked, temp and master will be inline anyways
     * If not, user color changes will reset to last saved master colors
     */
    if (!open) {
      const isColorsDecimal =
        isRGBDecimal(dominantColor1 as RgbColor) &&
        isRGBDecimal(dominantColor2 as RgbColor);

      const color1 = isColorsDecimal
        ? denormaliseRGBA(dominantColor1 as RgbColor)
        : (dominantColor1 as RgbColor);

      const color2 = isColorsDecimal
        ? denormaliseRGBA(dominantColor2 as RgbColor)
        : (dominantColor2 as RgbColor);

      setCurrentPrimaryPickerColor(color1);
      setCurrentSecondaryPickerColor(color2);

      updateUnityShoeColors(color1 as ShoeColor, color2 as ShoeColor);
    }
  };

  const handleApplyColorsClick = () => {
    setIsColorSheetButtonDisabled(true);

    logger.info(
      'ColorSheet',
      'handleApplyColorsClick: update unity shoe colors',
      {
        currentPrimaryPickerColor: currentPrimaryPickerColor,
        currentSecondaryPickerColor: currentSecondaryPickerColor,
      }
    );

    updateUnityShoeColors(
      currentPrimaryPickerColor as ShoeColor,
      currentSecondaryPickerColor as ShoeColor
    );

    // Set master dominant colors from color selections
    setDominantColor1(currentPrimaryPickerColor);
    setDominantColor2(currentSecondaryPickerColor);

    // Set last user action to Color
    setLastUserCustomizationAction('Color' as LastUserAction);

    setTimeout(() => {
      setIsColorSheetButtonDisabled(false);
    }, 250);
  };

  const handleSetColorPicker = (newColor: RgbColor) => {
    logger.info('ColorSheet', 'handleSetColorPicker: newColor', newColor);

    if (currentSelectedColorOption === 'primary') {
      changeColor('A' as ColorTarget, normaliseRGBA(newColor) as ShoeColor);
      setCurrentPrimaryPickerColor(newColor as RgbColor);
    } else {
      changeColor('B' as ColorTarget, normaliseRGBA(newColor) as ShoeColor);
      setCurrentSecondaryPickerColor(newColor as RgbColor);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2 lg:gap-3">
      <Sheet onOpenChange={handleOnOpenChange}>
        <SheetTrigger asChild>
          <Button variant="primary" size="customizerIcon">
            <Image src={ColorIcon} alt="Color Icon" />
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom">
          <SheetHeader className="text-primary-bone space-y-2">
            <H6>{t('customizer_color_label')}</H6>
            <Text variant="body" className="w-full">
              {t('customizer_color_subheading')}
            </Text>
          </SheetHeader>

          <SelectedColors
            colors={[currentPrimaryPickerColor, currentSecondaryPickerColor]}
            currentColorOption={currentSelectedColorOption}
            onColorOptionChange={setCurrentSelectedColorOption}
          />

          <div className="h-full w-full">
            <ColorPicker
              color={
                currentSelectedColorOption === 'primary'
                  ? currentPrimaryPickerColor
                  : currentSecondaryPickerColor
              }
              setColor={(action) => handleSetColorPicker(action)}
            />
          </div>
          <SheetFooter>
            <div className="flex w-full bottom-0 inset-x-0">
              <Button
                size="xlg"
                className="w-full"
                onClick={handleApplyColorsClick}
                disabled={isColorSheetButtonDisabled}
              >
                {t('customizer_color_apply_colors')}
              </Button>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
      <H5 variant="h5BoldC">{t('customizer_color_label')}</H5>
    </div>
  );
};

export default ColorSheet;
