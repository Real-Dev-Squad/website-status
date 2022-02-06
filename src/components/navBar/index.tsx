import Image from 'next/image';
import styles from '@/components/navBar/navBar.module.scss';
import React, { useState } from 'react';

const RDSLogo = '/RDSLogo.png';
const GitHubLogo = '/gitHubLogo.svg'
const hamburgerLogo = '/hamburger.svg';

const NavBar = () => {
  const [toggle, setToggle] = useState(false);
  return (
  <div className={styles.wrapper}>
    
    <nav className={styles.navBar}>
      <div className={styles.hamburger} onClick={() => setToggle(!toggle)} >
        <Image src={hamburgerLogo} alt="hamburger-icon" width="25" height="30" />
      </div>

      <ul className={ toggle ? `${styles.navBarMenu} 
        ${styles.active}` : 
        styles.navBarMenu }
      >
        <li className={styles.navBarLogoLi}>
          <a href="https://www.realdevsquad.com/">
            <img src={RDSLogo} alt="realdevsquad-icon" height="50px" width="50px" />
          </a>
        </li>
        <li className={styles.homeTab}>
          <a href="https://www.realdevsquad.com/"> Home </a>
        </li>
        <li>
          <a href="https://welcome.realdevsquad.com/"> Welcome </a>
        </li>
        <li>
          <a href="https://www.realdevsquad.com/events.html"> Events </a>
        </li>
        <li>
          <a href="https://members.realdevsquad.com/"> Members </a>
        </li>
        <li>
          <a href="https://crypto.realdevsquad.com/"> Crypto </a>
        </li>
        <li>
          <a className={styles.activeTab} href="https://status.realdevsquad.com/"> Status </a>
        </li>
        <li className={styles.navBarLoginLi}>
          <a
            className={styles.btnLogin}
            href="https://github.com/login/oauth/authorize?client_id=23c78f66ab7964e5ef97"
          >
            <button className={styles.btnLoginText}>
              Sign In With GitHub
              <img
                className={styles.githubLogo}
                src={GitHubLogo}
                alt="GitHub Icon"
                height="15px"
                width="15px"
              />
            </button>
          </a>
          <div className={styles.userGreet}>
            <div className={styles.userGreetMsg}>Hello, User!</div>
            <img className={styles.userProfilePic} />
          </div>
        </li>
      </ul>
    </nav>
  </div>
)};

export default NavBar;
