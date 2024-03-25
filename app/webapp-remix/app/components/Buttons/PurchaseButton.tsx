'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { trpc } from '@/trpc';
import { Button, cn } from '@reebok/frontend-components';
import { Text } from '@/app/components/Text/Text';
import { LoadingAnimation } from '@/app/components/LoadingAnimation';

import { getLogger } from '@reebok/shared';

import { useCurrency } from '@/app/providers/CurrencyProvider';
import { prices } from '@/app/utils/constants';

const logger = getLogger('components.locker.ShoeDetailOptions');

type PurchaseButtonProps = {
  shoeId: string;
  moderationStatus?: string;
  claimedState?: string;
  outlineButton?: boolean;
  className?: string;
};

export const PurchaseButton = ({
  shoeId,
  moderationStatus,
  // claimedState, // do we need to check for this?
  outlineButton,
  className,
}: PurchaseButtonProps) => {
  const t = useTranslations();
  const [loadingStripe, setLoadingStripe] = useState(false);
  const userId = localStorage.getItem('userId') || '';
  const futurepassAddress = localStorage.getItem('futurepassAddress') || '';
  const stripeSession = trpc.getStripeCheckoutSession.useQuery(
    {
      userId,
      futurepassAddress,
      remixId: shoeId,
    },
    { enabled: false }
  );

  const handleStripe = async () => {
    try {
      const createStripeSessionResult = await stripeSession.refetch();

      if (createStripeSessionResult.status === 'success') {
        setLoadingStripe(false);
        const { sessionUrl } = createStripeSessionResult.data;
        window.location.href = sessionUrl as string;
      }
    } catch (error) {
      logger.error(
        'ShoeDetailOptions',
        'handleStripe: Error fetching Stripe session:',
        error
      );
    } finally {
      setLoadingStripe(true);
    }
  };
  const handleCrypto = () => {
    alert('TODO: pay with crypto');
  };

  const { baseCurrency } = useCurrency();

  const formatPrice = (price: number) => {
    return `${baseCurrency === 'USD' ? 'US$' : baseCurrency} ${price.toFixed(
      2
    )}`;
  };

  const priceInSelectedCurrency = prices[baseCurrency] || 0.0;

  return (
    <>
      {loadingStripe && <LoadingAnimation className="z-[321]" />}

      <Button
        variant={outlineButton ? 'orangeOutline' : 'primary'}
        className={cn('w-full px-14 lg:px-16 whitespace-nowrap', className)}
        onClick={baseCurrency === 'USD' ? handleStripe : handleCrypto}
        disabled={
          loadingStripe ||
          moderationStatus === 'AUTO_REJECTED' ||
          moderationStatus === 'AUTO_FLAGGED' ||
          moderationStatus === 'REJECTED' ||
          moderationStatus === 'FLAGGED'
        }
        // only show a title/message on the button if there's moderation rejections.
        // we can add a flashy "tooltip" later. for now... old school html.
        {...(moderationStatus === 'AUTO_REJECTED' ||
        moderationStatus === 'AUTO_FLAGGED' ||
        moderationStatus === 'REJECTED' ||
        moderationStatus === 'FLAGGED'
          ? { title: `Moderation ${moderationStatus.replace('_', ' ')}` }
          : {})}
      >
        <Text variant="smButton">
          {t('locker_originals_purchase')}:{' '}
          {formatPrice(priceInSelectedCurrency)}
        </Text>
      </Button>
    </>
  );
};
