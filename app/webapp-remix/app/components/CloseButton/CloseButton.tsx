import { Icons } from '@/app/components/Icons';
import { cn } from '@reebok/frontend-components';
import { MouseEventHandler } from 'react';

type CloseButtonProps = {
  className?: string;
  mode: 'light' | 'dark';
  onClick?: MouseEventHandler<HTMLDivElement>;
};

export const CloseButton = (props: CloseButtonProps) => {
  const baseClassName =
    'group absolute right-4 top-4 rounded-full p-2 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]';
  const modeBackgroundColor =
    props.mode === 'light' ? 'bg-primary-bone' : 'bg-primary-navy';

  return (
    <div
      className={cn(
        `${baseClassName} ${modeBackgroundColor} ${props.className}`
      )}
      onClick={props.onClick}
    >
      {props.mode === 'light' ? (
        <Icons.NavyXMarkIcon />
      ) : (
        <Icons.BoneXMarkIcon />
      )}
      <span className="sr-only">Close</span>
    </div>
  );
};
