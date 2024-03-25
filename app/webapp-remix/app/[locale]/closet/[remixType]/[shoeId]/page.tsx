'use client';
import { trpc } from '@/trpc';

import { useEffect } from 'react';

import ShoeDetail from '@/app/components/Closet/ShoeDetail';
import OriginalShoeImage from '@/app/components/Closet/ShoeDetail/OriginalShoeImage';
import ShoeMintInfo from '@/app/components/Closet/ShoeDetail/ShoeMintInfo';
import { LoadingAnimation } from '@/app/components/LoadingAnimation';

import { getRGBPercievedBrightness } from '@/app/utils/helpers';
import { RemixType, useShoeLockerStore } from '@/app/store/ShoeLockerStore';

export default function ShoeDetailPage({
  params,
}: {
  params: { remixType: RemixType; shoeId: string };
}) {
  const { remixType, shoeId } = params;

  const { setCurrentShoeBrightness } = useShoeLockerStore();

  useEffect(() => {
    if (remixAndUserData) {
      const mostDominantColor = remix.custom_colors[0];
      const colorBrightness = getRGBPercievedBrightness(mostDominantColor);
      setCurrentShoeBrightness(colorBrightness);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { data: remixAndUserData, error } =
    trpc.getRemixAndUser.useQuery(shoeId);

  if (error) {
    return <div>Error loading data.</div>;
  }

  if (!remixAndUserData) {
    return <LoadingAnimation />;
  }

  const { shoe: remix, user } = remixAndUserData;

  return (
    <>
      <ShoeDetail user={user} remix={remix} remixType={remixType} />
      {remixType === 'collectibles' && (
        <ShoeMintInfo user={user} remix={remix} />
      )}
      <OriginalShoeImage
        user={user}
        remix={remix}
        remixType={remixType}
        showUser
      />
    </>
  );
}
