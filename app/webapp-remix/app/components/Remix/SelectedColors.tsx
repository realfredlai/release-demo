'use client';
import { useTranslations } from 'next-intl';

import { Dispatch, SetStateAction } from 'react';
import { Text } from '@/app/components/Text/Text';
import { cn } from '@reebok/frontend-components';
import {
  formatRGBA,
  denormaliseRGBA,
  normaliseRGBA,
} from '@/app/utils/helpers';
import { RgbColor } from 'react-colorful';
import { getLogger } from '@reebok/shared';

const logger = getLogger('components.remix');

export type ColorOption = 'primary' | 'secondary';

type SelectedColorsProps = {
  colors: RgbColor[];
  currentColorOption: ColorOption;
  onColorOptionChange: Dispatch<SetStateAction<ColorOption>>;
};

const SelectedColors = ({
  colors,
  currentColorOption,
  onColorOptionChange,
}: SelectedColorsProps) => {
  const t = useTranslations();

  const dominantColor1 = colors[0];
  const dominantColor2 = colors[1];

  const isPrimaryColorOptionSelected = currentColorOption === 'primary';

  const handleColorOptionClick = (option: SetStateAction<ColorOption>) => {
    onColorOptionChange(option);
  };

  return (
    <div className="w-full">
      <div
        className="flex items-center gap-2 float-left cursor-pointer transition-opacity"
        onClick={() => handleColorOptionClick('primary')}
      >
        <div
          className={cn('size-8 border-2 border-primary-bone rounded-full', {
            'border-4': isPrimaryColorOptionSelected,
          })}
          style={{
            backgroundColor: formatRGBA(dominantColor1 as RgbColor),
          }}
        />
        <Text
          variant="body"
          className={cn('text-white duration-200', {
            'underline underline-offset-8': isPrimaryColorOptionSelected,
            'opacity-30': !isPrimaryColorOptionSelected,
          })}
        >
          {t('customizer_color_primary')}
        </Text>
      </div>

      <div
        className="flex items-center gap-2 float-right cursor-pointer transition-opacity"
        onClick={() => handleColorOptionClick('secondary')}
      >
        <div
          className={cn('size-8 border-2 border-primary-bone rounded-full', {
            'border-4': !isPrimaryColorOptionSelected,
          })}
          style={{
            backgroundColor: formatRGBA(dominantColor2 as RgbColor),
          }}
        />
        <Text
          variant="body"
          className={cn('text-white duration-200', {
            'underline underline-offset-8': !isPrimaryColorOptionSelected,
            'opacity-30': isPrimaryColorOptionSelected,
          })}
        >
          {t('customizer_color_secondary')}
        </Text>
      </div>
    </div>
  );
};

export default SelectedColors;
