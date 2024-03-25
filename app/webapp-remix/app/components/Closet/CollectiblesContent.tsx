import { MintItem } from '@reebok/backend-libs';
import { memo } from 'react';

import { useTranslations } from 'next-intl';

import { H7 } from '@/app/components/Text/H7';

import DynamicCollectiblesDisplay from '@/app/components/Closet/DynamicCardDisplays/DynamicCollectiblesDisplay';

type CollectiblesContentProps = {
  collectibleRemixes: MintItem[];
};

const CollectiblesContent = memo((props: CollectiblesContentProps) => {
  const t = useTranslations();

  return (
    <div className="w-full flex flex-col gap-mobiles lg:gap-xs">
      <H7 className="font-neue-plak-bold-condense text-primary-bone h-full">
        {t('locker_tabs_collectibles')}
      </H7>

      <div className="w-full grid-layout grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xlg:grid-cols-4 gap-4">
        <DynamicCollectiblesDisplay
          collectibleRemixes={props.collectibleRemixes}
        />
      </div>
    </div>
  );
});

CollectiblesContent.displayName = 'CollectiblesContent';

export default CollectiblesContent;
