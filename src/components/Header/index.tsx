import { FC } from 'react';
import styles from './Header.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
    devHeaderCategories,
    headerCategories,
} from '@/constants/header-categories';

interface HeaderLinkProps {
    title: string;
    link: string;
    isActive: boolean;
}

export const HeaderLink: FC<HeaderLinkProps> = ({ title, link, isActive }) => {
    const linkClasses = `${styles.link} ${isActive ? styles.active : ''}`;

    return (
        <Link href={link} passHref>
            <button type="button" tabIndex={0} className={linkClasses}>
                {title}
            </button>
        </Link>
    );
};

export const Header = () => {
    const router = useRouter();

    // Dev feature toggle
    const { query } = router;
    const dev = !!query.dev;

    return (
        <div className={styles.header}>
            {headerCategories.map(({ title, refURL, pathName }, index) => (
                <HeaderLink
                    key={index}
                    title={title}
                    link={refURL}
                    isActive={router.pathname === pathName}
                />
            ))}

            {dev &&
                devHeaderCategories.map(
                    ({ title, refURL, pathName }, index) => (
                        <HeaderLink
                            key={index}
                            title={title}
                            link={refURL}
                            isActive={router.pathname === pathName}
                        />
                    )
                )}
        </div>
    );
};
