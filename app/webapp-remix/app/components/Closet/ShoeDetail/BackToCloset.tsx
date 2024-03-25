import { useTranslations } from 'next-intl';

import Link from 'next/link';
import Image from 'next/image';

import { Text } from '@/app/components/Text/Text';
import { ShoeType } from '@/app/components/Closet/ShoeDetail';
import { Icons } from '@/app/components/Icons';

import { useShoeLockerStore } from '@/app/store/ShoeLockerStore';
import { cn } from '@reebok/frontend-components';

import LeftArrowWhiteIcon from '@/public/images/icons/icon-leftarrow-white.svg';

type Props = {
  shoeType: ShoeType;
};

const BackToCloset = (props: Props) => {
  const t = useTranslations();
  const { currentShoeBrightness } = useShoeLockerStore();

  const iconFillColor = currentShoeBrightness === 'light' ? 'navy' : 'white';

  const isCollectibles = props.shoeType === 'collectibles';

  return (
    <div className="col-span-full flex flex-col lg:justify-end lg:gap-4 lg:flex-row gap-y-2 lg:col-start-2 lg:col-end-4 mt-mobiles lg:mt-xs h-fit lg:h-auto">
      <div className="flex gap-x-2.5 lg:flex-col lg:justify-end">
        <Link
          href="/closet"
          className="flex w-fit gap-2 lg:flex-wrap lg:flex-col lg:items-end  py-3 lg:py-0"
        >
          <Icons.LeftArrowIcon color={iconFillColor} />

          <Text variant="body">
            {isCollectibles
              ? t('locker_collectibles_back_to_collection')
              : t('locker_originals_back_to_closet')}
          </Text>
        </Link>
      </div>
      <div
        className={cn(
          'w-full h-0.5 lg:w-0.5 lg:h-auto col-span-full flex flex-col',
          { 'bg-primary-bone': currentShoeBrightness === 'dark' },
          { 'bg-primary-navy': currentShoeBrightness === 'light' }
        )}
      />{' '}
    </div>
  );
};

export default BackToCloset;
