import { NextRequest, NextResponse } from 'next/server';
import { getConfig, getLogger } from '@reebok/shared';
import { projectExpirationService } from '@reebok/conversation-bot';

const logger = getLogger('api.cron-expire-now');

/**
 * Vercel Cron endpoint to update projects that have now expired.
 * @param request: NextRequest provided by vercel cron job
 * @returns Next Response
 */
export async function GET(request: NextRequest) {
  try {
    logger.info(
      'GET',
      'Running Vercel Cron Job to update expiring projects now'
    );
    const appConfig = getConfig();

    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${appConfig.vercel.cronSecret}`) {
      return NextResponse.json({ message: 'Auth required' }, { status: 401 });
    }

    // projects that have now expired
    const updateType = 'EXPIRED';
    await projectExpirationService.handleExpiringUserProjects(updateType);

    return NextResponse.json({ ok: true });
  } catch (error) {
    logger.info('GET', 'error', error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
