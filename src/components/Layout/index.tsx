import { FC, ReactNode } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ThemeProvider } from 'styled-components';
import Footer from '@/components/footer';
import styles from '@/components/Layout/Layout.module.scss';
import NavBar from '@/components/navBar';
import { lightTheme, darkTheme } from '@/components/dark-theme/theme';
import useDarkMode from '@/components/dark-theme/useDarkMode';
import GlobalStyles from '@/components/dark-theme/globalStyles';

interface Props {
  children?: ReactNode
}

const navBarContent = (title: string, refUrl: string, isActive: boolean = false) => {
  const linkClasses = `${styles.link} ${isActive ? styles.active : ''}`;

  return (
    <Link href={refUrl}>
      <button type="button" tabIndex={0} className={linkClasses}>{title}</button>
    </Link>
  );
};

const Layout: FC<Props> = ({ children }) => {
  const [theme, themeToggler] = useDarkMode();
  const themeMode = theme === 'light' ? lightTheme : darkTheme;

  const router = useRouter();

  // Dev feature toggle
  const { query } = router;
  const dev = !!query.dev;

  return (
    <ThemeProvider theme={themeMode}>
      <>
        <GlobalStyles />
        <div className={styles.layout}>
          <NavBar theme={themeToggler} />
          <div className={styles.wrapper}>
            <div className={styles.header}>
              {navBarContent('Tasks', '/', router.pathname === '/')}
              |
              {navBarContent('Mine', '/mine', router.pathname === '/mine')}
              |
              {navBarContent('DS', '/challenges', router.pathname === '/challenges')}
              |
              {navBarContent('Open PRs', '/openPRs', router.pathname === '/openPRs')}
              |
              {navBarContent('Stale PRs', '/stale-pr', router.pathname === '/stale-pr')}
              |
              {navBarContent('Idle Members', '/idle-members', router.pathname === '/idle-members')}
              {
              (dev)
                && (
                  <>
                    |
                    {navBarContent('Availability Panel', '/availability-panel')}
                  </>
                )
            }
            </div>
            {children}
          </div>
          <Footer />
        </div>
      </>
    </ThemeProvider>
  );
};

export default Layout;
