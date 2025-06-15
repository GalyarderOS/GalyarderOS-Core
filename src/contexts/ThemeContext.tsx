import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';
type Language = 'en' | 'id';

interface ThemeContextType {
  theme: Theme;
  language: Language;
  setTheme: (theme: Theme) => void;
  setLanguage: (language: Language) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('light');
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    // Load saved preferences from localStorage
    const savedTheme = localStorage.getItem('galyarderos-theme') as Theme;
    const savedLanguage = localStorage.getItem('galyarderos-language') as Language;
    
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      setTheme(savedTheme);
    } else {
      // Default to system preference
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(systemPrefersDark ? 'dark' : 'light');
    }
    
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'id')) {
      setLanguage(savedLanguage);
    }
  }, []);

  const updateTheme = (newTheme: Theme) => {
    console.log('Updating theme to:', newTheme);
    setTheme(newTheme);
    localStorage.setItem('galyarderos-theme', newTheme);
    
    const root = document.documentElement;
    
    if (newTheme === 'dark') {
      root.classList.add('dark');
      root.style.setProperty('color-scheme', 'dark');
    } else {
      root.classList.remove('dark');
      root.style.setProperty('color-scheme', 'light');
    }
    
    window.dispatchEvent(new CustomEvent('themeChange', { detail: newTheme }));
  };

  const updateLanguage = (newLanguage: Language) => {
    console.log('Updating language to:', newLanguage);
    setLanguage(newLanguage);
    localStorage.setItem('galyarderos-language', newLanguage);
    
    // Dispatch custom event for language change
    window.dispatchEvent(new CustomEvent('languageChange', { detail: newLanguage }));
  };

  // Apply theme on mount and when theme changes
  useEffect(() => {
    console.log('Theme effect triggered:', theme);
    const root = document.documentElement;
    
    if (theme === 'dark') {
      root.classList.add('dark');
      root.style.setProperty('color-scheme', 'dark');
    } else {
      root.classList.remove('dark');
      root.style.setProperty('color-scheme', 'light');
    }
  }, [theme]);

  const value = {
    theme,
    language,
    setTheme: updateTheme,
    setLanguage: updateLanguage
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
