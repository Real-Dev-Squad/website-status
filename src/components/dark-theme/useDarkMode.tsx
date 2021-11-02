import { useEffect, useState } from 'react';

const useDarkMode = () => {
  const [theme, setTheme] = useState('light');

  const setCookie = (name : string, value: string) => {
    const domain = '.realdevsquad.com';
    const expires = new Date(Date.now() + 24 * 30 * 60 * 60 * 1000);
    document.cookie = `${name}=${value}; expires=${expires}; domain=${domain}; path=/`;
  };

  const accessCookie = (cookieName: string) => {
    const name = `${cookieName}=`;
    const allCookieArray = document.cookie.split(';');
    let i = 0;
    while (i < allCookieArray.length) {
      const temp = allCookieArray[i].trim();
      if (temp.indexOf(name) === 0) return temp.substring(name.length, temp.length);
      i += 1;
    }
    return '';
  };

  const setMode = (mode : string) => {
    setCookie('theme', mode);
    setTheme(mode);
  };

  const themeToggler = () => {
    const toggle = theme === 'light' ? setMode('dark') : setMode('light');
    return toggle;
  };

  useEffect(() => {
    const localTheme = accessCookie('theme');
    setTheme(localTheme);
  }, []);
  return [theme, themeToggler];
};

export default useDarkMode;
