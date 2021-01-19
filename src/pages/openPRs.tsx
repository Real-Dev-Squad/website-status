import { FC, useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import PullRequest from '@/components/pullRequests';
import fetch from '../helperFunctions/fetch';

type pullRequestType = {
  title: string;
  username: string;
  createdAt: string;
  updatedAt: string;
  url: string;
};

const openPRs: FC = () => {
  const [pullRequests, setPullRequests] = useState<pullRequestType[]>([]);

  useEffect(() => {
    (async () => {
      const response = await fetch({
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/pullrequests/open`,
      });
      setPullRequests(response.data.pullRequests);
    })();
  }, []);

  const getPRs = () => pullRequests.map((pullRequest: pullRequestType) => {
    const {
      title, username, createdAt, updatedAt, url: link,
    } = pullRequest;
    return (
      <PullRequest
        key={link}
        title={title}
        username={username}
        createdAt={createdAt}
        updatedAt={updatedAt}
        url={link}
      />
    );
  });

  return (
    <Layout>
      {!!pullRequests && <div className="container">{getPRs()}</div>}
    </Layout>
  );
};

export default openPRs;
