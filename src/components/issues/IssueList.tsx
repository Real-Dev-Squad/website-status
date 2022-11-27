import { FC } from "react";
import styles from "@/components/issues/Card/Card.module.scss";
import Card from "@/components/issues/Card";
import Layout from "@/components/Layout";
import Head from "@/components/head";

const IssueList = (props: any) => {
  const { list } = props;

  return (
    <Layout>
      <Head title="PRs" />
      {list.map((issue) => (
        <Card key={issue.id} issue={issue} />
      ))}
    </Layout>
  );
};

export default IssueList;
