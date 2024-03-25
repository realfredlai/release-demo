import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Button } from '@reebok/frontend-components';
import { Text } from '@/app/components/Text/Text';

import { getConfig } from '@reebok/shared';

import CopyLinkIcon from '@/public/images/closet/icon-copy-link-desktop.svg';
import InstagramIcon from '@/public/images/icons/icon-instagram.png';

const ShareModalButtons = () => {
  const t = useTranslations();
  const pathname = usePathname();

  const copyToClipboard = () => {
    const shoeLink = `${getConfig().webapp.url}${pathname}`;
    navigator.clipboard.writeText(shoeLink);
  };

  return (
    <div className="flex gap-4 w-full justify-center text-primary-orange">
      <div className="flex flex-col gap-2">
        <Button variant="primary" size="copyIcon" onClick={copyToClipboard}>
          <Image
            src={CopyLinkIcon}
            alt="Copy Link Icon"
            width={64}
            height={64}
          />
        </Button>
        <Text variant="body"> {t('locker_originals_copy_link')}</Text>
      </div>

      <div className="flex flex-col gap-2">
        <Link
          href={getConfig().instagram.reebokProfile as string}
          onClick={copyToClipboard}
        >
          <Image
            src={InstagramIcon}
            alt="Instagram Icon"
            width={64}
            height={64}
          />
        </Link>
        <Text variant="body"> {t('locker_originals_instagram')}</Text>
      </div>
    </div>
  );
};

export default ShareModalButtons;
