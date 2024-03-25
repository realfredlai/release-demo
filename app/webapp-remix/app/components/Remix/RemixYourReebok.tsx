import { useTranslations } from 'next-intl';

import { Button, cn } from '@reebok/frontend-components';
import { H4 } from '@/app/components/Text/H4';
import AIArtSheet from '@/app/components/Remix/AIArtSheet';
import ColorSheet from '@/app/components/Remix/ColorSheet';
import PlacementSheet from '@/app/components/Remix/PlacementSheet';
import { Icons } from '@/app/components/Icons';

import { useEditStateStore } from '@/app/store/ShoeRemixStore';
import { useUnityContext } from '@/app/hooks/useUnityContext';
import { useIsUnsavedChanges } from '@/app/hooks/useIsUnsavedChanges';

export function RemixYourReebok() {
  const t = useTranslations();

  const { showEditState } = useEditStateStore();
  const { changeViewTarget } = useUnityContext();
  const { isUnsavedChanges } = useIsUnsavedChanges();

  return (
    <div className="container grid-layout absolute inset-0 h-full w-full">
      <div
        className={cn(
          'grid col-span-full lg-max-xlg:col-start-1 md:col-end-9 lg:col-end-4 justify-self-center lg:justify-items-start w-full self-end lg:self-center gap-8 mb-6 lg:mb-0 opacity-100 transition-opacity duration-300',
          {
            'opacity-0': showEditState,
          },
          {
            'mb-32': isUnsavedChanges,
          }
        )}
      >
        <H4
          variant="h4Extra"
          className="text-primary-bone select-none text-center lg:text-left sm:text-[40px]"
        >
          {t('customizer_remix_your_reebok_heading')}
        </H4>
        <div className="flex gap-6 justify-center lg:justify-start w-auto text-primary-orange pointer-events-auto select-none">
          <AIArtSheet />
          <ColorSheet />
          <PlacementSheet />
        </div>

        <div className="flex flex-col gap-4 m-0 pointer-events-auto select-none items-center lg:items-start ">
          <Button
            variant="orangeOutline"
            className="relative w-[270px] lg:w-[306px] group-hover:fill-primary-orange-hover transition-colors"
            size="lg"
            onClick={() => {
              changeViewTarget('Sole');
            }}
          >
            <Icons.OriginalImageIcon className="ml-6" />
            <span className="m-auto ml-12 lg:ml-16">
              {t('customizer_original_image')}
            </span>
          </Button>
          <Button
            className="w-[270px] lg:w-[306px]"
            variant="primary"
            size="lg"
            disabled
            // TODO: WHEN CLICKED, OPEN MINTING FLOW MODAL
          >
            {t('locker_originals_purchase')}: 99 ROOT
          </Button>
        </div>
      </div>
    </div>
  );
}
