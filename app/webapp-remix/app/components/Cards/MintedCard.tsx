import OriginalsCard from '@/app/components/Cards/OriginalsCard';
import { useBreakpoint } from '@/app/hooks/useBreakpoint';
import { RGBColor } from '@reebok/backend-libs';

type MintedCardProps = {
  name: string;
  creatorUsername: string;
  dominantColors: RGBColor[];
  numberOfCollaborators: number;
  collaborationEdition: number;
  dateCreated: string;
  shoeId: number | string;
  shoePfp: string;
  shoeModel: string;
};

const MintedCard = (props: MintedCardProps) => {
  const { isBelowLg } = useBreakpoint('lg');

  return (
    <div className="flex flex-col gap-y-3 xlg:w-full">
      <div className={`h-10 ${isBelowLg ? 'hidden' : ''}`} />

      <OriginalsCard
        type="minted"
        name={props.name}
        creatorUsername={props.creatorUsername}
        dominantColors={props.dominantColors}
        numberOfCollaborators={props.numberOfCollaborators}
        collaborationEdition={props.collaborationEdition}
        dateCreated={props.dateCreated}
        shoePfp={props.shoePfp}
        shoeModel={props.shoeModel}
        shoeId={props.shoeId as string}
        claimedState={'CLAIMED'}
        moderationStatus={'APPROVED'}
        href={`/closet/collectibles/${props.shoeId}`}
        hideDelete={true}
      />
      <div className={`h-6 ${isBelowLg ? 'hidden' : ''}`} />
    </div>
  );
};

export default MintedCard;
