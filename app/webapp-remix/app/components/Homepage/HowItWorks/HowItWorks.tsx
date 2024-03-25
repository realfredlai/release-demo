'use client';
import Image from 'next/image';
import { Text } from '@/app/components/Text/Text';
import { H4 } from '@/app/components/Text/H4';

import HowItWorksHeader from '@/public/images/homepage/HowItWorks/image-how-it-works-header.svg';

import CollabCards from '@/public/images/homepage/HowItWorks/image-collab-cards.png';
import CreateShoe from '@/public/images/homepage/HowItWorks/image-create-shoe.png';
import ConnectShoe from '@/public/images/homepage/HowItWorks/image-connect-cards.png';

import { useTranslations } from 'next-intl';

export default function HowItWorks() {
  const t = useTranslations();

  return (
    <div className="h-screen w-full flex justify-center">
      <div className="bg-primary-navy h-full w-full lg:w-[95%] lg:h-full flex flex-col justify-center items-center gap-12 lg:gap-0 px-12 py-20 lg:p-32">
        <div className="flex flex-col gap-8 justify-center items-center w-full  lg:pb-20">
          <Image
            src={HowItWorksHeader}
            alt="How It Works"
            className="w-11/12 lg:w-6/12 mx-auto h-auto"
          />
          <Text variant="cardCaption" className="text-primary-bone text-center">
            {t.rich('homepage_how_it_works_subheading', {
              orange: (chunks) => (
                <span className="text-primary-orange">{chunks}</span>
              ),
            })}
          </Text>
        </div>
        <div className="flex w-full items-center justify-evenly">
          <div className="flex flex-col items-center gap-2">
            <div className="w-auto lg:w-9/12">
              <Image src={ConnectShoe} alt="Connect Shoe" />
            </div>
            <H4
              variant="h4BoldC"
              className="text-primary-bone text-center text-2xl lg:text-4xl font-bold"
            >
              {t('homepage_how_it_works_connect')}
            </H4>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-auto lg:w-9/12">
              <Image src={CreateShoe} alt="Create Shoe" />
            </div>
            <H4
              variant="h4BoldC"
              className="text-primary-bone text-center text-2xl lg:text-4xl font-bold"
            >
              {t('homepage_how_it_works_create')}
            </H4>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-auto lg:w-9/12">
              <Image src={CollabCards} alt="Collab Cards" />
            </div>
            <H4
              variant="h4BoldC"
              className="text-primary-bone text-center text-2xl lg:text-4xl font-bold"
            >
              {t('homepage_how_it_works_collab')}
            </H4>
          </div>
        </div>
      </div>
    </div>
  );
}
