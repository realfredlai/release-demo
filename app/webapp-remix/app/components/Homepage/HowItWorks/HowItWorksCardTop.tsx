'use client';
import { useEffect, useState } from 'react';

export default function HowItWorksCardTop() {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  //  height of bone colour bg based on the scroll position - parallax
  const calculateHeight = () => {
    const heightPercentage = Math.min(scrollPosition * 0.13, 100);
    return `${heightPercentage}%`;
  };

  return (
    <div className="hidden lg:block absolute -top-20 left-0 h-20 w-full">
      <div className="w-full lg:w-[95%] bg-primary-navy h-full mx-auto">
        {/* top of the card - in view */}
      </div>
      <div
        className="w-full absolute bottom-0 left-0 z-[-1] bg-primary-bone mx-auto ease-linear"
        style={{ height: calculateHeight() }}
      >
        {/* top of the card - bg fadein (start 0 at bottom of screen) and when at the top; the height is 100% filling in the bg*/}
      </div>
    </div>
  );
}
