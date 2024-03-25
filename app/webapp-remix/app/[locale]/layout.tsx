// import { Locale } from '@reebok/backend-libs';

import '@/app/global.css';

import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';

import { NavHeader } from '@/app/components/Navbar/NavHeader';

import Providers from '@/app/providers/Providers';
import Footer from '@/app/components/Footer/Footer';

import GoogleAnalytics from '@/app/components/GoogleAnalytics';

export const metadata = {
  title: 'Reebok Impact - Create Your Impact',
  description: 'DM us your favorite image on Instagram and use our innovative tech to spin up a one-of-a-kind sneaker dripping in AI-generated art.',
};

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // const messages = (await import(`@/messages/${locale}.json`)).default;
  const localizedCopy = (await import('@reebok/backend-libs')).localizedCopy[
    locale as 'en' | 'ja' | 'ko'
  ];

  return (
    <html lang={locale}>
      <body className="w-full h-dvh no-scrollbar antialiased">
        <Providers locale={locale} messages={localizedCopy}>
          <GoogleAnalytics />
          <NavHeader />

          {children}

          <Footer />

          <SpeedInsights />
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
