import {
  FetchCreateContextFnOptions,
  fetchRequestHandler,
} from '@trpc/server/adapters/fetch';
import { appRouter } from '@/trpc-server';
import { getLogger } from '@reebok/shared';

const logger = getLogger('api.trpc');

// Allowed origins list
const allowedOrigins = [
  'localhost:4200',
  'tre-webapp-dev.vercel.app',
  'reebok-webapp-remix-mint.vercel.app',
  'reebok-webapp-remix-matthew.vercel.app',
  'reebok-webapp-remix-jordan.vercel.app',
  'reebok-webapp-remix-herve.vercel.app',
  'rbk-webapp-remix-stg.vercel.app', 
  'reebokimpact.com',
  'app.reebokimpact.com'
];

// this is the server RPC API handler
const handler = (request: Request) => {
  logger.info('handler', '/api/trpc incoming request', request.url);

  const requestOrigin = request.headers.get('host') || '';

  if (!allowedOrigins.includes(requestOrigin)) {
    logger.error('handler', 'Origin not allowed', requestOrigin);
    return new Response('Origin not allowed', { status: 403 });
  }

  return fetchRequestHandler({
    endpoint: '/api/trpc',
    req: request,
    router: appRouter,
    createContext: function (
      opts: FetchCreateContextFnOptions
    ): object | Promise<object> {
      // empty context
      return {};
    },
  });
};

export const GET = handler;
export const POST = handler;
