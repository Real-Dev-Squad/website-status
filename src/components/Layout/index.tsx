import { FC, ReactNode } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import NavBar from '@/components/navBar';
import Footer from '@/components/footer';
import styles from '@/components/Layout/Layout.module.scss';

interface Props {
  children?: ReactNode
}

const navBarContent = (title: string, refUrl: string) => {
  const router = useRouter();

  const linkClasses = `${styles.link} ${router.pathname === refUrl ? styles.active : ''}`;

  return (
    <Link href={refUrl}>
      <p className={linkClasses}>{title}</p>
    </Link>
  );
};

const Layout: FC<Props> = ({ children }) => (
  <div className={styles.layout}>
    <div className={styles.rdsHeader}>
      <NavBar />
    </div>
    <div className={styles.header}>
      {navBarContent('Tasks', '/')}
      |
      {navBarContent('Mine', '/mine')}
      |
      {navBarContent('DS', '/challenges')}
      |
      {navBarContent('Open PRs', '/openPRs')}
      |
      {navBarContent('Stale PRs', '/stale-pr')}
      |
      {navBarContent('Idle Members', '/idle-members')}
    </div>
    {children}
    <Footer />
  </div>
);

export default Layout;
