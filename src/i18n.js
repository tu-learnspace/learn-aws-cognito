import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from 'i18next-http-backend';
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";

import appConfig from 'appConfig';

i18n
.use(new Backend(null, {
  loadPath: '/locales/{{lng}}/{{ns}}.json'
}))
.use(I18nextBrowserLanguageDetector)
.use(initReactI18next) // passes i18n down to react-i18next
  .init({
    fallbackLng: appConfig.defaultLanguage, // default language in i18n if no language is detected
    debug: true, // console.log
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
