import { useTranslations } from 'next-intl';

import Image from 'next/image';

import { H2 } from '@/app/components/Text/H2';
import { H5 } from '@/app/components/Text/H5';
import { Text } from '@/app/components/Text/Text';

import BeInToWinImage from '@/public/images/closet/CollectibleInfoImages/image-be-in-to-win.png';

const BeInToWinSection = () => {
  const t = useTranslations();

  return (
    <div className="container grid-layout">
      <Image
        src={BeInToWinImage}
        alt="Be In To Win Card Stack Image"
        className="row-start-1 col-span-full md:justify-self-center lg:justify-self-auto md:w-8/12 lg:w-full lg:col-start-1 lg:col-end-6"
      />
      <div className="flex-col items-center gap-2 grid col-span-full row-start-2 lg:row-start-1 lg:col-start-6 lg:col-end-12">
        <div className="flex flex-col gap-2">
          <H5 variant="h5Extra">
            {t('locker_collectibles_be_in_to_win_heading')}
          </H5>
          <H2 variant="h2Regular">
            {t('locker_collectibles_be_in_to_win_subheading')}
          </H2>

          <div>
            <Text variant="leadParagraph" weight="bold">
              {t('locker_collectibles_be_in_to_win_prize_details')}
            </Text>
            <Text variant="leadParagraph">
              {t('locker_collectibles_be_in_to_win_description')}
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeInToWinSection;
