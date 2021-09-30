import Image from 'next/image';
import styles from '@/components/navBar/navBar.module.scss';

const RDSLogo = '/RDSLogo.png';

const NavBar = () => (
  <nav className={styles.navBar}>
    <ul>
      <li>
        <a className={styles.logo} href="https://realdevsquad.com"><Image width="45px" height="45px" src={RDSLogo} alt="real-dev squad" /></a>
      </li>
      <li><a href="https://welcome.realdevsquad.com/">Welcome</a></li>
      <li><a href="https://www.realdevsquad.com/events.html">Events</a></li>
      <li><a href="https://members.realdevsquad.com/">Members</a></li>
      <li><a href="https://crypto.realdevsquad.com/">Crypto</a></li>
      <li><a className={styles.active} href="https://status.realdevsquad.com/">Status</a></li>
    </ul>
  </nav>
);

export default NavBar;
