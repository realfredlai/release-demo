import { useTranslations } from 'next-intl';

import Image from 'next/image';

import { H2 } from '@/app/components/Text/H2';
import { H5 } from '@/app/components/Text/H5';
import { Text } from '@/app/components/Text/Text';

import SelfExpressionImage from '@/public/images/closet/CollectibleInfoImages/image-self-expression.png';

const SelfExpressionSection = () => {
  const t = useTranslations();

  return (
    <div className="container grid-layout">
      <Image
        src={SelfExpressionImage}
        alt="Digital Self-Expression Card Image"
        className="row-start-1 col-span-full md:justify-self-center md:w-8/12 lg:w-full lg:col-start-8 xlg:col-start-8 lg:col-end-13"
      />
      <div className="flex-col items-center gap-2 grid col-span-full row-start-2 lg:row-start-1 lg:col-start-1 lg:col-end-8">
        <div className="flex flex-col gap-2">
          <H5 variant="h5Extra" className="lg:w-11/12">
            {t('locker_collectibles_digital_self_expression_heading')}
          </H5>
          <H2 variant="h2Regular">
            {t('locker_collectibles_digital_self_expression_subheading')}
          </H2>

          <Text variant="leadParagraph">
            {t('locker_collectibles_digital_self_expression_description')}
          </Text>
        </div>
      </div>
    </div>
  );
};

export default SelfExpressionSection;
