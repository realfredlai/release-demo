'use client';
import { useTranslations } from 'next-intl';

import AnchorNav from '@/app/components/AnchorNav/AnchorNav';
import SupportAccordion from '@/app/components/Support/SupportAccordion';
import { H1 } from '@/app/components/Text/H1';

export default function Support() {
  const t = useTranslations();

  const supportNavAnchors = [
    { anchor: 'theexperience', text: t('support_faq_header_the_experience') },
    { anchor: 'useraccount', text: t('support_faq_header_user_account') },
    {
      anchor: 'digitalcollectibles',
      text: t('support_faq_header_digital_collectibles'),
    },
  ];

  return (
    <div className="bg-primary-navy pt-28 pb-14">
      <div className="container">
        <H1
          variant="h1Extra"
          className="text-center text-5xl md:text-7xl lg:text-9xl text-primary-bone"
        >
          {t('navheader_support')}
        </H1>
        <div className="m-auto mt-4 max-w-4xl flex flex-col gap-4 pt-5">
          <AnchorNav anchorNavItems={supportNavAnchors} colorMode="light" />
          <SupportAccordion />
        </div>
      </div>
    </div>
  );
}
