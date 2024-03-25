'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

import FAQs from '@/app/components/Homepage/FAQs';
import FooterSocials from '@/app/components/Footer/FooterSocials';
import FooterNav from '@/app/components/Footer/FooterNav';

import { useShoeLockerStore } from '@/app/store/ShoeLockerStore';

import footerSneaker from '@/public/images/general/footer-sneaker.png';
import footerReebokLogo from '@/public/images/logos/logo-reebok-footer.svg';

const pathNames = {
  remix: '/remix',
  support: '/support',
  login: '/login',
};

export default function Footer() {
  const t = useTranslations();
  const pathname = usePathname();
  const { isPFPUnityOpen } = useShoeLockerStore();

  const renderFAQs = !(
    pathname.includes(pathNames.support) ||
    pathname.includes(pathNames.remix) ||
    pathname.includes(pathNames.login) ||
    isPFPUnityOpen
  );
  const renderFooter = !(
    pathname.includes(pathNames.remix) ||
    pathname.includes(pathNames.login) ||
    isPFPUnityOpen
  );

  return (
    <>
      <div className={renderFAQs || renderFAQs ? 'card-stack-item-none' : ''}>
        {renderFAQs && <FAQs />}

        {renderFooter && (
          <footer className="bg-primary-navy pt-48 text-primary-bone">
            <div className="flex flex-col md:flex-row  w-full md:items-center">
              <div className="-mt-52 relative z-0 self-end w-full md:w-7/12 bg-contain bg-no-repeat md:bg-left-bottom mix-blend-screen">
                <Image
                  src={footerSneaker}
                  width={1114}
                  height={1200}
                  alt="Sneaker"
                  className="w-full h-auto"
                />
              </div>
              <div className=" w-full -mt-[28%] md:mt-10 md:-ml-8 md:w-1/3 relative z-20">
                <div
                  style={{
                    background:
                      'linear-gradient(0deg, rgba(24, 35, 40, 1) 5%, rgba(24, 35, 40, 0) 100%)',
                  }}
                  className="pl-6 pb-6"
                >
                  <Image
                    src={footerReebokLogo}
                    width={636}
                    height={337}
                    alt="Reebok"
                    className="w-1/2 md:w-7/12 h-auto"
                  />
                </div>
                <div className="p-6 -mt-4 md:-mt-0">
                  <FooterNav />
                  <FooterSocials />
                  <p className="text-xs md:text-sm mb-1 md:mb-20">
                    {t('footer_fine_print')}
                    <span className="block md:inline-block">
                      <Link
                        href="/legal"
                        className="underline underline-offset-2"
                      >
                        {t('footer_fine_print_link_terms')}
                      </Link>
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </footer>
        )}
      </div>
    </>
  );
}
