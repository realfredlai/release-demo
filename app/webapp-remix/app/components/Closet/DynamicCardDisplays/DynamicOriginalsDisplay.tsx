import { memo } from 'react';

import OriginalsCard from '@/app/components/Cards/OriginalsCard';
import SneakerCardSkeleton from '@/app/components/Cards/SneakerCardSkeleton';

import { RemixItem } from '@reebok/backend-libs';
import { padWithLeadingZeroes } from '@/app/utils/helpers';

type DynamicOriginalsDisplayProps = {
  originalRemixes: RemixItem[];
};

const DynamicOriginalsDisplay = memo((props: DynamicOriginalsDisplayProps) => {
  const { originalRemixes } = props;

  // TODO: ONLY 4 ORIGINALS MAX
  // EACH COLLECTIBLE BUY UNLOCKS ANOTHER ROW OF 4 ORIGINALS

  const numberOfOriginalRemixes = originalRemixes.length;

  const numOfSkeletonBaseCards = 4;

  const numSkeletonCards = Math.max(
    0,
    numOfSkeletonBaseCards - numberOfOriginalRemixes
  );

  return (
    <>
      {originalRemixes.map((remix, index) => {
        return (
          <div className="h-full" key={remix.remix_id}>
            <OriginalsCard
              type="originals"
              name={`RBK-${padWithLeadingZeroes(3, index)}`}
              shoePfp={remix.image_combined_url as string}
              prompt={remix.custom_prompt_name}
              dominantColors={remix.custom_colors.slice(0, 2)}
              dateCreated={remix.created_at as string}
              shoeModel={remix.shoe_model}
              shoeId={remix.remix_id}
              moderationStatus={remix.moderation_status as string}
              claimedState={remix.state as string}
              href={`/closet/originals/${remix.remix_id}`}
            />
          </div>
        );
      })}

      {/* Render Skeleton Cards based on the number of cards */}
      {[...Array(numSkeletonCards)].map((_, index) => (
        <SneakerCardSkeleton key={index} />
      ))}
    </>
  );
});

DynamicOriginalsDisplay.displayName = 'DynamicOriginalsDisplay';

export default DynamicOriginalsDisplay;
