import { useEffect, useState } from 'react';

const useDarkMode = () => {
  const [theme, setTheme] = useState('light');

  const setCookie = (mode: string) => {
    const domain = '.realdevsquad.com';
    const expires = new Date(Date.now() + 24 * 30 * 60 * 60 * 1000);
    document.cookie = `${'theme'}=${mode}; expires=${expires}; domain=${domain}; path=/`;
    setTheme(mode);
  };

  const getCookie = () => {
    const name = 'theme=';
    const allCookieArray = document.cookie.split(';');
    let i = 0;
    while (i < allCookieArray.length) {
      const temp = allCookieArray[i].trim();
      if (temp.indexOf(name) === 0) return temp.substring(name.length, temp.length);
      i += 1;
    }
    return '';
  };

  const themeToggler = () => {
    const toggle = theme === 'light' ? setCookie('dark') : setCookie('light');
    return toggle;
  };

  useEffect(() => {
    const localTheme = getCookie();
    setTheme(localTheme);
  }, []);
  return [theme, themeToggler];
};

export default useDarkMode;
