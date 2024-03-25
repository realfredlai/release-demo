import { useTranslations } from 'next-intl';

import { RemixItem } from '@reebok/backend-libs';

import { H7 } from '@/app/components/Text/H7';
import DynamicCollabsDisplay from '@/app/components/Closet/DynamicCardDisplays/DynamicCollabsDisplay';
import { LoadingAnimation } from '@/app/components/LoadingAnimation';

type CollaborationsProps = {
  collabs: RemixItem[];
};

export const Collaborations = (props: CollaborationsProps) => {
  const t = useTranslations();

  if (props.collabs === undefined) {
    return <LoadingAnimation />;
  }

  return (
    <div className="w-full h-fit bg-primary-dark-green">
      <div className="container grid-layout h-fit pt-mobilel lg:pt-s pb-16 lg:pb-m auto-rows-min">
        <div className="w-full flex flex-col gap-xs col-span-full">
          <div className="flex justify-between items-center">
            <H7 className="font-neue-plak-bold-condense text-white">
              {t('locker_creations_collaborations')}
            </H7>
          </div>
          <div className="w-full grid-layout grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <DynamicCollabsDisplay collabRemixes={props.collabs} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collaborations;
