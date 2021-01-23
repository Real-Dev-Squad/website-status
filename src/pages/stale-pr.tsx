import { FC, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Section from '@/components/pullRequests/section';
import Layout from '@/components/Layout';
import fetch from '@/helperFunctions/fetch';

const stalePR: FC = () => {
  const [pullRequests, setPullRequests] = useState<[]>([]);

  useEffect(() => {
    (async () => {
      const res = await fetch({
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/pullrequests/stale`,
      });
      setPullRequests(res.data.pullRequests);
    })();
  }, []);

  return (
    <div>
      <Layout>
        <Helmet>
          <title>Stale PRs | Status Real Dev Squad</title>
        </Helmet>
        <div className="container">
          <Section heading="Stale PRs" content={pullRequests} />
        </div>
      </Layout>
    </div>
  );
};

export default stalePR;
