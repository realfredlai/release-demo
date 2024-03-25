import OriginalsCard from '@/app/components/Cards/OriginalsCard';
import { Text } from '@/app/components/Text/Text';
import { padWithLeadingZeroes } from '@/app/utils/helpers';
import { RGBColor } from '@reebok/backend-libs';

type CollabCardProps = {
  name: string;
  shoeModel: string;
  prompt: string;
  dominantColors: RGBColor[];
  dateCreated: string;
  collaboratorId: number;
  numberOfCollaborators?: number;
  shoePfp: string;
  shoeId: number | string;
};

export default function CollabCard(props: CollabCardProps) {
  return (
    <div className="flex flex-col gap-y-3 text-white xlg:w-full">
      {/* <Text className="font-parabole text-4xl h-10">
        {padWithLeadingZeroes(2, props.collaboratorId)}/
        {props.numberOfCollaborators}
      </Text> */}

      <OriginalsCard
        type="collab"
        name={props.name}
        prompt={props.prompt}
        dominantColors={props.dominantColors}
        dateCreated={props.dateCreated}
        collaborationEdition={props.collaboratorId}
        numberOfCollaborators={props.numberOfCollaborators}
        shoePfp={props.shoePfp}
        shoeModel={props.shoeModel}
        shoeId={props.shoeId as string}
        claimedState={'CLAIMED'}
        moderationStatus={'APPROVED'}
        href={`/closet/collaborations/${props.shoeId}`}
      />
    </div>
  );
}
