import Image from 'next/image';
import Link from 'next/link';
import { LOGIN_URL, USER_PROFILE_URL, DEFAULT_AVATAR } from '@/components/constants/url'
import useAuthenticated from '@/hooks/useAuthenticated';
import styles from '@/components/navBar/navBar.module.scss';
const RDSLogo = '/RDSLogo.png';
const GITHUB_LOGO = '/github-white.png';

const NavBar = () => {
  const { userData, isLoggedIn } = useAuthenticated()

  return (
    <nav className={styles.navBar}>
      <div>
        <a className={styles.logo} href="https://realdevsquad.com">
          <Image width="45px" height="45px" src={RDSLogo} alt="real-dev squad" />
        </a>
        <a href="https://welcome.realdevsquad.com/">Welcome</a>
        <a href="https://www.realdevsquad.com/events.html">Events</a>
        <a href="https://members.realdevsquad.com/">Members</a>
        <a href="https://crypto.realdevsquad.com/">Crypto</a>
        <a className={styles.active} href="https://status.realdevsquad.com/">Status</a>
      </div>
      <div>
        {!isLoggedIn ? (
          <Link href={LOGIN_URL}>
            <a className={styles.btnLogin}>
              <button type="button" className={styles.btnLoginText}>
                Sign In With GitHub
                <Image
                  className={styles.githubLogo}
                  src={GITHUB_LOGO}
                  alt="GitHub Icon"
                  height="15px"
                  width="15px"
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
                <Image
                  className={styles.userProfilePic}
                  src={
                    userData.profilePicture == ''
                      ? `${DEFAULT_AVATAR}`
                      : `${userData.profilePicture}`
                  }
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