import styles from "./Layout.module.scss";
import Footer from "../footer/index";
import Link from 'next/link'
import { useRouter } from 'next/router'

type Props = {
  children?: React.ReactNode;
};

const navBarContent = (title: string, refUrl: string) => {
  const router =useRouter()

  const linkClasses = `link ${router.pathname === refUrl ? styles.active : ''}`
  
  return (
    <Link href={refUrl}>
      <a className={linkClasses}>{title}</a>
    </Link>
  );
};

function Layout(props: Props) {
  const { children } = props;

  return <div className={styles.layout}>
      <div className={styles.header}>
        {navBarContent('Tasks', '/')}
        {' '}
        |
        {navBarContent('Mine', '/mine')}
        {' '}
        |
        {' '}
        {navBarContent('DS', '/challenges')}
        {' '}
        |
        {navBarContent('ALL', '/all')}
        {' '}
        |
        {navBarContent('OpenPRs', '/openPRs')}
        {' '}
        |
        {navBarContent('StalePRs', '/stale-pr')}
      </div>
    {children}
    <Footer />
  </div>;
}

export default Layout;
