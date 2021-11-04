import Image from 'next/image';
import { FC } from 'react';
import Toggle from '@/components/dark-theme/toggler';
import styles from '@/components/navBar/navBar.module.scss';

interface Props {
  theme?: any,
}

const RDSLogo = '/RDSLogo.png';

const NavBar: FC<Props> = ({ theme }) => (
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
      <Toggle themeMode={theme} style={styles.iconImage} />
    </ul>
  </nav>
);

export default NavBar;
