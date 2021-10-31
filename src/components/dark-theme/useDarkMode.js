import { useEffect, useState } from 'react';

let icon = '/moon.png';

const useDarkMode = () => {
  const [theme, setTheme] = useState('light');

  const setCookie = (name, value, days) => {
    const domain = '.realdevsquad.com';
    const expires = new Date(Date.now() + 24 * days * 60 * 60 * 1000);
    document.cookie = `${name}=${value}; expires=${expires}; domain=${domain}; path=/`;
  };

  const accessCookie = (cookieName) => {
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

  const setMode = (mode) => {
    setCookie('theme', mode, 30);
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

const iconDisplay = () => {
  if (icon === '/moon.png') icon = '/sun.png';
  else icon = '/moon.png';
  return icon;
};

const Toggle = ({ themeMode, style }) => (
  <input type="image" onClick={themeMode} src={iconDisplay()} className={style} alt="toggle icon" />
);

export { Toggle, useDarkMode };
