import { useFutureverse, UserState } from '@futureverse/react';
import { useRouter } from '@/navigation';
import { useEffect } from 'react';
import { useAccount } from 'wagmi';

export const FV_AUTH_SILENT_LOGIN_KEY = 'fvAuthSilentLogin';
export const FV_AUTH_PREV_PATH_KEY = 'fvAuthPrevPath';

export function useSignInHandler(signup_code: string) {
  const { login, authClient } = useFutureverse();
  const { address: accountAddress } = useAccount();
  const router = useRouter();

  useEffect(() => {
    if (signup_code) {
      localStorage.setItem('signup_code', signup_code);
    }

    const userStateChange = (userState: UserState) => {
      if (userState === UserState.SignedIn) {
        sessionStorage.setItem(FV_AUTH_SILENT_LOGIN_KEY, 'enabled');
        const prevPath = sessionStorage.getItem(FV_AUTH_PREV_PATH_KEY);
        router.replace(prevPath ?? '/login'); // go back to login to show username for new users
      }
      if (userState === UserState.SignedOut) {
        const silentAuth = sessionStorage.getItem(FV_AUTH_SILENT_LOGIN_KEY);
        const isSilent = silentAuth !== 'disabled';
        if (!isSilent) {
          sessionStorage.setItem(FV_AUTH_PREV_PATH_KEY, location.pathname);
          router.replace('/');
        }
        // isSilent type error...TODO: try again with latest fPass version.
        // login(
        //   isSilent
        //     ? { silent: true, targetEOA: accountAddress ?? null }
        //     : undefined
        // );
        login();
      }
      if (userState === UserState.SignInFailed) {
        //TODO: show error modal
        router.replace('/login');
        sessionStorage.setItem(FV_AUTH_SILENT_LOGIN_KEY, 'disabled');
      }
    };

    authClient.addUserStateListener(userStateChange);

    return () => {
      authClient.removeUserStateListener(userStateChange);
    };
  }, [accountAddress, authClient, login, router]);
}
