'use client';
import Image from 'next/image';

import { useTranslations } from 'next-intl';

import { Text } from '@/app/components/Text/Text';
import { H3 } from '@/app/components/Text/H3';

import InstagramReebokIcon from '@/public/images/icons/icon-instagram-reebok.png';

import CreateHeader from '@/public/images/homepage/HowItWorks/image-create-header.svg';
import CreateCard from '@/public/images/homepage/HowItWorks/Create/image-create-card.png';
import CreateMotionTop from '@/public/images/homepage/HowItWorks/Create/image-create-top.png';
import CreateMotionBottom from '@/public/images/homepage/HowItWorks/Create/image-create-bottom.png';
import { InstagramLink } from './InstagramLink';

export default function HowItWorksStep2() {
  const t = useTranslations();

  return (
    <>
      <div className="h-screen w-full flex justify-center relative overflow-hidden">
        <div className="h-5/6 w-[150%] md:h-full md:w-11/12 absolute top-0 rotate-45 md:rotate-0 md:top-0 left-[5%] mix-blend-screen overflow-hidden">
          <Image
            src={CreateMotionTop}
            alt="Motion Image Top"
            width={768}
            height={1024}
            className="w-full h-full"
          />
        </div>
        <div className="h-3/5 -rotate-12 w-[150%] md:h-full md:w-11/12 absolute top-1/2 md:bottom-0 right-2/3 md:right-[5%] mix-blend-screen overflow-hidden">
          <Image
            src={CreateMotionBottom}
            alt="Motion Image Bottom"
            width={768}
            height={1024}
            className="h-full w-full"
          />
        </div>
        <div
          className="
          bg-primary-dark-green
          h-screen
          w-full
          lg:w-[95%]
          lg:h-full
          flex
          flex-col
          lg:flex-row
          justify-center
          lg:justify-between
          items-center
          gap-8
          px-8
          py-24
          lg:gap-0
          lg:px-36
          lg:py-28
        "
        >
          <div className="flex flex-col items-center lg:items-start gap-2 flex-wrap  w-3/4 md:w-3/5 lg:w-1/2 z-10">
            <H3 variant="h3BoldC" className="text-primary-bone">
              {t('homepage_how_it_works_step2')}
            </H3>
            <div className="h-auto w-10/12 my-4">
              <Image src={CreateHeader} alt="Create Header" />
            </div>
            <Text
              variant="cardCaption"
              className="text-primary-bone text-shadow"
            >
              {t('homepage_how_it_works_step2_subheading')}
            </Text>
            <InstagramLink />
          </div>

          <div className="relative h-auto w-10/12 md:w-1/3">
            <Image
              src={InstagramReebokIcon}
              alt="Instagram Reebok Icon"
              className="h-fit w-16 absolute -left-8 bottom-20 md:bottom-24 md:w-20 lg:-bottom-4 lg:-left-20"
            />

            <Image src={CreateCard} alt="CreateCard" />
          </div>
        </div>
      </div>
    </>
  );
}
