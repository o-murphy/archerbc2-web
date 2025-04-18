import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import { TranslationTypes } from "./translations/TranslationTypes";
import en from "./translations/en_translation.json";
import ua from "./translations/ua_translation.json";

// Если забудем добавить поле в один из языков,
// здесь появится TypeScript ошибка
const resources: Record<string, { translation: TranslationTypes }> = {
  en: { translation: en },
  ua: { translation: ua },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
      lookupLocalStorage: "i18nextLng",
    },
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;