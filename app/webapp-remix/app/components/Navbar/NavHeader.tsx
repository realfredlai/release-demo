'use client';
import { useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

import { useTranslations } from 'next-intl';

import LanguageSelect from '@/app/components/Select/LanguageSelect';
import { Button, cn } from '@reebok/frontend-components';
import { Icons } from '@/app/components/Icons';
import { Text } from '@/app/components/Text/Text';
import { H1 } from '@/app/components/Text/H1';
import { useBreakpoint } from '@/app/hooks/useBreakpoint';

import { NAVIGATION_ITEMS } from '@/app/utils/constants';

import ReebokLogoHeader from '@/public/images/logos/logo-reebok-header.svg';
import NavbarImage from '@/public/images/navbar/image-nav-photo.jpg';

import { useFutureverse } from '@futureverse/react';

const SCROLL_THRESHOLD = 89; //delay trigger from the top

const pathNames = {
  originals: '/originals',
  collectables: '/collectibles',
  login: '/login',
};

export function NavHeader() {
  const t = useTranslations();
  const { isAboveSm } = useBreakpoint('sm');

  const [isMenuOpen, setMenuOpen] = useState(false);

  const [isScrollingDown, setIsScrollingDown] = useState<boolean>(false);
  const [prevScrollY, setPrevScrollY] = useState(0);

  // const { address } = useAccount();
  const { logout, userSession } = useFutureverse();

  const pathname = usePathname();

  // Disable everything else if nav dropdown is open
  useEffect(() => {
    const body = document.body;

    if (isMenuOpen) {
      body.classList.add('overflow-hidden');
    } else {
      body.classList.remove('overflow-hidden');
    }
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      setIsScrollingDown(scrollTop > prevScrollY);
      setPrevScrollY(scrollTop);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollY, isScrollingDown]);

  // Close nav dropdown on page changes
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const searchParams = useSearchParams() ?? undefined;
  // I don't think we need this anymore because the Instagram bot points to /login/signupCode...
  const signupCode = searchParams.get('signup_code'); // either null or ?signup_code=123 e.g
  useEffect(() => {
    if (signupCode) {
      localStorage.setItem('signup_code', signupCode);
    }
  }, [signupCode]);

  // Disable everything else if nav dropdown is open
  useEffect(() => {
    const body = document.body;

    if (isMenuOpen) {
      body.classList.add('overflow-hidden');
    } else {
      body.classList.remove('overflow-hidden');
    }
  }, [isMenuOpen]);

  // Close nav dropdown on page changes
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  if (!pathname) return null;

  const handleToggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.clear();
    logout();
  };

  const homepageRoutes = ['/en', '/ja', '/ko'];

  const lightPages =
    pathname.startsWith('/en/closet/collaborations') ||
    pathname.startsWith('/en/closet/originals');

  const isHomepages = homepageRoutes.includes(pathname) || lightPages;

  const translatedNavigationItems = NAVIGATION_ITEMS.map((item) => ({
    navItemText: t(`navheader_navlink_${item.key}`),
    navItemLink: item.link,
  }));

  const navMixBlend =
    pathname.includes(pathNames.originals) ||
    pathname.includes(pathNames.collectables);
  const hideNav = pathname.includes(pathNames.login);

  return (
    <>
      <header
        className={cn(
          `${
            navMixBlend === false ? 'mix-blend-difference' : 'mix-blend-normal'
          } max-w-screen w-full fixed z-[1000] pointer-events-none left-0 top-0 flex justify-between items-center p-5 transition-all duration-500 ease-in-out py-mobiles`,

          {
            '-translate-y-28':
              isScrollingDown && prevScrollY > SCROLL_THRESHOLD,
            hidden: hideNav,
          }
        )}
      >
        <div className="flex items-center pointer-events-auto">
          <Link href="/">
            <Image
              src={ReebokLogoHeader}
              alt="Reebok Logo"
              width={162}
              height={75}
              className="w-20 h-auto md:w-28 ml-1 md:ml-6"
            />
          </Link>
        </div>

        <div className="flex items-center pr-1 lg:pr-6 pointer-events-auto">
          <span className="flex mr-4">
            {userSession ? (
              <Button
                variant="whiteOutline"
                className="h-fit w-fit"
                onClick={handleLogout}
              >
                {t('navheader_log_out')}
              </Button>
            ) : (
              <Link href="/login" prefetch={false}>
                <Button variant="tertiary" className="h-fit w-fit">
                  {t('navheader_log_in')}
                </Button>
              </Link>
            )}
          </span>
          <div
            className={`group cursor-pointer rounded-full p-1 h-10 w-10 ${
              isHomepages && !isMenuOpen
                ? 'bg-primary-navy' // Set to 'bg-primary-navy' if on homepage and menu is closed
                : 'bg-white' // Otherwise, set to 'bg-white'
            }`}
            onClick={handleToggleMenu}
          >
            <div className="flex items-center justify-center h-full">
              {isMenuOpen ? (
                <Icons.NavyXMarkIcon className="w-full h-1/2" />
              ) : (
                <>
                  {isHomepages || isMenuOpen ? (
                    <Icons.SandwichIcon color="bone" />
                  ) : (
                    <Icons.SandwichIcon color="navy" />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <div
        className={cn(
          'transition-all lg:transition-opacity will-change-transform text- delay-150 duration-300 fixed top-0 w-full z-[999] bg-primary-navy',
          {
            'opacity-100 h-full': isMenuOpen,
            'opacity-0 h-0 ': !isMenuOpen,
          }
        )}
      >
        {isAboveSm && (
          <Image
            src={NavbarImage}
            alt="Navbar Shoe Image"
            className="object-cover inset-y-0 left-0 h-full w-1/2 select-none"
          />
        )}

        <div className="bg-primary-navy absolute inset-x-0 bottom-0 overflow-hidden shadow-xl h-full lg:w-1/2 lg:left-auto">
          <div className="container flex flex-col h-full p-8 lg:pl-20 lg:py-8">
            <ul className="mt-auto text-primary-bone space-y-mobilem lg:space-y-16">
              {translatedNavigationItems.map((navItem, index) => {
                // Only render the SNEAKER CLOSET navlink only if user is logged in
                if (index === NAVIGATION_ITEMS.length - 1 && !userSession)
                  return null;

                return (
                  <li key={index} className="w-full">
                    <Link
                      href={navItem.navItemLink}
                      className="block items-center w-full"
                    >
                      <H1
                        variant="h1BoldC"
                        className="
                          leading-none
                          lg:before:bg-orangearrow
                          lg:before:bg-no-repeat
                          lg:before:bg-center
                          lg:before:bg-contain
                          lg:before:-indent-16
                          lg:before:inline-block
                          lg:before:opacity-0
                          lg:before:overflow-hidden
                          lg:before:w-0
                          lg:before:h-10
                          lg:hover:before:indent-0
                          lg:hover:before:mr-mobiles
                          lg:hover:before:opacity-100
                          lg:hover:before:w-16
                          before:transition-all
                          before:duration-500
                          before:ease-in-out
                          hover:delay-75
                          hover:before:delay-75
                        "
                      >
                        {navItem.navItemText}
                      </H1>
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="flex justify-between items-center font-bold mt-auto">
              <div className="flex items-center gap-4">
                <Link href="/legal">
                  <Text
                    variant="caption"
                    className="opacity-50 text-secondary text-sm"
                  >
                    {t('navheader_legal')}
                  </Text>
                </Link>
                <div className="bg-white w-px h-6 opacity-[0.44]" />
                <Link href="/support">
                  <Text
                    variant="caption"
                    className="opacity-50 text-secondary text-sm"
                  >
                    {t('navheader_support')}
                  </Text>
                </Link>
              </div>

              <LanguageSelect isNavOpen={isMenuOpen} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
