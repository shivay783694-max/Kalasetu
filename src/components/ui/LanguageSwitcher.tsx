import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-1 bg-muted p-1 rounded-full border border-secondary">
      <button
        onClick={() => setLanguage('en')}
        className={`px-3 py-1 text-xs font-bold rounded-full uppercase tracking-widest transition-colors ${
          language === 'en' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLanguage('hi')}
        className={`px-3 py-1 text-xs font-bold rounded-full uppercase tracking-widest transition-colors ${
          language === 'hi' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        HI
      </button>
    </div>
  );
}
