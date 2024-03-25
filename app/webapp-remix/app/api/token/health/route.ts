import { NextResponse } from 'next/server';
export async function GET() {
  try {
    const timestamp = new Date().toISOString();
    return NextResponse.json({ module: 'token', status: 'OK', timestamp: timestamp });
  } catch (error) {
    return NextResponse.json(
      { error: 'internal server error' },
      { status: 500 }
    );
  }
}
