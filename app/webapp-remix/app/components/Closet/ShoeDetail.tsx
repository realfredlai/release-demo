import Image from 'next/image';
import { GlobalUserItem, RemixItem, ShoeModel } from '@reebok/backend-libs';

import { formatRGBA } from '@/app/utils/helpers';
import { useShoeLockerStore } from '@/app/store/ShoeLockerStore';
import { UnityProvider } from '@/app/providers/UnityProvider';
import { useImageUrlCheck } from '@/app/hooks/useImageUrlCheck';

import BackToCloset from '@/app/components/Closet/ShoeDetail/BackToCloset';
import ShoeInfo from '@/app/components/Closet/ShoeDetail/ShoeInfo';
import ShoeEdition from '@/app/components/Closet/ShoeDetail/ShoeEdition';
import ShoeDetailType from '@/app/components/Closet/ShoeDetail/ShoeDetailType';
import ShoeDetailOptions from '@/app/components/Closet/ShoeDetail/ShoeDetailOptions';
import { IconWrapper } from '@/app/components/IconWrapper';
import { PFPUnity } from '@/app/components/Closet/PFPUnity';

import { cn } from '@reebok/frontend-components';

import ExpandIcon from '@/public/images/icons/icon-expand-arrows-white.svg';

export type ShoeType = 'originals' | 'collectibles' | 'collaborations';

type ShoeDetailProps = {
  remix: RemixItem;
  remixType: ShoeType;
  user: GlobalUserItem;
};

const ShoeDetail: React.FC<ShoeDetailProps> = ({ remix, remixType, user }) => {
  const { currentShoeBrightness, isPFPUnityOpen, setPFPUnityOpen } =
    useShoeLockerStore();

  const imageUrl = useImageUrlCheck(remix.image_combined_url);

  const isRemixCollectible = remixType === 'collectibles';

  const mostDominantColor = remix.custom_colors[0];
  const secondMostDominantColor = remix.custom_colors[1];

  const collectiblesBackgroundGradient = `radial-gradient(92.85% 89.21% at 92.88% 91.76%, ${formatRGBA(
    secondMostDominantColor
  )} 0%, ${formatRGBA(mostDominantColor)} 99.6%)`;

  const colourScheme =
    currentShoeBrightness === 'dark' ? 'text-white' : 'text-primary-navy';

  const dynamicBackgroundColor = !isRemixCollectible
    ? formatRGBA(mostDominantColor)
    : collectiblesBackgroundGradient;

  const handlePFPEnlargeToggle = () => {
    setPFPUnityOpen(!isPFPUnityOpen);
  };

  return (
    <>
      <div className={cn('absolute inset-0', { hidden: !isPFPUnityOpen })}>
        <UnityProvider shoeType={remix.shoe_model as ShoeModel} remix={remix}>
          <PFPUnity />
        </UnityProvider>
      </div>

      <div className={isPFPUnityOpen ? 'hidden' : ''}>
        <div
          className={colourScheme}
          style={{ background: dynamicBackgroundColor }}
        >
          <div className="container grid-layout h-fit pb-xs pt-16">
            {/* Back to Closet Link and Divider */}
            <BackToCloset shoeType={remixType} />

            {/* Shoe Name, User, Share, More Buttons */}
            <ShoeInfo shoeType={remixType} remix={remix} user={user} />

            {/* Shoe Edition, remix history, collaborators */}
            <ShoeEdition shoeType={remixType} remix={remix} user={user} />

            <div className="col-span-full lg:col-start-4 lg:col-end-10 relative">
              <Image
                src={imageUrl}
                alt="User Pfp Image"
                width={696}
                height={685}
                className="w-full h-auto"
              />

              <IconWrapper
                className="absolute left-0 top-0 !size-12 xlg:!size-16 !p-1 m-3 cursor-pointer bg-primary-navy bg-opacity-30"
                onClick={handlePFPEnlargeToggle}
              >
                <Image
                  src={ExpandIcon}
                  alt={'Expand into unity view'}
                  unoptimized
                />
              </IconWrapper>
            </div>

            {/* {isRemixCollectible && (
              <div className="lg:hidden col-span-full">
                <Text className="font-parabole text-2xl flex justify-end">
                  09/<wbr />12
                </Text>
              </div>
            )} */}

            {/* ShoeType Icon, Prompt, Dominant Colors */}
            {!isRemixCollectible && <ShoeDetailType remix={remix} />}
          </div>
        </div>
      </div>

      {/*TODO: Find out... if the user claimed==='not_claimed' can they customise/purchase it?
      I reckon no - but how will that work if they share the link. Feels like I'm missing something
      {remix.state === 'CLAIMED' && ( )
      */}
      {/* hide cusomize/purchase bar if moderation has not been approved */}
      {(remix.moderation_status === 'APPROVED' ||
        remix.moderation_status === 'AUTO_APPROVED') && (
        <ShoeDetailOptions
          shoeType={remixType}
          shoeId={remix.remix_id}
          userId={user.user_id}
          futurepassAddress={user.futurepass_address as string}
          claimedState={remix.state as string}
          moderationStatus={remix.moderation_status as string}
        />
      )}
    </>
  );
};

export default ShoeDetail;
