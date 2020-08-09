import { Component } from "react";
import Layout from "../components/Layout/Layout";
import Timeline from "../components/timeline/Timeline";
import logo from "../static/images/Real-Dev-Squad@1x.png";
import styles from "./index.scss";

class Index extends Component<any> {
  render() {
    return (
      <Layout>
        <img src={logo} className={styles.logo} />
        <Timeline />
      </Layout>
    );
  }
}

export default Index;
