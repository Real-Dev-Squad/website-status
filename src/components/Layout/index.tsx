import React, { FC, ReactNode } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Footer from '@/components/footer';
import styles from '@/components/Layout/Layout.module.scss';
import NavBar from '@/components/navBar';
import navBarContentMock from '@/constants/navbar-Content';

interface Props {
    children?: ReactNode;
}

const navBarContent = (title: string, refUrl: string, isActive = false) => {
    const linkClasses = `${styles.link} ${isActive ? styles.active : ''}`;

    return (
        <Link href={refUrl} passHref>
            <button type="button" tabIndex={0} className={linkClasses}>
                {title}
            </button>
        </Link>
    );
};

const Layout: FC<Props> = ({ children }) => {
    const router = useRouter();

    // Dev feature toggle
    const { query } = router;
    const dev = !!query.dev;

    return (
        <div className={styles.layout}>
            <NavBar />
            <div className={styles.wrapper}>
                <div className={styles.header}>
                    {navBarContentMock.map((element, index) => (
                        <React.Fragment key={index}>
                            {navBarContent(
                                element.title,
                                element.refURL,
                                router.pathname === element.pathName
                            )}
                            {element.pipeSymbol}
                        </React.Fragment>
                    ))}
                    {dev && (
                        <>
                            |
                            {navBarContent(
                                'Availability Panel',
                                '/availability-panel'
                            )}
                        </>
                    )}
                </div>
                {children}
            </div>
            <Footer />
        </div>
    );
};

export default Layout;
