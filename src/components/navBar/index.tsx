import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import useAuthenticated from "@/hooks/useAuthenticated";
import {
  LOGIN_URL,
  DEFAULT_AVATAR,
  HOME_URL,
  WELCOME_URL,
  EVENTS_URL,
  CRYPTO_URL,
  MEMBERS_URL,
  STATUS_URL,
  GITHUB_LOGO,
  RDS_LOGO,
  CROSS,
} from "@/components/constants/url";
import Dropdown from "../Dropdown/Dropdown";
import styles from "@/components/navBar/navBar.module.scss";
import Image from "next/image";

const NavBar = () => {
  const { userData, isLoggedIn } = useAuthenticated();
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [toggleDrawer, setToggleDrawer] = useState(false);

  const drawerStyles = {
    left: toggleDrawer ? "0" : "-100%",
  };

  // funtion to toggle drawer.
  function toggle() {
    setToggleDrawer((prev) => !prev);
  }

  useEffect(() => {
    if (toggleDrawer == true) {
      let doc = document?.querySelector("body")!;
      doc.style.overflow = "hidden";
    } else {
      let doc = document?.querySelector("body")!;
      doc.style.overflow = "scroll";
    }
  }, [toggleDrawer]);

  return (
    <nav className={styles.navBar}>
      <div className={styles.ham} onClick={toggle} title="ham">
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
      </div>

      <div className={styles.navLinks} id="drawer" style={drawerStyles}>
        <div className={styles.cross} onClick={toggle} title="cancel">
          <Image
            src={CROSS}
            alt="cancel-button"
            width="20px"
            height="20px"
            className={styles.cross_img}
          />
        </div>
        <a className={styles.logo} href={HOME_URL} title="home">
          <Image
            width="45px"
            height="45px"
            src={RDS_LOGO}
            alt="real-dev squad"
          />
        </a>
        <a href={WELCOME_URL} title="welcome">
          Welcome
        </a>
        <a href={EVENTS_URL} title="events">
          Events
        </a>
        <a href={MEMBERS_URL} title="members">
          Members
        </a>
        <a href={CRYPTO_URL} title="crypto">
          Crypto
        </a>
        <a className={styles.active} title="status" href={STATUS_URL}>
          Status
        </a>
      </div>

      <div>
        {!isLoggedIn ? (
          <Link href={LOGIN_URL} title="signIn">
            <a className={styles.signInLink} title="signIn">
              Sign In With GitHub
              <Image
                height="16px"
                width="16px"
                className={styles.githubLogo}
                src={GITHUB_LOGO}
                alt="GitHub Icon"
              />
            </a>
          </Link>
        ) : (
          <div
            className={styles.userGreet}
            onClick={() => setToggleDropdown(!toggleDropdown)}
          >
            <div className={styles.userGreetMsg}>
              Hello, {userData.firstName}
            </div>
            <Image
              className={styles.userProfilePic}
              src={
                userData.profilePicture
                  ? `${userData.profilePicture}`
                  : `${DEFAULT_AVATAR}`
              }
              alt="Profile Pic"
              width="32px"
              height="32px"
            />
            {toggleDropdown && <Dropdown />}
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
