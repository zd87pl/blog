import { createContext, useContext, useEffect, useState } from 'react';
import Head from 'next/head';

const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

const lightTheme = {
  '--color-bg': '#ffffff',
  '--color-bg-secondary': '#f8fafc',
  '--color-bg-tertiary': '#f1f5f9',
  '--color-text': '#0f172a',
  '--color-text-secondary': '#475569',
  '--color-text-tertiary': '#64748b',
  '--color-border': '#e2e8f0',
  '--color-border-light': '#f1f5f9',
  '--color-primary': '#0f172a',
  '--color-primary-hover': '#1e293b',
  '--color-accent': '#3b82f6',
  '--color-accent-hover': '#2563eb',
  '--color-white': '#ffffff',
  '--color-black': '#0f172a',
  '--color-card-bg': '#ffffff',
  '--color-card-shadow': 'rgba(0, 0, 0, 0.04)',
  '--color-code-bg': '#f8fafc',
  '--color-selection': 'rgba(59, 130, 246, 0.2)',
};

const darkTheme = {
  '--color-bg': '#0f172a',
  '--color-bg-secondary': '#1e293b',
  '--color-bg-tertiary': '#334155',
  '--color-text': '#f1f5f9',
  '--color-text-secondary': '#94a3b8',
  '--color-text-tertiary': '#64748b',
  '--color-border': '#334155',
  '--color-border-light': '#1e293b',
  '--color-primary': '#f1f5f9',
  '--color-primary-hover': '#ffffff',
  '--color-accent': '#60a5fa',
  '--color-accent-hover': '#93c5fd',
  '--color-white': '#f1f5f9',
  '--color-black': '#0f172a',
  '--color-card-bg': '#1e293b',
  '--color-card-shadow': 'rgba(0, 0, 0, 0.2)',
  '--color-code-bg': '#1e293b',
  '--color-selection': 'rgba(96, 165, 250, 0.3)',
};

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
      setTheme(savedTheme);
    } else if (prefersDark) {
      setTheme('dark');
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('theme', theme);
      document.documentElement.setAttribute('data-theme', theme);
    }
  }, [theme, mounted]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default function ThemeStyles() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Always render light theme CSS vars on server and initial client render
  // to prevent hydration mismatch
  const currentTheme = mounted && theme === 'dark' ? darkTheme : lightTheme;

  const cssVars = Object.entries(currentTheme)
    .map(([key, value]) => `${key}: ${value};`)
    .join(' ');

  const css = `:root { ${cssVars} } ::selection { background: var(--color-selection); } ::-moz-selection { background: var(--color-selection); }`;

  return (
    <Head>
      <style key="theme-styles">{css}</style>
    </Head>
  );
}
