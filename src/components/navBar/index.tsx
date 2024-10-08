import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import {
    LOGIN_URL,
    DEFAULT_AVATAR,
    HOME_URL,
    WELCOME_URL,
    EVENTS_URL,
    MEMBERS_URL,
    STATUS_URL,
    GITHUB_LOGO,
    RDS_LOGO,
} from '@/constants/url';
import Dropdown from '../Dropdown/Dropdown';
import styles from '@/components/navBar/navBar.module.scss';
import useUserData from '@/hooks/useUserData';
import useAuthenticated from '@/hooks/useAuthenticated';

const NavBar = () => {
    const { isLoggedIn } = useAuthenticated();
    const [isProfileLoading, setIsProfileLoading] = useState(true);

    const [toggleDropdown, setToggleDropdown] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

    const { data: userData, isLoading } = useUserData();

    useEffect(() => {
        setIsProfileLoading(isLoading);
    }, [isLoading]);

    return (
        <nav data-testid="navbar" className={styles.navBar}>
            <div
                data-testid="hamburgerIcon"
                className={styles.hamburgerIcon}
                onClick={() => setShowMenu(!showMenu)}
            >
                <img
                    src="/ham.png"
                    alt="hamburger_logo"
                    className={styles.icon}
                />
            </div>
            <div
                className={`${
                    showMenu ? `${styles.navBarMenu}` : `${styles.navLinks}`
                }`}
            >
                <ul className={styles.mobile_menu}>
                    <li>
                        <a className={styles.logo} href={HOME_URL}>
                            <Image
                                data-testid="logo"
                                width="45"
                                height="45"
                                src={RDS_LOGO}
                                alt="real-dev squad"
                            />
                        </a>
                    </li>
                    <li>
                        <a href={WELCOME_URL}>Welcome</a>
                    </li>
                    <li>
                        <a href={EVENTS_URL}>Events</a>
                    </li>
                    <li>
                        <a href={MEMBERS_URL}>Members</a>
                    </li>
                    {/* TODO: Uncomment when crypto page is ready */}
                    {/* <li>
                        <a href={CRYPTO_URL}>Crypto</a>
                    </li> */}
                    <li>
                        <a href={STATUS_URL} className={styles.active}>
                            Status
                        </a>
                    </li>
                </ul>
            </div>
            <div className={styles.userProfile}>
                {isProfileLoading ? (
                    <div className={styles.skeletonContainer}>
                        <div className={styles.skeletonGreetMsg}></div>
                        <div className={styles.skeletonProfilePic}></div>
                    </div>
                ) : !isLoggedIn ? (
                    <Link href={LOGIN_URL}>
                        <button className={styles.signInLink}>
                            Sign In With Github
                            <Image
                                className={styles.githubLogo}
                                src={GITHUB_LOGO}
                                height="20"
                                width="20"
                                alt="GitHub Icon"
                            />
                        </button>
                    </Link>
                ) : (
                    <div
                        className={styles.userGreet}
                        onClick={() => setToggleDropdown(!toggleDropdown)}
                        data-testid="toggler"
                    >
                        <div className={styles.userGreetMsg}>
                            Hello, {userData?.first_name}
                        </div>
                        <Image
                            className={styles.userProfilePic}
                            src={
                                userData?.picture?.url
                                    ? `${userData?.picture?.url}`
                                    : `${DEFAULT_AVATAR}`
                            }
                            alt="Profile Pic"
                            width="32"
                            height="32"
                        />
                        {toggleDropdown && <Dropdown />}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default NavBar;
