import { FC, ReactNode, useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Footer from '@/components/footer';
import styles from '@/components/Layout/Layout.module.scss';
import NavBar from '@/components/navBar';

interface Props {
  children?: ReactNode,
  darkMode: boolean,
  changeTheme: (event: React.MouseEvent<HTMLImageElement>) => void
}

const navBarContent = (title: string, refUrl: string, toggleDarkMode: boolean, isActive: boolean = false) => {
  const linkClasses = `${toggleDarkMode ? styles.darkTheme : styles.lightTheme} ${styles.link} ${isActive ? styles.active : ''}`;

  return (
    <Link 
      href={{
        pathname: refUrl,
        query: {darkMode: toggleDarkMode}
      }}
      as={refUrl}
      passHref>
      <button type="button" tabIndex={0} className={linkClasses}>{title}</button>
    </Link>
  );
};

const Layout: FC<Props> = ({ children, darkMode, changeTheme }) => {
  const router = useRouter();

  // Dev feature toggle
  const { query } = router;
  const dev = !!query.dev;

  return (
<<<<<<< HEAD
    <div className={darkMode ? styles.darkTheme : styles.lightTheme} style={{ height: '100%' }}>
      <div className={styles.layout}>
        <NavBar darkMode={darkMode} changeTheme={changeTheme} />
        <div className={styles.wrapper}>
          <div className={styles.header}>
            {navBarContent('Tasks', '/', darkMode, router.pathname === '/')}
            |
            {navBarContent('Mine', '/mine', darkMode, router.pathname === '/mine')}
            |
            {navBarContent('DS', '/challenges', darkMode, router.pathname === '/challenges')}
            |
            {navBarContent('Open PRs', '/openPRs', darkMode, router.pathname === '/openPRs')}
            |
            {navBarContent('Stale PRs', '/stale-pr', darkMode, router.pathname === '/stale-pr')}
            |
            {navBarContent('Idle Members', '/idle-members', darkMode, router.pathname === '/idle-members')}
=======
    <div className={styles.darkTheme} style={{ height: '100%' }}>
      <div className={styles.layout}>
        <NavBar />
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
>>>>>>> 395dbbb (add dark mode to status site Tasks tab)
            {
            (dev)
              && (
                <>
                  |
                  {navBarContent('Availability Panel', '/availability-panel', darkMode)}
                </>
              )
          }
          </div>
          {children}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
