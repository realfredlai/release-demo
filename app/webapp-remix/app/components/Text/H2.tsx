import * as React from 'react';

import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '@reebok/frontend-components';

const headingVariants = cva('font-neue-plak', {
  variants: {
    variant: {
      default: 'text-sm',
      h2Regular: 'text-[1.5rem] lg:text-[32px]',
      h2Bold: 'font-neue-plak-bold text-[32px]',
      h2Extra:
        'font-neue-plak-extra-condense text-7xl lg:text:[190px] not-italic font-normal leading-[80%] uppercase ',
      h2BoldC:
        'font-neue-plak-bold-condense text-2xl lg:text-4xl not-italic font-normal leading-[80%] uppercase',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export interface TextProps
  extends React.HTMLProps<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {}

const H2 = React.forwardRef<HTMLHeadingElement, TextProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <h2
        ref={ref}
        className={cn(headingVariants({ variant, className }))}
        {...props}
      >
        {props.children}
      </h2>
    );
  }
);

H2.displayName = 'H2';

export { H2 };
