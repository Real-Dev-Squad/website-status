import { Component } from "react";
import Layout from "../Layout";
import spinner from "../../static/images/spinner.gif";
import styles from "./spinner.scss";

function Spinner() {
  return (
    <Layout>
      <div className={styles.imageWrap}>
        <img src={spinner} class={styles.spinner} />
      </div>
    </Layout>
  );
}

export default Spinner;
