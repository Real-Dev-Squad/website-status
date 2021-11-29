import Image from 'next/image';
import styles from '@/components/navBar/navBar.module.scss';

const RDSLogo = '/RDSLogo.png';

const NavBar = () => (
  <nav className={styles.navBar}>
    <div>
      <span>
        <a className={styles.logo} href="https://realdevsquad.com"><Image width="45px" height="45px" src={RDSLogo} alt="real-dev squad" /></a>
      </span>
      <span><a href="https://welcome.realdevsquad.com/">Welcome</a></span>
      <span><a href="https://www.realdevsquad.com/events.html">Events</a></span>
      <span><a href="https://members.realdevsquad.com/">Members</a></span>
      <span><a href="https://crypto.realdevsquad.com/">Crypto</a></span>
      <span><a className={styles.active} href="https://status.realdevsquad.com/">Status</a></span>
    </div>
  </nav>
);

export default NavBar;
