
import styles from './Title.scss';

type Props = {
  children?: React.ReactNode;
};

function Title(props: Props) {
  const { children } = props;

  return (
    <h1 className={styles.Title}>
      {children}
    </h1>
  );
}

export default Title;
