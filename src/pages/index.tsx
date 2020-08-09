import "./index.scss";

import { Component } from "react";
import Layout from "../components/Layout/Layout";
import Link from "next/link";
import Timeline from "../components/timeline/Timeline";
import Title from "../components/title/TItle";

class Index extends Component<any> {
  render() {
    return (
      <Layout>
        <Timeline />
      </Layout>
    );
  }
}

export default Index;
