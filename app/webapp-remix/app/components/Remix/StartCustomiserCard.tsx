'use client';
import { Button } from '@reebok/frontend-components';
import { useState } from 'react';

import Image from 'next/image';

import { useTranslations } from 'next-intl';

import { Text } from '@/app/components/Text/Text';
import { H4 } from '@/app/components/Text/H4';

import PumpSelectedIcon from '@/public/images/remix/icon-pump-selected.png';
import PumpUnselectedIcon from '@/public/images/remix/icon-pump-unselected.png';

import ClubCSelectedIcon from '@/public/images/remix/icon-club-c-selected.png';
import ClubCUnselectedIcon from '@/public/images/remix/icon-club-c-unselected.png';

import ClassicLeatherSelectedIcon from '@/public/images/remix/icon-classic-leather-selected.png';
import ClassicLeatherUnselectedIcon from '@/public/images/remix/icon-classic-leather-unselected.png';

import classicLeatherShoe from '@/public/images/shoes/image-classic-leather-shoe.png';
import clubCShoe from '@/public/images/shoes/image-club-c-shoe.png';
import pumpShoe from '@/public/images/shoes/image-pump-shoe.png';

import { ShoeModel } from '@reebok/backend-libs';

type CardProps = {
  currentSelectedShoe: ShoeModel;
  onShoeSelect: (shoeName: ShoeModel) => void;
  btnClick: () => void;
};

export function StartCustomiserCard({
  currentSelectedShoe,
  onShoeSelect,
  btnClick,
}: CardProps) {
  const t = useTranslations();

  const listOfShoeTypes: ShoeModel[] = ['ThePump', 'ClubC', 'ClassicLeather'];

  const [selectedShoe, setSelectedShoe] = useState(currentSelectedShoe);

  const setShoeName = (shoeName: ShoeModel) => {
    setSelectedShoe(shoeName);
    onShoeSelect(shoeName); // Call the callback function when the shoe selection changes
  };

  const shoeData = {
    ThePump: {
      image: pumpShoe,
      description: t('customizer_shoe_selector_pump_description'),
    },
    ClubC: {
      image: clubCShoe,
      description: t('customizer_shoe_selector_clubc_description'),
    },
    ClassicLeather: {
      image: classicLeatherShoe,
      description: t('customizer_shoe_selector_classic_description'),
    },
  };

  const mappedShoeType = {
    ThePump: 'Pump Omni Zone II',
    ClubC: 'Club-C 85',
    ClassicLeather: 'Classic Leather',
  }[currentSelectedShoe];

  const currentShoeModelData = shoeData[selectedShoe as keyof typeof shoeData];

  return (
    <>
      {/* Shoe Image */}
      <div className="grid self-auto row-start-1 row-end-2 col-span-full lg:row-span-full lg:col-start-7 lg:-col-end-1 lg:m-auto">
        <Image
          src={currentShoeModelData.image}
          alt={`${selectedShoe} Shoe Image`}
          className="h-auto w-full m-auto md:w-7/12 lg:w-full xlg:w-8/12"
        />
      </div>

      {/* Shoe Selector Buttons */}
      <div className="grid  h-fit self-center row-start-2 col-span-full lg:self-end lg:mb-8 z-10">
        <div className="flex flex-col gap-4">
          <div className="flex gap-8 justify-center">
            {listOfShoeTypes.map((shoeType, key) => {
              const isSelected = shoeType === selectedShoe;
              let shoeImage;

              switch (shoeType) {
                case 'ThePump':
                  shoeImage = isSelected
                    ? PumpSelectedIcon
                    : PumpUnselectedIcon;
                  break;
                case 'ClubC':
                  shoeImage = isSelected
                    ? ClubCSelectedIcon
                    : ClubCUnselectedIcon;
                  break;
                case 'ClassicLeather':
                  shoeImage = isSelected
                    ? ClassicLeatherSelectedIcon
                    : ClassicLeatherUnselectedIcon;
                  break;
                default:
                  break;
              }

              return (
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    setShoeName(shoeType);
                  }}
                  key={key}
                >
                  {shoeImage && (
                    <Image
                      src={shoeImage}
                      alt={`${shoeType} Reebok Shoe Icon`}
                      width={100}
                      height={100}
                    />
                  )}
                </div>
              );
            })}
          </div>
          <Text
            variant="body"
            className="text-center w-10/12 m-auto text-primary-navy opacity-80"
          >
            {t('customizer_shoe_selector_warning')}
          </Text>
        </div>
      </div>

      {/* Reebok Info and Button */}
      <div className="col-span-full grid row-start-3 lg:row-span-full lg:col-start-3 content-center text-primary-navy">
        <div className="flex flex-col gap-4 lg:w-6/12">
          <div className="flex flex-col text-primary-navy">
            <Text variant="body">{t('customizer_shoe_selector_reebok')}</Text>
            <H4 variant="h4Extra" className="pt-1 md:pt-0">
              {mappedShoeType}
            </H4>
            <Text
              variant="leadParagraph"
              weight="bold"
              className="py-2 md:pt-5 md:pb-3"
            >
              {t('customizer_shoe_selector_subheading')}
            </Text>
            <Text variant="leadParagraph" className="pb-1 md:pb-3">
              {currentShoeModelData.description}
            </Text>
          </div>
          <Button
            size="lg"
            className="justify-center w-full lg:w-fit"
            onClick={btnClick}
          >
            {t('customizer_shoe_selector_lets_go')}
          </Button>
        </div>
      </div>
    </>
  );
}
