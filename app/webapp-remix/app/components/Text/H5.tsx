import * as React from 'react';

import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '@reebok/frontend-components';

const headingVariants = cva('font-neue-plak', {
  variants: {
    variant: {
      default: 'text-sm',
      h5Extra:
        'font-neue-plak-extra-condense text-[2.5rem] lg:text-7xl not-italic font-normal leading-[80%] uppercase',
      h5BoldC:
        'font-neue-plak-bold-condense text-base not-italic font-normal leading-[130%] uppercase',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export interface TextProps
  extends React.HTMLProps<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {}

const H5 = React.forwardRef<HTMLHeadingElement, TextProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <h5
        ref={ref}
        className={cn(headingVariants({ variant, className }))}
        {...props}
      >
        {props.children}
      </h5>
    );
  }
);

H5.displayName = 'H5';

export { H5 };
