'use client';
import Image from 'next/image';

import { useTranslations } from 'next-intl';

import { Text } from '@/app/components/Text/Text';
import { H3 } from '@/app/components/Text/H3';

import ConnectHeader from '@/public/images/homepage/HowItWorks/image-connect-header.svg';
import ConnectInsta from '@/public/images/homepage/HowItWorks/image-connect-insta.png';
import { InstagramLink } from './InstagramLink';

export default function HowItWorksStep1() {
  const t = useTranslations();

  return (
    <>
      <div className="h-screen w-full flex justify-center">
        <div className="bg-primary-navy w-full lg:w-[95%] h-full flex flex-col lg:flex-row  items-center lg:justify-between gap-12 px-8 py-20 lg:gap-0 lg:px-36 lg:py-28">
          <div className="flex flex-col items-center lg:items-start gap-2 flex-wrap w-9/12 md:w-3/5 lg:w-1/2">
            <H3 variant="h3BoldC" className="text-primary-bone">
              {t('homepage_how_it_works_step1')}
            </H3>
            <div className="h-auto w-11/12 my-2">
              <Image
                src={ConnectHeader}
                alt="Connect Header"
                width={657}
                height={152}
                className="w-full h-auto"
              />
            </div>
            <Text
              variant="cardCaption"
              className="text-primary-bone text-shadow"
            >
              {t.rich('homepage_how_it_works_step1_subheading', {
                orange: (chunks) => (
                  <span className="text-primary-orange">{chunks}</span>
                ),
              })}
            </Text>

            <InstagramLink />
          </div>
          <div className="h-auto w-8/12 md:w-6/12 lg:w-5/12 ">
            <Image src={ConnectInsta} alt="Connect Instagram Grid" />
          </div>
        </div>
      </div>
    </>
  );
}
