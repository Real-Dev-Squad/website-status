import { FC, useState, useEffect } from "react"
import Image from 'next/image';
import styles from '@/components/navBar/navBar.module.scss';

const RDSLogo = '/RDSLogo.png';
const moon = '/moon.png';
const sun = '/sun.png';

interface NavBarProps {
  darkMode: boolean
  changeTheme: (event: React.MouseEvent<HTMLImageElement>) => void
}

const NavBar: FC<NavBarProps> = ({ darkMode, changeTheme }) => {

  return (
    <nav className={styles.navBar}>
      <a className={styles.logo} href="https://realdevsquad.com"><Image width="45px" height="45px" src={RDSLogo} alt="real-dev squad" /></a>
      <a href="https://welcome.realdevsquad.com/">Welcome</a>
      <a href="https://www.realdevsquad.com/events.html">Events</a>
      <a href="https://members.realdevsquad.com/">Members</a>
      <a href="https://crypto.realdevsquad.com/">Crypto</a>
      <a className={styles.active} href="https://status.realdevsquad.com/">Status</a>
      <Image src={darkMode ? moon : sun} onClick={changeTheme} width="35px" height="35px" alt="dark mode selector"/>
    </nav>
  )
};

export default NavBar;