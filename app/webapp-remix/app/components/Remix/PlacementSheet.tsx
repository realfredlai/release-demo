'use client';

import Image from 'next/image';

import { useTranslations } from 'next-intl';

import { useCallback, useEffect, useMemo, useState } from 'react';

import { Button } from '@reebok/frontend-components';
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from '@/app/components/Sheet/Sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from '@/app/components/Select/Select';
import { Text } from '@/app/components/Text/Text';
import { H5 } from '@/app/components/Text/H5';
import { H6 } from '@/app/components/Text/H6';

import { useUnityContext } from '@/app/hooks/useUnityContext';
import { useBreakpoint } from '@/app/hooks/useBreakpoint';

import { ShoeArea, UVValues } from '@/app/providers/UnityProvider';
import {
  LastUserAction,
  useEditStateStore,
  usePlacementStateStore,
} from '@/app/store/ShoeRemixStore';

import PlacementIcon from '@/public/images/icons/Remix/icon-placement-bone.svg';

import { getLogger } from '@reebok/shared';

const logger = getLogger('components.remix');

export const PlacementSheet = () => {
  const t = useTranslations();

  const { isBelowMd } = useBreakpoint('md');

  const { toggleEditStateShow, setLastUserCustomizationAction } =
    useEditStateStore();
  const { placementValues, replacePlacementValues } = usePlacementStateStore();

  const { changeViewTarget, changeShoePosition, changeUV } = useUnityContext();

  const sliderOptions = [
    t('customizer_placement_scale'),
    t('customizer_placement_rotation'),
    t('customizer_placement_vertical_position'),
    t('customizer_placement_horizontal_position'),
  ];

  const shoeAngles: ShoeArea[] = [
    'Toe',
    'Lip',
    'Right',
    'Left',
    'Rim',
    'Tongue',
    'Inside',
    'Sole',
    'Heel',
  ];

  const [selectedShoeArea, setSelectedShoeArea] = useState(shoeAngles[0]);
  const mappedSelectedAreaUV = `${selectedShoeArea}UV`;

  const [isPlacementButtonDisabled, setPlacementButtonDisabled] =
    useState(false);

  const [shoePlacementPositions, setShoePlacementPositions] = useState<{
    [shoeUV: string]: UVValues;
  }>(placementValues);

  const [temporaryPlacementPositions, setTemporaryPlacementPositions] =
    useState<{
      [shoeUV: string]: UVValues;
    }>(placementValues);

  const mapIndexToCoord = useCallback((index: number) => {
    /**
     * Index 0 = Rotation, Index 1 = Scale
     * Index 2 = Vertical, Index 3 = Horizontal
     */
    const coordinates = ['w', 'z', 'y', 'x']; // Order based on the slider index
    return coordinates[index];
  }, []);

  const initialSliderValues = sliderOptions.map((_, index) => {
    const initialValues =
      shoePlacementPositions[mappedSelectedAreaUV][mapIndexToCoord(index)];

    return initialValues;
  });

  const [sliderValues, setSliderValues] =
    useState<number[]>(initialSliderValues);

  const memoizedSliderValues = useMemo(() => {
    return sliderOptions.map((_, index) => {
      return temporaryPlacementPositions[mappedSelectedAreaUV][
        mapIndexToCoord(index)
      ];
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [temporaryPlacementPositions, mappedSelectedAreaUV, mapIndexToCoord]);

  // Update the slider values
  useEffect(() => {
    setSliderValues(memoizedSliderValues);
  }, [memoizedSliderValues]);

  const handleOnOpenChange = (open: boolean) => {
    toggleEditStateShow();

    // If drawer is open, view default/last-viewed shoe area
    // If drawer is closed, return back to default null view
    const shoeViewTarget = open
      ? t(`remix_${selectedShoeArea.toLowerCase()}`)
      : 'Null';
    changeViewTarget(shoeViewTarget as ShoeArea);

    // If mobile/tablet, adjust shoe view
    const newShoePosition =
      open && isBelowMd ? { x: 0, y: 2.25, z: 5.5 } : { x: 0, y: 0, z: 0 };

    changeShoePosition(newShoePosition);

    logger.info('PlacementSheet', 'handleOnOpenChange: closed drawer', !open);

    logger.info(
      'PlacementSheet',
      'handleOnOpenChange: before placement changes ',
      {
        temporaryPlacementPositions: temporaryPlacementPositions,
        shoePlacementPositions: shoePlacementPositions,
      }
    );

    /**
     * On drawer close
     * Take the shoePlacementPositions (master save)
     * If button pressed, shoePlacementPositions will take tempPositions
     * Else shoePlacementPositions will be unchanged and over-write temp
     */
    if (!open) {
      // Update UV values for all angles when drawer is closed
      shoeAngles.forEach((shoeArea) => {
        const shoeAreaUV = `${shoeArea as string}UV`;
        const shoeUVValue = shoePlacementPositions[shoeAreaUV];
        logger.info('PlacementSheet', 'shoeAreaUV - shoeUVValue:', {
          shoeAreaUV: shoeAreaUV,
          shoeUVValue: shoeUVValue,
        });

        changeUV(shoeArea, shoeUVValue);
      });

      // Set temp values in sync with master values
      setTemporaryPlacementPositions(shoePlacementPositions);
    }

    const convertedPlacementPositions = {
      ToeUV: shoePlacementPositions['ToeUV'],
      LipUV: shoePlacementPositions['LipUV'],
      RightUV: shoePlacementPositions['RightUV'],
      LeftUV: shoePlacementPositions['LeftUV'],
      RimUV: shoePlacementPositions['RimUV'],
      TongueUV: shoePlacementPositions['TongueUV'],
      InsideUV: shoePlacementPositions['InsideUV'],
      SoleUV: shoePlacementPositions['SoleUV'],
      HeelUV: shoePlacementPositions['HeelUV'],
    };

    logger.info(
      'PlacementSheet',
      'convertedPlacementPositions',
      convertedPlacementPositions
    );

    // Replace zustand placement values to be ready for AI Art Generation
    replacePlacementValues(convertedPlacementPositions);
  };

  const handleValueChange = useCallback(
    (newValue: number[], index: number) => {
      /**
       * Create new temporary xyzw position for the current selectedShoeAngle
       * Reflect newtime changes onto unity shoe
       * Set temporary placement positions state
       */
      const areaToUvMapping = mappedSelectedAreaUV;
      const newTemporaryPosition = {
        ...temporaryPlacementPositions,
        [areaToUvMapping]: {
          ...temporaryPlacementPositions[areaToUvMapping],
          [mapIndexToCoord(index)]: newValue[0],
        },
      };

      changeUV(selectedShoeArea, newTemporaryPosition[mappedSelectedAreaUV]);

      setTemporaryPlacementPositions(newTemporaryPosition);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedShoeArea, temporaryPlacementPositions]
  );

  const handleSelectChange = (selectedShoeArea: ShoeArea) => {
    changeViewTarget(selectedShoeArea);
    setSelectedShoeArea(selectedShoeArea);
  };

  const handleButtonClick = () => {
    if (!isPlacementButtonDisabled) {
      // Set master positions from temp positions on button click
      setShoePlacementPositions(temporaryPlacementPositions);

      // Set last user action to Placement
      setLastUserCustomizationAction('Placement' as LastUserAction);

      setPlacementButtonDisabled(true);

      // Delay button enable for user UX
      setTimeout(() => {
        setPlacementButtonDisabled(false);
      }, 500);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2 lg:gap-3">
      <Sheet onOpenChange={handleOnOpenChange}>
        <SheetTrigger asChild>
          <Button variant="primary" size="customizerIcon">
            <Image src={PlacementIcon} alt="Placement Icon" />
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom">
          <SheetHeader>
            <H6 className="text-primary-bone leading-[80%]">
              {t('customizer_placement_label')}
            </H6>
          </SheetHeader>

          <Select onValueChange={handleSelectChange}>
            <SelectTrigger className="w-full">
              <SelectValue
                placeholder={t(`remix_${selectedShoeArea.toLowerCase()}`)}
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {shoeAngles.map((shoeArea) => {
                  return (
                    <SelectItem value={shoeArea} key={shoeArea}>
                      <Text
                        variant="body"
                        className="text-primary-navy opacity-60"
                      >
                        {t(`remix_${shoeArea.toLowerCase()}`)}
                      </Text>
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>

          <div className="h-full flex flex-col justify-between gap-8">
            {sliderOptions.map((sliderName, index) => {
              return (
                <div
                  className="flex flex-col text-left h-8 text-primary-bone justify-between"
                  key={index}
                >
                  <Text variant="body">{sliderName}</Text>
                  <input
                    type="range"
                    key={index}
                    min={-5}
                    value={sliderValues[index]}
                    max={5}
                    step={0.1}
                    onChange={(e) => {
                      const newSliderValue = Number(e.currentTarget.value);
                      handleValueChange([newSliderValue], index);
                    }}
                  />
                </div>
              );
            })}
          </div>
          <SheetFooter className="mt-2 md:mt-5 lg:mt-14">
            <Button
              size="xlg"
              className="w-full"
              onClick={handleButtonClick}
              disabled={isPlacementButtonDisabled}
            >
              {t('customizer_placement_apply_placement')}
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
      <H5 variant="h5BoldC">{t('customizer_placement_label')}</H5>
    </div>
  );
};

export default PlacementSheet;
