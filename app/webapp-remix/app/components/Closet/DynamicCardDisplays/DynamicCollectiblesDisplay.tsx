import { memo } from 'react';

import { trpc } from '@/trpc';

import { MintItem } from '@reebok/backend-libs';
import { padWithLeadingZeroes } from '@/app/utils/helpers';

import { useBreakpoint } from '@/app/hooks/useBreakpoint';

import CollectibleCard from '@/app/components/Cards/CollectibleCard';
import CollectibleCardSkeleton from '@/app/components/Cards/CollectibleCardSkeleton';
import NoCollectiblesCard from '@/app/components/Cards/NoCollectiblesCard';

type DynamicCollectiblesDisplayProps = {
  collectibleRemixes: MintItem[];
};

const DynamicCollectiblesDisplay = memo(
  ({ collectibleRemixes }: DynamicCollectiblesDisplayProps) => {
    const { isBelowMd } = useBreakpoint('md');
    const { isBelowLg } = useBreakpoint('lg');
    const { isAboveXlg } = useBreakpoint('xlg');

    /**
     * Rule is # - 1
     * Show 3 skeletons for xlg
     * Show 2 skeletons for lg
     * Show 3 skeletons for md
     * Show 1 skeleton for sm
     */
    const numOfSkeletonBaseCards = isAboveXlg
      ? 4
      : isBelowLg
      ? isBelowMd
        ? 2
        : 4
      : 3;

    /**
     * Calculate the number of cards to display
     * If 0 or 1 collectibles, it will always show NO COLLECTIBLES CARD or 1 collectible
     * And rest will be skeletons
     * After 2+, take the difference between them
     */
    const numberOfMintedCards = collectibleRemixes.length;

    const isCollectiblesLessThanTwo = numberOfMintedCards < 2;

    const numSkeletonCards = isCollectiblesLessThanTwo
      ? numOfSkeletonBaseCards - 1
      : Math.max(0, numOfSkeletonBaseCards - numberOfMintedCards);

    return (
      <>
        {numberOfMintedCards === 0 ? (
          <NoCollectiblesCard />
        ) : (
          <>
            {collectibleRemixes.map((collectible, index) => {
              // TODO: NEED JORDAN TO ADD USERNAME TO REMIXITEM ENTITY TO PREVENT EXTRA QUERY
              const remixUser = trpc.getUserById.useQuery(
                collectible.user_id
              ).data;

              const collaborationEdition = !collectibleRemixes
                ? 1
                : collectibleRemixes.findIndex(
                    (shoe) => shoe.remix_id === collectible.remix_id
                  ) === 0
                ? 1
                : collectibleRemixes.findIndex(
                    (shoe) => shoe.remix_id === collectible.remix_id
                  ) + 1;

              const collaboratorTotal = !collectibleRemixes
                ? 1
                : numberOfMintedCards;

              return (
                <CollectibleCard
                  key={collectible.remix_id}
                  name={`RBK-${padWithLeadingZeroes(3, index)}`}
                  creatorUsername={remixUser?.username as string}
                  dominantColors={collectible.custom_colors.slice(0, 2)}
                  dateCreated={collectible.created_at as string}
                  shoeId={collectible.remix_id}
                  shoePfp={collectible.image_combined_url as string}
                  collaborationEdition={collaborationEdition}
                  numberOfCollaborators={collaboratorTotal}
                  shoeModel={collectible.shoe_model}
                />
              );
            })}
          </>
        )}

        {/* Render Skeleton Cards based on the number of cards */}
        {[...Array(numSkeletonCards)].map((_, index) => (
          <CollectibleCardSkeleton key={index} />
        ))}
      </>
    );
  }
);

DynamicCollectiblesDisplay.displayName = 'DynamicCollectiblesDisplay';

export default DynamicCollectiblesDisplay;
