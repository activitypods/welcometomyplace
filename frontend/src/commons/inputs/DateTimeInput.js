import React from "react";
import frLocale from "date-fns/locale/fr";
import { DateTimeInput as SemAppsDateTimeInput } from '@semapps/date-components';
import { frFR, enUS } from "@mui/x-date-pickers/locales";

const localeMapping = {
  en: {
    locale: undefined, // If no locale is defined, english is used by default
    translations: enUS
  },
  fr: {
    locale: frLocale,
    translations: frFR
  }
}

const DateTimeInput = props => {
  const { locale, translations } = localeMapping[process.env.REACT_APP_LANG] || localeMapping.en; 
  return (
    <SemAppsDateTimeInput
      locale={locale}
      translations={translations}
      {...props}
    />
  );
};

export default DateTimeInput;
