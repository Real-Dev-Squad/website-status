import { Component } from "react";
import Layout from "../components/Layout/Layout";
import Timeline from "../components/Timeline/Timeline";
import { TimelineData } from "../mocks/timeLine.data.mock";
import logo from "../static/images/Real-Dev-Squad@1x.png";
import styles from "./index.scss";

class Index extends Component<any> {
  render() {
    return (
      <Layout>
        <img src={logo} className={styles.logo} />
        <Timeline timeLineData={TimelineData} />
      </Layout>
    );
  }
}

export default Index;
