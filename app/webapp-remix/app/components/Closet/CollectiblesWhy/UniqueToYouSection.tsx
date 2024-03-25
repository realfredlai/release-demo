import { useTranslations } from 'next-intl';

import Image from 'next/image';
import { H2 } from '@/app/components/Text/H2';
import { H5 } from '@/app/components/Text/H5';
import { Text } from '@/app/components/Text/Text';
import ViewTheInspirationGallery from '@/app/components/ViewTheInspirationGallery/ViewTheInspirationGallery';

import UniqueToYouImage from '@/public/images/closet/CollectibleInfoImages/image-unique-to-you.png';

const UniqueToYouSection = () => {
  const t = useTranslations();

  return (
    <div className="container grid-layout">
      <Image
        src={UniqueToYouImage}
        alt="Unique To You Card Image"
        className="row-start-1 col-span-full md:justify-self-center lg:justify-self-auto md:w-8/12 lg:w-11/12 xlg:w-11/12 lg:col-start-1 lg:col-end-6 lg:-mt-20 xlg:-mt-72"
      />
      <div className="flex-col items-center gap-mobiles grid col-span-full row-start-2 lg:row-start-1 lg:col-start-6 lg:col-end-13 xlg:h-fit">
        <div className="flex flex-col gap-2">
          <H5 variant="h5Extra">
            {t('locker_collectibles_unique_to_you_heading')}
          </H5>
          <H2 variant="h2Regular">
            {t('locker_collectibles_unique_to_you_subheading')}
          </H2>

          <Text variant="leadParagraph">
            {t('locker_collectibles_unique_to_you_description')}
          </Text>

          <ViewTheInspirationGallery
            label={t('locker_collectibles_unique_to_you_discover_more')}
          />
        </div>

        <div className="flex flex-col gap-1">
          <Text variant="leadParagraph" weight="bold">
            {t('locker_collectibles_unique_to_you_plus_youll_enjoy')}
          </Text>
          <ul className="list-disc list-inside pl-4">
            {Array.from({ length: 5 }, (_, index) => (
              <Text variant="leadParagraph" className="list-item" key={index}>
                {t(`locker_collectibles_unique_to_you_bullet_${index + 1}`)}
              </Text>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UniqueToYouSection;
