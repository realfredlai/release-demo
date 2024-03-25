'use client';
{
  /* TODO: https://futureverse.atlassian.net/browse/RBK-1140 */
}
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { trpc } from '@/trpc';
import Image from 'next/image';
import ReebokLogo from '@/public/images/logos/logo-reebok-header.svg';
import Link from 'next/link';
import { Icons } from '@/app/components/Icons';
import { useTranslations } from 'next-intl';

type UsernameFormProps = {
  userId: string | '';
};
export default function UsernameForm({ userId }: UsernameFormProps) {
  const t = useTranslations();
  const router = useRouter();
  const [username, setUsername] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [agreed, setAgreed] = useState(false);
  const userName = trpc.updateUserName.useMutation();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    const value = e.target.value;
    if (field === 'username') {
      setUsername(value);
    }
  };

  const handleCheckboxChange = () => {
    setAgreed(!agreed);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!username.trim()) {
      setErrorMessage('Username is required.');
      return;
    }

    if (!agreed) {
      setErrorMessage(
        'Please agree to the Privacy Policy and Terms and Conditions.'
      );
      return;
    }

    try {
      userName.mutate({
        userId: userId,
        name: username,
      });
      localStorage.setItem('username', username);
      router.replace('/closet');
    } catch (error) {
      // TODO: replace with modal
      alert('Somthing went wrong please try againg.');
    }
  };

  return (
    <div className=" flex flex-col bg-primary-bone relative h-full max-h-full w-full overflow-auto z-[214748]">
      <div className="flex-grow">
        <div className="mix-blend-difference pt-[7vh] lg:pt-[20vh] pb-5">
          <Image
            src={ReebokLogo}
            width={262}
            height={102}
            alt="Reebok Impact"
            className="w-6/12 lg:w-64 h-auto mx-auto"
          />
        </div>
        <div className="container">
          <div className="text-base md:text-xl text-center text-primary mx-auto max-w-2xl">
            <p className="border-b border-primary-brown pb-8">
              {t('signup_intro_1')}{' '}
              <span className="text-primary-orange">#ReebokImpact</span>,{' '}
              {t('signup_intro_2')}
            </p>
            <form className="flex flex-col gap-2 text-white items-center my-auto">
              <div className="flex flex-col w-full gap-2 py-8 relative">
                <label className="text-primary text-sm font-bold text-left">
                  {t('signup_label_username')}
                </label>
                <div className="flex flex-col gap-4">
                  <input
                    className="w-full p-2 pl-3 text-base text-primary-navy shadow-sm shadow-input focus:border-transparent focus:outline-none"
                    placeholder={t('signup_input_placeholder_username')}
                    type="text"
                    value={username}
                    onChange={(e) => handleChange(e, 'username')}
                    required
                  />
                </div>
                <div className="flex flex-row gap-2 text-red-600 text-sm dev w-full text-left absolute bottom-0">
                  {/* TODO: add translations when implementing actual error handling */}
                  {errorMessage && (
                    <>
                      <Icons.Warning className="w-4 h-auto" />
                      {errorMessage}
                    </>
                  )}
                </div>
              </div>

              <div className="text-primary-navy text-sm text-left w-full pb-5">
                <label>
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={handleCheckboxChange}
                  />{' '}
                  {t('signup_legals_agree')}
                </label>{' '}
                <Link href="/legal" className="underline" target="_blank">
                  {t('signup_legals_link')}
                </Link>
                .
              </div>
              <button
                className="w-full max-w-screen-sm py-3 text-sm font-semibold rounded-full bg-primary-orange hover:cursor-pointer"
                onClick={handleSubmit}
              >
                {t('signup_button')}
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="mt-auto w-full bottom-0 left-0 text-xs text-primary p-8">
        <p className="max-w-2xl mx-auto text-center">{t('signup_footer')}</p>
      </div>
    </div>
  );
}
