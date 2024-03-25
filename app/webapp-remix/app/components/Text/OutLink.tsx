import { cn } from '@reebok/frontend-components';
import React, { ReactNode } from 'react';

export const OutLink = ({
  children,
  className,
  href,
}: {
  children: ReactNode;
  className?: string;
  href: string;
}) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="nofollow noopener noreferrer"
      className={cn(
        `hover:opacity-75 hover:no-underline`,
        className
      )}
    >
      {children}
    </a>
  );
};
