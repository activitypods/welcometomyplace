import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import type { I18nProvider } from '@refinedev/core';

import { APP_LANG } from '../config/env';
import en from './locales/en.json';
import fr from './locales/fr.json';

i18next.use(initReactI18next).init({
  resources: { en: { translation: en }, fr: { translation: fr } },
  lng: APP_LANG,
  fallbackLng: 'en',
  interpolation: { escapeValue: false }
});

/**
 * Language is fixed per deployment (via VITE_APP_LANG, see `config/env.ts`) — there is no
 * in-app language switcher, matching the current app's behavior. `changeLocale` is still wired
 * up (it's part of Refine's `I18nProvider` contract, e.g. `AntdAuthPage` could theoretically
 * call it) but nothing in this app calls it today.
 */
export const i18nProvider: I18nProvider = {
  // Refine calls `translate(key, options, defaultMessage)` for its own built-in strings (e.g. the
  // create/update/delete success/error notifications) — keys we haven't added to en/fr.json
  // ourselves. Without forwarding that third argument as i18next's `defaultValue`, a missing key
  // renders as the raw key itself (e.g. "notifications.createSuccess") instead of falling back to
  // Refine's sensible built-in English default.
  translate: (key: string, options?: any, defaultMessage?: string) =>
    i18next.t(key, { ...options, defaultValue: defaultMessage }) as string,
  changeLocale: (lang: string) => i18next.changeLanguage(lang),
  getLocale: () => i18next.language
};

export default i18next;
