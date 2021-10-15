import { InitOptions } from 'i18next';
import { resources } from './resources';

export function getConfig(): InitOptions {
  const lang = 'ru';
  return {
    interpolation: { escapeValue: false },
    lng: lang,
    fallbackLng: lang,
    fallbackNS: 'common',
    defaultNS: 'common',
    cache: {
      enabled: true,
    },
    resources,
  };
}
