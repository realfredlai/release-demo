import { cn } from '@reebok/frontend-components';
import Lottie from 'lottie-react';
import LottieLoader from '@/app/components/Lotties/Shoe-01_v01-loop.json';

export const LoadingAnimation = ({
  className,
  loadingText,
  displayInline,
}: {
  className?: string;
  loadingText?: string;
  displayInline?: boolean;
}) => {
  return (
    <div
      className={cn(
        'fixed top-0 left-0 bg-primary-bone backdrop-blur-md w-screen h-screen z-[86]',
        {
          'relative top-auto left-auto bg-inherit w-auto h-auto z-auto':
            displayInline,
        }
      )}
    >
      <div
        className={cn(
          'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center lg:w-3/12',
          className,
          {
            'relative top-auto left-auto -translate-x-0 -translate-y-0':
              displayInline,
          }
        )}
      >
        <br />
        <Lottie
          animationData={LottieLoader}
          loop={true}
          autoplay={true}
          className={cn('w-80 mx-auto', className, {
            'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 fixed':
              displayInline,
          })}
        />
        {loadingText && (
          <div className="bg-primary-brown mt-14">
            <div
              className="h-9 bg-primary-orange  ease-in-out"
              style={{ width: `${loadingText}` }}
            ></div>
          </div>
        )}
      </div>
    </div>
  );
};
