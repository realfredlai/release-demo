import { Dispatch, SetStateAction, useMemo, useState } from 'react';
import { trpc } from '@/trpc';
import Image from 'next/image';

import {
  Dialog,
  DialogClose,
  DialogContent,
} from '@/app/components/Dialog/Dialog';
import { Icons } from '@/app/components/Icons';
import ShoeHistoryCard from '@/app/components/Cards/ShoeHistoryCard';

import LeftArrow from '@/public/images/icons/icon-pagination-leftarrow.svg';
import RightArrow from '@/public/images/icons/icon-pagination-rightarrow.svg';
import { padWithLeadingZeroes } from '@/app/utils/helpers';
import { RemixItem } from '@reebok/backend-libs';

type ShoeHistoryProps = {
  remixHistory: RemixItem[];
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const ShoeHistory: React.FC<ShoeHistoryProps> = ({
  remixHistory,
  open,
  setOpen,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const paginatedRemix = useMemo(() => {
    const startIndex = (currentPage - 1) * 4;
    const endIndex = Math.min(startIndex + 4, remixHistory.length);
    return remixHistory.slice(startIndex, endIndex);
  }, [currentPage, remixHistory]);

  const totalPages = Math.ceil(remixHistory.length / 4) || 1;
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const handleLeftArrowClick = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleRightArrowClick = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="h-screen w-screen max-w-[100%] bg-primary-navy border-0 focus:outline-none overflow-y-auto">
        {!isFirstPage && (
          <div
            className="absolute cursor-pointer left-4 top-1/2 transform -translate-y-1/2 h-20 w-20"
            onClick={handleLeftArrowClick}
          >
            <Image src={LeftArrow} alt="Left Arrow" />
          </div>
        )}

        {!isLastPage && (
          <div
            className="absolute cursor-pointer right-4 top-1/2 transform -translate-y-1/2 h-20 w-20"
            onClick={handleRightArrowClick}
          >
            <Image src={RightArrow} alt="Right Arrow" />
          </div>
        )}

        <div className="container h-fit">
          <div className="py-mobiles h-fit flex justify-end">
            <DialogClose className="h-fit">
              <div className="group rounded-full p-2 bg-primary-bone ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
                <Icons.NavyXMarkIcon />
              </div>
            </DialogClose>
          </div>
        </div>

        <div className="overflow-y-auto h-fit flex flex-col gap-8">
          <div className="container grid-layout grid-cols-4 grid h-full items-center">
            {paginatedRemix.map((remix, index) => {
              const combinedQuery = trpc.useQueries((t) => [
                t.getUserById(remix.user_id),
                t.getLatestUserCollabs(remix.user_id),
              ]);

              // TODO: FIX SHOE HISTORY
              const { data: remixUser } = combinedQuery[0];

              const collaborationEdition = 1;
              const collaboratorTotal = 1;

              return (
                <div
                  className="flex flex-col justify-between items-center gap-6 h-full w-full"
                  key={remix.remix_id}
                >
                  <ShoeHistoryCard
                    //TODO: GET TYPE AND NAME FROM BACKEND
                    type={index % 2 === 0 ? 'MINT' : 'COLLAB'}
                    name={`RBK-${padWithLeadingZeroes(3, index)}`}
                    prompt={remix.custom_prompt_name}
                    dominantColors={remix.custom_colors.slice(0, 2)}
                    dateCreated={remix.created_at as string}
                    username={remixUser?.username as string}
                    collaboratorId={collaborationEdition}
                    numberOfCollaborators={collaboratorTotal}
                    shoeId={remix.remix_id}
                    shoePfp={remix.image_combined_url as string}
                    shoeModel={remix.shoe_model}
                  />
                </div>
              );
            })}
          </div>

          <div className="flex justify-center gap-2">
            {Array.from(Array(totalPages), (_, index) => {
              const pageNumber = index + 1;

              return (
                <div
                  key={index}
                  className={`w-4 h-4 bg-primary-bone rounded-full cursor-pointer transition-all duration-500 ${
                    pageNumber === currentPage ? '' : 'bg-opacity-20'
                  }`}
                  onClick={() => {
                    setCurrentPage(pageNumber);
                  }}
                />
              );
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShoeHistory;
