import styles from "./Layout.module.scss";
import Footer from "../footer/index";

type Props = {
  children?: React.ReactNode;
};

function Layout(props: Props) {
  const { children } = props;

  return <div className={styles.layout}>{children}<Footer /></div>;
}

export default Layout;
