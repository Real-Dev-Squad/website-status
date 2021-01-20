import { FC } from 'react';
import { Helmet } from 'react-helmet';
import Layout from '@/components/Layout';
import Section from '@/components/section';
import { CHALLENGES_SCREEN } from '@/components/constants/display-sections.js';
import ChallengesJson from '@/mocks/challenges.json';

const Challenges: FC = () => (
  <Layout>
    <Helmet>
      <title>Challenges | Status Real Dev Squad</title>
    </Helmet>
    <div>
      <Section content={ChallengesJson} screen={CHALLENGES_SCREEN} />
    </div>
  </Layout>
);

export default Challenges;
