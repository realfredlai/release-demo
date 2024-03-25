import * as React from 'react';

import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '@reebok/frontend-components';

const headingVariants = cva('font-neue-plak', {
  variants: {
    variant: {
      default: 'text-sm',
      h3Extra:
        'font-neue-plak-extra-condense text-[160px] not-italic font-normal leading-[80%] uppercase sm:max-md:text:7xl',
      h3BoldC:
        'font-neue-plak-bold-condense text-[32px] not-italic font-normal leading-[80%] uppercase sm:max-md:text-[32px]',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export interface TextProps
  extends React.HTMLProps<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {}

const H3 = React.forwardRef<HTMLHeadingElement, TextProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <h3
        ref={ref}
        className={cn(headingVariants({ variant, className }))}
        {...props}
      >
        {props.children}
      </h3>
    );
  }
);

H3.displayName = 'H3';

export { H3 };
