import styles from "./title.scss";

type Props = {
  children?: React.ReactNode;
};

function Title(props: Props) {
  const { children } = props;

  return <h1 className={styles.title}>{children}</h1>;
}

export default Title;
