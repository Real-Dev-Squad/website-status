import { FC, ReactNode } from 'react';
import Footer from '@/components/footer';
import styles from '@/components/Layout/Layout.module.scss';
import NavBar from '@/components/navBar';
import { useGetUserQuery } from '@/app/services/userApi';
import { Loader } from '../tasks/card/Loader';
import useUserData from '@/hooks/useUserData';
import { Header } from '@/components/Header';


interface Props {
    children?: ReactNode;
    hideHeader?: boolean;
}

const Layout: FC<Props> = ({ hideHeader, children }) => {
    const { isLoading } = useGetUserQuery();

    return (
        <div className={styles.layout}>
            <NavBar />
            {isLoading && <Loader />}
            <div className={styles.wrapper}>
                {!hideHeader ? <Header /> : null}
                {children}
            </div>
            <Footer />
        </div>
    );
};

export default Layout;
