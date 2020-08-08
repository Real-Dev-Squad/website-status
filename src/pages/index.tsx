import "./index.scss";

import { Component } from "react";
import Layout from "../components/Layout/Layout";
import Link from "next/link";
import Title from "../components/title/TItle";

class Index extends Component<any> {
  render() {
    return (
      <Layout>
        <div>
          <Link href="/">
            <a>Home</a>
          </Link>
          <Link href="/about">
            <a>About</a>
          </Link>
        </div>
        <Title>This is index page</Title>
      </Layout>
    );
  }
}

export default Index;
