import { useState, useEffect } from 'react';

const ThemeSwitcher = () => {
  // Load the theme from localStorage or default to 'dark'
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') || 'dark'
  );

  // Function to toggle the theme
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme); // Save to localStorage
  };

  // Effect to apply the theme to the <html> element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div className="theme-switcher">
      <button onClick={toggleTheme}>
        Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode
      </button>
    </div>
  );
};

export default ThemeSwitcher;