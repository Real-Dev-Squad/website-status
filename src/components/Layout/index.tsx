import { FC, ReactNode } from 'react';
import Footer from '../footer';
import styles from './Layout.module.scss';

interface Props {
  children?: ReactNode;
}

const Layout: FC<Props> = ({ children }) => (
  <div className={styles.layout}>
    {children}
    <Footer />
  </div>
);

export default Layout;
