import { FC, useState, useEffect } from 'react';
import Layout from 'components/Layout';
import PullRequest from 'components/pullRequests';
import fetch from '../helperFunctions/fetch';
import CardShimmer from '../components/Loaders/cardShimmer';

type pullRequestType = {
  title: string;
  username: string;
  createdAt: string;
  updatedAt: string;
  url: string;
};

const openPRs: FC = () => {
  const url = 'https://staging-api.realdevsquad.com/pullrequests/open';
  const [pullRequests, setPullRequests] = useState<pullRequestType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);

      const response = await fetch({ url });
      setPullRequests(response.data.pullRequests);

      setTimeout(() => {
        setLoading(false);
      }, 3000);
    })();
  }, []);

  const getPRs = () => pullRequests.map((pullRequest?: pullRequestType) => {
    const {
      title, username, createdAt, updatedAt, url: link,
    } = pullRequest;
    return (
      <>
        {
          loading ? (
            <CardShimmer />
          ) : (
            <PullRequest
              key={link}
              title={title}
              username={username}
              createdAt={createdAt}
              updatedAt={updatedAt}
              url={link}
            />
          )
        }
      </>
    );
  });

  return (
    <Layout>
      {!!pullRequests && <div className="container">{getPRs()}</div>}
    </Layout>
  );
};

export default openPRs;
