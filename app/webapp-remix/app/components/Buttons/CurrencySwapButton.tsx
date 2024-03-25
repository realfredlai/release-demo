import { currencies } from '@/app/utils/constants';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  cn,
} from '@reebok/frontend-components';
import { Icons } from '@/app/components/Icons';
import { IconWrapper } from '@/app/components/IconWrapper';
import { useCurrency } from '@/app/providers/CurrencyProvider';

const currencyIcons: Record<string, JSX.Element> = {
  USD: <Icons.USD className="w-4 h-4" />,
  ROOT: <Icons.ROOT className="w-3.5 h-3.5" />,
};

type CurrencySwapButtonProps = {
  className?: string;
  buttonColorVariant?: string;
};
export function CurrencySwapButton({
  className,
  buttonColorVariant,
}: CurrencySwapButtonProps) {
  const { baseCurrency, toggleCurrency } = useCurrency();

  return (
    <div className={className}>
      <Select onValueChange={toggleCurrency} value={baseCurrency}>
        <SelectTrigger
          className={cn(
            'w-28 md:w-32 bg-none border border-primary-orange text-primary-orange font-neue-plak-bold [&>span>div>div]:hidden',
            {
              'border-primary-navy text-primary-navy [&>div]:border-t-primary-navy':
                buttonColorVariant === 'navyOutline',
            }
          )}
        >
          <SelectValue placeholder={baseCurrency} className="text-center" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {currencies.map((currency) => (
              <SelectItem
                key={currency}
                value={currency}
                aria-selected={currency === baseCurrency}
              >
                <div className="flex items-center gap-2 font-bold">
                  <IconWrapper
                    className={cn('w-6 h-6', {
                      'bg-white': currency === 'USD',
                    })}
                  >
                    {currencyIcons[currency]}
                  </IconWrapper>
                  {currency}
                </div>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
