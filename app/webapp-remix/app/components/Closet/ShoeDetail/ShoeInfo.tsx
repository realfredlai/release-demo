'use client';
import { useLayoutEffect, useState } from 'react';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

import { useBreakpoint } from '@/app/hooks/useBreakpoint';

import { Text } from '@/app/components/Text/Text';
import { H6 } from '@/app/components/Text/H6';

import UserIcon from '@/app/components/Closet/UserIcon';
import ShareDropdown from '@/app/components/Closet/ShareDropdown';
import MoreDropdown from '@/app/components/Closet/MoreDropdown';
import ShareModal from '@/app/components/Closet/ShareModal/ShareModal';
import { IconWrapper } from '@/app/components/IconWrapper';

import ShareIcon from '@/public/images/closet/icon-share-white.svg';
import EllipsisIcon from '@/public/images/closet/icon-ellipsis-white.svg';

import {
  formatDate,
  formatSignupLink,
  getRGBPercievedBrightness,
} from '@/app/utils/helpers';

import { ShoeType } from '@/app/components/Closet/ShoeDetail';
import { cn } from '@reebok/frontend-components';
import { GlobalUserItem, RemixItem } from '@reebok/backend-libs';
import { useShoeLockerStore } from '@/app/store/ShoeLockerStore';

type ShoeInfoProps = {
  shoeType: ShoeType;
  remix: RemixItem;
  user: GlobalUserItem;
};

const ShoeInfo: React.FC<ShoeInfoProps> = ({ shoeType, remix, user }) => {
  const [isBelowMdClient, setIsBelowMdClient] = useState<boolean>(false);
  const { isBelowMd } = useBreakpoint('md');

  useLayoutEffect(() => {
    setIsBelowMdClient(isBelowMd);
  }, [isBelowMd]);

  const t = useTranslations();

  const { currentShoeBrightness } = useShoeLockerStore();

  const signupRefLink = formatSignupLink(user.signup_code as string);

  const dominantColorFill =
    getRGBPercievedBrightness(remix.custom_colors[0]) === 'light'
      ? 'navy'
      : 'white';

  const isCollectibles = shoeType === 'collectibles';

  const renderOriginals = () => (
    <>
      <UserIcon colorMode={dominantColorFill} />
      <Text variant="body" className="flex-1">
        {t('locker_originals_original_by', { user: user.username })}
      </Text>
    </>
  );

  const renderCollectibles = () => (
    <div className="flex flex-col lg:flex-row lg:gap-2">
      <Text variant="body" className="flex gap-1">
        {t.rich('locker_collectibles_owned_by', {
          bold: (chunks) => (
            <span className="font-neue-plak-bold sm:text-sm lg:text-base">
              {chunks}
            </span>
          ),
          ownerName: user.username,
        })}
      </Text>

      <div
        className={cn('hidden lg:flex h-auto w-0.5', {
          'bg-primary-bone': currentShoeBrightness === 'dark',
          'bg-primary-navy': currentShoeBrightness === 'light',
        })}
      />

      <Text variant="body" className="flex gap-1">
        {t('locker_collectibles_collected', {
          date: formatDate(remix.created_at as string),
        })}
      </Text>
    </div>
  );

  return (
    <div className="col-span-full lg:row-span-1 lg:col-start-4 lg:col-end-10 lg:mt-xs">
      <H6 className="pb-2">{remix.remix_id.slice(0, 8)}</H6>

      <div
        className={cn(
          'flex justify-between',
          isCollectibles ? 'items-end' : 'gap-2 items-center'
        )}
      >
        {isCollectibles ? renderCollectibles() : renderOriginals()}

        <div className="flex gap-x-2">
          {isBelowMdClient ? (
            <ShareModal
              title={t('locker_originals_invite')}
              signupLink={signupRefLink}
              remix={remix}
            >
              <IconWrapper>
                <Image src={ShareIcon} alt="Share Icon" width={100} />
              </IconWrapper>
            </ShareModal>
          ) : (
            <ShareDropdown />
          )}

          {!isCollectibles && (
            <>
              {isBelowMdClient ? (
                <ShareModal
                  title={t('locker_originals_options')}
                  signupLink={signupRefLink}
                  // TODO: GET ASSOCIATED COLLABORATIONS # FROM REMIX
                  associatedCollaborations={3}
                  remix={remix}
                  hasShoeOptions
                >
                  <IconWrapper>
                    <Image src={EllipsisIcon} alt="Ellipsis Icon" width={100} />
                  </IconWrapper>
                </ShareModal>
              ) : (
                <MoreDropdown
                  // TODO: GET ASSOCIATED COLLABORATIONS # FROM REMIX
                  associatedCollaborations={3}
                  remix={remix}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShoeInfo;
