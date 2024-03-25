import * as React from 'react';

import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '@reebok/frontend-components';

const textVariants = cva('font-neue-plak', {
  variants: {
    variant: {
      default: 'text-sm',
      caption: 'text-sm leading-[120%]',
      body: 'sm:text-sm lg:text-base',
      lgBody: 'text-xl self-stretch not-italic font-normal leading-[130%]',
      leadParagraph: 'text-base lg:text-2xl',
      linkButton:
        'text-base not-italic font-normal leading-[100%] tracking-[0.16px] underline',
      smButton:
        'font-neue-plak-bold text-base not-italic font-normal leading-[100%]',
      paragraph: 'mb-4 text-sm md:text-base',
      cardCaption:
        'leading-none text-base md:text-lg lg:text-xl text-center lg:text-left',
    },
    weight: {
      default: '',
      bold: 'font-neue-plak-bold',
    },
  },
  defaultVariants: {
    variant: 'default',
    weight: 'default',
  },
});

export interface TextProps
  extends React.HTMLProps<HTMLParagraphElement>,
    VariantProps<typeof textVariants> {}

const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  ({ className, variant, size, weight, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn(textVariants({ variant, weight }), className)}
        {...props}
      >
        {props.children}
      </p>
    );
  }
);

Text.displayName = 'Text'; // Provide a display name

export { Text, textVariants };
