import { Component } from 'react';
import Layout from '../components/Layout';
import Section from '../components/section';
import Modal from '../components/modal';
import Navbar from '../components/navbar';
import Title from '../components/title';

class Challenges extends Component<any> {
  state = {
    showModal: false,
  };

  btnClickHandler = () => {
    const showModalVal = this.state.showModal;
    this.setState({ showModal: !showModalVal });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const CHALLENGES = [
      {
        id: 1,
        title: 'Sherlock and Anagrams',
        level: 'Easy',
        startDate: '14 Days Ago',
        endDate: 'Today',
        participantsCnt: '5',
        isActive: 1,
      },
      {
        id: 2,
        title: 'Sherlock and Anagrams',
        level: 'Easy',
        startDate: '28 Days Ago',
        endDate: '14 Days Ago',
        participantsCnt: '5',
        isActive: 0,
      },
    ];

    const SCREEN = 'Challenges';

    return (
      <Layout>
        <Navbar page='DS' />
        <Title>This is index page</Title>
        <div className='new-challenge-btn'>
          <button onClick={this.btnClickHandler}>Add New Challenge</button>
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
        <Modal showModal={this.state.showModal} click={this.closeModal} />
        <div>
          <Section content={CHALLENGES} screen={SCREEN} />
        </div>
      </Layout>
    );
  }
}

export default Challenges;
