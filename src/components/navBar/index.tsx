import styles from '@/components/navBar/navBar.module.scss';
import Image from 'next/image';

const RDSLogo = '/RDSLogo.png';

const NavBar = () => (
  <div>
    <nav className={styles.navBar}>
      <ul>
        <li style={{ padding: '7px' }}>
          <Image width="45px" height="45px" src={RDSLogo} alt="real-dev squad" />
        </li>
        <li><a href="https://realdevsquad.com">Home</a></li>
        <li><a href="https://welcome.realdevsquad.com/">Welcome</a></li>
        <li><a href="https://www.realdevsquad.com/events.html">Events</a></li>
        <li><a href="https://members.realdevsquad.com/">Members</a></li>
        <li><a href="https://crypto.realdevsquad.com/">Crypto</a></li>
        <li><a style={{ color: '#87d870' }} href="https://status.realdevsquad.com/">Status</a></li>
      </ul>
    </nav>
  </div>
);

export default NavBar;
