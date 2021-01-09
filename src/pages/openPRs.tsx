import { FunctionComponent, useState, useEffect } from 'react';
import fetch from '../helperFunctions/fetch';
import Layout from '../components/Layout';
import PullRequest from '../components/pullRequests';

type pullRequestType = {
  title: string,
  username: string,
  createdAt: string,
  updatedAt: string,
}

const openPRs: FunctionComponent = () => {
  const url = 'https://staging-api.realdevsquad.com/pullrequests/open';
  const [pullRequests, setPullRequests] = useState<pullRequestType[]>([]);

  useEffect(() => {
    (async () => {
      const response = await fetch({ url });
      setPullRequests(response.data.pullRequests);
    })();
  }, []);

  const getPRs = () => pullRequests.map((
    pullRequest?: pullRequestType,
  ) => {
    const {
      title,
      username,
      createdAt,
      updatedAt,
    } = pullRequest;
    return (
      <PullRequest
        key={title}
        title={title}
        username={username}
        createdAt={createdAt}
        updatedAt={updatedAt}
        url={url}
      />
    );
  });

  return (
    <Layout>
      {
        !!pullRequests
        && (
          <div className="container">
            {getPRs()}
          </div>
        )
      }
    </Layout>
  );
};

export default openPRs;
