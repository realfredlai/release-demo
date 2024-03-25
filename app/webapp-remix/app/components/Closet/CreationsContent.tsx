import { memo, useState } from 'react';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { Button } from '@reebok/frontend-components';
import { H7 } from '@/app/components/Text/H7';
import ImageButtonModal from '@/app/components/Modals/ImageButtonModal';
import DynamicOriginalsDisplay from '@/app/components/Closet/DynamicCardDisplays/DynamicOriginalsDisplay';
import { Text } from '@/app/components/Text/Text';

import PlusMarkIcon from '@/public/images/icons/icon-plusmark-bone.svg';
import CreateNewSneakerImg from '@/public/images/closet/image_create_new_sneaker.png';

import { RemixItem } from '@reebok/backend-libs';
import { getConfig } from '@reebok/shared';
import { LoadingAnimation } from '@/app/components/LoadingAnimation';
// import { CurrencySwapButton } from '../Buttons/CurrencySwapButton';

type CreationsContentProps = {
  originalRemixes: RemixItem[];
};

export const CreationsContent = memo((props: CreationsContentProps) => {
  const t = useTranslations();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (props.originalRemixes == undefined || props.originalRemixes == null) {
    return <LoadingAnimation />;
  }

  const handleNewModalOpenClick = () => {
    setIsModalOpen(!isModalOpen);
  };

  const DescriptionText = () => (
    <Text variant="lgBody">{t('locker_creations_create_description')}</Text>
  );

  return (
    <div className="w-full flex flex-col gap-mobiles lg:gap-xs">
      {/* NOTE: we're not doing crypto payments for the demo anymore. leaveing this here for later...
      <div className="flex justify-between items-end lg:items-center">
        <div className="flex flex-col lg:flex-row gap-mobiles lg:gap-6 items-center">
          <H7 className="font-neue-plak-bold-condense text-primary-navy">
            {t('locker_creations_originals')}
          </H7>
          <ImageButtonModal
            open={isModalOpen}
            setOpen={setIsModalOpen}
            imageSrc={CreateNewSneakerImg}
            title={t('locker_creations_create_heading')}
            description={<DescriptionText />}
            primaryButtonLabel={t('locker_creations_create_send_message')}
            onPrimaryButtonClick={() => {
              window.location.href = getConfig().instagram
                .reebokProfile as string;
            }}
          >
            <Button
              variant="primary"
              className="w-fit h-full px-8 py-3.5 justify-center gap-2"
              onClick={handleNewModalOpenClick}
            >
              <Image src={PlusMarkIcon} width="25" alt="X Mark" />
              <div className="h-auto">{t('locker_creations_new')}</div>
            </Button>
          </ImageButtonModal>
        </div>

        <CurrencySwapButton buttonColorVariant="navyOutline" />
      </div>
       */}

      {/*NOTE: remove below code and use above once crypto payments are ready */}
      <div className="flex justify-between items-center">
        <H7 className="font-neue-plak-bold-condense text-primary-navy">
          {t('locker_creations_originals')}
        </H7>
        <ImageButtonModal
          open={isModalOpen}
          setOpen={setIsModalOpen}
          imageSrc={CreateNewSneakerImg}
          title={t('locker_creations_create_heading')}
          description={<DescriptionText />}
          primaryButtonLabel={t('locker_creations_create_send_message')}
          onPrimaryButtonClick={() => {
            window.location.href = getConfig().instagram
              .reebokProfile as string;
          }}
        >
          <Button
            variant="primary"
            className="w-fit h-full lg:w-[266px] justify-center gap-2"
            onClick={handleNewModalOpenClick}
          >
            <Image src={PlusMarkIcon} width="25" alt="X Mark" />
            <div className="h-auto">{t('locker_creations_new')}</div>
          </Button>
        </ImageButtonModal>
      </div>

      <div className="w-full grid-layout grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <DynamicOriginalsDisplay originalRemixes={props.originalRemixes} />
      </div>
    </div>
  );
});

CreationsContent.displayName = 'CreationsContent';

export default CreationsContent;
