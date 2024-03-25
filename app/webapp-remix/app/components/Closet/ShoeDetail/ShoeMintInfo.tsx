'use client';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

import { Separator } from '@reebok/frontend-components';
import { Text } from '@/app/components/Text/Text';
import { H5 } from '@/app/components/Text/H5';

import CopyLinkIcon from '@/public/images/icons/icon-copy-bone.png';
import { truncateAddress } from '@futureverse/experience-sdk';
import { GlobalUserItem, RemixItem } from '@reebok/backend-libs';

type ShoeMintInfoProps = {
  user: GlobalUserItem;
  remix: RemixItem;
};

const ShoeMintInfo: React.FC<ShoeMintInfoProps> = ({ user, remix }) => {
  const t = useTranslations();

  const mockContractAddress = '0xc0ffee254729296a45a3885639AC7E10F9d54979';
  const mockOwnerAddress = '0x999999cf1046e68e36E1aA2E0E07105eDDD1f08E';

  const handleCopyAddress = (fullAddress: string) => {
    navigator.clipboard.writeText(fullAddress);
  };

  return (
    <div className="container px-6 py-mobilem">
      <div className="flex flex-wrap justify-between col-span-full gap-y-4 mb-mobilem text-primary-navy">
        <div className="w-1/2 md:w-auto">
          <H5 variant="h5BoldC">{t('locker_collectables_contract_address')}</H5>
          <div
            className="w-fit flex gap-2 items-center md:justify-center cursor-pointer"
            onClick={() => handleCopyAddress(mockContractAddress)}
          >
            <Text variant="body" className="underline-offset-4 underline">
              {truncateAddress(mockContractAddress)}
            </Text>
            <Image src={CopyLinkIcon} alt="Copy Link" width={25} />
          </div>
        </div>
        <div className="w-1/2 md:w-auto">
          <H5 variant="h5BoldC">{t('locker_collectables_token_id')}</H5>

          <Text variant="body">9772</Text>
        </div>
        <div className="w-1/2 md:w-auto">
          <H5 variant="h5BoldC">{t('locker_collectables_chain')}</H5>

          <Text variant="body">Root</Text>
        </div>
        <div className="w-1/2 md:w-auto">
          <H5 variant="h5BoldC">{t('locker_collectables_owner')}</H5>

          <div
            className="w-fit flex gap-2 items-center md:justify-center cursor-pointer"
            onClick={() => handleCopyAddress(mockOwnerAddress)}
          >
            <Text variant="body" className="underline-offset-4 underline">
              {truncateAddress(mockOwnerAddress)}
            </Text>
            <Image src={CopyLinkIcon} alt="Copy Link" width={25} />
          </div>
        </div>
      </div>

      <Separator className="bg-primary-navy bg-opacity-25 h-0.5 col-span-full" />
    </div>
  );
};

export default ShoeMintInfo;
