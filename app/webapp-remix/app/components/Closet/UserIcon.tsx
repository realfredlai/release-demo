import Image from 'next/image';

import { Icons } from '@/app/components/Icons';

import InstagramGradientRing from '@/public/images/closet/icon-ig-ring.png';

export default function UserIcon({ colorMode }: { colorMode: string }) {
  return (
    <div className="relative inline-block">
      <Image
        src={InstagramGradientRing}
        alt="Instagram Gradient Ring"
        width={40}
        height={40}
        className="h-9 w-9"
      />
      <Icons.PersonIcon
        className="absolute inset-0 m-auto rounded-full h-6 w-6"
        color={colorMode}
      />
    </div>
  );
}
