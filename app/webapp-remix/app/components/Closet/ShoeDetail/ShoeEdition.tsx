import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { trpc } from '@/trpc';

import ShoeHistory from '@/app/components/Closet/ShoeHistory/ShoeHistory';
import ShoeHistoryMobile from '@/app/components/Closet/ShoeHistory/ShoeHistoryMobile';
import { Text } from '@/app/components/Text/Text';
import { ShoeType } from '@/app/components/Closet/ShoeDetail';
import ImageButtonModal from '@/app/components/Modals/ImageButtonModal';
import ShareModalButtons from '@/app/components/Closet/ShareModal/ShareModalButtons';

import { useBreakpoint } from '@/app/hooks/useBreakpoint';

import { GlobalUserItem, RemixItem } from '@reebok/backend-libs';
import { getRGBPercievedBrightness } from '@/app/utils/helpers';

import { Button, cn } from '@reebok/frontend-components';
import { Icons } from '@/app/components/Icons';
import InviteYourFriendsModalImg from '@/public/images/closet/image-invite-friends.png';

type Props = {
  shoeType: ShoeType;
  remix: RemixItem;
  user: GlobalUserItem;
};

const ShoeEdition = ({ shoeType, remix, user }: Props) => {
  const t = useTranslations();
  const [isShoeHistoryOpen, setShoeHistoryOpen] = useState(false);
  const [isInviteCollaboratorsModalOpen, setInviteCollaboratorsOpen] =
    useState(false);

  const { isBelowLg } = useBreakpoint('lg');

  const remixShoeHistory = trpc.getShoeHistory.useQuery(remix.remix_id, {
    suspense: true,
  }).data;

  if (remixShoeHistory == null) return null;

  const isCollectibles = shoeType === 'collectibles';

  const percievedBrightnessMode = getRGBPercievedBrightness(
    remix.custom_colors[0]
  );

  const dominantColorFill =
    percievedBrightnessMode === 'light' ? 'navy' : 'white';

  const dynamicButtonStyling =
    percievedBrightnessMode == 'dark'
      ? 'text-white p-0 h-fit hover:text-primary-bone/50'
      : 'text-primary-navy p-0 h-fit hover:text-secondary-hover/50';

  const handleRemixHistoryClick = () => {
    setShoeHistoryOpen(!isShoeHistoryOpen);
  };

  return (
    <>
      {isShoeHistoryOpen && (
        <>
          {!isBelowLg ? (
            <ShoeHistory
              remixHistory={remixShoeHistory}
              open={isShoeHistoryOpen}
              setOpen={setShoeHistoryOpen}
            />
          ) : (
            <ShoeHistoryMobile
              remixHistory={remixShoeHistory}
              open={isShoeHistoryOpen}
              setOpen={setShoeHistoryOpen}
            />
          )}
        </>
      )}

      {/* {isCollectibles && (
        <div className="hidden lg:flex col-start-10 col-end-12 row-start-2 row-end-2 flex-col w-fit justify-start gap-4">
          <div className="flex flex-col items-start">
            <Text className="font-parabole text-5xl w-12">
              09/
              <wbr />
              12
            </Text>
          </div>
        </div>
      )} */}

      {/* {!isCollectibles && (
        <div className="col-span-full lg:col-start-10 lg:col-end-12 lg:row-start-2 lg:row-end-2 flex lg:flex-col justify-between lg:w-fit lg:justify-start gap-4">
          <div className="flex flex-col items-start">
            <Text className="font-parabole text-2xl lg:text-5xl lg:w-12">
              09/
              <wbr />
              12
            </Text>
            {remixShoeHistory.length < 1 ? (
              <Text variant="body" className="flex gap-1">
                {t.rich('locker_detail_original_by_user', {
                  bold: (chunks) => (
                    <span className="font-neue-plak-bold sm:text-sm lg:text-base">
                      {chunks}
                    </span>
                  ),
                  username: user.username,
                })}
              </Text>
            ) : (
              <Button
                variant="link"
                className={dynamicButtonStyling}
                onClick={handleRemixHistoryClick}
              >
                {t('locker_originals_remix_history')}
              </Button>
            )}
          </div>

          <div
            className={cn(
              'h-full w-0.5 lg:w-full lg:h-0.5',
              { 'bg-white': percievedBrightnessMode === 'dark' },
              { 'bg-primary-navy': percievedBrightnessMode === 'light' }
            )}
          />

          <div className="flex flex-col items-end justify-end">
            <div className="flex gap-x-1.5 justify-end items-baseline lg:flex-col lg:w-full lg:gap-2">
              <Icons.PersonIcon
                color={dominantColorFill}
                className="size-4 lg:size-7"
              />

              <Text variant="body">
                {t('locker_originals_collaborators', { count: 16 })}
              </Text>
            </div>

            <ImageButtonModal
              open={isInviteCollaboratorsModalOpen}
              setOpen={setInviteCollaboratorsOpen}
              imageSrc={InviteYourFriendsModalImg}
              title={t('locker_creations_invite_heading')}
              description={<ShareModalButtons />}
              secondaryButtonLabel={t('locker_creations_invite_cancel')}
            >
              <Button
                variant="link"
                className={dynamicButtonStyling}
                onClick={() =>
                  setInviteCollaboratorsOpen(!isInviteCollaboratorsModalOpen)
                }
              >
                {t('locker_originals_invite_a_collaborator')}
              </Button>
            </ImageButtonModal>
          </div>
        </div>
      )} */}
    </>
  );
};

export default ShoeEdition;
