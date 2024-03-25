import { Dispatch, SetStateAction, useState } from 'react';
import { trpc } from '@/trpc';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import {
  Dialog,
  DialogClose,
  DialogContent,
} from '@/app/components/Dialog/Dialog';
import { Icons } from '@/app/components/Icons';
import { Text } from '@/app/components/Text/Text';
import ShoeHistoryCard from '@/app/components/Cards/ShoeHistoryCard';

import LeftArrow from '@/public/images/icons/icon-pagination-leftarrow.svg';
import { RemixItem } from '@reebok/backend-libs';

type ShoeHistoryMobileProps = {
  remixHistory: RemixItem[];
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const ShoeHistoryMobile: React.FC<ShoeHistoryMobileProps> = ({
  remixHistory,
  open,
  setOpen,
}) => {
  const t = useTranslations();
  const [showMore, setShowMore] = useState(false);

  const paginatedRemix = remixHistory.slice(
    0,
    showMore ? remixHistory.length : 4
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="h-screen w-screen max-w-[100%] bg-primary-navy border-0 focus:outline-none overflow-y-auto">
        <div className="container h-fit">
          <div className="py-mobiles h-fit flex justify-between">
            <DialogClose className="h-fit">
              <div className="group rounded-full p-2 bg-primary-bone ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
                <Icons.NavyXMarkIcon />
              </div>
            </DialogClose>
          </div>
        </div>

        <div className="container overflow-y-auto h-fit flex flex-col gap-8">
          <div className="grid-layout h-full items-center mb-xs justify-items-center">
            <div className="col-span-full md:col-start-4 md:col-end-6 flex flex-col justify-start gap-4">
              {paginatedRemix.map((remix, index) => (
                <div
                  className="flex flex-col justify-between items-center gap-6"
                  key={remix.remix_id}
                >
                  <ShoeHistoryCard
                    type={index % 2 === 0 ? 'MINT' : 'COLLAB'}
                    name={`RBK-00${index}`}
                    prompt={remix.custom_prompt_name}
                    dateCreated={remix.created_at as string}
                    dominantColors={remix.custom_colors.slice(0, 2)}
                    username={remix.user_id}
                    collaboratorId={1}
                    numberOfCollaborators={1}
                    shoeId={remix.remix_id}
                    shoePfp={remix.image_combined_url as string}
                    shoeModel={remix.shoe_model}
                  />
                </div>
              ))}
            </div>

            {!showMore && remixHistory.length > 3 && (
              <div className="col-span-full flex justify-center">
                <div className="relative flex flex-col gap-4 text-primary-bone items-center">
                  <div className={'h-20 w-20 -rotate-90'}>
                    <Image
                      src={LeftArrow}
                      alt={'Down Arrow'}
                      onClick={() => setShowMore(!showMore)}
                    />
                  </div>
                  <Text variant="leadParagraph">
                    {t('locker_shoe_history_see_more')}
                  </Text>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShoeHistoryMobile;
