import { FC, ReactNode } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Footer from '@/components/footer';
import styles from '@/components/Layout/Layout.module.scss';
import NavBar from '../navBar';

interface Props {
  children?: ReactNode
}

const navBarContent = (title: string, refUrl: string) => {
  const router = useRouter();

  const linkClasses = `${styles.link} ${router.pathname === refUrl ? styles.active : ''}`;

  return (
    <Link href={refUrl}>
      <button type="button" tabIndex={0} className={linkClasses}>{title}</button>
    </Link>
  );
};

const Layout: FC<Props> = ({ children }) => {
  const router = useRouter();

  // Dev feature toggle
  const { query } = router;
  const dev = !!query.dev;

  return (
    <div className={styles.layout}>
      <NavBar />
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
      <Footer />
    </div>
  );
};

export default Layout;
