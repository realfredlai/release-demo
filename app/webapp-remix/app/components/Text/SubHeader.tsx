import { cn } from '@reebok/frontend-components';
import React, { ReactNode } from 'react';

export const SubHeader = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <h2
      className={cn(
        `font-neue-plak-bold text-2xl pt-5  md:text-3xl leading-1 text-primary-dark-green font-bold`,
        className
      )}
    >
      {children}
    </h2>
  );
};
