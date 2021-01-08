import { FunctionComponent, useState, useEffect } from 'react';
import fetch from '../helperFunctions/fetch';
import Layout from '../components/Layout';
import PullRequest from '../components/pullRequests';

const openPRs: FunctionComponent = () => {
  const url = 'https://staging-api.realdevsquad.com/pullrequests/open';
  const [state, setState] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await fetch(url);
      setState(response.data.pullRequests);
    })();
  }, []);

  const getPRs = () => state.map((pullRequest) => (
    <PullRequest
      key={pullRequest.title}
      title={pullRequest.title}
      username={pullRequest.username}
      createdAt={pullRequest.createdAt}
      updatedAt={pullRequest.updatedAt}
      url={pullRequest.url}
    />
  ));

  return (
    <Layout>
      {
        !!state
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
