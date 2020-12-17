import styles from "./title.module.scss";
import React from "react";

type Props = {
  children?: React.ReactNode;
};

function Title(props: Props) {
  const { children } = props;

  return <h1 className={styles.title}>{children}</h1>;
}

export default Title;
