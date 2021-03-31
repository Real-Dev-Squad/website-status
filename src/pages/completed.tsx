import { FC } from 'react';
import Head from '@/components/head';
import Layout from '@/components/Layout';
import CompletedSection from '@/components/completed-section';
import { CHALLENGES_SCREEN } from '@/components/constants/display-sections.js';
import ChallengesJson from '@/mocks/challenges.json';

const Challenges: FC = () => (
  <Layout>
    <Head title="Challenges" />
    <div>
      <CompletedSection content={ChallengesJson} screen={CHALLENGES_SCREEN} />
    </div>
  </Layout>
);

export default Challenges;
