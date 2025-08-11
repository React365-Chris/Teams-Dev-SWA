import { useEffect, useState } from 'react';

export type TeamsTheme = 'light' | 'dark' | 'contrast';

function getInitialTheme(): TeamsTheme {
  const params = new URLSearchParams(window.location.search);
  const qp = params.get('theme');
  if (qp === 'dark' || qp === 'contrast') return qp;
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  return prefersDark ? 'dark' : 'light';
}

export function useTeamsTheme() {
  const [theme, setTheme] = useState<TeamsTheme>(getInitialTheme());

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark' || theme === 'contrast') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => setTheme(e.matches ? 'dark' : 'light');
    mq.addEventListener?.('change', handler);
    return () => mq.removeEventListener?.('change', handler);
  }, []);

  return { theme, setTheme } as const;
}
