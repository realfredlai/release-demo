import Image from 'next/image';

import { Icons } from '@/app/components/Icons';

import { ShoeDominantColorBrightness } from '@/app/store/ShoeLockerStore';

import InstagramGradientRing from '@/public/images/closet/icon-ig-ring.png';
import PersonBoneIcon from '@/public/images/closet/icon-person-bone.svg';

type CollabUserIconProps = {
  numberOfCollaborators?: number;
  dynamicIconColor: ShoeDominantColorBrightness;
};

export default function CollabUserIcon({
  numberOfCollaborators,
  dynamicIconColor,
}: CollabUserIconProps) {
  const personIconColor = dynamicIconColor === 'light' ? 'navy' : 'white';

  return (
    <div className="relative inline-block">
      <Image
        src={InstagramGradientRing}
        alt="Instagram Gradient Ring"
        className="h-mobilem w-mobilem"
      />
      <Icons.PersonIcon
        color={personIconColor}
        className="absolute inset-0 m-auto rounded-full h-6 w-6"
      />
      {numberOfCollaborators && (
        <div className="absolute -top-2 -right-2 w-fit min-w-6 h-auto min-h-6 bg-primary-navy text-white rounded-full flex items-center justify-center p-1 text-[10px]">
          +{numberOfCollaborators - 1}
        </div>
      )}
    </div>
  );
}
