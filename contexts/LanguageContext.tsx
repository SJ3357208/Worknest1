
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { LanguageCode } from '../translations'; // Ensure this path is correct

interface LanguageContextType {
  currentLanguage: LanguageCode;
  changeLanguage: (lang: LanguageCode) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>('en'); // Default to English

  const changeLanguage = (lang: LanguageCode) => {
    setCurrentLanguage(lang);
    // Optionally, save to localStorage to persist language choice
    // localStorage.setItem('worknest-language', lang);
  };

  // Optionally, load saved language from localStorage on initial load
  // useEffect(() => {
  //   const savedLang = localStorage.getItem('worknest-language') as LanguageCode | null;
  //   if (savedLang && (savedLang === 'en' || savedLang === 'hi' || savedLang === 'te')) {
  //     setCurrentLanguage(savedLang);
  //   }
  // }, []);

  return (
    <LanguageContext.Provider value={{ currentLanguage, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
