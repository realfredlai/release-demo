import OriginalsCard from '@/app/components/Cards/OriginalsCard';
import { RGBColor } from '@reebok/backend-libs';

type CollectibleCardProps = {
  name: string;
  creatorUsername: string;
  dominantColors: RGBColor[];
  dateCreated: string;
  shoeId: number | string;
  shoePfp: string;
  collaborationEdition: number;
  numberOfCollaborators: number;
  shoeModel: string;
};

const CollectibleCard = (props: CollectibleCardProps) => {
  return (
    <div className="flex flex-col gap-y-3 text-white xlg:w-full">
      <OriginalsCard
        type="collectible"
        name={props.name}
        creatorUsername={props.creatorUsername}
        dominantColors={props.dominantColors}
        dateCreated={props.dateCreated}
        shoePfp={props.shoePfp}
        collaborationEdition={props.collaborationEdition}
        numberOfCollaborators={props.numberOfCollaborators}
        shoeModel={props.shoeModel}
        shoeId={props.shoeId as string}
        claimedState={'CLAIMED'}
        moderationStatus={'APPROVED'}
        href={`/closet/collectibles/${props.shoeId}`}
        hideDelete={true}
      />
    </div>
  );
};

export default CollectibleCard;
