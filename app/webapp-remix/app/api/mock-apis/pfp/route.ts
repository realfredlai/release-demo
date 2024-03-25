import { NextRequest, NextResponse } from 'next/server';
import fetch from 'node-fetch';
import { getConfig, getLogger } from '@reebok/shared';

const placeholderShoeImage =
  'https://reebok-pump-engine-dev.s3.us-west-2.amazonaws.com/pfp/1.png';
const REMIX_API_URL = getConfig().remixApi.apiUrl;

const logger = getLogger('api.mock-apis.pfp');

export async function POST(req: NextRequest, buf: any) {
  try {
    logger.info('POST', 'start');

    // probably use some auth

    const body = await req.json();
    logger.info('POST', 'body', body);
    const { remix_id } = body;

    // PFP has received the request at this point
    // Once the job is complete, PFP API sends RemixApi the updates
    // e.g. remix_id, new asset urls to add to DB/S3 (?)
    const pfpEndpointUrl = `${REMIX_API_URL}/pfp`;
    logger.info('POST', 'pfpEndpointUrl', pfpEndpointUrl);
    const sendBody = {
      remix_id,
      success: true,
      image_combined_url: placeholderShoeImage,
    };
    const res = await fetch(pfpEndpointUrl, {
      method: 'POST',
      body: JSON.stringify(sendBody),
      headers: { 'Content-Type': 'application/json' },
    });

    // RenderJob api gets remix_id of incoming new remix
    return NextResponse.json({ status: 'OK' });
  } catch (error) {
    logger.error('POST', 'error', error);
    return NextResponse.json(
      { error: 'internal server error' },
      { status: 500 }
    );
  }
}
