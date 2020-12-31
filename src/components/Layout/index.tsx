import { FC, ReactNode } from 'react';
import styles from './Layout.module.scss';

interface Props {
  children: ReactNode,
}

const Layout: FC<Props> = ({ children }) => <div className={styles.layout}>{children}</div>;

export default Layout;
