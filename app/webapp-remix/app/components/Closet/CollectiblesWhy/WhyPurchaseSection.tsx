import { useTranslations } from 'next-intl';

import Image, { StaticImageData } from 'next/image';

import { H4 } from '@/app/components/Text/H4';
import { H5 } from '@/app/components/Text/H5';
import { Text } from '@/app/components/Text/Text';
import ViewTheInspirationGallery from '@/app/components/ViewTheInspirationGallery/ViewTheInspirationGallery';

import WhyPurchaseImage from '@/public/images/closet/CollectibleInfoImages/image-why-purchase.png';
import UniqueToYouImage from '@/public/images/closet/CollectibleInfoImages/image-unique-to-you.png';

import PrizePoolImage from '@/public/images/homepage/ShareYourStory/image-share-3.png';
import PersonalizationImage from '@/public/images/homepage/ShareYourStory/image-share-2.png';

const FeatureItem = ({
  imageSrc,
  title,
}: {
  imageSrc: StaticImageData;
  title: string;
}) => (
  <div className="flex flex-col gap-2 items-center">
    <Image src={imageSrc} alt="" className="h-20 w-auto" />
    <H5 variant="h5BoldC">{title}</H5>
  </div>
);

const WhyPurchaseSection = () => {
  return (
    <div className="container grid-layout">
      <ImageSection />
      <FeatureSection />
    </div>
  );
};

const ImageSection = () => (
  <Image
    src={WhyPurchaseImage}
    alt="Why Purchase Card Stack Image"
    className="row-start-1 col-span-full md:w-8/12 lg:w-11/12 xlg:w-8/12 md:justify-self-center lg:col-start-8 lg:col-end-13 xlg:col-start-8 lg:ml-16 xlg:ml-0 lg:-mt-20"
  />
);

const FeatureSection = () => {
  const t = useTranslations();
  return (
    <div className="flex-col items-center gap-2 lg:flex-row-reverse grid col-span-full row-start-2 lg:row-start-1 lg:col-start-1 lg:col-end-9">
      <div className="flex flex-col gap-2">
        <H4 variant="h4Extra">
          {t('locker_collectibles_whypurchase_heading')}
        </H4>
        <div className="flex justify-between items-center lg:w-8/12 xlg:w-1/2">
          <FeatureItem
            imageSrc={PrizePoolImage}
            title={t('locker_collectibles_whypurchase_prize_pool')}
          />
          <div className="w-px h-16 bg-black opacity-30" />
          <FeatureItem
            imageSrc={PersonalizationImage}
            title={t('locker_collectibles_whypurchase_personalization')}
          />
          <div className="w-px h-16 bg-black opacity-30" />
          <FeatureItem
            imageSrc={UniqueToYouImage}
            title={t('locker_collectibles_whypurchase_ownership')}
          />
        </div>

        <Text variant="lgBody" className="lg:w-4/5">
          {t('locker_collectibles_whypurchase_description')}
        </Text>

        <ViewTheInspirationGallery label={t('homepage_inspiration_button')} />
      </div>
    </div>
  );
};

export default WhyPurchaseSection;
