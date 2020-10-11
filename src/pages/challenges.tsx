import classNames from './index.scss';

import { Component } from 'react';
import Layout from '../components/Layout';
import Challenge from '../components/Challenges';
import Menu from '../components/Menu';
import Title from '../components/Title';

class Challenges extends Component<any> {

  btnClickHandler = () => {
    console.log('test');
  };
  render() {
    return (
      <Layout>
        <Menu page="DS" />
        <Title>This is index page</Title>
        <div className={classNames.newChallengeBtn}>
          <button onClick={this.btnClickHandler}>Add New Challenge</button>
        </div>
        <div className={classNames.challenges}>
          <Challenge />
        </div>
      </Layout>
    );
  }
}

export default Challenges;
