import { createContext, useContext, ReactNode, useState } from 'react';
import { currencies } from '../utils/constants';

type CurrencyContextProps = {
  baseCurrency: string;
  setBaseCurrency: (currency: string) => void;
  toggleCurrency: () => void;
};

const CurrencyContext = createContext<CurrencyContextProps | undefined>(
  undefined
);

interface CurrencyProviderProps {
  children: ReactNode;
}

export const CurrencyProvider = ({ children }: CurrencyProviderProps) => {
  const [baseCurrency, setBaseCurrency] = useState<string>('USD'); // assuming USD will be the default since they want to target web2 users
  const toggleCurrency = () => {
    const currentIndex = currencies.indexOf(baseCurrency);
    const nextIndex = (currentIndex + 1) % currencies.length;
    setBaseCurrency(currencies[nextIndex]);
  };
  const value: CurrencyContextProps = {
    baseCurrency,
    setBaseCurrency,
    toggleCurrency,
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = (): CurrencyContextProps => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within the CurrencyProvider');
  }
  return context;
};
