import Link from 'next/link';

import { useTranslations } from 'next-intl';

import { Button } from '@reebok/frontend-components';
import { Text } from '@/app/components/Text/Text';
import { H2 } from '@/app/components/Text/H2';

export default function AccessYourSneakerCloset() {
  const t = useTranslations();

  return (
    <div className="h-fit lg:h-32 w-full text-primary-bone flex justify-center">
      <div className="bg-primary-orange w-full h-full flex flex-col lg:flex-row items-center justify-center gap-4 p-6 lg:p-8">
        <div className="flex flex-col items-start flex-wrap w-full">
          <H2 variant="h2BoldC">{t('homepage_access_my_sneaker_closet')}</H2>
          <Text
            variant="body"
            className="text-base sm:text-lg lg:text-xl leading-none sm:leading-none lg:leading-none mt-2"
          >
            {t('homepage_access_my_sneaker_closet_subheading')}
          </Text>
        </div>
        <div className="flex w-full lg:w-fit">
          <Link href="/closet" className="w-full">
            <Button
              variant="secondary"
              size="lg"
              className="flex justify-center w-full lg:w-fit"
            >
              {t('homepage_view_my_sneaker_closet')}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
