import Link from 'next/link';

import { Icons } from '@/app/components/Icons';

export default function SignUpSpinner() {
  return (
    <div className="mix-blend-difference fixed bottom-0 right-0 m-8 hidden lg:flex z-10">
      {/* TODO: check if should this be hidden if the user is logged in? */}
      <Link href="/login">
        <Icons.SignUpCircleIcon />
      </Link>
    </div>
  );
}
