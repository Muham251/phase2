'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Define theme context type
interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  isMounted: boolean;
}

// Create theme context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Theme Provider Component
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Initialize theme from local storage or system preference
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const initialTheme = storedTheme === 'light' || storedTheme === 'dark' ? storedTheme : systemPreference;
    setTheme(initialTheme);
    setIsMounted(true);
  }, []);

  // Apply theme to document element
  useEffect(() => {
    if (isMounted) {
      document.documentElement.setAttribute('data-theme', theme);
      document.documentElement.classList.remove(theme === 'light' ? 'dark' : 'light');
      document.documentElement.classList.add(theme);
      localStorage.setItem('theme', theme);
    }
  }, [theme, isMounted]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // Prevent SSR mismatch
  if (!isMounted) {
    return (
      <div className="hidden">
        {children}
      </div>
    );
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isMounted }}>
      <div
        data-theme={theme}
        className={`theme-${theme} ${theme}`}
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          {children}
        </motion.div>
      </div>
    </ThemeContext.Provider>
  );
};

// Custom hook to use theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
