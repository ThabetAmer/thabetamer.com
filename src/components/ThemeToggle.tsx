import { useEffect } from 'react';

export default function ThemeToggle() {
  useEffect(() => {
    const toggle = document.getElementById('theme-toggle');

    const handleClick = () => {
      // Add transition class for smooth theme change
      document.documentElement.classList.add('theme-transition');

      // Toggle theme
      const isDark = document.documentElement.classList.toggle('dark');

      // Persist preference
      localStorage.setItem('theme', isDark ? 'dark' : 'light');

      // Remove transition class after animation completes
      setTimeout(() => {
        document.documentElement.classList.remove('theme-transition');
      }, 300);
    };

    toggle?.addEventListener('click', handleClick);

    return () => {
      toggle?.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <button
      id="theme-toggle"
      type="button"
      className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors duration-200"
      aria-label="Toggle theme"
    >
      {/* Sun icon (shown in dark mode) */}
      <svg
        className="hidden dark:block w-5 h-5"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="4"></circle>
        <path d="M12 2v2"></path>
        <path d="M12 20v2"></path>
        <path d="m4.93 4.93 1.41 1.41"></path>
        <path d="m17.66 17.66 1.41 1.41"></path>
        <path d="M2 12h2"></path>
        <path d="M20 12h2"></path>
        <path d="m6.34 17.66-1.41 1.41"></path>
        <path d="m19.07 4.93-1.41 1.41"></path>
      </svg>
      {/* Moon icon (shown in light mode) */}
      <svg
        className="block dark:hidden w-5 h-5"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
      </svg>
    </button>
  );
}
