
import { useLanguage } from '../contexts/LanguageContext'; // Adjust path as needed
import { translations } from '../translations'; // Adjust path as needed

export const useTranslation = () => {
  const { currentLanguage } = useLanguage();

  const t = (key: string, replacements?: Record<string, string | number>): string => {
    const primaryTranslations = translations[currentLanguage];
    const fallbackTranslations = translations.en; // Always fallback to English

    let translatedString: string | undefined = primaryTranslations?.[key];

    // If not found in the current language's translations (and current language is not English),
    // try to find it in the English translations.
    if (translatedString === undefined && currentLanguage !== 'en') {
      translatedString = fallbackTranslations?.[key];
    }

    // If still not found (or if the found value is not a string), fallback to the key itself.
    // This ensures the app doesn't break if a translation is missing.
    if (typeof translatedString !== 'string') {
      // console.warn(`Translation key "${key}" not found or not a string. Using key as fallback.`);
      translatedString = key;
    }
    
    let result = translatedString;

    if (replacements) {
      Object.keys(replacements).forEach(placeholder => {
        // Ensure placeholder is a global regex to replace all occurrences
        const regex = new RegExp(`{{${placeholder}}}`, 'g');
        result = result.replace(regex, String(replacements[placeholder]));
      });
    }
    return result;
  };

  return { t, currentLanguage };
};
