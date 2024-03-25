'use client';
import Image from 'next/image';
import Link from 'next/link';

import { useTranslations } from 'next-intl';

import { H1 } from '@/app/components/Text/H1';
import { H3 } from '@/app/components/Text/H3';
import { Text } from '@/app/components/Text/Text';
import { Button } from '@reebok/frontend-components';

import { getConfig } from '@reebok/shared';

import OrangeRightArrow from '@/public/images/icons/icon-rightcirclearrow-orange.svg';
import OrangeInstagramIcon from '@/public/images/icons/icon-instagram-orange.png';

import ShareImage1 from '@/public/images/homepage/ShareYourStory/image-share-1.png';
import ShareImage2 from '@/public/images/homepage/ShareYourStory/image-share-2.png';
import ShareImage3 from '@/public/images/homepage/ShareYourStory/image-share-3.png';

export default function ShareYourStory() {
  const t = useTranslations();

  const components = [
    {
      image: ShareImage1,
      buttonHref: getConfig().instagram.reebokProfile as string,
      buttonIcon: OrangeInstagramIcon,
    },
    {
      image: ShareImage2,
      buttonHref: getConfig().instagram.myInbox as string,
      buttonIcon: OrangeRightArrow,
    },
    {
      image: ShareImage3,
      buttonHref: '/prizes',
      buttonIcon: OrangeRightArrow,
    },
  ];

  return (
    <div className="bg-primary-bone text-primary-navy w-full mx-auto lg:w-[95%] relative py-20 px-4">
      <div className="flex flex-col h-fit lg:h-full w-full justify-center items-center gap-4 text-center">
        <H3 variant="h3BoldC" className="pb-4 px-4">
          {t('homepage_share_main_heading')}
        </H3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-center">
          {components.map((component, index) => (
            <div
              className="flex flex-col justify-between items-center text-center gap-3 mb-8 last:mb-0 max-w-md flex-grow-1 lg:min-h-full"
              key={index}
            >
              <Image
                src={component.image}
                alt={t(`homepage_share_heading_${index + 1}`) + ' Image'}
                className="w-7/12 lg:w-9/12 h-auto"
              />
              <H1
                variant="h1BoldC"
                className="w-10/12 h-fit font-bold text-3xl leading-[0.83]"
              >
                {t(`homepage_share_heading_${index + 1}`)}
              </H1>
              <Text
                variant="cardCaption"
                className="w-full lg:text-center lg:w-9/12 leading-tight px-3 lg:px-0"
              >
                {t(`homepage_share_caption_${index + 1}`)}
              </Text>
              <Link href={component.buttonHref}>
                <Button
                  variant="link"
                  size="noPadding"
                  className="text-base sm:text-lg lg:text-xl normal-case"
                >
                  {t(`homepage_share_button_label_${index + 1}`)}
                  <Image
                    src={component.buttonIcon}
                    alt="Orange Icon"
                    className="ml-3 h-5 lg:h-8 -mb-1 w-auto"
                  />
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
