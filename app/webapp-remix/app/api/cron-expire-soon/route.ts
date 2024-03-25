import { NextRequest, NextResponse } from 'next/server';
import { getConfig, getLogger } from '@reebok/shared';
import { projectExpirationService } from '@reebok/conversation-bot';

const logger = getLogger('api.cron-expire-soon');

/**
 * Requirements & description
 * need to get all trials that are due to expire in 2 hours (i.e. at the 22 hour since creation mark)
 * Q: do we track this via user or remix?
 *    A: user seems more logical
 * requirements to check if User project is expiring soon:
 *    - user is not registered with fpass
 *    - user project_state == SHOE_GENERATED
 *      - added new project state EXPIRING to user entity
 *    - expires_at?
 *      - query all that expire in
 *    - another job or at same time to set EXPIRING-> EXPIRED?
 */

/**
 * Vercel Cron endpoint to update projects that expire in 2 hours
 * @param request: NextRequest provided by vercel cron job
 * @returns Next Response
 */
export async function GET(request: NextRequest) {
  try {
    logger.info(
      'GET',
      'Running Vercel Cron Job to update soon expire projects'
    );
    const appConfig = getConfig();

    // authorize the incoming request
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${appConfig.vercel.cronSecret}`) {
      return NextResponse.json({ message: 'Auth required' }, { status: 401 });
    }

    // projects that will expire within 2 hours
    const updateType = 'EXPIRING';
    await projectExpirationService.handleExpiringUserProjects(updateType);

    return NextResponse.json({ ok: true });
  } catch (error) {
    logger.info('GET', 'error', error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
