'use client';
import { trpc } from '@/trpc';
import { GlobalUserItem } from '@reebok/backend-libs';
import { useSignInHandler } from '@/app/hooks/useSignInHandler';
import {
  useFutureverse,
  useFuturePassAccountAddress,
} from '@futureverse/react';
import { useEffect, useState } from 'react';
import { useRouter } from '@/navigation';
import UsernameForm from '@/app/components/Login/UsernameForm';

export default function Login({
  params,
}: {
  params: { signup_code?: string };
}) {
  const signUpCode = params.signup_code?.[0] ?? '';

  useSignInHandler(signUpCode);

  const router = useRouter();
  const [showUsernameForm, setShowUsernameForm] = useState(false);
  const [updateUserID, setUpdateUserID] = useState<string>('');
  const { logout, userSession } = useFutureverse();
  const { data: futurepassAddress } = useFuturePassAccountAddress();

  const signUserIn = trpc.signInUser.useMutation();
  const claimRecentInstagramShoe = trpc.claimRecentInstagramShoe.useMutation();

  useEffect(() => {
    const fetchData = async () => {
      let user: GlobalUserItem | null;

      const signup_code = localStorage.getItem('signup_code');

      try {
        // Add user email to database or fetch existing /sign-in/{signup_code}
        // additionally, explicitly set the user's project to CLAIMED
        if (signup_code) {
          user = await signUserIn.mutateAsync({
            futurepass_address: futurepassAddress || '',
            signup_code,
          });
          claimRecentInstagramShoe.mutate(signup_code);
        } else {
          user = await signUserIn.mutateAsync({
            futurepass_address: futurepassAddress || '',
          });
        }

        if (!user) return null;

        setUpdateUserID(user?.user_id);

        if (user.user_id) {
          localStorage.setItem('userId', user?.user_id);
        }

        if (!user.name || user.name == '') {
          setShowUsernameForm(true);
        }

        if (user.name) {
          localStorage.setItem('username', user.name);
          localStorage.setItem('futurepassAddress', futurepassAddress || '');
          router.push('/closet');
        }
      } catch (error) {
        alert('An error occurred. Please try again.');
        // logout if there's an error because they won't be able to see their sneakers if signUserIn fails
        localStorage.clear(); // clear local storage on logout because of the account merge bug.
        logout();
      }
    };

    if (futurepassAddress) {
      fetchData();
    }
  }, [futurepassAddress]);

  return (
    <div
      className="bg-no-repeat bg-zinc-950 h-screen w-full items-center justify-center mx-auto my-auto relative
        bg-fpass-login-mobile 
        md:bg-fpass-login-tablet 
        lg:bg-fpass-login-desktop 
        bg-cover
        bg-center"
    >
      {showUsernameForm && userSession && (
        <UsernameForm userId={updateUserID} />
      )}
      {!showUsernameForm && userSession && (
        <div className="flex h-full items-center justify-center">
          <h2 className="text-center font-neue-plak-bold-condense uppercase text-shadow text-3xl md:text-5xl lg:text-6xl text-white animate-pulse">
            Authenticating<span className="animate-ping delay-75">.</span>
            <span className="animate-ping delay-150">.</span>
            <span className="animate-ping delay-300">.</span>
          </h2>
        </div>
      )}
    </div>
  );
}
