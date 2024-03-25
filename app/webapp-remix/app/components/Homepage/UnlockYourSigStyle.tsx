import { useTranslations } from 'next-intl';

import { Button } from '@reebok/frontend-components';
import { Text } from '@/app/components/Text/Text';
import { H2 } from '@/app/components/Text/H2';
import { useFutureverse } from '@futureverse/react';

// TODO: abstract this component together with similar AccessYourSneakerCloset.tsx
export default function UnlockYourSigStyle() {
  const t = useTranslations();

  const { login } = useFutureverse();

  const handleClick = () => {
    login();
  };

  return (
    <div className="h-fit lg:h-32 w-full text-primary-bone flex justify-center">
      <div className="bg-primary-orange w-full h-full flex flex-col lg:flex-row items-center justify-center gap-4 p-6 lg:p-8">
        <div className="flex flex-col items-start flex-wrap gap-2 w-full">
          <H2 variant="h2BoldC">{t('homepage_unlock_your_sig_style')}</H2>
          <Text variant="body">
            {t('homepage_unlock_your_sig_style_subheading')}
          </Text>
        </div>
        <div className="flex w-full lg:w-fit">
          <Button
            variant="secondary"
            size="lg"
            className="flex justify-center w-full lg:w-fit"
            onClick={handleClick}
          >
            {t('homepage_sign_in')}
          </Button>
        </div>
      </div>
    </div>
  );
}
