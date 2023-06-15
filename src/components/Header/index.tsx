import { FC } from 'react';
import styles from './Header.module.scss';
import Link from 'next/link';
import { HeaderItem } from '@/interfaces/HeaderItem.type';
import { useRouter } from 'next/router';

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

const headerLinks: HeaderItem[] = [
    {
        title: 'Tasks',
        link: '/',
    },
    {
        title: 'Issues',
        link: '/issues',
    },
    {
        title: 'Mine',
        link: '/mine',
    },
    {
        title: 'Open PRs',
        link: '/openPRs',
    },
    {
        title: 'Stale PRs',
        link: '/stale-pr',
    },
    {
        title: 'Idle Users',
        link: '/idle-users',
    },
];

export const Header = () => {
    const router = useRouter();

    // Dev feature toggle
    const { query } = router;
    const dev = !!query.dev;

    return (
        <div className={styles.header}>
            {headerLinks.map(({ title, link }, index) => (
                <HeaderLink
                    key={index}
                    title={title}
                    link={link}
                    isActive={router.pathname === link}
                />
            ))}

            {dev && (
                <HeaderLink
                    title={'Availability Panel'}
                    link={'/availability-panel'}
                    isActive={router.pathname === '/availability-panel'}
                />
            )}
        </div>
    );
};
