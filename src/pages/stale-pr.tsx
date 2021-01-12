import { Helmet } from 'react-helmet';
import { FC } from 'react';
import Section from 'components/pullRequests/section';
import Layout from 'components/Layout';

type Props = {
  stalePRs: {
    message: string;
    pullRequests: [];
  };
};

const stalePR: FC<Props> = ({ stalePRs }) => (
  <div>
    <Layout>
      <Helmet>
        <title>Stale PRs | Status Real Dev Squad</title>
      </Helmet>
      <div className="container">
        <Section heading="Stale PRs" content={stalePRs.pullRequests} />
      </div>
    </Layout>
  </div>
);

export async function getStaticProps() {
  const res = await fetch(
    'https://staging-api.realdevsquad.com/pullrequests/stale',
  );
  const stalePRs = await res.json();
  return {
    props: {
      stalePRs,
    },
  };
}

export default stalePR;
