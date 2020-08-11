import { Component } from "react";
import Layout from "../components/Layout";
import Spinner from "../components/Spinner";
import Timeline from "../components/Timeline";
import { TimelineData } from "../mocks/timeLine.data.mock";
import logo from "../static/images/Real-Dev-Squad@1x.png";
import styles from "./index.scss";
import useFetch from "../custom-hooks/useFetch";

function Index() {
  // This is dummy data-URL at the moment which will get replaced by real URL when available
  const { data, loading, error } = useFetch(
    "https://jsonplaceholder.typicode.com/todos"
  );
  return (
    <Layout>
      <img src={logo} className={styles.logo} />
      {loading ? (
        <Spinner />
      ) : error ? (
        <p>error</p>
      ) : data ? (
        <Timeline timeLineData={data} />
      ) : null}
    </Layout>
  );
}

export default Index;
