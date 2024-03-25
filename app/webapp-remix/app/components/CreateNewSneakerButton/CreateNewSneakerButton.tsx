import { useState } from 'react';

import Image from 'next/image';

import { useTranslations } from 'next-intl';
import { getConfig } from '@reebok/shared';

import { Button } from '@reebok/frontend-components';
import { Text } from '@/app/components/Text/Text';
import ImageButtonModal from '@/app/components/Modals/ImageButtonModal';

import PlusMarkIcon from '@/public/images/icons/icon-plusmark-bone.svg';
import CreateNewSneakerImg from '@/public/images/closet/image_create_new_sneaker.png';

export default function CreateNewSneakerButton() {
  const t = useTranslations();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleNewModalOpenClick = () => {
    setIsModalOpen(!isModalOpen);
  };

  const DescriptionText = () => (
    <Text variant="lgBody">{t('locker_creations_create_description')}</Text>
  );

  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-6 text-primary-orange">
      <ImageButtonModal
        open={isModalOpen}
        setOpen={setIsModalOpen}
        imageSrc={CreateNewSneakerImg}
        title={t('locker_creations_create_heading')}
        description={<DescriptionText />}
        primaryButtonLabel={t('locker_creations_create_send_message')}
        onPrimaryButtonClick={() => {
          window.location.href = getConfig().instagram.reebokInbox as string;
        }}
      >
        <Button
          variant="primary"
          size="icon"
          className="h-20 w-20 p-2"
          onClick={handleNewModalOpenClick}
        >
          <Image src={PlusMarkIcon} alt="Plus Mark Icon" className="m-auto" />
        </Button>
      </ImageButtonModal>
      <Text variant="smButton" className="pointer-events-none select-none">
        {t('locker_creations_create_new_sneaker')}
      </Text>
    </div>
  );
}
