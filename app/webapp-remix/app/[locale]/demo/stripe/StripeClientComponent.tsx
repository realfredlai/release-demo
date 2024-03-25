'use client';
import { trpc } from '@/trpc';
import { getLogger } from '@reebok/shared';

const logger = getLogger('locale.demo.stripe');

interface StripeClientComponentProps {
  userId: string;
  remixId: string;
}

export default function StripeClientComponent({ userId, remixId}: StripeClientComponentProps): JSX.Element {

  const stripeSession = trpc.getStripeCheckoutSession.useQuery({userId, remixId, futurepassAddress: ''}, {
    enabled: false
  });

  const handleClick = async () => {
    // TODO: sometimes this is not called, but the backend is called and the order is created
    const createStripeSessionResult = await stripeSession.refetch()
    if (createStripeSessionResult.status === 'success') {
      logger.info('StripeClientComponent', 'stripeSession - createStripeSessionResult:', {status: createStripeSessionResult.status, data: createStripeSessionResult.data, error: createStripeSessionResult.error} )
      const { sessionUrl } = createStripeSessionResult.data;
      window.location.replace(sessionUrl as string);
    }
  };

  return (
    <p>
      <br /><br /><br /><br /><br /><br /><br /><br /><br />
      <button onClick={handleClick} style={{ color: 'black' }}>Go to Stripe Checkout</button>
    </p>
  )
}
