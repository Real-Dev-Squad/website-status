import { useState } from 'react';
import Layout from '../components/Layout';
import Section from '../components/section';
import Navbar from '../components/navbar';
import Title from '../components/title';
import ChallengesJson from '../../mock/challenges.json';
import Constants from '../components/constants/display-sections.js';

const Challenges = (props) => {
  const [state, setState] = useState({
    showModal: false,
  });

  const btnClickHandler = () => {
    const showModalVal = state.showModal;
    setState({ showModal: !showModalVal });
  };

  const closeModal = () => {
    setState({ showModal: false });
  };

  return (
    <Layout>
      <Navbar page='DS' />
      <Title>This is index page</Title>
      <div className='new-challenge-btn'>
        <button onClick={btnClickHandler}>Add New Challenge</button>
      </div>
      <style jsx>{`
        .new-challenge-btn {
          text-align: center;
        }
        .new-challenge-btn button {
          background: #540075;
          color: white;
          border: 1px solid #540075;
          border-radius: 5px;
          padding: 0.5rem 2rem;
          font: inherit;
          cursor: pointer;
        }

        .challenges {
          display: flex;
        }
      `}</style>
      {/* <Modal showModal={state.showModal} click={closeModal} /> */}
      <div>
        <Section
          content={ChallengesJson}
          screen={Constants['CHALLENGES_SCREEN_NAME']}
        />
      </div>
    </Layout>
  );
};

export default Challenges;
