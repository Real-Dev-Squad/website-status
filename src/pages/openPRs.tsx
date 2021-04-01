import { FC, useState, useEffect } from 'react';
import Head from '@/components/head';
import Layout from '@/components/Layout';
import PullRequest from '@/components/pullRequests/indexModified';
import fetch from '@/helperFunctions/fetch';
import CardShimmer from '@/components/Loaders/cardShimmer';

type pullRequestType = {
  title: string;
  username: string;
  createdAt: string;
  updatedAt: string;
  url: string;
};

const openPRs: FC = () => {
  const [pullRequests, setPullRequests] = useState<pullRequestType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const response = await fetch({
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/pullrequests/open`,
      });
      setPullRequests(response.data.pullRequests);
      setLoading(false);
    })();
  }, []);

  const getPRs = () => pullRequests.map((pullRequest: pullRequestType) => {
    const {
      title, username, createdAt, updatedAt, url: link,
    } = pullRequest;
    return (
      <>
        <PullRequest
          key={link}
          title={title}
          username={username}
          createdAt={createdAt}
          updatedAt={updatedAt}
          url={link}
        />
      </>
    );
  });

  return (
    <Layout>
      <Head title="Open PRs" />

      <div className="container">
        {
          loading ? (
            <>
              <CardShimmer />
              <CardShimmer />
              <CardShimmer />
              <CardShimmer />
              <CardShimmer />
              <CardShimmer />
              <CardShimmer />
              <CardShimmer />
              <CardShimmer />
              <CardShimmer />
            </>
          ) : (
            getPRs())
        }
      </div>

    </Layout>
  );
};

export default openPRs;
