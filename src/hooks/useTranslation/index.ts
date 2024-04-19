import { Plugin } from "vue";
import { InjectionKey, inject } from "vue";
import translationsData from "../../initializers/translationsFile.json";
export interface TranslationDictionary {
  [key: string]: string;
}

const translationSymbol: InjectionKey<TranslationDictionary> = Symbol();

export function useTranslation() {
  const translations = inject(translationSymbol);
  if (!translations) {
    throw new Error("Translations not provided!");
  }

  const translate = (key: string) => {
    return translations[key] || key;
  };

  return {
    translate,
  };
}

const translationPlugin: Plugin = {
  install(app) {
    // let translations: TranslationDictionary = {};
    app.provide(translationSymbol, translationsData);
  },
};

export default translationPlugin;
