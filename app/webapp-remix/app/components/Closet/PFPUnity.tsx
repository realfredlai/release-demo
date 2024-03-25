import { useShoeLockerStore } from '@/app/store/ShoeLockerStore';
import { CloseButton } from '@/app/components/CloseButton/CloseButton';
import { useEffect } from 'react';

export const PFPUnity = () => {
  const { isPFPUnityOpen, setPFPUnityOpen } = useShoeLockerStore();

  const handlePFPEnlargeToggle = () => {
    setPFPUnityOpen(!isPFPUnityOpen);
  };

  useEffect(() => {
    const closeOnEscapePressed = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handlePFPEnlargeToggle();
      }
    };
    window.addEventListener('keydown', closeOnEscapePressed);
    return () => window.removeEventListener('keydown', closeOnEscapePressed);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container grid-layout h-full">
      <div
        className="grid justify-items-end"
        style={{ gridColumnStart: -2, gridColumnEnd: -1 }}
      >
        <CloseButton
          className="relative size-10 mt-3.5 flex items-center justify-center pointer-events-auto cursor-pointer"
          mode="light"
          onClick={handlePFPEnlargeToggle}
        />
      </div>
    </div>
  );
};
