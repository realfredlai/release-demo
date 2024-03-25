// import { Locale } from '@reebok/backend-libs';
import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => ({
  messages: (await import('@reebok/backend-libs')).localizedCopy[
    locale as 'en' | 'ja' | 'ko'
  ],
}));
