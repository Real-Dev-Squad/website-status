import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import styles from '@/components/navBar/navBar.module.scss';
import GlobalStyles from '@/components/Dark-Theme/globalStyles';
import { lightTheme, darkTheme } from '@/components/Dark-Theme/Themes';

const RDSLogo = '/RDSLogo.png';
let Icon = '/moon.png';

const NavBar = () => {
  const [theme, setTheme] = useState('light');
  const setMode = (mode: string) => {
    window.localStorage.setItem('theme', mode);
    setTheme(mode);
  };

  const themeToggler = () => {
    const toggle = theme === 'light' ? setMode('dark') : setMode('light');
    return toggle;
  };

  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme')!;
    setTheme(localTheme);
  }, []);

  const iconDisplay = () => {
    if (Icon === '/moon.png') Icon = '/sun.png';
    else Icon = '/moon.png';
    return Icon;
  };

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <>
        <GlobalStyles />
        <nav className={styles.navBar}>
          <ul>
            <li>
              <a className={styles.logo} href="https://realdevsquad.com"><Image width="45px" height="45px" src={RDSLogo} alt="real-dev squad" /></a>
            </li>
            <li><a href="https://welcome.realdevsquad.com/">Welcome</a></li>
            <li><a href="https://www.realdevsquad.com/events.html">Events</a></li>
            <li><a href="https://members.realdevsquad.com/">Members</a></li>
            <li><a href="https://crypto.realdevsquad.com/">Crypto</a></li>
            <li><a className={styles.active} href="https://status.realdevsquad.com/">Status</a></li>
            <li><Image className={styles.iconImage} width="20px" height="20px" src={iconDisplay()} onClick={themeToggler} /></li>
          </ul>
        </nav>
      </>
    </ThemeProvider>
  );
};
export default NavBar;
