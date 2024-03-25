import { NextRequest, NextResponse } from 'next/server';
import fetch from 'node-fetch';
import { getConfig, getLogger } from '@reebok/shared';

const placeholderShoeImage =
  'https://tre-webapp-git-feat-jordan-e2e-api-futureverse.vercel.app/images/shoe.png';
const REMIX_API_URL = getConfig().remixApi.apiUrl;

const logger = getLogger('api.mock-apis.pump-engine');

/**
 * This endpoint mocks the RenderJobs API.
 * Remix API calls this POST method to send information to start a RenderJob for a new remix/shoe project
 * The POST body may send urls, remix_id, etc.
 */
export async function POST(req: NextRequest, res: Response) {
  try {
    logger.info('POST', 'start');

    const body = await req.json();
    logger.info('POST', 'body', body);
    const remix_id = body.eventPayload.renderId;
    if (!remix_id) {
      throw new Error('could not get renderId from body');
    }

    // Pump Engine handles above payload
    // Then as separate method, would hit RemixApi webhook with updated fields
    const remixApiUrl = `${REMIX_API_URL}/pump-engine`;

    const sendBody = {
      renderId: remix_id,
      assets: [{ url: placeholderShoeImage, tags: 'tags' }],
    };

    logger.info('POST', 'remixApiUrl', remixApiUrl);
    const res = await fetch(remixApiUrl, {
      method: 'POST',
      body: JSON.stringify(sendBody),
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'test', // this is mock api so fine to leave here for local testing
      },
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    logger.error('POST', 'error', error);
    return NextResponse.json(
      { error: 'internal server error' },
      { status: 500 }
    );
  }
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
