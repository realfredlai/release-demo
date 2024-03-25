'use client';

import * as React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';

import { cn, Separator } from '@reebok/frontend-components';

import { Text } from '@/app/components/Text/Text';
import { H1 } from '@/app/components/Text/H1';

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn('border-b-2', className)}
    {...props}
  />
));
AccordionItem.displayName = 'AccordionItem';

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> & {
    number: number;
  }
>(({ className, children, number, ...props }, ref) => {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        ref={ref}
        className={cn(
          'flex flex-1 py-6 text-left items-start text-sm font-medium transition-all hover:underline decoration-primary-bone [&[data-state=open]>div>div>svg:first-of-type]:rotate-180',
          className
        )}
        {...props}
      >
        <div className="grid place-items-center">
          <div className="relative">
            {/* Down arrow bone colour icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="33"
              viewBox="0 0 32 33"
              fill="none"
              className=" transition-transform duration-150"
            >
              <path
                d="M16.0002 31.8984C7.71607 31.8984 1.00042 25.1827 1.00042 16.8984C1.00042 8.61415 7.71607 1.89844 16.0002 1.89844C24.2844 1.89844 31 8.61415 31 16.8984C31 25.1827 24.2844 31.8984 16.0002 31.8984Z"
                stroke="#F7F3E8"
                strokeWidth="2"
              />
              <path
                d="M9.375 14L14.8589 19.4839C13.9712 20.3716 12.532 20.3716 11.6444 19.4839L7.76774 15.6073L9.375 14Z"
                fill="#F7F3E8"
              />
              <path
                d="M17.1328 19.4805C16.9533 20.3682 16.9418 20.8658 17.1328 21.7535C16.3001 21.5269 15.8026 21.5273 14.8598 21.7535C15.0388 20.8658 15.0545 20.3682 14.8598 19.4805C15.7539 19.7094 16.2721 19.7254 17.1328 19.4805Z"
                fill="#F7F3E8"
              />
              <path
                d="M22.6172 14L24.2244 15.6073L20.3478 19.4839C19.4602 20.3716 18.021 20.3716 17.1333 19.4839L22.6172 14Z"
                fill="#F7F3E8"
              />
            </svg>
          </div>
        </div>
        <H1 variant="faqHeader">{children}</H1>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
});
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(
      'overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down',
      className
    )}
    {...props}
  >
    <div className="text-left bg-primary-bone text-primary-navy py-4 px-6">
      <Text variant="body">{children}</Text>
    </div>
    {/* <Separator className="mt-8" /> */}
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
