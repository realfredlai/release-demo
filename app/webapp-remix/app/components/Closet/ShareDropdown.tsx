import { useTranslations } from 'next-intl';

import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';

import { Text } from '@/app/components/Text/Text';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@reebok/frontend-components';
import { IconWrapper } from '@/app/components/IconWrapper';

import { getConfig } from '@reebok/shared';

import ShareIcon from '@/public/images/closet/icon-share-white.svg';
import CopyLinkIcon from '@/public/images/icons/icon-copy-link.svg';
import InstagramIcon from '@/public/images/icons/icon-instagram.png';

const ShareDropdown = () => {
  const router = useRouter();
  const pathname = usePathname();

  const t = useTranslations();

  const copyToClipboard = () => {
    const shoeLink = `${getConfig().webapp.url}${pathname}`;
    navigator.clipboard.writeText(shoeLink);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <IconWrapper>
          <Image src={ShareIcon} alt="Share Icon" width={100} />
        </IconWrapper>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        alignOffset={5}
        className="text-primary-navy"
      >
        <DropdownMenuItem onSelect={copyToClipboard}>
          <Image src={CopyLinkIcon} alt="Copy Link Icon" />
          <Text variant="body" weight="bold">
            {t('locker_originals_copy_link')}
          </Text>
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={() => {
            copyToClipboard();
            router.push(getConfig().instagram.myInbox as string);
          }}
        >
          <Image src={InstagramIcon} alt="Instagram Icon" width={25} />
          <Text variant="body" weight="bold">
            {t('locker_originals_share_to_instagram')}
          </Text>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ShareDropdown;
