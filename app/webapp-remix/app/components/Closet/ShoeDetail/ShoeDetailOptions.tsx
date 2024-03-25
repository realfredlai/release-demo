import { useTranslations } from 'next-intl';
import { Button, cn } from '@reebok/frontend-components';
import { Text } from '@/app/components/Text/Text';
import { ShoeType } from '@/app/components/Closet/ShoeDetail';
import Link from 'next/link';

import { getLogger } from '@reebok/shared';

import { PurchaseButton } from '@/app/components/Buttons/PurchaseButton';
import { useShoeLockerStore } from '@/app/store/ShoeLockerStore';
// import { CurrencySwapButton } from '@/app/components/Buttons/CurrencySwapButton';

const logger = getLogger('components.locker.ShoeDetailOptions');

type ShoeDetailOptionsProps = {
  shoeType: ShoeType;
  shoeId: string;
  userId: string;
  futurepassAddress: string;
  claimedState: string;
  moderationStatus: string;
};

const ShoeDetailOptions: React.FC<ShoeDetailOptionsProps> = ({
  shoeType,
  shoeId,
  userId,
  futurepassAddress,
  claimedState,
  moderationStatus,
}) => {
  logger.debug('onLoad', '', {
    userId,
    shoeId,
    shoeType,
    futurepassAddress,
    claimedState,
    moderationStatus,
  });

  const t = useTranslations();

  const { isPFPUnityOpen } = useShoeLockerStore();

  const isCollectibles = shoeType === 'collectibles';

  return (
    <div
      className={cn(
        'bg-primary-navy h-fit p-8 flex gap-2 md:gap-8 justify-center sticky bottom-0',
        { hidden: isPFPUnityOpen }
      )}
    >
      {!isCollectibles ? (
        <div className="lg:pr-0 flex flex-col mx-auto md:flex-row gap-2 lg:gap-8">
          <div className="flex-col md:flex-row flex gap-2 lg:gap-8">
            <Link href={`/remix/${shoeId}`} className="inline-block w-full">
              <Button variant="tertiary" className="w-full px-14 lg:px-16">
                <Text variant="smButton">
                  {t('locker_originals_customize')}
                </Text>
              </Button>
            </Link>

            <PurchaseButton
              shoeId={shoeId}
              claimedState={claimedState}
              moderationStatus={moderationStatus}
            />
          </div>

          {/* NOTE: we're not doing crypto payments for the demo anymore. leaveing this here for later...
          <div className="lg:absolute lg:right-12">
            <CurrencySwapButton />
          </div> */}
        </div>
      ) : (
        <div className="container flex justify-center">
          <Button
            variant="primary"
            className="justify-center w-full md:max-w-64"
            onClick={() => alert('TODO: Download PFP SHOE IMAGE')}
          >
            <Text variant="smButton">{t('locker_collectibles_download')}</Text>
          </Button>
        </div>
      )}
    </div>
  );
};

export default ShoeDetailOptions;
