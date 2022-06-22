import { FC } from "react";
import Image from "next/image";
import { SignInButton } from "@/interfaces/navbar.type";
import {
  GITHUB_LOGO,
  DEFAULT_AVATAR,
  MY_SITE_LINK,
  GITHUB_LOGIN_LINK,
  GITHUB,
  USER_PROFILE_PICTURE,
  USER,
  SIGN_IN,
  WITH_GITHUB,
} from "@/components/constants/navbar";
import styles from "@/components/navBar/navBar.module.scss";

const SignIn: FC<SignInButton> = ({ userData, loggedIn }) => {
  const { firstName, profilePicture } = userData;

  return (
    <div className={styles.signInContainer}>
      <button
        className={loggedIn ? styles.userGreet : styles.btnLogin}
        onClick={() =>
          (location.href = loggedIn ? MY_SITE_LINK : GITHUB_LOGIN_LINK)
        }
        type="button"
      >
        {loggedIn ? (
          <>
            <span className={styles.userGreetMsg}>
              Hello, {firstName ? firstName : USER}!
            </span>
            <Image
              className={styles.userProfilePic}
              src={profilePicture ? profilePicture : DEFAULT_AVATAR}
              alt={USER_PROFILE_PICTURE}
              width={32}
              height={32}
            />
          </>
        ) : (
          <>
            <span className={styles.btnLoginText}>{SIGN_IN}</span>
            <span className={`${styles.btnLoginText} ${styles.visible}`}>
              {WITH_GITHUB}
            </span>
            <Image
              className={styles.githubLogo}
              src={GITHUB_LOGO}
              alt={GITHUB}
              height={18}
              width={18}
            />
          </>
        )}
      </button>
    </div>
  );
};

export default SignIn;
