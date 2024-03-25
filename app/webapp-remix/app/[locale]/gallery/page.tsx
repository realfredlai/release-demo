'use client';
// NOTE: commented code is for later use.
import { trpc } from '@/trpc';

import Image from 'next/image';
import galleryHeader from '@/public/images/gallery/header-inspiration.svg';
import OriginalsCard from '@/app/components/Cards/OriginalsCard';
import Link from 'next/link';
import { padWithLeadingZeroes } from '@/app/utils/helpers';

/*
import { useTranslations } from 'next-intl';
import { H2 } from '@/app/components/Text/H2';
import { Badge, Button, cn } from '@reebok/frontend-components';
import { useState } from 'react';

// No backend functionality for this as far as I can see...
const galleryFilters = [
  'All Galleries',
  'A Dreamy Walk Along a Beach',
  'A Dreamy Walk',
  'A Dream',
  'Ice',
  'cream',
  'unicorn',
  'no such thing',
  'A day in the life of a squirrel',
  'A Dreamy throught',
  'A Dreamy run',
  'A Dreamy dream',
  'snow',
  'creamy',
  'unicorns',
  'no such thing as a fish',
  'A day in the life of a dog',
  'how does',
  'this all wrap?',
];
*/
export default function Gallery() {
  // this will be the fake account ID to demo selected remixes or maybe just an array of remix IDs. will see when it's ready
  const { data: remixAndUserData, error } =
    trpc.getLatestUserCreations.useQuery(
      '2dIG830Ft3l4QlFXZkkTkJfOZNh',

      {
        suspense: true,
      }
    );

  // const t = useTranslations();
  // const [selectedFilter, setSelectedFilter] = useState(galleryFilters[0]);

  // const handleFilterClick = (filter: string) => {
  //   setSelectedFilter(filter);
  //   console.log(`${filter} selected`);
  // };
  /*
  if (error) {
    return (
      <div className="bg-primary-orange text-primary-bone text-center">
        Error loading data...({error?.message})
      </div>
    );
  }*/

  return (
    <>
      <div className="container bg-primary-bone text-primary-navy w-full pb-14">
        <div className="mt-28 lg:mt-56 lg:p-0">
          <Image
            src={galleryHeader}
            width={861}
            height={152}
            alt="Inspiration gallery"
            className="w-5/6 md:w-3/5 lg:w-7/12 h-auto mb-2 lg:mb-6"
          />

          <div className="mt-14 mb-1 lg:mb-20 flex flex-wrap w-full gap-2">
            {/*
            {galleryFilters.map((filter) => (
              <Badge
                key={filter}
                onClick={() => handleFilterClick(filter)}
                className={cn(
                  `whitespace-nowrap py-1.5 leading-snug font-medium text-xs cursor-pointer`,
                  selectedFilter === filter
                    ? 'bg-primary-orange pointer-events-none hover:bg-primary-orange'
                    : 'bg-gray-600 bg-opacity-20 text-primary-navy hover:text-primary-bone hover:bg-primary-orange-hover'
                )}
              >
                {filter}
              </Badge>
            ))}
          </div>
          <div className="flex flex-row items-center justify-between my-5 md:my-12">
            <H2 variant="h2BoldC" className="inline-block">
              Inspiration gallery 01:
            </H2>
            <Button className="hidden md:inline-block h-auto min-w-20 md:min-w-56">
              View All
            </Button>*/}
          </div>

          <div className="w-full grid-layout grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {remixAndUserData?.map((originalRemix, index) => (
              <div key={originalRemix.remix_id + index}>
                {/* <div className="font-parabole text-4xl mb-3">2/13</div> */}

                <OriginalsCard
                  type="originals"
                  name={`RBK-${padWithLeadingZeroes(3, index)}`}
                  shoeModel={originalRemix.shoe_model}
                  dominantColors={originalRemix.custom_colors.slice(0, 2)}
                  dateCreated={originalRemix.created_at as string}
                  shoePfp={originalRemix.image_combined_url as string}
                  prompt={originalRemix.custom_prompt_name}
                  shoeId={originalRemix.remix_id}
                  claimedState={'CLAIMED'}
                  moderationStatus={'APPROVED'}
                  notForSale={true}
                  href={`gallery/originals/${originalRemix.remix_id}`}
                  hideDelete={true}
                />

                {/* <div className="mt-2 text-sm font-medium">
                  Remix by{' '}
                  <span className="font-bold">StoneColdSteveAustin</span>
                </div> */}
              </div>
            ))}
          </div>
          {/* <Button className="md:hidden h-auto w-full mt-6 mb-8">
            View All
          </Button> */}
        </div>
      </div>
    </>
  );
}
