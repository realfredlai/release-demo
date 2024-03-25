'use client';
import Image from 'next/image';

import { useTranslations } from 'next-intl';
// import { useSearchParams } from 'next/navigation';

import AccessYourSneakerCloset from '@/app/components/Homepage/AccessYourSneakerCloset';
import UnlockYourSigStyle from '@/app/components/Homepage/UnlockYourSigStyle';

import { getConfig } from '@reebok/shared';

import { Button } from '@reebok/frontend-components';
import { Text } from '@/app/components/Text/Text';
import { H2 } from '@/app/components/Text/H2';
import { H3 } from '@/app/components/Text/H3';

import LandingHeader from '@/public/images/homepage/image-landing-header.svg';
import InstagramLinkIcon from '@/public/images/icons/icon-instagram-link.png';

import { useFutureverse } from '@futureverse/react';

export default function HeroSection() {
  const t = useTranslations();

  const { userSession } = useFutureverse();

  const signupCode = localStorage.getItem('signup_code');
  const username = localStorage.getItem('username');

  const user = userSession?.user;

  return (
    // TODO: Change background image to luma mesh and dynamic shoe
    <div className="bg-homepage-landing-bg bg-cover bg-center h-screen w-full">
      <div className="container grid-layout h-full pb-8 lg:pb-0 lg:h-5/6">
        <div className="grid col-start-1 col-end-5 lg:col-end-7 self-end md:self-center mb-16 lg:mb-8 gap-4">
          {user && (
            <div className="text-primary-bone grid gap-4 break-all mt-24 lg:mt-36">
              <H3 variant="h3BoldC">{t('homepage_landing_welcome_back')}</H3>
              {/* TODO: USERNAME AFTER INTEGRATION */}
              <H2
                variant="h2Extra"
                className="text-8xl lg:text-10xl leading-[80%]"
              >
                {username}
              </H2>
            </div>
          )}
          {!user && (
            <>
              <Image src={LandingHeader} alt="LIFE MAKES AN IMPACT" />
              <Text
                variant="cardCaption"
                className="text-primary-bone text-left leading-none text-shadow"
              >
                {t('homepage_splash_header_caption')}
              </Text>
              {!signupCode && (
                <Button
                  variant="primary"
                  size="lg"
                  className="flex justify-end gap-3 h-[3.75rem] w-[16.5625rem]"
                  onClick={() =>
                    (window.location.href = getConfig().instagram
                      .reebokInbox as string)
                  }
                >
                  <Text variant="smButton">
                    {t('homepage_splash_header_button')}
                  </Text>
                  <Image
                    src={InstagramLinkIcon}
                    alt="Instagram Link Icon"
                    className="mr-2"
                    height="50"
                  />
                </Button>
              )}
            </>
          )}
        </div>
        {user && (
          <div className="grid col-start-1 col-end-5 md:col-end-9 lg:col-end-13 items-end">
            <AccessYourSneakerCloset />
          </div>
        )}
        {signupCode && !user && (
          <div className="grid col-start-1 col-end-5 md:col-end-9 lg:col-end-13 items-end">
            <UnlockYourSigStyle />
          </div>
        )}
      </div>
    </div>
  );
}
