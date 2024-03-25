'use client';
import { Text } from '@/app/components/Text/Text';

import Image from 'next/image';
import { RemixItem } from '@reebok/backend-libs';
import { formatRGBA } from '@/app/utils/helpers';
import { useImageUrlCheck } from '@/app/hooks/useImageUrlCheck';
import LeftArrowWhiteIcon from '@/public/images/icons/icon-leftarrow-white.svg';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { H6 } from '../Text/H6';
import { useLayoutEffect, useState } from 'react';
import { useBreakpoint } from '@/app/hooks/useBreakpoint';

import ShareDropdown from '@/app/components/Closet/ShareDropdown';
import ShareModal from '@/app/components/Closet/ShareModal/ShareModal';
import { IconWrapper } from '@/app/components/IconWrapper';
import { Icons } from '../Icons';
import ShareIcon from '@/public/images/closet/icon-share-white.svg';
// import { formatSignupLink } from '@/app/utils/helpers'; can't use this because use may not be signed in - I think...
import MoreDropdown from '@/app/components/Closet/MoreDropdown';
import ShoeDetailType from '../Closet/ShoeDetail/ShoeDetailType';

export type ShoeType = 'originals' | 'collectibles' | 'collaborations';

type ShoeDetailProps = {
  remix: RemixItem;
};

const GalleryShoeDetail: React.FC<ShoeDetailProps> = ({ remix }) => {
  const t = useTranslations();

  const mostDominantColor = remix.custom_colors[0];

  const imageUrl = useImageUrlCheck(remix.image_combined_url);
  const [isBelowMdClient, setIsBelowMdClient] = useState<boolean>(false);
  const { isBelowMd } = useBreakpoint('md');

  useLayoutEffect(() => {
    setIsBelowMdClient(isBelowMd);
  }, [isBelowMd]);
  return (
    <>
      <div
        className={'text-primary-bone'}
        style={{ backgroundColor: formatRGBA(mostDominantColor) }}
      >
        <div className="container grid-layout h-fit pb-xs pt-16">
          <div className="col-span-full flex flex-col lg:justify-end lg:gap-4 lg:flex-row gap-y-2 lg:col-start-2 lg:col-end-4 mt-mobiles lg:mt-xs h-fit lg:h-auto">
            <div className="flex gap-x-2.5 lg:flex-col lg:justify-end">
              <Link
                href="/gallery"
                className="flex w-fit gap-2 lg:flex-wrap lg:flex-col lg:items-end  py-3 lg:py-0"
              >
                {/* TEMP FIX UNTIL INSPIRATION GALLERY IS MORE EFFICIENT */}
                <Icons.LeftArrowIcon color="white" className="size-7" />

                <Text variant="body" className="uppercase">
                  {t('gallery_button_back_to_inspiration')}
                </Text>
              </Link>
            </div>
            <div className="w-full h-0.5 lg:w-0.5 lg:h-auto bg-primary-bone col-span-full flex flex-col" />
          </div>

          <div className="col-span-full lg:row-span-1 lg:col-start-4 lg:col-end-10 lg:mt-xs relative">
            <H6 className="pb-2">{remix.remix_id.slice(0, 8)}</H6>
            <div className="absolute top-1.5 right-0 flex flex-row gap-2">
              {isBelowMdClient ? (
                <ShareModal title={t('locker_originals_invite')} remix={remix}>
                  <IconWrapper>
                    <Image src={ShareIcon} alt="Share Icon" width={100} />
                  </IconWrapper>
                </ShareModal>
              ) : (
                <ShareDropdown />
              )}
              <MoreDropdown remix={remix} showOnlyReport={true} />
            </div>
          </div>

          <div className="col-span-full lg:col-start-4 lg:col-end-10 relative">
            <Image
              src={imageUrl}
              alt="User Pfp Image"
              width={696}
              height={685}
              className="w-full h-auto"
            />
          </div>

          <ShoeDetailType remix={remix} />
        </div>
      </div>
    </>
  );
};

export default GalleryShoeDetail;
