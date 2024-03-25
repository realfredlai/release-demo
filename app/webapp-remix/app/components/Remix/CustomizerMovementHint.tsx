import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

import { useBreakpoint } from '@/app/hooks/useBreakpoint';
import { useUnityContext } from '@/app/hooks/useUnityContext';

import { cn } from '@reebok/frontend-components';
import { H5 } from '@/app/components/Text/H5';

import MovementIconMobile from '@/public/images/icons/Remix/icon-movement-mobile.svg';
import MovementIconDesktop from '@/public/images/icons/Remix/icon-movement-desktop.svg';

const CustomizerMovementHint = () => {
  const t = useTranslations();
  const { isBelowLg } = useBreakpoint('lg');
  const { changeViewTarget } = useUnityContext();

  const hasUserVisitedCustomizer = localStorage.getItem(
    'hasUserVisitedCustomizer'
  );

  const [isVisible, setIsVisible] = useState(!hasUserVisitedCustomizer);

  const handleScreenEvent = () => {
    setIsVisible(false);
    changeViewTarget('Null');
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 6000);

    if (isVisible) {
      window.addEventListener('mousedown', handleScreenEvent);
      window.addEventListener('touchmove', handleScreenEvent);

      localStorage.setItem('hasUserVisitedCustomizer', 'true');
    } else {
      changeViewTarget('Null');
      window.removeEventListener('mousedown', handleScreenEvent);
      window.removeEventListener('touchmove', handleScreenEvent);
    }

    // Clean-up function
    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousedown', handleScreenEvent);
      window.removeEventListener('touchmove', handleScreenEvent);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);

  return (
    <>
      {!hasUserVisitedCustomizer && (
        <div className="flex w-full h-full items-center justify-center">
          <div
            className={cn(
              'flex flex-col justify-center items-center text-center gap-2 bg-[#1d272b80] rounded-full select-none transition-opacity duration-700',
              { 'h-s w-s': isBelowLg },
              { 'h-52 w-52': !isBelowLg },
              { 'opacity-0': !isVisible },
              { 'opacity-100': isVisible }
            )}
            style={{
              filter:
                'drop-shadow(1px 4px 8px rgba(0, 0, 0, 0.20)) drop-shadow(4px 14px 15px rgba(0, 0, 0, 0.17)) drop-shadow(8px 32px 20px rgba(0, 0, 0, 0.10)) drop-shadow(15px 57px 23px rgba(0, 0, 0, 0.03)) drop-shadow(23px 89px 26px rgba(0, 0, 0, 0.00))',
            }}
          >
            {isBelowLg ? (
              <>
                <Image
                  src={MovementIconMobile}
                  width={37}
                  height={31}
                  className="animate-left-to-right"
                  alt={t('customizer_movement_mobile')}
                />
                <H5 variant="h5BoldC" className="w-20 text-xs">
                  {t('customizer_movement_mobile')}
                </H5>
              </>
            ) : (
              <>
                <Image
                  src={MovementIconDesktop}
                  width={101}
                  height={64}
                  className="animate-left-to-right"
                  alt={t('customizer_movement_desktop')}
                />
                <H5 variant="h5BoldC" className="w-20 text-base">
                  {t('customizer_movement_desktop')}
                </H5>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CustomizerMovementHint;
