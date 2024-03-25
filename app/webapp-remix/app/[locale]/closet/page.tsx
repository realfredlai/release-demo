'use client';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import { useGetLockerShoes } from '@/app/hooks/useGetLockerShoes';

import Collaborations from '@/app/components/Closet/Collaborations';
import CreationsContent from '@/app/components/Closet/CreationsContent';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/app/components/Tabs/Tabs';
import InspirationAwaitsLocker from '@/app/components/Closet/InspirationAwaitsLocker';
import CollectiblesWhySection from '@/app/components/Closet/CollectiblesWhySection';
import CollectiblesContent from '@/app/components/Closet/CollectiblesContent';
import StripeMessageModal from '@/app/components/Modals/StripeMessageModal';
import { LoadingAnimation } from '@/app/components/LoadingAnimation';

import SneakerClosetHeaderLight from '@/public/images/closet/image-sneaker-closet-light.svg';
import SneakerClosetHeaderDark from '@/public/images/closet/image-sneaker-closet-dark.svg';

export default function Locker() {
  const t = useTranslations();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [tabValue, setTabValue] = useState('creations');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [stripeMessage, setStripeMessage] = useState('');

  const handleTabsChange = (value: string) => {
    setTabValue(value);
  };

  const isCreationsTab = tabValue === 'creations';
  const userId = localStorage.getItem('userId') ?? '';
  const {
    originalRemixes,
    collabRemixes,
    mintedRemixes,
    isOriginalsLoading,
    isCollabsLoading,
    isMintsLoading,
  } = useGetLockerShoes(userId);

  useEffect(() => {
    const getStripeMessage = searchParams.get('message');

    if (getStripeMessage) {
      setStripeMessage(getStripeMessage);
      setShowPaymentModal(true);
      router.replace('/closet');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={`transition-all duration-500 ${
        isCreationsTab ? '' : 'bg-primary-navy'
      }`}
    >
      {/* If first time query, show loading animation
      Else, refetches will run in background */}
      {(isOriginalsLoading || isCollabsLoading || isMintsLoading) && (
        <LoadingAnimation />
      )}
      <div className="container grid-layout h-fit pb-16 lg:pb-m auto-rows-min pt-16">
        <div className="col-span-full lg:col-end-9 my-mobiles lg:my-s h-fit">
          <Image
            src={
              isCreationsTab
                ? SneakerClosetHeaderDark
                : SneakerClosetHeaderLight
            }
            alt="Sneaker Closet"
            width={784}
            height={106}
            priority={isCreationsTab}
          />
        </div>
        <div className="col-span-full">
          <Tabs
            defaultValue="creations"
            className="w-full"
            onValueChange={handleTabsChange}
          >
            <TabsList>
              <TabsTrigger
                value="creations"
                className={`${
                  isCreationsTab ? '' : 'text-primary-bone opacity-50'
                }`}
              >
                {t('locker_tabs_creations')}
              </TabsTrigger>
              <TabsTrigger
                value="collectibles"
                className={`${isCreationsTab ? '' : 'text-primary-bone'}`}
              >
                {t('locker_tabs_collectibles')}
              </TabsTrigger>
            </TabsList>
            <TabsContent value="creations">
              <CreationsContent originalRemixes={originalRemixes} />
            </TabsContent>
            <TabsContent value="collectibles">
              <CollectiblesContent collectibleRemixes={mintedRemixes} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
      {isCreationsTab && (
        <>
          <Collaborations collabs={collabRemixes} />
          <InspirationAwaitsLocker />
        </>
      )}
      {!isCreationsTab && collabRemixes.length === 0 && (
        // Only show if there's no minted cards, if minted cards then hide
        <CollectiblesWhySection />
      )}

      <StripeMessageModal
        open={showPaymentModal}
        setOpen={setShowPaymentModal}
        paymentMessage={stripeMessage}
      />
    </div>
  );
}
