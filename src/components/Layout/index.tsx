import styles from "./Layout.module.scss";
import Footer from "../footer/index";
import Link from 'next/link'
import { useRouter } from 'next/router'

type Props = {
  children?: React.ReactNode;
};

function Layout(props: Props) {
  const { children } = props;

  const navBarContent = (title: string, refUrl: string) => {
    const router =useRouter()

    const linkClasses = `link ${router.pathname === refUrl ? styles.active : ''}`
    
    return (
      <Link href={refUrl}>
        <a className={linkClasses}>{title}</a>
      </Link>
    );
  };

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
      </div>
    {children}
    <Footer />
  </div>;
}

export default Layout;
