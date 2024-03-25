import { cn } from '@reebok/frontend-components';
import React, { ReactNode } from 'react';

export const H7 = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <h6
      className={cn(
        'font-neue-plak-extra-condense text-[40px] not-italic font-normal leading-[80%] uppercase',
        className
      )}
    >
      {children}
    </h6>
  );
};
