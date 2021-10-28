import Image from 'next/image';
import { ThemeProvider } from 'styled-components';
import Toggle from '@/components/dark-theme/toggler';
import styles from '@/components/navBar/navBar.module.scss';
import useDarkMode from '@/components/dark-theme/useDarkMode';
import GlobalStyles from '@/components/dark-theme/globalStyles';
import { lightTheme, darkTheme } from '@/components/dark-theme/theme';

const RDSLogo = '/RDSLogo.png';

const NavBar = () => {
  const [theme, themeToggler] = useDarkMode();
  const themeMode = theme === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeProvider theme={themeMode}>
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
            <li><Toggle toggleTheme={themeToggler} style={styles.iconImage} /></li>
          </ul>
        </nav>
      </>
    </ThemeProvider>
  );
};
export default NavBar;
