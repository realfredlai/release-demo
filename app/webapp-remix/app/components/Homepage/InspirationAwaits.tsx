'use client';
import Image from 'next/image';

import { useTranslations } from 'next-intl';

import { Text } from '@/app/components/Text/Text';
import ViewTheInspirationGallery from '@/app/components/ViewTheInspirationGallery/ViewTheInspirationGallery';

import InspirationHeader from '@/public/images/homepage/InspirationAwaits/image-inspiration-header.svg';
import cardCollage from '@/public/images/homepage/InspirationAwaits/sneaker-inspiration-collage.png';

export default function InspirationAwaits() {
  const t = useTranslations();

  return (
    <div
      className="
    bg-primary-bone
     text-primary-navy
     min-h-screen
     w-full
     relative
     py-16
     lg:py-48
     overflow-hidden
     "
    >
      <div className="flex flex-col lg:flex-row">
        <Image
          src={cardCollage}
          width={793}
          height={1071}
          alt="Inspiration gallery"
          className="-ml-[20vw] mb-14 lg:mb-0 relative left-1/12 lg:-ml-[2.6vw] w-[140vw] max-w-[140vw] lg:w-7/12 h-auto"
        />
        <div className="flex flex-col gap-2 lg:gap-4 relative left-0 top-0 pb-8 px-8 lg:absolute lg:left-[38.5vw] lg:top-[38vh]">
          <Image
            src={InspirationHeader}
            alt="Inspiration Awaits Header"
            className="mb-3 lg:mb-5 w-10/12 lg:w-11/12"
          />
          <Text variant="cardCaption" className="text-left">
            {t.rich('homepage_inspiration_subheading', {
              orange: (chunks) => (
                <span className="text-primary-orange">{chunks}</span>
              ),
            })}
          </Text>
          <ViewTheInspirationGallery
            label={t('homepage_inspiration_button')}
            className="leading-none text-base md:text-lg lg:text-xl normal-case"
          />
        </div>
      </div>
    </div>
  );
}
