import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Footer from '@/components/footer';
import styles from '@/components/Layout/Layout.module.scss';
import NavBar from '@/components/navBar';
import Image from 'next/image';
import { toast, ToastTypes } from '@/helperFunctions/toast';
import fetch from '@/helperFunctions/fetch';
interface Props {
  children?: ReactNode
}

const navBarContent = (title: string, refUrl: string, isActive: boolean = false) => {
  const linkClasses = `${styles.link} ${isActive ? styles.active : ''}`;

  return (
    <Link href={refUrl} passHref>
      <button type="button" tabIndex={0} className={linkClasses}>{title}</button>
    </Link>
  );
};
const { SUCCESS, ERROR } = ToastTypes;
const SELF_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/users/self`;
const Layout: FC<Props> = ({ children }) => {
  const [IsUserAuthorized, setIsUserAuthorized] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { requestPromise } = fetch({ url: SELF_URL });
        const { data } = await requestPromise;
        const userRoles = {
          adminUser: data.roles?.admin,
          superUser: data.roles?.super_user,
        };
        const { adminUser, superUser } = userRoles;
        setIsUserAuthorized(!!adminUser || !!superUser);
      } catch (err: any) {
        toast(ERROR, err.message);
      }
    };
    fetchData();

    return (() => {
      setIsUserAuthorized(false);
    });
  }, []);

  const router = useRouter();

  // Dev feature toggle
  const { query } = router;
  let dev = !!query.dev;
  let elementRef  = useRef();
  
  return (
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
          
          {
            (dev)
            && (
              <>
                |
                {navBarContent('Availability Panel', '/availability-panel')}
              </>
            )
          }
          {IsUserAuthorized && <Link href={{ pathname: '/', query: { dev: 'true' } }} passHref><Image
                height= "25px"
                width="25px"
                src="/add.png"
                alt="add"
            /></Link>}  
        </div>
        {IsUserAuthorized && <div className={styles.edit} >
          <Link href={{ pathname: '/', query: { edit: 'true' } }} passHref>
            <Image
                className={styles.edit}
                height= "25px"
                width="25px"
                src="/pencil.png"
                alt="pencil"
            />
          </Link>
        </div>}
        
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
