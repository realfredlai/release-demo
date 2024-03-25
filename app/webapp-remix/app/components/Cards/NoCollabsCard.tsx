import { useTranslations } from 'next-intl';

import { Card } from '@reebok/frontend-components';
import { Text } from '@/app/components/Text/Text';

import { H6 } from '@/app/components/Text/H6';

type NoCollabsCardProps = {
  onOpenModal: () => void;
};

export default function NoCollabsCard(props: NoCollabsCardProps) {
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
        <H6 className="w-full">{t('locker_creations_no_collabs')}</H6>
        <div>
          <Text variant="body" className="text-center">
            {t('locker_creations_no_collaborations_yet')}
          </Text>
          <Text variant="body" className="text-center">
            {t('locker_creations_invite_your_friends')}
          </Text>
        </div>
      </div>
    </Card>
  );
}
