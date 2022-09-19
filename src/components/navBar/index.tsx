import Image from 'next/image';
import styles from '@/components/navBar/navBar.module.scss';
import { LOGIN_URL, USER_PROFILE_URL } from '@/components/constants/url'
import Link from 'next/link';
const RDSLogo = '/RDSLogo.png';
import useAuthenticated, { DEFAULT_AVATAR } from '@/hooks/useAuthenticated';

const NavBar = () => {
  const GITHUB_LOGO = '/github-white.png';
  
  const {userData, isLoggedIn} = useAuthenticated()

  return (
    <nav className={styles.navBar}>
      <div>
        <a className={styles.logo} href="https://realdevsquad.com"><Image width="45px" height="45px" src={RDSLogo} alt="real-dev squad" /></a>
        <a href="https://welcome.realdevsquad.com/">Welcome</a>
        <a href="https://www.realdevsquad.com/events.html">Events</a>
        <a href="https://members.realdevsquad.com/">Members</a>
        <a href="https://crypto.realdevsquad.com/">Crypto</a>
        <a className={styles.active} href="https://status.realdevsquad.com/">Status</a>
      </div>

      <div>
        {!isLoggedIn && (
          <Link href={LOGIN_URL}>
            <a className={styles.btnLogin}>
              <button type="button" className={styles.btnLoginText}>
                Sign In With GitHub
                <img
                  className={styles.githubLogo}
                  src={GITHUB_LOGO}
                  alt="GitHub Icon"
                  height="15px"
                  width="15px"
                />
              </button>
            </a>
          </Link>
        )}
        {isLoggedIn && (
          <div className={styles.userGreet}>
            <Link href={USER_PROFILE_URL}>
              <a>
                <div className={styles.userGreetMsg}>
                  {isLoggedIn
                    ? `Hello, ${userData.firstName}!`
                    : `Hello, User!`}
                </div>
                <img
                  className={styles.userProfilePic}
                  src={
                    isLoggedIn
                      ? `${userData.profilePicture}`
                      : `${DEFAULT_AVATAR}`
                  }
                  alt="Profile Pic"
                />
              </a>
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
};

export default NavBar;
