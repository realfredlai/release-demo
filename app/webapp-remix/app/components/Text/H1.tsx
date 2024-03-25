import * as React from 'react';

import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '@reebok/frontend-components';

const headingVariants = cva('font-neue-plak', {
  variants: {
    variant: {
      default: 'text-sm',
      h1Regular: 'text-[48px]',
      h1Bold: 'font-neue-plak-bold text-5xl',
      faqHeader:
        'text-primary-bone text-lg md:text-xl lg:text-2xl not-italic font-normal ml-4 h-full flex items-center leading-none',
      h1Extra:
        'font-neue-plak-extra-condense text-11xl leading-[80%] uppercase',
      h1BoldC:
        'font-neue-plak-bold-condense text-4xl leading-[80%] uppercase md:text-6xl',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export interface TextProps
  extends React.HTMLProps<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {}

const H1 = React.forwardRef<HTMLHeadingElement, TextProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <h1
        ref={ref}
        className={cn(headingVariants({ variant, className }))}
        {...props}
      >
        {props.children}
      </h1>
    );
  }
);

H1.displayName = 'H1';

export { H1 };
