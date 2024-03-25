import { cn } from '@reebok/frontend-components';
import React, { ReactNode } from 'react';

export const EmailLink = ({
  children,
  className,
  emailAddress,
}: {
  children: ReactNode;
  className?: string;
  emailAddress: string;
}) => {
  return (
    <a
      href={`mailto:${emailAddress}`}
      rel="nofollow noopener noreferrer"
      className={cn(`hover:opacity-75 hover:no-underline`, className)}
    >
      {children}
    </a>
  );
};
