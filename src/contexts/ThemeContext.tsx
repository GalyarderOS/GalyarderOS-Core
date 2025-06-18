import React, { useEffect, useState, useMemo } from 'react';
import { ThemeContext } from './useTheme';

type Theme = 'light' | 'dark' | 'system';
type Language = 'en' | 'id';

export interface ThemeContextType {
  theme: Theme;
  language: Language;
  setTheme: (theme: Theme) => void;
  setLanguage: (language: Language) => void;
}

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => 
    (localStorage.getItem('galyarderos-theme') as Theme) || 'system'
  );
  const [language, setLanguage] = useState<Language>(() =>
    (localStorage.getItem('galyarderos-language') as Language) || 'en'
  );

  useEffect(() => {
    const root = window.document.documentElement;
    const isDark =
      theme === 'dark' ||
      (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

    root.classList.remove(isDark ? 'light' : 'dark');
    root.classList.add(isDark ? 'dark' : 'light');
    root.style.setProperty('color-scheme', isDark ? 'dark' : 'light');
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    localStorage.setItem('galyarderos-theme', newTheme);
    setThemeState(newTheme);
  };
  
  const updateLanguage = (newLanguage: Language) => {
    localStorage.setItem('galyarderos-language', newLanguage);
    setLanguage(newLanguage);
    window.dispatchEvent(new CustomEvent('languageChange', { detail: newLanguage }));
  };
  
  const value = useMemo(() => ({
    theme,
    language,
    setTheme,
    setLanguage: updateLanguage
  }), [theme, language]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
