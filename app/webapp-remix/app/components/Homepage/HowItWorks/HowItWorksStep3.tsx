'use client';
import Image from 'next/image';

import { useTranslations } from 'next-intl';

import { Text } from '@/app/components/Text/Text';
import { H3 } from '@/app/components/Text/H3';

import CollabHeader from '@/public/images/homepage/HowItWorks/image-collab-header.svg';
import CollabCardBottom from '@/public/images/homepage/HowItWorks/Collab/image-collab-bottom.png';
import CollabCardLeft from '@/public/images/homepage/HowItWorks/Collab/image-collab-left.png';
import CollabCardTop from '@/public/images/homepage/HowItWorks/Collab/image-collab-top.png';
import { InstagramLink } from './InstagramLink';

export default function HowItWorksStep3() {
  const t = useTranslations();

  return (
    <>
      <div className="h-screen w-full flex justify-center relative overflow-hidden">
        <div
          className="
        bg-homepage-collab-bg
        bg-cover
        bg-bottom
        bg-no-repeat
        h-screen
        w-full
        lg:w-[95%]
        lg:h-full
        flex
        flex-col
        lg:flex-row
        lg:justify-between
        justify-center
        items-center
        gap-8
        px-8
        py-24
        lg:gap-0
        lg:px-36
        lg:py-28"
        >
          <div className="flex flex-col items-center lg:items-start  w-3/4 md:w-3/5 lg:w-1/2 gap-2 z-10">
            <H3 variant="h3BoldC" className="text-primary-bone">
              {t('homepage_how_it_works_step3')}
            </H3>
            <div className="h-auto w-10/12 my-4">
              <Image src={CollabHeader} alt="Collab Header" />
            </div>
            <Text
              variant="cardCaption"
              className="text-primary-bone text-shadow"
            >
              {t('homepage_how_it_works_step3_subheading')}
            </Text>
            <InstagramLink />
          </div>

          <div className="relative h-full w-full lg:w-5/12">
            <Image
              src={CollabCardTop}
              alt="Collab Card Top"
              className="w-4/12 hidden lg:block h-auto absolute -top-14 lg:-top-24 right-0"
            />
            <Image
              src={CollabCardLeft}
              alt="Collab Card Left"
              className="w-1/3 h-auto absolute -left-4 lg:-left-20 top-0 lg:top-1/3"
            />
            <Image
              src={CollabCardBottom}
              alt="Collab Card Bottom"
              className="w-8/12 h-auto md:w-1/3 lg:w-7/12 absolute -bottom-16 -right-3 lg:right-8"
            />
          </div>
        </div>
      </div>
    </>
  );
}
