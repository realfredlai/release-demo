import { cn } from '@reebok/frontend-components';
import { MouseEventHandler } from 'react';

export const IconWrapper = ({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
}) => {
  return (
    <div
      className={cn(
        'w-6 h-6 lg:w-9 lg:h-9 p-1.5 lg:p-2.5 bg-primary-navy rounded-full flex items-center justify-center hover:bg-secondary-hover',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
