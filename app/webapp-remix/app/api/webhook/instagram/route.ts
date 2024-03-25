import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

import { getConfig, getLogger } from '@reebok/shared';
import { messageProcessor } from '@reebok/conversation-bot';

const logger = getLogger('api.webhook.instagram');

export async function GET(req: NextRequest, buf: any) {
  const appConfig = getConfig();
  try {
    logger.info('GET', 'start');
    let response;

    const mode = req.nextUrl.searchParams.get('hub.mode');
    const token = req.nextUrl.searchParams.get('hub.verify_token');
    const challenge = req.nextUrl.searchParams.get('hub.challenge') as string;

    if (mode && token) {
      logger.info('GET', 'mode:token', {
        mode: mode,
        token: token,
        verifyToken: appConfig.facebookApp.verifyToken,
      });
      if (mode === 'subscribe' && token === appConfig.facebookApp.verifyToken) {
        logger.info('GET', 'challenge', challenge);
        response = new Response(challenge.trim());
      } else {
        response = NextResponse.json(
          { error: 'Invalid webhook token' },
          { status: 403 }
        );
      }
    } else {
      response = NextResponse.json(
        { error: 'Invalid validation params' },
        { status: 403 }
      );
    }
    logger.info('GET', 'end');
    return response;
  } catch (error) {
    logger.error('GET', 'error', error);
    return NextResponse.json(
      { error: 'internal server error' },
      { status: 500 }
    );
  }
}

// incoming instagram webhooks
export async function POST(
  req: NextRequest,
  res: NextResponse
): Promise<Response> {
  try {
    const body = await req.json();
    const receivedSignature = req.headers.get('x-hub-signature-256') as string;
    if (!verifySignature(JSON.stringify(body), receivedSignature)) {
      return NextResponse.json(
        { error: 'Invalid Webhook Signature' },
        { status: 401 }
      );
    }

    // TODO: remove logs when necessary but for now handy to keep in for dev
    logger.info('POST', 'start - body:', body);
    let response;
    if (body.object === 'instagram') {
      // Iterate over each entry - there may be multiple if batched
      for (const entry of body.entry) {
        if (!('messaging' in entry)) {
          logger.warn(
            'POST',
            'No messaging field in entry. Possibly a webhook test'
          );
          return NextResponse.json(
            { error: 'No messaging field in entry. Possibly a webhook test' },
            { status: 500 }
          );
        }

        // Iterate over webhook event messages - there may be multiple
        for (const webhookMessage of entry.messaging) {
          // instantly handle received message
          await messageProcessor.handleIncomingMessage(webhookMessage);
        }
      }
      // Return a '200 OK' response to all requests
      response = new Response('EVENT_RECEIVED', { status: 200 });
    } else {
      response = new Response('NOT_FOUND', { status: 404 });
    }
    logger.info('POST', 'end');
    return response;
  } catch (error) {
    logger.error('POST', 'error', error);
    return NextResponse.json(
      { error: 'internal server error' },
      { status: 500 }
    );
  }
}

const emojiRegex =
  /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;

const preprocessStr = (str: string) => {
  const emojiMatches = [...str.matchAll(emojiRegex)];
  // loop through emoji matches and escape unicode
  for (const emoji of emojiMatches) {
    const escapeText = emoji[0]
      .split('')
      .map(
        (unit: string) =>
          '\\u' + unit.charCodeAt(0).toString(16).padStart(4, '0')
      )
      .join('');
    str = str.replace(emoji[0], escapeText);
  }
  return str;
};

// Escape special characters and other edge cases
const escapeUnicode = (str: string) => {
  // regex for special characters
  str = preprocessStr(str);
  str = str
    .replace(/[\u00a0-\uffff]/gu, function (c) {
      return '\\u' + ('000' + c.charCodeAt(0).toString(16)).slice(-4);
    })
    // replace other edge case characters
    .replace(/\//g, '\\/') // replace / -> \/
    .replace(/@/g, '\\u0040')
    .replace(/%/g, '\\u0025')
    .replace(/</g, '\\u003C');
  // TODO: might need to escape emoji unicodes if we use them in quick replies
  return str;
};

function verifySignature(body: any, receivedSignature: string): boolean {
  logger.info('verifySignature', 'start');
  if (receivedSignature) {
    const elements = receivedSignature.split('=');
    const receivedHash = elements[1];
    const expectedHash = crypto
      .createHmac('sha256', getConfig().facebookApp.appSecret as string)
      .update(escapeUnicode(body))
      .digest('hex');
    if (receivedHash != expectedHash) {
      return false;
    }
  } else {
    logger.warn(
      'verifySignature',
      `Couldn't find 'x-xub-signature-256' in headers`
    );
    return false;
  }

  return true;
}
