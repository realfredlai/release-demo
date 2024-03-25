import { useContext } from 'react';
import { UnityContext } from '@/app/providers/UnityProvider';

export const useUnityContext = () => {
  const context = useContext(UnityContext);

  if (!context) {
    throw new Error('useUnityContext must be used within UnityProvider');
  }

  return context;
};
