import { FC } from 'react';
import { Helmet } from 'react-helmet';
import Section from '../components/section';
import Layout from '../components/Layout';
import Navbar from '../components/navbar';
import ChallengesJson from '../mocks/challenges.json';
import { CHALLENGES_SCREEN } from '../components/constants/display-sections.js';

const Challenges: FC = () => (
  <Layout>
    <Helmet>
      <title>Challenges | Status Real Dev Squad</title>
    </Helmet>
    <Navbar page="DS" />
    <div>
      <Section content={ChallengesJson} screen={CHALLENGES_SCREEN} />
    </div>
  </Layout>
);

export default Challenges;
