import { useEffect, useState } from 'react';
import * as microsoftTeams from '@microsoft/teams-js';

export type TeamsTheme = 'light' | 'dark' | 'contrast';

function getInitialTheme(): TeamsTheme {
  try {
    const params = new URLSearchParams(window.location.search);
    const qp = params.get('theme');
    if (qp === 'dark' || qp === 'contrast') return qp;
  } catch {
    // ignore if URL unavailable (non-browser context)
  }
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
    // Listen to system theme as fallback
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => setTheme(e.matches ? 'dark' : 'light');
    mq.addEventListener?.('change', handler);

    // Initialize Microsoft Teams SDK and listen to theme
    let mounted = true;
    (async () => {
      try {
        await microsoftTeams.app.initialize();
        const context = await microsoftTeams.app.getContext();
        if (!mounted) return;
        const teamsTheme = (context.app.theme as TeamsTheme) || 'light';
        setTheme(teamsTheme);

        microsoftTeams.app.registerOnThemeChangeHandler((t) => {
          const next = (t as TeamsTheme) || 'light';
          setTheme(next);
        });
      } catch {
        // not running in Teams host; ignore
      }
    })();

    return () => {
      mounted = false;
      mq.removeEventListener?.('change', handler);
    };
  }, []);

  return { theme, setTheme } as const;
}
