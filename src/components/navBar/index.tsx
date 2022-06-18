import { useEffect, useState } from "react";
import Image from "next/image";
import userData from "@/helperFunctions/getUser";
import { toast, ToastTypes } from "@/helperFunctions/toast";
import navLinks from "./navLinks";
import NavbarLinks from "./NavbarLinks";
import UserSignIn from "./UserSignIn";
import {
  RDS_LOGO,
  HAMBURGER_ICON,
  SIGN_IN_WITH_GITHUB,
  SIGN_IN,
  HOME_PAGE_LINK,
  TWENTY_FIVE_PX,
  THIRTY_PX,
  FIFTY_PX,
} from "@/components/constants/navbar";
import styles from "@/components/navBar/navBar.module.scss";

const NavBar = () => {
  const [toggle, setToggle] = useState(false);
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState({
    userName: "",
    firstName: "",
    profilePicture: "",
  });

  useEffect(() => {
    (async () => {
      await userData()
        .then((data) => {
          const { username, first_name, picture } = data;
          setUserDetails({
            userName: username,
            firstName: first_name,
            profilePicture: picture?.url,
          });

          setUserIsLoggedIn(true);
        })
        .catch((error) => {
          toast(ToastTypes.ERROR, (error as Error).message);
        });
    })();
  }, [userDetails, userIsLoggedIn]);

  return (
    <nav className={styles.navBar}>
      <button className={styles.hamburger} onClick={() => setToggle(!toggle)}>
        <Image
          src={HAMBURGER_ICON}
          alt="Hamburger"
          height={THIRTY_PX}
          width={TWENTY_FIVE_PX}
        />
      </button>

      <ul
        className={
          toggle ? `${styles.navBarMenu} ${styles.active}` : styles.navBarMenu
        }
      >
        <li className={styles.navBarLogoLi}>
          <a href={HOME_PAGE_LINK}>
            <Image
              src={RDS_LOGO}
              alt="Real_Dev_Squad"
              height={FIFTY_PX}
              width={FIFTY_PX}
            />
          </a>
        </li>
        <NavbarLinks data={navLinks} />
        <li className={styles.navBarLoginLi}>
          <UserSignIn
            btnText={SIGN_IN_WITH_GITHUB}
            userData={userDetails}
            loggedIn={userIsLoggedIn}
          />
        </li>
      </ul>
      <div className={styles.loginBtn}>
        <UserSignIn
          btnText={SIGN_IN}
          userData={userDetails}
          loggedIn={userIsLoggedIn}
        />
      </div>
    </nav>
  );
};

export default NavBar;
