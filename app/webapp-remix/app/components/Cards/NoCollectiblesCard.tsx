import { useTranslations } from 'next-intl';

import { Card } from '@reebok/frontend-components';
import { Text } from '@/app/components/Text/Text';
import { H6 } from '@/app/components/Text/H6';

export default function NoCollectiblesCard() {
  const t = useTranslations();

  return (
    <Card className="h-[490px] md:h-[400px] lg:h-[590px] border-none bg-primary-bone bg-opacity-10 text-primary-bone select-none">
      <div className="w-full h-full text-center flex flex-col justify-center items-center gap-2 p-mobiles">
        <H6> {t('locker_collectibles_no_collectibles')}</H6>
        <div>
          <Text variant="body">
            {t('locker_collectibles_no_digital_collectibles')}
          </Text>
        </div>
      </div>
    </Card>
  );
}
