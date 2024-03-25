'use client';
import { Separator } from '@reebok/frontend-components';

import SignUpSpinner from '@/app/components/Homepage/SignUpSpinner';
import HeroSection from '@/app/components/Homepage/HeroSection';
import HowItWorks from '@/app/components/Homepage/HowItWorks/HowItWorks';
import HowItWorksStep1 from '@/app/components/Homepage/HowItWorks/HowItWorksStep1';
import HowItWorksStep3 from '@/app/components/Homepage/HowItWorks/HowItWorksStep3';
import HowItWorksStep2 from '@/app/components/Homepage/HowItWorks/HowItWorksStep2';
import InspirationAwaits from '@/app/components/Homepage/InspirationAwaits';
import ReebokFVDivider from '@/app/components/Homepage/ReebokFVDivider';
import ShareYourStory from '@/app/components/Homepage/ShareYourStory';
import HowItWorksCardTop from '@/app/components/Homepage/HowItWorks/HowItWorksCardTop';
import { useFutureverse } from '@futureverse/react';

export default function Index() {
  const { userSession } = useFutureverse();

  return (
    <div className="card-stack">
      <div className="card-stack-item">
        <HeroSection />
      </div>

      <div className="card-stack-item bg-primary-bone">
        <HowItWorksCardTop />
        <HowItWorks />
      </div>
      <div className="card-stack-item bg-primary-bone">
        <Separator className="mx-auto w-4/5 left-1/2 -translate-x-1/2 opacity-50 absolute" />
        <HowItWorksStep1 />
      </div>
      <div className="card-stack-item bg-primary-bone">
        <HowItWorksStep2 />
      </div>

      <div className="card-stack-item-none bg-primary-bone">
        <HowItWorksStep3 />
        <InspirationAwaits />
        <ShareYourStory />
        <ReebokFVDivider />
      </div>

      {!userSession && <SignUpSpinner />}
    </div>
  );
}
