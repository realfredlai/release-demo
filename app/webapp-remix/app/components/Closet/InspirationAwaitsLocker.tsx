'use client';
import { Button } from '@reebok/frontend-components';
import Image from 'next/image';
import Link from 'next/link';

import { useTranslations } from 'next-intl';

import { Text } from '@/app/components/Text/Text';

import InspirationHeader from '@/public/images/homepage/InspirationAwaits/image-inspiration-header.svg';
import InspirationAwaitsCards from '@/public/images/closet/image-inspiration-awaits-cardstack.png';
import orangeRightCircleArrow from '@/public/images/icons/icon-rightcirclearrow-orange.svg';

export const InspirationAwaitsLocker = () => {
  const t = useTranslations();

  // May be worth abstracting this component out with the homepage InspirationAwaits component in the future
  return (
    <div className="bg-primary-bone h-fit w-full flex flex-col-reverse lg:flex-row justify-between items-center gap-2 px-8 py-24 lg:gap-0 lg:px-36 lg:py-28">
      <div className="flex flex-col items-start gap-2 flex-wrap w-fit">
        <div className="h-auto w-10/12 my-4">
          <Image src={InspirationHeader} alt="Inspiration Awaits Header" />
        </div>
        <Text variant="leadParagraph" className="text-primary-navy">
          {t.rich('homepage_inspiration_subheading', {
            orange: (chunks) => (
              <span className="text-primary-orange">{chunks}</span>
            ),
          })}
        </Text>
        <Link href="/gallery" className="w-fit">
          <Button variant="link" size="noPadding" className="gap-2">
            {t('homepage_inspiration_button')}
            <Image
              src={orangeRightCircleArrow}
              alt="Orange Arrow"
              className="h-full"
            />
          </Button>
        </Link>
      </div>
      <div className="h-auto w-full md:w-8/12 lg:w-5/12 ">
        <Image
          src={InspirationAwaitsCards}
          alt="Inspiration Awaits Cardstack"
        />
      </div>
    </div>
  );
};

export default InspirationAwaitsLocker;
