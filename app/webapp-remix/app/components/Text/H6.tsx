import { cn } from '@reebok/frontend-components';
import React, { ReactNode } from 'react';

export const H6 = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <h6
      className={cn(
        'font-neue-plak-extra-condense text-5xl not-italic tracking-wide font-normal uppercase',
        className
      )}
    >
      {children}
    </h6>
  );
};
