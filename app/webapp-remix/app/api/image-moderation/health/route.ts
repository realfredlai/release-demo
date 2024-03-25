import { NextResponse } from 'next/server';
import { getLogger } from '@reebok/shared';

const logger = getLogger('api.image-moderation');

export async function GET() {
  try {
    const timestamp = new Date().toISOString();
    return NextResponse.json({ status: 'OK', timestamp: timestamp });
  } catch (error) {
    logger.error('GET', 'Health status error', error);
    return NextResponse.json(
      { error: 'internal server error' },
      { status: 500 }
    );
  }
}
