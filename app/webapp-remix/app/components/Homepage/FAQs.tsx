'use client';
import Link from 'next/link';
import Image from 'next/image';

import { useTranslations } from 'next-intl';

import { Button } from '@reebok/frontend-components';

import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from '@/app/components/Accordion/Accordion';

import FAQsHeader from '@/public/images/homepage/image-faqs-header.svg';

export default function FAQs() {
  const t = useTranslations();

  const faqQuestions = [
    {
      faq: t('support_faq_the_experience_1q'),
      answer: t('support_faq_the_experience_1a'),
    },
    {
      faq: t('support_faq_the_experience_2q'),
      answer: t('support_faq_the_experience_2a'),
    },
    {
      faq: t('support_faq_the_experience_3q'),
      answer: t('support_faq_the_experience_3a'),
    },
    {
      faq: t('support_faq_the_experience_4q'),
      answer: t('support_faq_the_experience_4a'),
    },
    {
      faq: t('support_faq_the_experience_5q'),
      answer: t('support_faq_the_experience_5a'),
    },
  ];
  return (
    <div className="bg-primary-navy h-fit w-full px-2 lg:px-48 py-48 gap-8 grid">
      <div className="container flex flex-col gap-8">
        <Image
          src={FAQsHeader}
          alt="FAQs Header"
          width={330}
          height={128}
          className="self-start h-16 lg:h-32 w-auto"
        />
        <div className="mb-10">
          <Accordion type="single" collapsible className="w-full">
            {faqQuestions.map((question, index) => {
              return (
                <AccordionItem
                  value={`faq-item-${index + 1}`}
                  key={'faq-' + index}
                >
                  <AccordionTrigger number={index + 1}>
                    {question.faq}
                  </AccordionTrigger>
                  <AccordionContent>{question.answer}</AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>

        <Link href="/support" className="hidden lg:flex justify-center">
          <Button variant="tertiary" size="md" className="justify-center">
            {t('homepage_faq_visit_support')}
          </Button>
        </Link>
      </div>
    </div>
  );
}
