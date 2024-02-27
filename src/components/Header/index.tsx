import { FC, useState } from 'react';
import styles from './Header.module.scss';
import Link from 'next/link';
import { HeaderLinkProps } from '@/interfaces/HeaderItem.type';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import {
    devHeaderCategories,
    headerCategories,
} from '@/constants/header-categories';

export const HeaderLink: FC<HeaderLinkProps> = ({
    title,
    link,
    isActive,
    isDev,
}) => {
    const [isHovered, setIsHovered] = useState(false);

    const linkClasses = `${styles.link} ${isActive ? styles.active : ''} ${
        !isDev && styles.linkSeparator
    }`;

    return (
        <Link href={link}>
            <button
                type="button"
                tabIndex={0}
                className={linkClasses}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {title}
                {isDev && isActive && (
                    <motion.div
                        layoutId="tabs-underline"
                        className={styles.tabUnderline}
                    ></motion.div>
                )}
                {isDev && isHovered && (
                    <motion.div
                        layoutId="tab-pill"
                        className={styles.tabPill}
                    ></motion.div>
                )}
            </button>
        </Link>
    );
};

export const Header = () => {
    const router = useRouter();

    // Dev feature toggle
    const { query } = router;
    const dev = !!query.dev;
    const queryState = query.state;

    const headerOptions = [
        ...headerCategories,
        ...(dev ? devHeaderCategories : []),
    ];

    return (
        <div className={styles.header}>
            {headerOptions.map(({ title, link, pathName, state }, index) => (
                <HeaderLink
                    key={index}
                    title={title}
                    link={link}
                    isActive={
                        router.pathname === pathName &&
                        (router.pathname === '/pull-requests'
                            ? queryState === state
                            : true)
                    }
                    isDev={dev}
                />
            ))}
        </div>
    );
};
