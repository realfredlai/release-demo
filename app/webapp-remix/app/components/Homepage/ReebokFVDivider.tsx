'use client';
import Image from 'next/image';
import Link from 'next/link';

import { useTranslations } from 'next-intl';

import ReebokLogoBone from '@/public/images/logos/logo-reebok-bone.svg';
import FutureverseLogo from '@/public/images/logos/logo-fv.svg';
import XIcon from '@/public/images/homepage/PerfectPair/icon-cross.svg';
import PerfectPairTop from '@/public/images/homepage/PerfectPair/image-perfect-pair-top.svg';
import PerfectPairBottom from '@/public/images/homepage/PerfectPair/image-perfect-pair-bottom.svg';

import { Button } from '@reebok/frontend-components';
import { Text } from '@/app/components/Text/Text';

export default function ReebokFVDivider() {
  const t = useTranslations();

  return (
    <div className="bg-primary-brown lg:w-[95%] mx-auto lg:mt-64 flex items-center justify-center">
      <div className="text-primary-bone w-full h-full">
        <div className="w-full h-full py-20 lg:pt-48 lg:pb-36 gap-16 flex flex-col items-center">
          <div className="h-fit w-full flex flex-col">
            <Image
              src={PerfectPairTop}
              alt={'Perfect Pair Text'}
              className="w-full"
            />
            <Image
              src={PerfectPairBottom}
              alt={'Perfect Pair Text'}
              className="w-full"
            />
          </div>
          <div className="flex flex-auto flex-col flex-wrap align-center justify-center items-center gap-8 lg:py-12 text-center">
            <div className="flex justify-center items-center gap-4">
              <Image
                src={ReebokLogoBone}
                alt={'Reebok Logo'}
                className="w-16 md:w-[10rem] h-auto"
              />
              <Image
                src={XIcon}
                alt={'X Icon'}
                className="w-6 h-6 md:w-10 md:h-10"
              />
              <Image
                src={FutureverseLogo}
                alt={'Futureverse Logo'}
                className="w-14 md:w-[7rem] h-auto"
              />
            </div>
            <Text
              variant="cardCaption"
              className="flex-wrap w-full lg:text-center lg:text-2xl md:w-7/12 md:mx-auto"
            >
              {t('homepage_perfect_pair_subheading')}
            </Text>

            <Link href="/about">
              <Button
                variant="secondary"
                size="md"
                className="flex justify-center mt-3"
              >
                {t('homepage_perfect_pair_learn_more')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
