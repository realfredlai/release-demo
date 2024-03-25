import Image from 'next/image';

import { useTranslations } from 'next-intl';

import { Card, Badge, cn } from '@reebok/frontend-components';
import { H7 } from '@/app/components/Text/H7';
import { Text } from '@/app/components/Text/Text';
import ColorPalette from '@/app/components/ColorPalette/ColorPalette';
import CollabUserIcon from '@/app/components/Cards/CollabUserIcon';

import OwnedTab from '@/public/images/closet/image-owned-tab.png';
import {
  formatDate,
  formatRGBA,
  getRGBPercievedBrightness,
  // padWithLeadingZeroes,
} from '@/app/utils/helpers';

import SneakerCardTypeIcon from './SneakerCardTypeIcon';
import { RGBColor } from '@reebok/backend-libs';
import { useImageUrlCheck } from '@/app/hooks/useImageUrlCheck';
import { PurchaseButton } from '@/app/components/Buttons/PurchaseButton';
import { DeleteRemixButton } from '@/app/components/Buttons/DeleteRemixButton';
import Link from 'next/link';

type OriginalsCardProps = {
  type?: 'originals' | 'collab' | 'minted' | 'collectible';
  name: string;
  shoeModel: string;
  prompt?: string;
  dominantColors: RGBColor[];
  dateCreated: string;
  creatorUsername?: string;
  shoePfp: string;
  collaborationEdition?: number;
  numberOfCollaborators?: number;
  shoeId: string;
  claimedState: string;
  moderationStatus: string;
  notForSale?: boolean; // this is to hide the button on the gallery page.
  hideDelete?: boolean; // this is to hide the button on the gallery/owned page.
  href: string;
};

const isWithinLast24Hours = (timestamp: string) => {
  const now = new Date();
  const timestampDate = new Date(timestamp);

  // Calculate the difference in milliseconds
  const timeDifference = now.getTime() - timestampDate.getTime();

  // Check if the difference is less than 24 hours (24 * 60 * 60 * 1000 milliseconds)
  return timeDifference < 24 * 60 * 60 * 1000;
};

export default function OriginalsCard(props: OriginalsCardProps) {
  const t = useTranslations();

  const isCollectable = props.type === 'collectible';
  const isMinted = props.type === 'minted';
  const isCollabCard = !!props.numberOfCollaborators;

  const isWithinLast24HoursMade = isWithinLast24Hours(props.dateCreated);
  const pfpUrl = useImageUrlCheck(props.shoePfp);

  const dominantColorColorMode = getRGBPercievedBrightness(
    props.dominantColors[0]
  );

  const dynamicTextColor =
    dominantColorColorMode === 'light' ? 'text-primary-navy' : 'text-white';

  return (
    <Card>
      <Link
        href={props.href}
        className={cn(`shadow-lg block h-[490px] md:h-[440px] xlg:h-[640px]`, {
          'lg:h-[590px]': isCollectable,
        })}
      >
        <div className="h-full w-full relative">
          <Image
            src={pfpUrl}
            alt="User Reebok Shoe"
            width={336}
            height={391}
            className="w-full h-5/6 object-cover"
          />
          {!isMinted && !isCollectable ? (
            <SneakerCardTypeIcon
              type={props.shoeModel}
              className="absolute left-0 top-0 m-4"
            />
          ) : (
            <Image
              src={OwnedTab}
              alt="Owned Label Tab"
              width="100"
              className="absolute left-0 top-0"
            />
          )}
          {!isMinted && !isCollectable && isWithinLast24HoursMade && (
            <Badge variant="new" className="absolute right-0 top-0 mt-4">
              <Text
                variant="caption"
                weight="bold"
                className="leading-none text-primary-navy"
              >
                {t('locker_creations_new')}
              </Text>
            </Badge>
          )}
          {/* {(isMinted || isCollectable) && (
            <div className="absolute right-0 top-0 m-4">
              <Text className="font-parabole text-4xl w-16">
                {padWithLeadingZeroes(2, props.collaborationEdition as number)}/
                <wbr />
                {props.numberOfCollaborators}
              </Text>
            </div>
          )} */}
          <div
            className={`absolute bottom-0 h-[7.5rem] w-full p-4 flex flex-col ${
              isMinted ? 'justify-evenly' : 'justify-center'
            } gap-2`}
            style={{
              backgroundColor: formatRGBA(props.dominantColors[0]),
            }}
          >
            {!isMinted && !isCollectable && (
              <div className="flex justify-between h-9 items-center">
                <H7 className={dynamicTextColor}>{props.name}</H7>

                {isCollabCard &&
                  (props.numberOfCollaborators as number) > 1 && (
                    <CollabUserIcon
                      numberOfCollaborators={props.numberOfCollaborators}
                      dynamicIconColor={dominantColorColorMode}
                    />
                  )}
              </div>
            )}
            {(isMinted || isCollectable) && (
              <div
                className={cn(
                  'flex flex-col h-full justify-between items-start',
                  dynamicTextColor
                )}
              >
                <H7>{props.name}</H7>
                <div className="flex gap-1">
                  <Text variant="body">
                    {t('locker_creations_collaborations_remix_by')}
                  </Text>
                  <Text
                    variant="body"
                    weight="bold"
                    className="flex flex-wrap break-words"
                  >
                    {props.creatorUsername}
                  </Text>
                </div>
                <Text variant="body">
                  {t('locker_shoe_history_minted', {
                    date: formatDate(props.dateCreated),
                  })}
                </Text>
              </div>
            )}

            {!isMinted && !isCollectable && (
              <div className="flex justify-between items-center gap-2">
                <Badge variant="shoe">
                  <Text variant="caption" className="text-xs font-bold">
                    {props.prompt}
                  </Text>
                </Badge>
                <div className="flex gap-1">
                  <ColorPalette colors={props.dominantColors} />
                </div>
              </div>
            )}
          </div>
        </div>
      </Link>
      <PurchaseButton
        shoeId={props.shoeId}
        claimedState={props.claimedState}
        moderationStatus={props.moderationStatus}
        outlineButton
        className={`mt-4 ${props.notForSale ? 'hidden' : ''}`}
      />
      <DeleteRemixButton
        hideDelete={props.hideDelete}
        shoeId={props.shoeId}
        isCollabCard={isCollabCard}
      />
    </Card>
  );
}
