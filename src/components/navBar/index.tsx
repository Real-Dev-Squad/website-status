import Image from "next/image";
import styles from "@/components/navBar/navBar.module.scss";
import { FC, Key, useEffect, useState } from "react";
import { USER_SELF } from "../constants/url";
import navLinks from "./navLinks";
import fetch from "@/helperFunctions/fetch";

type UserData = {
  firstName: string;
  profilePicture: string;
};

type SignInButton = {
  btnText: string;
  userData: Object;
};

type Data = { data: DataItem[] };

type DataItem = {
  id: Key;
  link: string;
  name: string;
  tabStyle: string;
  linkStyle: string;
};

const RDSLogo = "/RDSLogo.png";
const GitHubLogo = "/gitHubLogo.png";
const hamburgerLogo = "/hamburger.svg";
const DEFAULT_AVATAR = "/dummyProfile.png";
const SIGN_IN_WITH_GITHUB = "Sign In With GitHub";
const SIGN_IN = "Sign In";

const NavBar = () => {
  const [toggle, setToggle] = useState(false);
  const [userData, setUserData] = useState({});
  const [userisLoggedIn, setUserisLoggedIn] = useState(false);

  useEffect(() => {
    (async function () {
      try {
        const { requestPromise } = fetch({ url: USER_SELF, method: "get" });

        const { data, status, statusText } = await requestPromise;
        if (status !== 200) {
          throw new Error(`${status} (${statusText})`);
        } else if (data.incompleteUserDetails) {
          window.open(
            "https://my.realdevsquad.com/signup",
            "_blank",
            "noopener"
          );
        }

        setUserData({
          userName: data.username,
          firstName: data.first_name,
          profilePicture: data.picture?.url
            ? data.picture?.url
            : DEFAULT_AVATAR,
        });
        setUserisLoggedIn(true);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  const UserSignIn: FC<SignInButton> = (btnText, userData: UserData) => {
    const { firstName, profilePicture } = userData;

    return !userisLoggedIn ? (
      <a
        className={styles.btnLogin}
        href="https://github.com/login/oauth/authorize?client_id=23c78f66ab7964e5ef97"
      >
        <button className={styles.btnLoginText}>
          {btnText}
          <Image
            className={styles.githubLogo}
            src={GitHubLogo}
            alt="GitHub_Icon"
            height="15px"
            width="15px"
          />
        </button>
      </a>
    ) : (
      <a href="https://my.realdevsquad.com/" id={styles.userGreet}>
        <div className={styles.userGreetMsg}>
          Hello, {firstName ? firstName : `User`}!
        </div>
        <Image
          className={styles.userProfilePic}
          src={profilePicture}
          alt="User_Profile_Picture"
          width="32px"
          height=" 32px"
        />
      </a>
    );
  };

  const NavbarLinks = (data: DataItem[]) => {
    return data.map((item: DataItem) => {
      <li className={item.tabStyle ? item.tabStyle : ""} key={item.id}>
        <a className={item.linkStyle ? item.linkStyle : ""} href={item.link}>
          {item.name}
        </a>
      </li>;
    });
  };

  return (
    <div className={styles.wrapper}>
      <nav className={styles.navBar}>
        <div className={styles.hamburger} onClick={() => setToggle(!toggle)}>
          <Image
            src={hamburgerLogo}
            alt="hamburger-icon"
            width="25"
            height="30"
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
                src={RDSLogo}
                alt="RealDevSquad_Icon"
                height="50px"
                width="50px"
              />
            </a>
          </li>
          <NavbarLinks data={navLinks} />
          <li className={styles.navBarLoginLi}>
            <UserSignIn btnText={SIGN_IN_WITH_GITHUB} userData={userData} />
          </li>
        </ul>
        <div className={styles.m_login_btn}>
          <UserSignIn btnText={SIGN_IN} userData={userData} />
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
