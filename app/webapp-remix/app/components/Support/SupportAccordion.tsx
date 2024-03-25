import { useTranslations } from 'next-intl';
import SupportAccordionItem from '@/app/components/Support/SupportAccordionItem';
import { Accordion } from '@/app/components/Accordion/Accordion';
import { Link } from '@/navigation';

export default function SupportAccordion() {
  const t = useTranslations();

  const supportQA = [
    {
      anchor: 'theexperience',
      title: t('support_faq_header_the_experience'),
      questions: [
        {
          question: t('support_faq_the_experience_1q'),
          answer: t('support_faq_the_experience_1a'),
        },
        {
          question: t('support_faq_the_experience_2q'),
          answer: t('support_faq_the_experience_2a'),
        },
        {
          question: t('support_faq_the_experience_3q'),
          answer: t('support_faq_the_experience_3a'),
        },
        {
          question: t('support_faq_the_experience_4q'),
          answer: t('support_faq_the_experience_4a'),
        },
        {
          question: t('support_faq_the_experience_5q'),
          answer: t('support_faq_the_experience_5a'),
        },
        {
          question: t('support_faq_the_experience_6q'),
          answer: t.rich('support_faq_the_experience_6a', {
            link: (chunks) => (
              <Link className="underline" href="https://reebok.com">
                {chunks}
              </Link>
            ),
          }),
        },
        {
          question: t('support_faq_the_experience_7q'),
          answer: t('support_faq_the_experience_7a'),
        },
        {
          question: t('support_faq_the_experience_8q'),
          answer: t.rich('support_faq_the_experience_8a', {
            link: (chunks) => (
              <Link className="underline" href="/support">
                {chunks}
              </Link>
            ),
          }),
        },
        {
          question: t('support_faq_the_experience_9q'),
          answer: t('support_faq_the_experience_9a'),
        },
        {
          question: t('support_faq_the_experience_10q'),
          answer: t.rich('support_faq_the_experience_10a', {
            link: (chunks) => (
              <Link className="underline" href="/legal">
                {chunks}
              </Link>
            ),
          }),
        },
      ],
    },
    {
      anchor: 'useraccount',
      title: t('support_faq_header_user_account'),
      questions: [
        {
          question: t('support_faq_user_account_1q'),
          answer: t.rich('support_faq_user_account_1a', {
            link: (chunks) => (
              <Link className="underline" href="/support">
                {chunks}
              </Link>
            ),
          }),
        },
        {
          question: t('support_faq_user_account_2q'),
          answer: t('support_faq_user_account_2a'),
        },
        {
          question: t('support_faq_user_account_3q'),
          answer: t('support_faq_user_account_3a'),
        },
        {
          question: t('support_faq_user_account_4q'),
          answer: t('support_faq_user_account_4a'),
        },
      ],
    },
    {
      anchor: 'digitalcollectibles',
      title: t('support_faq_header_digital_collectibles'),
      questions: [
        {
          question: t('support_faq_digital_collectibles_1q'),
          answer: t('support_faq_digital_collectibles_1a'),
        },
        {
          question: t('support_faq_digital_collectibles_2q'),
          answer: t('support_faq_digital_collectibles_2a'),
        },
        {
          question: t('support_faq_digital_collectibles_3q'),
          answer: t('support_faq_digital_collectibles_3a'),
        },
      ],
    },
  ];

  return (
    <Accordion type="single" collapsible className="w-full">
      {supportQA.map((section, index) => (
        <SupportAccordionItem key={index} {...section} />
      ))}
    </Accordion>
  );
}
