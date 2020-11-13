import { FunctionComponent } from 'react';
import Layout from '../components/Layout';
import Section from '../components/section';
import Navbar from '../components/navbar';
import Title from '../components/title';
import ChallengesJson from '../../mock/challenges.json';
import { CHALLENGES_SCREEN } from '../components/constants/display-sections.js';

const Challenges: FunctionComponent = () => {
  return (
    <Layout>
      <Navbar page='DS' />
      <Title>This is index page</Title>
      <div>
        <Section content={ChallengesJson} screen={CHALLENGES_SCREEN} />
      </div>
    </Layout>
  );
};

export default Challenges;
