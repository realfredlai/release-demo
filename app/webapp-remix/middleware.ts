import createMiddleware from 'next-intl/middleware';
import { locales } from '@/navigation';

export default createMiddleware({
  // A list of all locales that are supported
  defaultLocale: 'en',
  locales,
});

export const config = {
  // Skip all paths that should not be internationalized. This example skips
  // certain folders and all pathnames with a dot (e.g. favicon.ico)
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
