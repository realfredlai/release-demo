import Link from 'next/link';
import Image from 'next/image';

import { Button, cn } from '@reebok/frontend-components';

import orangeRightCircleArrow from '@/public/images/icons/icon-rightcirclearrow-orange.svg';

const ViewTheInspirationGallery = ({
  label,
  className,
}: {
  label: string;
  className?: string;
}) => {
  return (
    <Link href="/gallery" className="w-fit">
      <Button
        variant="link"
        size="noPadding"
        className={cn('gap-2', className)}
      >
        {label}
        <Image
          src={orangeRightCircleArrow}
          alt="Orange Arrow"
          className="w-6 h-auto"
        />
      </Button>
    </Link>
  );
};

export default ViewTheInspirationGallery;
