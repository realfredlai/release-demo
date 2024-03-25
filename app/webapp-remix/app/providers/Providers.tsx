'use client';

import { TrpcProvider } from '@/app/providers/TrpcProvider';
import { CurrencyProvider } from '@/app/providers/CurrencyProvider';
import { AbstractIntlMessages, NextIntlClientProvider } from 'next-intl';

import { FutureverseAuthClient, FutureverseProvider } from '@futureverse/react';
import { ENVIRONMENTS } from '@futureverse/experience-sdk';

import { getConfig } from '@reebok/shared';

type ProvidersProps = {
  children: React.ReactNode;
  locale: string;
  messages: AbstractIntlMessages;
};

export default function Providers({
  children,
  locale,
  messages,
}: ProvidersProps) {
  const authClient = new FutureverseAuthClient({
    clientId: process.env.NEXT_PUBLIC_FUTUREPASS_CLIENT_ID ?? '',
    redirectUri: `${getConfig().webapp.url}/login`,
    environment: ENVIRONMENTS.audit,
    responseType: 'code',
  });

  return (
    <TrpcProvider>
      <FutureverseProvider
        stage="development"
        authClient={authClient}
        Web3Provider="wagmi"
        walletConnectProjectId={
          process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID ?? ''
        }
        isCustodialLoginEnabled
      >
        <CurrencyProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
          </NextIntlClientProvider>
        </CurrencyProvider>
      </FutureverseProvider>
    </TrpcProvider>
  );
}
