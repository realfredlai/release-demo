import { useTranslations } from 'next-intl';
import Link from 'next/link';

const footerLinks = [
  { href: '/about', label: 'footer_nav_link_about' },
  { href: '/gallery', label: 'footer_nav_link_inspiration_gallery' },
  { href: '/support', label: 'footer_nav_link_support' },
  { href: '/legal', label: 'footer_nav_link_legal' },
  { href: 'https://reebok.com', label: 'REEBOK.COM', external: true },
];

export default function FooterNav() {
  const t = useTranslations();
  return (
    <ul className="flex flex-col gap-7 uppercase">
      {footerLinks.map((link, index) => (
        <li key={index}>
          {link.external ? (
            <a href={link.href} target="_blank" rel="noreferrer">
              {link.label}
            </a>
          ) : (
            <Link href={link.href}>{t(link.label)}</Link>
          )}
        </li>
      ))}
    </ul>
  );
}
