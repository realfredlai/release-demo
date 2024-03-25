import { createSharedPathnamesNavigation } from 'next-intl/navigation';

export const locales = ['en', 'ja', 'ko'] as const;

export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({ locales });
