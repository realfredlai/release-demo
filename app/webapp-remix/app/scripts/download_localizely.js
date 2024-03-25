const fs = require('fs');
const fetch = require('node-fetch');

if (!process.env.NEXT_PUBLIC_LOCALIZELY_API_KEY)
  throw new Error('NEXT_PUBLIC_LOCALIZELY_API_KEY missing');

const locales = ['en', 'ja', 'ko'];

const URL = process.env.NEXT_PUBLIC_LOCALIZELY_API;

const fetch_locale = async (url, locale) => {
  const res = await fetch(url + locale, {
    headers: {
      'X-Api-Token': process.env.NEXT_PUBLIC_LOCALIZELY_API_KEY,
    },
  });
  const translations = await res.json();

  processTranslations(translations);

  fs.writeFileSync(
    `./libs/backend-libs/src/lib/messages/${locale}.json`,

    JSON.stringify(translations, null, 2)
  );
  return translations;
};

for (const locale of locales) {
  if (locale === 'cimode') continue;
  if (locale === 'blank') continue;
  fetch_locale(URL, locale);
}

const processTranslations = (translations) => {
  for (const key in translations) {
    const newKey = key.replace(/\[plural(_\w+)\]/, '$1');
    if (newKey !== key) {
      translations[newKey] = translations[key];
      delete translations[key];
    }
  }
};
