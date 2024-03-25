import * as React from 'react';

import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '@reebok/frontend-components';

const headingVariants = cva('font-neue-plak', {
  variants: {
    variant: {
      default: 'text-sm',
      h4Extra:
        'font-neue-plak-extra-condense text-5xl lg:text-[120px] not-italic font-normal leading-[80%] uppercase',
      h4BoldC:
        'font-neue-plak-bold-condense text-2xl not-italic font-normal leading-[100%] lg:leading-[80%] uppercase',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export interface TextProps
  extends React.HTMLProps<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {}

const H4 = React.forwardRef<HTMLHeadingElement, TextProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <h4
        ref={ref}
        className={cn(headingVariants({ variant, className }))}
        {...props}
      >
        {props.children}
      </h4>
    );
  }
);

H4.displayName = 'H4';

export { H4 };
