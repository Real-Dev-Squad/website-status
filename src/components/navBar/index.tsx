import Link from 'next/link';
import useAuthenticated from '@/hooks/useAuthenticated';
import {
  LOGIN_URL,
  USER_PROFILE_URL,
  DEFAULT_AVATAR,
  HOME_URL,
  WELCOME_URL,
  EVENTS_URL,
  CRYPTO_URL,
  MEMBERS_URL,
  STATUS_URL,
  GITHUB_LOGO,
  RDS_LOGO
} from '@/components/constants/url'
import styles from '@/components/navBar/navBar.module.scss';


const NavBar = () => {
  const { userData, isLoggedIn } = useAuthenticated()

  return (
    <nav className={styles.navBar}>
      <div>
        <a className={styles.logo} href={HOME_URL}>
          <img width="45px" height="45px" src={RDS_LOGO} alt="real-dev squad" />
        </a>
        <a href={WELCOME_URL}>Welcome</a>
        <a href={EVENTS_URL}>Events</a>
        <a href={MEMBERS_URL}>Members</a>
        <a href={CRYPTO_URL}>Crypto</a>
        <a className={styles.active} href={STATUS_URL}>Status</a>
      </div>
      <div>
        {!isLoggedIn ? (
          <Link href={LOGIN_URL}>
            <a className={styles.btnLogin}>
              <button type="button" className={styles.btnLoginText}>
                Sign In With GitHub
                <img
                  className={styles.githubLogo}
                  src={GITHUB_LOGO}
                  alt="GitHub Icon"
                />
              </button>
            </a>
          </Link>
        ) : (
          <div className={styles.userGreet}>
            <Link href={USER_PROFILE_URL}>
              <a>
                <div className={styles.userGreetMsg}>
                  Hello, {userData.firstName}
                </div>
                <img
                  className={styles.userProfilePic}
                  src={userData.profilePicture ? `${userData.profilePicture}` : `${DEFAULT_AVATAR}`}
                  alt="Profile Pic"
                  width="32px"
                  height="32px"
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