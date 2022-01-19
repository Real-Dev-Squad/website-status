import Image from 'next/image';
import styles from '@/components/navBar/navBar.module.scss';

const RDSLogo = '/RDSLogo.png';

const NavBar = () => (
  <nav className={styles.navBar}>
    <a className={styles.logo} href="https://realdevsquad.com"><Image width="50px" height="50px" src={RDSLogo} alt="real-dev squad" /></a>
    <a href="https://welcome.realdevsquad.com/">Welcome</a>
    <a href="https://www.realdevsquad.com/events.html">Events</a>
    <a href="https://members.realdevsquad.com/">Members</a>
    <a href="https://crypto.realdevsquad.com/">Crypto</a>
    <a className={styles.active} href="https://status.realdevsquad.com/">Status</a>
  </nav>
);

export default NavBar;
