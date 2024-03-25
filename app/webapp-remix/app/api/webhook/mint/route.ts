import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  mintQuery,
  transactionQuery,
  mintSdkService
} from '@reebok/backend-libs';
import { getLogger } from "@reebok/shared";

const logger = getLogger('api.webhook.mint');

const requestSchema = z.object({
  transactionID: z.string(),
  txStatus: z.string(),
  nonce: z.number(),
  extrinsicId: z.string(),
  blockHash: z.string(),
  success: z.boolean(),
  events: z.number(),
});

/**
 * Webhook for Minted Remix NFT
 *
 * @todo API key validation
 */
export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json();
    logger.info('POST', 'mint - start', { payload: body });
    // const requestData: mintSdkService.GetTransactionJobStatusResponse = requestSchema.parse(body); // @todo - fix this, getting a validation error
    const requestData: mintSdkService.GetTransactionJobStatusResponse = body;

    logger.info('POST', 'mint', requestData);

    const transactionData = await transactionQuery.getJobById(requestData.transactionID);
    if (!transactionData) {
      throw new Error(`Transaction ID ${requestData.transactionID} not found`);
    }

    const { remix_id } = transactionData;
    const remixData = await mintQuery.getItemById(remix_id);
    if (!remixData) {
      throw new Error(`Remix ID ${remix_id} not found`);
    }

    // sucks but we need to remap the status
    const remappedStatus = (requestData: mintSdkService.GetTransactionJobStatusResponse) => {
      if (requestData.txStatus === 'PENDING') {
        return 'MINT_REQUESTED';
      } else if (requestData.txStatus === 'PROCESSING') {
        return 'MINT_PROCESSING';
      } else if (requestData.txStatus === 'COMPLETE') {
        return 'MINTED';
      } else {
        return 'FAILED';
      }
    };

    const state = remappedStatus(requestData);

    // 1. Update the remix status
    logger.debug('POST', 'mint', { state, remixData, transactionData, requestData });

    await Promise.all([
      mintQuery.updateStatus(remix_id, {
        state,
        block_hash: requestData.blockHash,
        extrinsic_id: requestData.extrinsicId,
        token_id: parseInt(requestData.events[0].start as unknown as string),
        events: requestData.events
      }),
      transactionQuery.updateStatus(transactionData.transaction_id, { tx_status: requestData.txStatus as "NONE" | "PENDING" | "PROCESSING" | "COMPLETE" | "FAILED" | undefined})
    ]);

    // 2. increment the minted count
    // @todo - implement the increment
    logger.info('POST', 'increment', { todo: 'increment the minted count'});

    return NextResponse.json({ status: 'OK' });
  } catch (error: any) {
    logger.error('POST', 'mint', error.message);
    return NextResponse.json(
      { error: '[webhook:mint] Internal Server Error' },
      { status: 500 }
    );
  }
}
