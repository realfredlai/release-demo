import { NextRequest, NextResponse } from 'next/server';
import { getConfig, getLogger } from '@reebok/shared';
import {
  remixQuery,
  globaluserQuery,
  validateApiKey,
  Locale,
} from '@reebok/backend-libs';

import { messageProcessor, responseManager } from '@reebok/conversation-bot';
const logger = getLogger('api.image-moderation');

export async function POST(req: NextRequest, res: Response) {
  try {
    // validate API key
    const IMAGE_MODERATION_API_KEY = getConfig().moderationApi.apiKey;
    const validApiKey = validateApiKey(req, IMAGE_MODERATION_API_KEY as string);
    if (!validApiKey) {
      throw new Error('status: 401, message: Unauthorized. Invalid API Key');
    }

    // received batches of moderation_status from QA Tools
    const body = await req.json();
    const moderatedBatch = body;

    // Validate if moderation status is AUTO_REJECTED to update project_state
    for await (const item of moderatedBatch) {
      const { remix_id, moderation_status } = item;
      if (
        moderation_status === 'AUTO_REJECTED' ||
        moderation_status === 'REJECTED'
      ) {
        // Get remix attributes to access userId
        const remix = await remixQuery.getRemix(remix_id);

        await updateProjectState(remix?.user_id as string);

        // check if the rejected remix came from instagram (original assets requested or generated)
        if (
          remix?.state &&
          remix.ig_id &&
          ['ORIGINAL_ASSETS_REQUESTED', 'ORIGINAL_ASSETS_GENERATED'].includes(
            remix.state
          )
        ) {
          // get user
          const user = await globaluserQuery.getUserByUserId(remix.user_id);
          const locale = user?.ig_language as Locale;
          // send user message to indicate image was flagged
          await messageProcessor.handleOutgoingMessage(
            remix.ig_id,
            responseManager.inappropriateMessage(locale)
          );
        }
      }
    }

    // Validate if moderation status is APPROVED to update moderation_report_reason
    for await (const item of moderatedBatch) {
      const { remix_id, moderation_status } = item;
      if (moderation_status === 'APPROVED') {
        const moderationReportReason = { moderation_report_reason: 'NONE' };
        await remixQuery.setModerationReportReason(
          remix_id,
          moderationReportReason
        );
      }
    }

    // update remix image moderation status
    await remixQuery.updateBatchRemix(moderatedBatch);
    return NextResponse.json({ status: 'OK' });
  } catch (error) {
    logger.error('POST', 'failed to update moderation_status', error);
    return NextResponse.json({ error: `${error}` });
  }
}

// Update project status when the moderation status is auto_rejected or rejected
async function updateProjectState(userId: string) {
  const result = await globaluserQuery.updateUserAttribute(
    userId as string,
    'project_state',
    'EXPIRED'
  );

  logger.info(
    'updateProjectState',
    'project_state successfully updated for user_id',
    result
  );
  return result;
}
