import { useTranslations } from 'next-intl';

import { Card } from '@reebok/frontend-components';
import { Text } from '@/app/components/Text/Text';
import { H7 } from '@/app/components/Text/H7';

type StartNewCollabCardProps = {
  onOpenModal: () => void;
};

export default function StartNewCollabCard(props: StartNewCollabCardProps) {
  const t = useTranslations();

  const handleStartCollabClick = () => {
    props.onOpenModal();
  };

  return (
    <Card
      className="h-[490px] md:h-[440px] xlg:h-[640px] p-4 border-none bg-primary-bone bg-opacity-10 text-white cursor-pointer"
      onClick={handleStartCollabClick}
    >
      <div className="w-full h-full flex flex-col justify-center items-center text-center gap-4 select-none">
        <H7>{t('locker_creations_start_new_collab')}</H7>
        <Text variant="body">{t('locker_creations_invite_your_friends')}</Text>
      </div>
    </Card>
  );
}
