import { useEffect, useState } from "react";
import Image from "next/image";
import userData from "@/helperFunctions/getUser";
import { toast, ToastTypes } from "@/helperFunctions/toast";
import navLinks from "./navLinks";
import NavbarLinks from "./NavbarLinks";
import UserSignIn from "./UserSignIn";
import styles from "@/components/navBar/navBar.module.scss";

const RDS_LOGO = "/RDSLogo.png";

const HAMBURGER_ICON = "/hamburger.svg";
const SIGN_IN_WITH_GITHUB = "Sign In With GitHub";
const SIGN_IN = "Sign In";

const TWENTY_FIVE_PX = "25px";
const THIRTY_PX = "30px";
const FIFTY_PX = "50px";

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
    <div className={styles.wrapper}>
      <nav className={styles.navBar}>
        <div className={styles.hamburger} onClick={() => setToggle(!toggle)}>
          <Image
            src={HAMBURGER_ICON}
            alt="hamburger-icon"
            width={TWENTY_FIVE_PX}
            height={THIRTY_PX}
          />
        </div>

        <ul
          className={
            toggle
              ? `${styles.navBarMenu} 
        ${styles.active}`
              : styles.navBarMenu
          }
        >
          <li className={styles.navBarLogoLi}>
            <a href="https://www.realdevsquad.com/">
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
        <div className={styles.m_login_btn}>
          <UserSignIn
            btnText={SIGN_IN}
            userData={userDetails}
            loggedIn={userIsLoggedIn}
          />
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
