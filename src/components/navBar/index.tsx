import { useState } from 'react';
import Link from 'next/link';
import useAuthenticated from '@/hooks/useAuthenticated';
import Image from 'next/image';
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
} from '@/components/constants/url';
import Dropdown from '../Dropdown/Dropdown';
import styles from '@/components/navBar/navBar.module.scss';
import { useGetUserQuery } from '@/app/services/userApi';
import { Loader } from '../tasks/card/Loader';

const NavBar = () => {
    const isLoggedIn = true;
    const { data: userData, isLoading } = useGetUserQuery();
    // const { userData, isLoggedIn } = useAuthenticated();
    const [toggleDropdown, setToggleDropdown] = useState(false);

    if (isLoading) return <Loader />;
    return (
        <nav data-testid="navbar" className={styles.navBar}>
            <div className={styles.navLinks}>
                <a className={styles.logo} href={HOME_URL}>
                    <Image
                        data-testid="logo"
                        width="45"
                        height="45"
                        src={RDS_LOGO}
                        alt="real-dev squad"
                    />
                </a>
                <a href={WELCOME_URL}>Welcome</a>
                <a href={EVENTS_URL}>Events</a>
                <a href={MEMBERS_URL}>Members</a>
                <a href={CRYPTO_URL}>Crypto</a>
                <a className={styles.active} href={STATUS_URL}>
                    Status
                </a>
            </div>
            <div>
                {!isLoggedIn ? (
                    <Link href={LOGIN_URL}>
                        <p className={styles.signInLink}>
                            Sign In With GitHub
                            <Image
                                className={styles.githubLogo}
                                src={GITHUB_LOGO}
                                height="20"
                                width="20"
                                alt="GitHub Icon"
                            />
                        </p>
                    </Link>
                ) : (
                    <div
                        className={styles.userGreet}
                        onClick={() => setToggleDropdown(!toggleDropdown)}
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
