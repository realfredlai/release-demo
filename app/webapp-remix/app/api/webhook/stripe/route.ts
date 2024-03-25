import { NextRequest, NextResponse } from 'next/server';

import {
  stripeService,
  paymentQuery,
  mintSdkService,
  transactionQuery,
  mintQuery,
  TransactionItem,
  PaymentItem
} from '@reebok/backend-libs';

import {
  PAYMENT_STATUS,
  PAYMENT_CURRENCY,
  MINT_STATUS
} from '@reebok/backend-libs';

import { getLogger } from '@reebok/shared';

const logger = getLogger('api.webhook.stripe');

/**
 * This function can run up to 30 seconds
 * @see https://vercel.com/docs/functions/configuring-functions/duration
 */
export const maxDuration = 30; // seconds

/**
 * Webhook for stripe
 * @param req
 * @param _
 * @returns
 */
export async function POST(req: NextRequest, _: any) {
  try {
    const signature = req.headers.get('stripe-signature') as string;
    const rawBody = await req.text();

    let event;

    try {
      event = stripeService.getEvent(signature, rawBody);
    } catch (err: unknown) {
      return NextResponse.json({ error: 'Bad Request' }, { status: 400 });
    }

    switch (event.type) {
      case 'charge.succeeded':
        // eslint-disable-next-line no-case-declarations
        const charge = event.data.object;
        logger.info(
          'POST',
          'charge.succeeded',
          {charge}
        );
        break;
      case 'payment_intent.succeeded':
        // eslint-disable-next-line no-case-declarations
        const paymentSucceeded = event.data.object;
        logger.info(
          'POST',
          'payment_intent.succeeded',
          {paymentSucceeded}
        );
        break;
      case 'payment_intent.created':
        // eslint-disable-next-line no-case-declarations
        const paymentCreated = event.data.object;
        logger.info(
          'POST',
          'payment_intent.created',
          {paymentCreated}
        );
        break;
      case 'payment_intent.payment_failed': {
        // eslint-disable-next-line no-case-declarations

        const session = event.data.object;
        const { userId, paymentOrderId } = session.metadata || {};
        await paymentQuery.updateStripePaymentOrder(paymentOrderId, userId, {
          status: PAYMENT_STATUS.FAILED,
          stripe_payment_intent_id: session.id as string,
          stripe_customer_email: session.last_payment_error?.payment_method
            ?.billing_details.email as string,
          last_payment_error: session.last_payment_error?.message as string,
        });

        logger.info(
          'POST',
          'payment_intent.payment_failed',
          { userId, paymentOrderId, session }
        );
        break;
      }
      // @deprecated
      case 'checkout.session.async_payment_succeeded':
        // eslint-disable-next-line no-case-declarations
        const asyncPaymentSucceeded = event.data.object;
        logger.info(
          'POST',
          'checkout.session.async_payment_succeeded',
          { asyncPaymentSucceeded}
        );
        break;
      case 'checkout.session.async_payment_failed':
        // eslint-disable-next-line no-case-declarations
        const asyncPaymentFailed = event.data.object;
        logger.info(
          'POST',
          'checkout.session.async_payment_failed',
          { asyncPaymentFailed}
        );
        break;
      case 'invoice.payment_succeeded':
        // eslint-disable-next-line no-case-declarations
        const invoicePaymentSucceeded = event.data.object;
        logger.info(
          'POST',
          'invoice.payment_succeeded',
          { invoicePaymentSucceeded }
        );
        break;
      case 'payment_intent.canceled':
        logger.info(
          'POST',
          'payment_intent.canceled'
        );
        break;
      case 'checkout.session.completed':
        // eslint-disable-next-line no-case-declarations
        const session = event.data.object;

        // Fulfill order if the payment is successful
        if (session.payment_status === 'paid') {
          logger.info('checkout.session.completed', 'payment paid');

          const { userId, paymentOrderId, remixId, toAddress } = session.metadata || {};
          const paymentOrderResult = await paymentQuery.getStripePaymentOrder(
            paymentOrderId,
            userId
          );

          /**
           * This triggers a sequence of events
           *  - Update payment order status to PAID
           *  - Initiate a transaction to create a remix NFT
           *    - request a transaction job to create a remix NFT
           *    - save the transaction job to the Transaction Entity
           *    - update the remix NFT status to MINT_REQUESTED, Mint Entity
           *
           * @todo refactor this, it's too long and complex
           */
          logger.info('checkout.session.completed', 'paymentOrderResult', { paymentOrderResult,session });
          if (paymentOrderResult.data?.payment_id === paymentOrderId && session.status === 'complete') {

            // 1. Update payment order status to PAID
            let updatePaymentOrder = {} as Partial<PaymentItem>;
            try {
              updatePaymentOrder =
              await paymentQuery.updateStripePaymentOrder(
                paymentOrderId,
                userId,
                {
                  status: PAYMENT_STATUS.PAID,
                  stripe_payment_intent_id: session.payment_intent as string,
                  stripe_amount: session.amount_total as number,
                  currency: PAYMENT_CURRENCY.USD,
                  stripe_customer_email: session.customer_details
                    ?.email as string,
                }
              ) || {} as Partial<PaymentItem>;

            logger.info('checkout.session.completed', 'step#1', { updatePaymentOrder });

            } catch (error) {
              logger.error('checkout.session.completed', 'updatePaymentOrder', { error });
            }

            // 2. Initiate a transaction to create a remix NFT
            let requestMintTransactionResult = {} as mintSdkService.CreateTransactionJobResponse;
            try {

              if (Object.keys(updatePaymentOrder).length === 0) {
                // @note at this point, the payment is not updated. There's no need to proceed.
                // @todo update the mint status to ERROR, set the last_transaction_message to 'Payment order not updated'
                throw new Error('Payment order not updated. Mint transaction not initiated.');
              }

              logger.info('checkout.session.completed', 'step#2', {createTransactionJob: 'initiate a transaction to create a remix NFT'});
              requestMintTransactionResult = await mintSdkService.createTransactionJob({
                toAddress
              }) as mintSdkService.CreateTransactionJobResponse;
              logger.info('checkout.session.completed', 'requestMintTransactionResult', { requestMintTransactionResult });

            } catch (error: any) {
              // @note - at this point, the payment is already successful but the mint transaction failed or has an error
              //       - either the user will be refunded or the mint transaction will be retried.
              logger.error('checkout.session.completed', 'There was an error while requesting to Mint', { error: error.message });
            }

            // 3. save the transaction job to the Transaction Entity
            let transactionJob = {} as TransactionItem;
            if (requestMintTransactionResult.transactionID) {
              logger.info('checkout.session.completed', 'step#3', {createTransaction: 'save the transaction job to the Transaction Entity'});
              transactionJob = await transactionQuery.createTransaction({
                remix_id: remixId,
                to_address: toAddress,
                tx_job_id: requestMintTransactionResult.transactionID,
                tx_status: requestMintTransactionResult.txStatus as any
              }) || {} as TransactionItem;
              logger.info('checkout.session.completed', 'transactionJob', { transactionJob });
            }

            // 4. update the remix NFT status to MINT_REQUESTED, Mint Entity
            if (requestMintTransactionResult.transactionID) {
              logger.info('checkout.session.completed', 'step#4', {updateStatus: 'update the remix NFT status to MINT_REQUESTED, Mint Entity'});
              const updateMintRecordResult = await mintQuery.updateStatus(remixId, {state: MINT_STATUS.MINT_REQUESTED, transaction_id: transactionJob?.transaction_id});
              logger.info('checkout.session.completed', 'updateMintRecordResult', {state: MINT_STATUS.MINT_REQUESTED, updateMintRecordResult});
            }
          } else {
            logger.error('checkout.session.completed', 'paid but has problem with session and DB record', {
              paymentOrderId,
              userId,
              paymentOrderResult,
              remixId,
              toAddress,
            });
          }
        } else {
          // NOTE: keep status to PENDING
          logger.info('checkout.session.completed', 'payment pending');
        }
        logger.info('POST', 'checkout.session.completed - end');
        break;
      default:
        logger.info(
          'POST',
          'Unhandled event type',
          { event }
        );
    }
    return NextResponse.json({ status: 'OK' });
  } catch (error: any) {
    logger.error('POST', 'Error', { error: error.message });
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

/**
 * @deprecated
 */
export async function GET(req: NextRequest, _: any) {
  try {
    const session_id = req.nextUrl.searchParams.get('session_id');
    const result = await stripeService.retrieveSession(session_id as string);

    logger.info(
      'GET',
      'deprecated',
      { session_id, result }
    );
    return NextResponse.json({ message: 'success' }, { status: 200 });
  } catch (error) {
    logger.error(
      'GET',
      'deprecated',
      { error }
    );
    return NextResponse.json(
      { error: 'internal server error' },
      { status: 500 }
    );
  }
}
