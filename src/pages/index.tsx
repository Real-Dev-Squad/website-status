import { Component } from "react";
import Layout from "../components/Layout";
import Timeline from "../components/Timeline";
import { TimelineData } from "../mocks/timeLine.data.mock";
import logo from "../static/images/Real-Dev-Squad@1x.png";
import styles from "./index.scss";
import useFetch from "../custom-hooks/useFetch";

function Index() {
  const { data } = useFetch("https://jsonplaceholder.typicode.com/todos/1");
  return (
    <Layout>
      <img src={logo} className={styles.logo} />
      <Timeline timeLineData={TimelineData} />
    </Layout>
  );
}

export default Index;
