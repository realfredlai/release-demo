'use client';
import { trpc } from '@/trpc';

import { useEffect } from 'react';

import OriginalShoeImage from '@/app/components/Closet/ShoeDetail/OriginalShoeImage';
import { LoadingAnimation } from '@/app/components/LoadingAnimation';

import { getRGBPercievedBrightness } from '@/app/utils/helpers';

import { useShoeLockerStore } from '@/app/store/ShoeLockerStore';
import GalleryShoeDetail from '@/app/components/Gallery/GalleryShoeDetail';

export default function ShoeDetailPage({
  params,
}: {
  params: { remixType: string; shoeId: string };
}) {
  const { shoeId } = params;

  const { setCurrentShoeBrightness } = useShoeLockerStore();

  useEffect(() => {
    if (remixAndUserData) {
      const mostDominantColor = remix.custom_colors[0];
      const colorBrightness = getRGBPercievedBrightness(mostDominantColor);
      setCurrentShoeBrightness(colorBrightness);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { data: remixAndUserData, error } = trpc.getRemixAndUser.useQuery(
    shoeId,
    {
      suspense: true,
    }
  );

  if (error) {
    return <div>Error loading data.</div>;
  }

  if (!remixAndUserData) {
    return <LoadingAnimation />;
  }

  const { shoe: remix, user } = remixAndUserData;

  return (
    <>
      <GalleryShoeDetail remix={remix} />

      <OriginalShoeImage
        showUser={false}
        user={user}
        remix={remix}
        remixType={'originals'} // TODO: NEEDS REFACTORING
      />
    </>
  );
}
