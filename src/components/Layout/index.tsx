import { FC, ReactNode } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Footer from '../footer';
import styles from './Layout.module.scss';

interface Props {
  children?: ReactNode;
}

const navBarContent = (title: string, refUrl: string) => {
  const router = useRouter();

  const linkClasses = `link ${router.pathname === refUrl ? styles.active : ''}`;

  return (
    <Link href={refUrl}>
      <p className={linkClasses}>
        {title}
      </p>
    </Link>
  );
};

const Layout: FC<Props> = ({ children }) => (
  <div className={styles.layout}>
    <div className={styles.header}>
      {navBarContent('Tasks', '/')}
      {' '}
      |
      {' '}
      {navBarContent('Mine', '/mine')}
      {' '}
      |
      {' '}
      {navBarContent('DS', '/challenges')}
      {' '}
      |
      {' '}
      {navBarContent('ALL', '/all')}
      {' '}
      |
      {' '}
      {navBarContent('OpenPRs', '/openPRs')}
      {' '}
      |
      {navBarContent('StalePRs', '/stale-pr')}
    </div>
    {children}
    <Footer />
  </div>
);

export default Layout;
