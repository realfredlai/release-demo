import { Button, cn } from '@reebok/frontend-components';
import { Icons } from '@/app/components/Icons';
import DeleteShoeModal from '../Closet/DeleteShoeModal/DeleteShoeModal';
import { Text } from '../Text/Text';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

type DeleteRemixButtonProps = {
  shoeId: string;
  isCollabCard: boolean;
  hideDelete?: boolean; // on the gallery/owned
};

export const DeleteRemixButton = ({
  shoeId,
  isCollabCard,
  hideDelete,
}: DeleteRemixButtonProps) => {
  const t = useTranslations();
  const [deleteCollabModalOpen, setDeleteCollabModalOpen] = useState(false);
  const handleDeleteImpact = () => {
    setDeleteCollabModalOpen(!deleteCollabModalOpen);
  };

  if (hideDelete) {
    return null;
  }

  return (
    <>
      <Button
        variant="link"
        className={cn(
          'mt-4 p-1 h-auto font-bold text-primary-navy text-center w-full uppercase font-neue-plak text-xs hover:opacity-65 hover:text-primary-navy transition-opacity duration-150 no-underline hover:no-underline',
          { 'text-primary-bone hover:text-primary-bone': isCollabCard }
        )}
        onClick={handleDeleteImpact}
      >
        <Icons.XIcon
          className={cn('w-3 h-3 mr-2 fill-primary-navy', {
            'fill-primary-bone': isCollabCard,
          })}
        />
        {isCollabCard
          ? t('card_button_delete_collaboration')
          : t('card_button_delete_creation')}
      </Button>
      <DeleteShoeModal
        title={t('locker_detail_are_you_sure')}
        open={deleteCollabModalOpen}
        remixId={shoeId}
        setOpen={setDeleteCollabModalOpen}
      >
        <Text variant="lgBody">{t('locker_detail_delete_shoe_warning')}</Text>
      </DeleteShoeModal>
    </>
  );
};
