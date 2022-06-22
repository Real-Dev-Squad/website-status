import { useEffect, useState } from "react";
import Image from "next/image";
import useFetch from "@/hooks/useFetch";
import navLinks from "./navLinks";
import NavbarLinks from "./NavbarLinks";
import SignIn from "./SignIn";
import { USER_SELF } from "../constants/url";
import { HAMBURGER_ICON, HAMBURGER } from "@/components/constants/navbar";
import styles from "@/components/navBar/navBar.module.scss";
import Logo from "./Logo";

const NavBar = () => {
  const [toggle, setToggle] = useState(false);
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    profilePicture: "",
  });

  const { response, status, error } = useFetch(USER_SELF);

  useEffect(() => {
    if (response && status === 200) {
      const { first_name, picture } = response;

      setUserDetails({
        firstName: first_name,
        profilePicture: picture?.url,
      });

      setUserIsLoggedIn(true);
    }

    if (error && status === 401) {
      setUserIsLoggedIn(false);
    }
  }, [response, error, status]);

  return (
    <nav className={styles.navBar}>
      <button className={styles.hamburger} onClick={() => setToggle(!toggle)}>
        <Image src={HAMBURGER_ICON} alt={HAMBURGER} height={30} width={25} />
      </button>

      <ul
        className={
          toggle ? `${styles.navBarMenu} ${styles.active}` : styles.navBarMenu
        }
      >
        <Logo />
        <NavbarLinks data={navLinks} />
      </ul>

      <div className={styles.loginBtn}>
        <SignIn userData={userDetails} loggedIn={userIsLoggedIn} />
      </div>
    </nav>
  );
};

export default NavBar;
