import { FC } from "react";
import Image from "next/image";
import { SignInButton, UserData } from "@/interfaces/navbar.type";
import {
  GITHUB_LOGO,
  DEFAULT_AVATAR,
  MY_SITE_LINK,
  GITHUB_LOGIN_LINK,
  EIGHTEEN_PX,
  THIRTY_TWO_PX,
} from "@/components/constants/navbar";
import styles from "@/components/navBar/navBar.module.scss";

const UserSignIn: FC<SignInButton> = ({ btnText, userData, loggedIn }) => {
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
              Hello, {firstName ? firstName : `User`}!
            </span>
            <Image
              className={styles.userProfilePic}
              src={profilePicture || DEFAULT_AVATAR}
              alt="User_Profile_Picture"
              width={THIRTY_TWO_PX}
              height={THIRTY_TWO_PX}
            />
          </>
        ) : (
          <>
            <span className={styles.btnLoginText}>{btnText}</span>
            <Image
              className={styles.githubLogo}
              src={GITHUB_LOGO}
              alt="GitHub_Icon"
              height={EIGHTEEN_PX}
              width={EIGHTEEN_PX}
            />
          </>
        )}
      </button>
    </div>
  );
};

export default UserSignIn;
