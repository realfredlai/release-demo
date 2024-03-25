import { NextRequest, NextResponse } from 'next/server';
import { stripeService } from '@reebok/backend-libs';
import { getLogger } from '@reebok/shared';

const logger = getLogger('api.webhook.stripe');

/**
 * Callback URL for stripe
 * @param req
 * @param _
 * @returns
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { callbackUrl: string } }
) {
  try {
    const callbackUrl = params.callbackUrl;
    console.log('[webhook:stripe] CallbackURL', callbackUrl);
    if (callbackUrl == 'success') {
      const session_id = req.nextUrl.searchParams.get('session_id');
      const retrieveSessionResult = await stripeService.retrieveSession(
        session_id as string
      );
      logger.info('POST', 'CallbackURL success', callbackUrl);
      logger.info('POST', 'retrieveSessionResult', retrieveSessionResult);
      return NextResponse.json({ message: 'Payment Success', status: 'OK' });
    } else {
      logger.info('POST', 'CallbackURL cancel', callbackUrl);
      return NextResponse.json({ message: 'Payment Cancelled', status: 'OK' });
    }
  } catch (error) {
    logger.error('POST', 'CallbackURL error', error);
    return NextResponse.json(
      { error: 'internal server error' },
      { status: 500 }
    );
  }
}
