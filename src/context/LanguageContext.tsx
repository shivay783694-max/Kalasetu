import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

// Simple translation dictionary
const translations: Record<Language, Record<string, string>> = {
  en: {
    'nav.home': 'Home',
    'nav.marketplace': 'Marketplace',
    'nav.about': 'About',
    'nav.login': 'Login',
    'nav.register': 'Register',
    'common.search': 'Search products, crafts or artisans...',
    'common.filter': 'Filters',
    'common.viewAll': 'View All',
  },
  hi: {
    'nav.home': 'होम',
    'nav.marketplace': 'बाज़ार',
    'nav.about': 'हमारे बारे में',
    'nav.login': 'लॉग इन करें',
    'nav.register': 'पंजीकरण करें',
    'common.search': 'उत्पाद, शिल्प या कारीगर खोजें...',
    'common.filter': 'फ़िल्टर',
    'common.viewAll': 'सभी देखें',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
