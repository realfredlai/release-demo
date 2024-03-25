import { ReactNode } from 'react';

import {
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from '@/app/components/Accordion/Accordion';
import { H2 } from '@/app/components/Text/H2';
import { Separator } from '@reebok/frontend-components';

type SupportAccordionItemProps = {
  anchor: string;
  title: string;
  questions: { question: string; answer: string | ReactNode }[];
};

export default function SupportAccordionItem({
  anchor,
  title,
  questions,
}: SupportAccordionItemProps) {
  return (
    <>
      <span id={anchor} />

      <H2
        variant="h2BoldC"
        className="text-2xl md:text-3xl lg:text-3xl uppercase pt-8 pb-4 text-primary-bone"
      >
        {title}
      </H2>
      <Separator className="border-b-2 border-primary-bone" />
      {questions.map((question, index) => (
        <AccordionItem
          value={`${title.toLowerCase()}-item-${index + 1}`}
          key={index}
        >
          <AccordionTrigger
            number={index + 1}
            className="text-xl not-italic font-medium font-sans"
          >
            {question.question}
          </AccordionTrigger>
          <AccordionContent>{question.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </>
  );
}
