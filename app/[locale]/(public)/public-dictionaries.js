import "server-only";

const dictionaries = {
  en: () =>
    import("@/locales/public/en-CA.json").then((module) => module.default),
  fr: () =>
    import("@/locales/public/fr-CA.json").then((module) => module.default),
};

export const getDictionary = async (locale) => {
  const loadDictionary = dictionaries[locale];
  if (!loadDictionary) {
    throw new Error(`No dictionary found for locale: ${locale}`);
  }
  return await loadDictionary();
};
