import { useState, memo } from 'react';

import { useTranslations } from 'next-intl';

import { getConfig } from '@reebok/shared';
import { RemixItem } from '@reebok/backend-libs';

import { padWithLeadingZeroes } from '@/app/utils/helpers';

import { useBreakpoint } from '@/app/hooks/useBreakpoint';

import ImageButtonModal from '@/app/components/Modals/ImageButtonModal';
import NoCollabsCard from '@/app/components/Cards/NoCollabsCard';
import CollabCardSkeleton from '@/app/components/Cards/CollabCardSkeleton';
import StartNewCollabCard from '@/app/components/Cards/StartNewCollabCard';
import CollabCard from '@/app/components/Cards/CollabCard';
import { Text } from '@/app/components/Text/Text';

import InviteYourFriendsModalImg from '@/public/images/closet/image-invite-friends.png';

type DynamicCollabsDisplayProps = {
  collabRemixes: RemixItem[];
};

const DynamicCollabsDisplay = memo(
  ({ collabRemixes }: DynamicCollabsDisplayProps) => {
    const t = useTranslations();

    const { isBelowMd } = useBreakpoint('md');
    const { isBelowLg } = useBreakpoint('lg');

    const [isNoCollabsModalOpen, setIsNoCollabsModalOpen] = useState(false);
    const [isStartNewCollabModalOpen, setIsStartNewCollabModalOpen] =
      useState(false);

    const handleOpenNoCollabsModal = () => {
      setIsNoCollabsModalOpen(!isNoCollabsModalOpen);
    };

    const handleOpenStartNewCollabModal = () => {
      setIsStartNewCollabModalOpen(!isStartNewCollabModalOpen);
    };

    const numberOfCollabRemixes = collabRemixes.length;

    /**
     * Calculate the number of skeleton base cards
     * Mobile = 1 skeleton
     * Tablet = 3
     * Desktop/Large-Desktop = 3
     */
    const getNumOfSkeletonCards = () => {
      if (isBelowMd) {
        return 1;
      } else if (isBelowLg) {
        return 3;
      } else {
        return 3;
      }
    };

    // Once collab cards exceed base cards, show 0 skeletons
    const numSkeletonCards = Math.max(
      0,
      getNumOfSkeletonCards() - numberOfCollabRemixes
    );

    const DescriptionText = () => (
      <Text variant="lgBody">{t('locker_creations_invite_description')}</Text>
    );

    return (
      <>
        {numberOfCollabRemixes === 0 ? (
          <ImageButtonModal
            open={isNoCollabsModalOpen}
            setOpen={setIsNoCollabsModalOpen}
            imageSrc={InviteYourFriendsModalImg}
            title={t('locker_creations_invite_heading')}
            description={<DescriptionText />}
            primaryButtonLabel={t('locker_creations_invite_button')}
            onPrimaryButtonClick={() => {
              window.location.href = getConfig().instagram.myInbox as string;
            }}
            secondaryButtonLabel={t('locker_creations_invite_cancel')}
          >
            <NoCollabsCard onOpenModal={handleOpenNoCollabsModal} />
          </ImageButtonModal>
        ) : (
          <>
            {collabRemixes.map((collab, index) => {
              // TODO: FIX COLLAB NUMBERS
              const collaborationEdition = !collabRemixes
                ? 1
                : collabRemixes.findIndex(
                    (shoe) => shoe.remix_id === collab.remix_id
                  ) === 0
                ? 1
                : collabRemixes.findIndex(
                    (shoe) => shoe.remix_id === collab.remix_id
                  ) + 1;

              const collaboratorTotal = !collabRemixes
                ? 1
                : numberOfCollabRemixes;

              return (
                <CollabCard
                  key={collab.remix_id}
                  name={`RBK-${padWithLeadingZeroes(3, index)}`}
                  prompt={collab.custom_prompt_name}
                  dominantColors={collab.custom_colors.slice(0, 2)}
                  dateCreated={collab.created_at as string}
                  collaboratorId={collaborationEdition}
                  numberOfCollaborators={collaboratorTotal}
                  shoeId={collab.remix_id}
                  shoePfp={collab.image_combined_url as string}
                  shoeModel={collab.shoe_model}
                />
              );
            })}
          </>
        )}

        {numberOfCollabRemixes !== 0 && (
          <ImageButtonModal
            open={isStartNewCollabModalOpen}
            setOpen={setIsStartNewCollabModalOpen}
            imageSrc={InviteYourFriendsModalImg}
            title={t('locker_creations_invite_heading')}
            description={<DescriptionText />}
            primaryButtonLabel={t('locker_creations_invite_button')}
            onPrimaryButtonClick={() => {
              window.location.href = getConfig().instagram
                .reebokProfile as string;
            }}
            secondaryButtonLabel={t('locker_creations_invite_cancel')}
          >
            <StartNewCollabCard onOpenModal={handleOpenStartNewCollabModal} />
          </ImageButtonModal>
        )}

        {/* Render Skeleton Cards based on the number of cards */}
        {[...Array(numSkeletonCards)].map((_, index) => (
          <CollabCardSkeleton key={index} />
        ))}
      </>
    );
  }
);

DynamicCollabsDisplay.displayName = 'DynamicCollabsDisplay';

export default DynamicCollabsDisplay;
