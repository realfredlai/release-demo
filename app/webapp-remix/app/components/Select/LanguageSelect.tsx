'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

import { useRouter, usePathname, locales } from '@/navigation';
import { useLocale } from 'next-intl';

import { cn } from '@reebok/frontend-components';
import { Text } from '@/app/components/Text/Text';

import TriangleBoneIcon from '@/public/images/icons/icon-triangle-bone.svg';

const LanguageSelect = ({ isNavOpen }: { isNavOpen: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const currentLocale = useLocale();

  useEffect(() => {
    setIsOpen(false);
  }, [isNavOpen]);

  // Filter other languages not selected, and sort alphabetically them for consistent location
  const sortedLanguagesWithoutSelected = locales
    .filter((language) => language !== currentLocale)
    .sort();

  // Convert locale symbols into nicer client-side symbols
  const languageCodeToDisplay = (code: string) => {
    switch (code) {
      case 'en':
        return 'EN';
      case 'ja':
        return 'JP';
      case 'ko':
        return 'KR';
      default:
        return code;
    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLanguageChange = (language: string) => {
    setIsOpen(false);
    router.replace(pathname, { locale: language });
  };

  return (
    <div className="relative inline-block text-primary-bone select-none">
      <div
        className="py-2 px-4 h-12 cursor-pointer flex items-center border border-primary-bone"
        onClick={toggleDropdown}
      >
        <Text variant="lgBody" weight="bold">
          {languageCodeToDisplay(currentLocale)}
        </Text>
        <Image
          src={TriangleBoneIcon}
          alt="Triangle Icon"
          className={cn('ml-2 transition-transform duration-100', {
            'transform rotate-180': isOpen,
          })}
        />
      </div>

      <div
        className={cn(
          'absolute divide-y bottom-0 mb-12 bg-transparent w-full transition-opacity duration-150',
          {
            'opacity-100': isOpen,
            'opacity-0 pointer-events-none': !isOpen,
          }
        )}
      >
        {sortedLanguagesWithoutSelected.map((language, index) => (
          <div
            className="cursor-pointer"
            onClick={() => handleLanguageChange(language)}
            key={index}
          >
            <div className="border-x border-t border-primary-bone py-2 px-4">
              <Text variant="lgBody" weight="bold">
                {languageCodeToDisplay(language)}
              </Text>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LanguageSelect;
