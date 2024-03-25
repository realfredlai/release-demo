import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { GlobalUserItem, RemixItem } from '@reebok/backend-libs';
import { Badge, cn } from '@reebok/frontend-components';

import { Text } from '@/app/components/Text/Text';
import SneakerCardTypeIcon from '@/app/components/Cards/SneakerCardTypeIcon';
import ColorPalette from '@/app/components/ColorPalette/ColorPalette';

import { useImageUrlCheck } from '@/app/hooks/useImageUrlCheck';
import { RemixType, useShoeLockerStore } from '@/app/store/ShoeLockerStore';

import OriginalAuthorHeader from '@/public/images/closet/image-original-image-header.svg';

type OriginalShoeImageProps = {
  user: GlobalUserItem;
  remix: RemixItem;
  remixType: RemixType;
  showUser?: boolean;
};

const OriginalShoeImage: React.FC<OriginalShoeImageProps> = ({
  user,
  remix,
  remixType,
  showUser, // hide user on gallery; for now
}) => {
  const t = useTranslations();

  const { isPFPUnityOpen } = useShoeLockerStore();

  const { image_original_url: originalImage } = remix;
  const { username: uploaderUsername } = user;

  const imageUrl = useImageUrlCheck(originalImage);

  return (
    <div className="bg-primary-bone text-primary-navy">
      <div className="container grid-layout h-fit py-mobilel md:pt-mobilel md:pb-0 px-6 break-all">
        <Image
          src={OriginalAuthorHeader}
          alt="Original Author"
          className="col-start-1 col-end-4 md:col-end-6 lg:col-end-9"
        />

        <div
          className={cn(
            `relative flex flex-col lg:flex-row lg:items-end col-span-full row-start-3 lg:col-start-4 lg:col-end-13 gap-2.5 bottom-2 md:bottom-8 lg:bottom-16`,
            { hidden: isPFPUnityOpen }
          )}
        >
          <Image
            src={imageUrl}
            alt="Original Image"
            width="0"
            height="0"
            sizes="100vw"
            className="w-auto lg:w-1/2 -mt-10 lg:-mt-48"
          />

          {showUser && (
            //TODO: REMOVE SHOW USER ON INSPIRATION GALLERY REFACTOR
            <>
              {remixType === 'collectibles' ? (
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-1">
                    <Text variant="caption">
                      {t('locker_originals_original_uploader')}
                    </Text>
                    <Text
                      variant="leadParagraph"
                      weight="bold"
                      className="text-2xl break-words"
                    >
                      {user.username}
                    </Text>
                  </div>
                  <div className="flex flex-col gap-1">
                    <Text variant="caption">
                      {t('locker_collectibles_styles')}
                    </Text>
                    <Badge variant="shoe" className="w-fit">
                      {remix.custom_prompt_name}
                    </Badge>
                  </div>
                  <div className="flex flex-col gap-1">
                    <Text variant="caption">
                      {t('locker_collectibles_color_palette')}
                    </Text>
                    <ColorPalette
                      colors={remix.custom_colors.slice(0, 2)}
                      className="h-8 w-8"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <Text variant="caption">
                      {t('locker_collectibles_sneaker_style')}
                    </Text>
                    <SneakerCardTypeIcon type={remix.shoe_model} />
                  </div>
                </div>
              ) : (
                <div className="flex flex-col leading-normal">
                  <Text variant="caption">
                    {t('locker_originals_original_uploader')}
                  </Text>

                  <Text
                    variant="leadParagraph"
                    weight="bold"
                    className="text-2xl break-words"
                  >
                    {uploaderUsername}
                  </Text>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default OriginalShoeImage;
