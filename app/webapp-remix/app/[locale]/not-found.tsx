import { useTranslations } from 'next-intl';
import { Icons } from '@/app/components/Icons';

export default function NotFound() {
  const t = useTranslations();

  return (
    <>
      <div className="flex flex-col justify-center text-center h-screen">
        <Icons.XIcon className="mx-auto mb-5 md:mb-8 w-9 h-9 md:w-14 md:h-14 fill-primary-orange" />

        <h1 className="font-neue-plak-extra-condense text-5xl md:text-9xl text-primary-brown">
          {t('page_error_404_header')}
        </h1>
        <div className="text-primary-navy text-base md:text-xl">
          <p>{t('page_error_404_p1')}</p>
          <p>{t('page_error_404_p2')}</p>
        </div>
      </div>
    </>
  );
}
