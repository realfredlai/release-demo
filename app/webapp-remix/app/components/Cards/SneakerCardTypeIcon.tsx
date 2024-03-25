import React from 'react';
import Image, { StaticImageData } from 'next/image';

import { cn } from '@reebok/frontend-components';

import PumpSneakerIcon from '@/public/images/closet/ShoeTypeIcons/icon-shoetype-pump.png';
import ClubCSneakerIcon from '@/public/images/closet/ShoeTypeIcons/icon-shoetype-club-c.png';
import ClassicLeatherSneakerIcon from '@/public/images/closet/ShoeTypeIcons/icon-shoetype-classic.png';

type SneakerCardTypeIconProps = {
  type: string;
  className?: string;
};

const SneakerCardTypeIcon: React.FC<SneakerCardTypeIconProps> = ({
  type,
  className,
}) => {
  let iconSrc: StaticImageData;

  switch (type) {
    case 'ThePump':
      iconSrc = PumpSneakerIcon;
      break;
    case 'ClubC':
      iconSrc = ClubCSneakerIcon;
      break;
    case 'ClassicLeather':
      iconSrc = ClassicLeatherSneakerIcon;
      break;
    default:
      iconSrc = PumpSneakerIcon;
      break;
  }

  return (
    <Image
      src={iconSrc}
      alt={`${type} Sneaker Icon`}
      width="50"
      className={cn('relative', className)}
    />
  );
};

export default SneakerCardTypeIcon;
