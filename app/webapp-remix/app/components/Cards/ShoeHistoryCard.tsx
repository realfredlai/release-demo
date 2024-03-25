import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { RGBColor } from '@reebok/backend-libs';
import { Button } from '@reebok/frontend-components';
import { Text } from '@/app/components/Text/Text';
import CollabCard from '@/app/components/Cards/CollabCard';
import MintedCard from '@/app/components/Cards/MintedCard';

import CircleTick from '@/public/images/icons/icon-circletick-white.svg';

type ShoeHistoryCardProps = {
  type: string;
  name: string;
  prompt: string;
  dominantColors: RGBColor[];
  dateCreated: string;
  username: string;
  collaboratorId: number;
  numberOfCollaborators: number;
  shoePfp: string;
  shoeId: string | number;
  shoeModel: string;
};

export default function ShoeHistoryCard(props: ShoeHistoryCardProps) {
  const t = useTranslations();

  return (
    <>
      {props.type === 'MINT' && (
        <>
          <MintedCard
            name={props.name}
            dominantColors={props.dominantColors}
            dateCreated={props.dateCreated}
            creatorUsername={props.username}
            shoeId={props.shoeId}
            shoePfp={props.shoePfp}
            shoeModel={props.shoeModel}
            numberOfCollaborators={props.numberOfCollaborators}
            collaborationEdition={props.collaboratorId}
          />

          <div className="flex items-center gap-2 h-10 select-none">
            <Image
              src={CircleTick}
              alt="Circle Tick Icon"
              width={32}
              height={32}
            />
            <Text variant="body" weight="bold" className="text-white">
              {t('locker_shoe_history_owned')}
            </Text>
          </div>
        </>
      )}

      {props.type === 'COLLAB' && (
        <>
          <CollabCard
            name={props.name}
            prompt={props.prompt}
            dominantColors={props.dominantColors}
            dateCreated={props.dateCreated}
            collaboratorId={props.collaboratorId}
            numberOfCollaborators={props.numberOfCollaborators}
            shoeId={props.shoeId}
            shoePfp={props.shoePfp}
            shoeModel={props.shoeModel}
          />

          {/* <Link href={`/mint/${props.shoeId}`}>
            <Button
              variant="whiteOutline"
              className="w-[16.5625rem] md:w-[13.25rem] h-auto justify-center"
            >
              {t('locker_shoe_history_mint_this_version')}
            </Button>
          </Link> */}
        </>
      )}
    </>
  );
}
