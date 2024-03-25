import Image from 'next/image';
import { useTranslations } from 'next-intl';
import shoeCollage from '@/public/images/about/shoe-collage.png';
import { H1 } from '@/app/components/Text/H1';
import { SubHeader } from '@/app/components/Text/SubHeader';
import { Text } from '@/app/components/Text/Text';
import { Icons } from '@/app/components/Icons';

export default function About() {
  const t = useTranslations();

  return (
    <>
      <div className="bg-primary-bone  w-full px-2 lg:px-48 pt-48 pb-4 md:pb-14 gap-8">
        <H1
          variant="h1Extra"
          className="text-center text-5xl md:text-9xl text-primary-brown uppercase"
        >
          {t('page_about_header')}
        </H1>

        <div className="container text-primary-navy max-w-5xl text-base mt-4">

          <Image
            src={shoeCollage}
            width={1184}
            height={1350}
            alt="sneaker collage"
            className="mx-auto w-full max-w-xl h-auto my-10 md:my-20"
          />
          <span id="about"></span>
          <SubHeader>{t('page_about_subhead_reebok_impact')}</SubHeader>
          <Text variant="paragraph">{t('page_about_reebok_impact_p1')}</Text>
          <SubHeader>{t('page_about_subhead_sneaker_work')}</SubHeader>
          <Text variant="paragraph">{t('page_about_sneaker_work_p1')}</Text>
          <Text variant="paragraph">{t('page_about_sneaker_work_p2')}</Text>
          <SubHeader>{t('page_about_subhead_colab')}</SubHeader>
          <Text variant="paragraph">{t('page_about_colab_p1')}</Text>
          <SubHeader>{t('page_about_subhead_collection')}</SubHeader>
          <Text variant="paragraph">{t('page_about_collection_p1')}</Text>
          <SubHeader>{t('page_about_subhead_sneaker_tech')}</SubHeader>
          <Text variant="paragraph" className="mb-0">{t('page_about_sneaker_tech_p1')}</Text>
          <Text variant="paragraph">
            {t('page_about_sneaker_tech_p2')}{' '}
                <a
                  href="https://www.futureverse.com"
                  target="_blank"
                  rel="noreferrer"
                  className="relative inline-block text-primary-orange hover:text-primary-orange-hover underline underline-offset-2"
                >
                  {t('page_about_subhead_futureverse')}{' '}
                  <Icons.ExternalLink className="absolute -right-8 top-0" />
                </a>
          </Text>

          <span id="partners"></span>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-14 mt-16">
              <div className="flex items-center align-middle bg-primary-brown h-56 rounded-3xl">
                <Icons.ReebokStripes className="mx-auto my-2 w-5/12 h-auto" />
              </div>
              <div className="flex flex-col justify-center">
              <Text variant="paragraph" className="pr-4 py-3">
                {t('page_about_partner1_p1')}
              </Text>
              <Text variant="paragraph">
                {t('page_about_partner1_p2')}{' '}
                <a
                  href="https://www.reebok.com"
                  target="_blank"
                  rel="noreferrer"
                  className="relative inline-block text-primary-orange hover:text-primary-orange-hover underline underline-offset-2"
                >
                  {t('page_about_subhead_partner1')}{' '}
                  <Icons.ExternalLink className="absolute -right-8 top-0" />
                </a>
              </Text>
              </div>
          </div>
        </div>
      </div>
    </>
  );
}
