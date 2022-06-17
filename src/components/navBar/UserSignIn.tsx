import { FC } from "react";
import Image from "next/image";
import styles from "@/components/navBar/navBar.module.scss";
import { SignInButton, UserData } from "@/interfaces/navbar.type";

const UserSignIn: FC<SignInButton> = ({ btnText, userData, loggedIn }) => {
  const GITHUB_LOGO = "/gitHubLogo.png";
  const DEFAULT_AVATAR = "/dummyProfile.png";
  const EIGHTEEN_PX = "18px";
  const THIRTY_TWO_PX = "32px";

  const { firstName, profilePicture } = userData;

  return (
    <button
      className={loggedIn ? styles.userGreet : styles.btnLogin}
      onClick={() =>
        (location.href = loggedIn
          ? "https://my.realdevsquad.com/"
          : "https://github.com/login/oauth/authorize?client_id=23c78f66ab7964e5ef97")
      }
      type="button"
    >
      {loggedIn ? (
        <>
          <div className={styles.userGreetMsg}>
            Hello, {firstName ? firstName : `User`}!
          </div>
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
  );
};

export default UserSignIn;
