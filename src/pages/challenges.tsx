import { FunctionComponent } from 'react';
import Layout from 'components/Layout';
import Section from 'components/section';
import Navbar from 'components/navbar';
import ChallengesJson from 'mocks/challenges.json';
import { CHALLENGES_SCREEN } from '../components/constants/display-sections.js';
import { Helmet } from 'react-helmet';

const Challenges: FunctionComponent = () => {
  return (
    <Layout>
      <Helmet>
        <title>Challenges | Status Real Dev Squad</title>
      </Helmet>
      <Navbar page='DS' />
      <div>
        <Section content={ChallengesJson} screen={CHALLENGES_SCREEN} />
      </div>
    </Layout>
  );
};

export default Challenges;
