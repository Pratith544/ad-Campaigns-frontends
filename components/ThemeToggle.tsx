'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        className="rounded-lg p-2 transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-900"
        disabled
      >
        <div className="h-5 w-5" />
      </button>
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="rounded-lg p-2 transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-900"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Sun className="h-5 w-5 text-neutral-600 dark:text-neutral-400" />
      ) : (
        <Moon className="h-5 w-5 text-neutral-600 dark:text-neutral-400" />
      )}
    </button>
  );
}
