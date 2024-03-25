import { Button } from '@reebok/frontend-components';
import { getConfig } from '@reebok/shared';
import { useTranslations } from 'next-intl';

import Image from 'next/image';
import InstagramLinkIcon from '@/public/images/icons/icon-instagram-link.png';

export const InstagramLink = () => {
  const t = useTranslations();

  return (
    <a
      href={getConfig().instagram.reebokProfile as string}
      className="block lg:self-start"
    >
      <Button
        variant="link"
        className="gap-2 text-base sm:text-lg lg:text-xl normal-case"
        size="noPadding"
      >
        {t('homepage_how_it_works_create_your_impact')}
        <Image
          src={InstagramLinkIcon}
          alt="Instagram Link Icon"
          width={55}
          height={55}
          className="w-10 h-auto"
        />
      </Button>
    </a>
  );
};
